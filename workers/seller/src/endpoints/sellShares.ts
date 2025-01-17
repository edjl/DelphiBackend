import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDateTimeAsString } from "../dateUtils";

interface RouteContext {
    env: {
        DB: D1Database;
    };
    data: {
        query: {
            user_id: number;
            event_name: string;
            option_name: string;
            purchase_date_time: number;
            shares_count: number;
        };
    }
}

export class SellShares extends OpenAPIRoute {

    schema = {
        tags: ["shares"],
        summary: "User buys shares",
        request: {
            query: z.object({
                user_id: z.number(),
                event_name: z.string(),
                option_name: z.string(),
                purchase_date_time: z.number(),
                shares_count: z.number(),
            }),
        },
        responses: {
            "200": {
                description: "Shares successfully sold",
                schema: z.object({
                    success: z.boolean(),
                    result: z.object({
                        revenue: z.number(),
                        profit: z.number(),
                        multiplier: z.number(),
                    }),
                })
            },
            "400": {
                description: "Error selling shares",
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
        let { user_id, event_name, option_name, purchase_date_time, shares_count } = reqQuery.query;
        
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
        const eventExistsQuery = `SELECT id, category_id, stage FROM events WHERE name = ?`;
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
        const { id: event_id, category_id: category_id, stage: stage } = eventExistsResult;
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
        const optionExistsQuery = `SELECT option_id, positive_shares, negative_shares, positive_price, negative_price, image_id 
            FROM options 
            WHERE event_id = ? AND title = ?`;
        const optionExistsResult = await db.prepare(optionExistsQuery).bind(event_id, option_name).first();
        if (!optionExistsResult) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Option does not exist",
                }),
                { status: 400 }
            );
        }
        const { 
            option_id: option_id, positive_shares: positive_shares, negative_shares: negative_shares, 
            positive_price: positive_price, negative_price: negative_price, image_id: image_id 
        } = 
        optionExistsResult as { 
            option_id: number, positive_shares: number, negative_shares: number, 
            positive_price: number, negative_price: number, image_id: number 
        };
        
        // Validate if shares exists
        const sharesExistsQuery = `SELECT shares AS avail_shares, price AS prev_price 
            FROM shares 
            WHERE event_id = ? AND option_id = ? AND user_id = ? AND purchase_date_time = ?`;
        const sharesExistsResult = await db.prepare(sharesExistsQuery).bind(event_id, option_id, user_id, purchase_date_time).first();
        if (!sharesExistsResult) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Share does not exist",
                }),
                { status: 400 }
            );
        }
        const { avail_shares: avail_shares, prev_price: prev_price } = sharesExistsResult as { avail_shares: number, prev_price: number };
        if (Math.abs(avail_shares) < shares_count || shares_count <= 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: (shares_count <= 0)? "Trying to sell negative or 0 number of shares: " + shares_count : "Trying to sell more shares than owned: ",
                }),
                { status: 400 }
            );
        }

        let bet_title = event_name;
        let curr_price = positive_price;
        let curr_shares = "positive_shares";
        let curr_shares_count = positive_shares;
        if (avail_shares > 0) {
            bet_title += ":YES:"
        }
        else {
            bet_title += ":NO:";
            curr_price = negative_price;
            curr_shares = "negative_shares";
            curr_shares_count = negative_shares;
        }
        bet_title += option_name;
        const cost = shares_count * prev_price;
        const revenue = shares_count * curr_price;
        const profit = revenue - cost;
        const multiplier = Math.floor(100 * (curr_price) / prev_price); // 2 decimal places %
        

        const createOutcomesQuery = `
            INSERT INTO outcomes (bet_title, user_id, purchase_date_time, category_id, profit, multiplier, sell_date_time, image_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ;`;
        const deleteSharesQuery = `
            DELETE FROM shares 
            WHERE event_id = ? AND option_id = ? AND user_id = ? AND purchase_date_time = ?
        ;`;
        const updateSharesQuery = `
            UPDATE shares 
            SET shares = ?
            WHERE event_id = ? AND option_id = ? AND user_id = ? AND purchase_date_time = ?
        ;`;
        const decrementCurrBets = (avail_shares === shares_count)? "curr_bets = curr_bets - 1, " : "";
        const updateUserQuery = `
            UPDATE users
            SET balance = ?,
            ${decrementCurrBets}
            total_credits_playing = total_credits_playing - ?,
            total_credits_won = total_credits_won + ?
            WHERE id = ?
        ;`;
        const updateEventsQuery = `
            UPDATE events
            SET shares = shares - ?,
                market_cap = market_cap - ?
            WHERE id = ?
        ;`;
        const updateOptionsQuery = `
            UPDATE options
            SET ${curr_shares} = ${curr_shares_count} - ?,
                market_cap = market_cap - ?
            WHERE event_id = ? AND option_id = ?
        ;`;

        const dateTimeString = getDateTimeAsString();

        try {
            await db.prepare(createOutcomesQuery).bind(
                bet_title, user_id, purchase_date_time, category_id, 
                profit, multiplier, dateTimeString, image_id
            ).run();
            if (shares_count == avail_shares) {
                await db.prepare(deleteSharesQuery).bind(
                    event_id, option_id, user_id, purchase_date_time
                ).run();
            }
            else {
                await db.prepare(updateSharesQuery).bind(
                    (avail_shares > 0)? avail_shares - shares_count : avail_shares + shares_count, event_id, option_id, user_id, purchase_date_time
                ).run();
            }
            await db.prepare(updateUserQuery).bind(
                balance + revenue, cost, revenue, user_id
            ).run();
            await db.prepare(updateEventsQuery).bind(
                shares_count, cost, event_id
            ).run();
            await db.prepare(updateOptionsQuery).bind(
                shares_count, cost, event_id, option_id
            ).run();

            return new Response(
                JSON.stringify({
                    success: true,
                    result: {
                        revenue: revenue,
                        profit: profit,
                        multiplier: multiplier,
                    }
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
