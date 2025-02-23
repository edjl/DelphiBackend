import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

interface RouteContext {
    env: {
        DB: D1Database;
    };
    data: {
        query: {
            user_id: number;
            categories?: string[];
            order_by?: string;
            order_direction?: 'asc' | 'desc';
            page?: number;
        };
    }
}

export class ListUserEventShares extends OpenAPIRoute {

    schema = {
        tags: ["user-shares"],
        summary: "Get user's shares for an event",
        request: {
            query: z.object({
                user_id: z.number(),
                event_name: z.string(), // Make categories optional
                order_by: z.enum(['purchase_date_time', 'event_end_date', 'shares']).default('purchase_date_time'),
                order_direction: z.enum(['asc', 'desc']).default('desc')
            }),
        },
        responses: {
            "200": {
                description: "User's shares successfully retrieved",
                schema: z.object({
                    success: z.boolean(),
                    outcomes: z.array(z.object({
                        event_name: z.string(),
                        option_name: z.string(),
                        purchase_date_time: z.number(),
                        event_end_date: z.number(),
                        shares: z.number(),
                        price: z.number(),
                        current_price: z.number(),
                        image_link: z.string(),
                    })),
                })
            },
            "400": {
                description: "Error retrieving user's shares",
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
        const { user_id, event_name, order_by = 'purchase_date_time', order_direction = 'desc' } = reqQuery.query;

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

        // Validate if event exists and retrieve event id
        const eventExistQuery = `SELECT id FROM events WHERE name = ?`;
        const eventExistResult = await db.prepare(eventExistQuery).bind(event_name).first();
        if (!eventExistResult) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Event does not exist",
                }),
                { status: 400 }
            );
        }
        const eventId = eventExistResult.id;


        const getSharesQuery = `
            SELECT e.name as event_name, o.title AS option_name, purchase_date_time, e.end_date AS event_end_date, 
                s.shares as shares, s.price as price, 
                CASE 
                    WHEN s.shares < 0 THEN o.negative_price 
                    ELSE o.positive_price 
                END AS current_price, 
                i.link AS image_link

            FROM events AS e
            LEFT JOIN shares s ON s.event_id = e.id
            LEFT JOIN options o on o.event_id = s.event_id AND o.option_id = s.option_id
            LEFT JOIN images i on i.id = o.image_id
            WHERE e.id = ? AND s.user_id = ?
            ORDER BY ${order_by}
        `;

        try {
            const userRecord = await db.prepare(getSharesQuery).bind(eventId, user_id).all();

            if (!userRecord) {
                return new Response(
                    JSON.stringify({
                        success: true,
                        error: "Error with query or something",
                    }),
                    { status: 400 }
                );
            }

            return new Response(
                JSON.stringify({
                    success: true,
                    outcomes: userRecord.results,
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
