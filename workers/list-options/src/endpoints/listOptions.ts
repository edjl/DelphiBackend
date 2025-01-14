import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

interface RouteContext {
    env: {
        DB: D1Database;
    };
    data: {
        query: {
            event_name: string;
        };
    }
}

export class ListOptions extends OpenAPIRoute {

    schema = {
        tags: ["list-options"],
        summary: "Get options for an event",
        request: {
            query: z.object({
                event_name: z.string(),
            }),
        },
        responses: {
            "200": {
                description: "Options successfully retrieved",
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
        const { event_name = '' } = reqQuery.query;

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

        const getOptionsQuery = `
            SELECT o.title AS title, o.positive_shares AS positive_shares, o.negative_shares AS negative_shares, o.market_cap AS market_cap,
                o.positive_price AS positive_price, o.negative_price AS negative_price, i.link AS image_link
            FROM options o
                LEFT JOIN images i on image_id = i.id
            WHERE o.event_id = ?
            ORDER BY o.positive_price DESC
        ;`;


        try {
            const record = await db.prepare(getOptionsQuery).bind(event_id).all();

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
