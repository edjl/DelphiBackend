import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDateTimeAsString } from "../dateUtils";

interface RouteContext {
    env: {
        DB: D1Database;
    };
    data: {
        query: {
            event_name: string;
            option_name: string;
        };
    }
}

export class EndEvent extends OpenAPIRoute {

    schema = {
        tags: ["events"],
        summary: "Event ended",
        request: {
            query: z.object({
                event_name: z.string(),
                option_name: z.string(),
            }),
        },
        responses: {
            "200": {
                description: "Event successfully ended",
                schema: z.object({
                    success: z.boolean(),
                    result: z.string(),
                })
            },
            "400": {
                description: "Error ending event",
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
        let { event_name, option_name } = reqQuery.query;

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
        const optionExistsQuery = `SELECT option_id, image_id 
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
            option_id: option_id, image_id: image_id 
        } = 
        optionExistsResult as { 
            option_id: number, image_id: number 
        };

        const updateEventQuery = `UPDATE events SET stage = 2 WHERE id = ?`;
        const sharesQuery = `SELECT user_id, o.option_id AS user_option_id, title AS user_option_name, purchase_date_time, shares, price 
            FROM shares AS s 
                LEFT JOIN options o ON s.option_id = o.option_id 
            WHERE s.event_id = ?
        `;

        const createOutcomesQuery = `
            INSERT INTO outcomes (bet_title, user_id, purchase_date_time, category_id, profit, multiplier, sell_date_time, image_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ;`;
        const deleteSharesQuery = `
            DELETE FROM shares 
            WHERE event_id = ? AND option_id = ? AND user_id = ? AND purchase_date_time = ?
        ;`;
        const updateUserQuery = `
            UPDATE users
            SET balance = balance + ?, 
            curr_bets = curr_bets - 1, 
            total_credits_playing = total_credits_playing - ?,
            total_credits_won = total_credits_won + ?
            WHERE id = ?
        ;`;

        let dateTimeString = getDateTimeAsString();

        try {
            // Close event
            await db.prepare(updateEventQuery).bind(event_id).run();

            // Sell shares
            const sharesResults = await db.prepare(sharesQuery).bind(event_id).all();
            for (const share of sharesResults.results) {
                let { user_id, user_option_id, user_option_name, purchase_date_time, shares: shares_count, price: buy_price } = share as { 
                    user_id: number, user_option_id: number, user_option_name: string, purchase_date_time: number, shares: number, price: number
                };

                const posOrNeg = shares_count > 0;
                let bet_title = event_name;
                if (posOrNeg) {
                    bet_title += ":YES:"
                }
                else {
                    bet_title += ":NO:";
                    shares_count = -1 * shares_count;
                }
                bet_title += user_option_name;
                const cost = shares_count * buy_price;
                let profit = 0;
                let multiplier = 0;
                let revenue = 0;
                if ((posOrNeg && user_option_id === option_id) || (!posOrNeg && user_option_id !== option_id)) {
                    profit = shares_count * (100 - buy_price);
                    multiplier = Math.floor(100 * 100 * (100) / buy_price); // 2 decimal places %
                    revenue = shares_count * 100;
                }
                else {
                    profit = shares_count * (0 - buy_price);
                    multiplier = 0;
                    revenue = 0;
                }

                await db.prepare(createOutcomesQuery).bind(
                    bet_title, user_id, purchase_date_time, category_id, 
                    profit, multiplier, dateTimeString, image_id
                ).run();
                await db.prepare(deleteSharesQuery).bind(
                    event_id, option_id, user_id, purchase_date_time
                ).run();
                await db.prepare(updateUserQuery).bind(
                    revenue, cost, revenue, user_id
                ).run();
                
                dateTimeString = (parseInt(dateTimeString, 10) + 1).toString();
            }


            return new Response(
                JSON.stringify({
                    success: true,
                    result: "Event ended successfully",
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
