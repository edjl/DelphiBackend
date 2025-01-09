import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDateTimeAsString } from "../dateUtils";

interface RouteContext {
    env: {
        DB: D1Database;
    };
}

export class GetExpiredEvents extends OpenAPIRoute {

    schema = {
        tags: ["event"],
        summary: "Get Expired events currently active",
        responses: {
            "200": {
                description: "Expired events found",
                schema: z.object({
                    success: z.boolean(),
                    result: z.array(z.object({
                        event_name: z.string(),
                        end_date: z.number(),
                    })),
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

        const dateTimeString = getDateTimeAsString();

        const expiredEventsQuery = `SELECT name, end_date 
            FROM events 
            WHERE stage = 1 AND end_date <= ?
        `;


        try {
            const result = await db.prepare(expiredEventsQuery).bind(dateTimeString).run();

            return new Response(
                JSON.stringify({
                    success: true,
                    result: result.results.map((row: any) => ({
                        event_name: row.name,
                        end_date: row.end_date,
                    })),
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
