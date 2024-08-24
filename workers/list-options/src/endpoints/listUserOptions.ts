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
        };
    }
}

export class ListUserOptions extends OpenAPIRoute {

    schema = {
        tags: ["list-options"],
        summary: "Get user options for an event",
        request: {
            query: z.object({
                user_id: z.number(),
                event_name: z.string(),
            }),
        },
        responses: {
            "200": {
                description: "Events successfully retrieved for user",
                schema: z.object({
                    success: z.boolean(),
                    options: z.array(z.object({
                        title: z.string(),
                        positive_shares: z.number(),
                        negative_shares: z.number(),
                        market_cap: z.number(),
                        positive_price: z.number(),
                        negative_price: z.number(),
                        image_link: z.string(),
                        user_bought: z.number(), // 0 = No, 1,2 = Yes
                    })),
                })
            },
            "400": {
                description: "Error retrieving options",
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
        const { user_id, event_name = '' } = reqQuery.query;

        // Validate if user exists
        const userExistsQuery = `SELECT 1 FROM users WHERE id = ?`;
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

        // Validate if event exists
        const eventExistsQuery = `SELECT id FROM events WHERE name = ?`;
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
        const { id: event_id } = eventExistsResult;

        const getEventsQuery = `
            SELECT o.title AS title, o.positive_shares AS positive_shares, o.negative_shares AS negative_shares, o.market_cap AS market_cap,
                o.positive_price AS positive_price, o.negative_price AS negative_price, i.link AS image_link, 
                COALESCE(
                    (
                        SELECT SUM(s.shares) 
                        FROM shares s 
                        WHERE s.event_id = ? 
                            AND s.option_id = o.option_id 
                            AND s.user_id = ?
                    ), 
                    0
                ) AS user_bought
            FROM options o
                LEFT JOIN images i on image_id = i.id
            ORDER BY o.positive_price DESC
        ;`;


        try {
            const record = await db.prepare(getEventsQuery).bind(event_id, user_id).all();

            if (!record || record.results.length === 0) {
                return new Response(
                    JSON.stringify({
                        success: true,
                        error: "No options found",
                    }),
                    { status: 400 }
                );
            }

            return new Response(
                JSON.stringify({
                    success: true,
                    outcomes: record.results,
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
