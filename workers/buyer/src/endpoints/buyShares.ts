import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

interface RouteContext {
    env: {
        DB: D1Database;
    };
    data: {
        query: {
            user_id: number;
            event_name: string;
            option_name: string;
            share_count: number;
        };
    }
}

export class BuyShares extends OpenAPIRoute {

    schema = {
        tags: ["buy-shares"],
        summary: "User buys shares",
        request: {
            query: z.object({
                user_id: z.number(),
                event_name: z.string(),
                option_name: z.string(),
                positive_shares: z.boolean(),
                share_count: z.number(),
            }),
        },
        responses: {
            "200": {
                description: "Shares successfully bought",
                schema: z.object({
                    success: z.boolean(),
                    result: z.string(),
                })
            },
            "400": {
                description: "Error buying shares",
                schema: z.object({
                    success: z.boolean(),
                    error: z.string(),
                })
            },
            "500": {
                description: "Internal server error",
                schema: z.object({
                    success: z.boolean(),
                    error: z.string(),
                }),
            },
        },
    };

    async handle(c: RouteContext) {
        const db = c.env.DB as D1Database;
        const reqQuery = await this.getValidatedData<typeof this.schema>();
        let { user_id, event_name, option_name, share_count } = reqQuery.query;
        let positive = true;
        let sharesCountPosNeg = "positive_shares";
        let sharesPricePosNeg = "positive_price";
        if (share_count < 0) {
            positive = false;
            sharesCountPosNeg = "negative_shares";
            sharesPricePosNeg = "negative_price";
            share_count = -1 * share_count
        }
        
        // Validate if user exists
        const userExistsQuery = `SELECT balance FROM users WHERE id = ?`;
        const userExistsResult = await db.prepare(userExistsQuery).bind(user_id).first();
        if (!userExistsResult) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "User does not exist",
                }),
                { status: 400 }
            );
        }
        const { balance: balance } = userExistsResult as { balance: number };

        // Validate if event exists and in stage 1
        const eventExistsQuery = `SELECT id, stage FROM events WHERE name = ?`;
        const eventExistsResult = await db.prepare(eventExistsQuery).bind(event_name).first();
        if (!eventExistsResult) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Event does not exist",
                }),
                { status: 400 }
            );
        }
        const { id: event_id, stage: stage } = eventExistsResult;
        if (stage !== 1) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Event is not in stage 1, in stage " + stage,
                }),
                { status: 400 }
            );
        }
        
        // Validate if option exists
        const optionExistsQuery = `SELECT option_id, ${sharesPricePosNeg} AS price FROM options WHERE event_id = ? AND title = ?`;
        const optionExistsResult = await db.prepare(optionExistsQuery).bind(event_id, option_name).first();
        if (!eventExistsResult) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Option does not exist",
                }),
                { status: 400 }
            );
        }
        const { option_id: option_id, price: price, } = optionExistsResult;
        
        // Validate share count !== 0
        if (share_count === 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Share count must not be 0",
                }),
                { status: 400 }
            );
        }
        
        // Validate user has enough money
        const cost = share_count * price;
        if (balance < cost) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "User does not have enough money",
                }),
                { status: 400 }
            );
        }


        const createSharesQuery = `
            INSERT INTO shares (event_id, option_id, user_id, purchase_date, shares, price)
            VALUES (?, ?, ?, ?, ?, ?)
        ;`;
        const updateUserBalanceQuery = `
            UPDATE users
            SET balance = ?
            WHERE id = ?
        ;`;
        const updateEventsQuery = `
            UPDATE events
            SET shares = shares + ?,
                market_cap = market_cap + ?
            WHERE id = ?
        ;`;
        const updateOptionsQuery = `
            UPDATE options
            SET ${sharesCountPosNeg} = ${sharesCountPosNeg} + ?,
                market_cap = market_cap + ?
            WHERE event_id = ? AND option_id = ?
        ;`;

        const today = new Date();
        const date =  Number(today.toISOString().slice(0, 10).replace(/-/g, ''));

        try {
            await db.prepare(createSharesQuery).bind(
                event_id, option_id, user_id, date, 
                (positive)? share_count : -1 * share_count, price
            ).run();
            await db.prepare(updateUserBalanceQuery).bind(
                balance - cost, user_id
            ).run();
            await db.prepare(updateEventsQuery).bind(
                share_count, cost, event_id
            ).run();
            await db.prepare(updateOptionsQuery).bind(
                share_count, cost, event_id, option_id
            ).run();

            return new Response(
                JSON.stringify({
                    success: true,
                    error: `Shares bought successfully`,
                }),
                { status: 200 }
            );

        } catch (error) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: `${error}`,
                }),
                { status: 500 }
            );
        }
    }
}
