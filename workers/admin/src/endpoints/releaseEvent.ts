import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

interface RouteContext {
    env: {
        DB: D1Database;
    };
    request: {
        body: any;
    };
}

export class ReleaseEvent extends OpenAPIRoute {

    schema = {
        tags: ["event"],
        summary: "Release a created event",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: z.object({
                            name: z.string(),
                        }),
                    },
                },
            },
        },
        responses: {
            "200": {
                description: "Category created successfully",
                schema: {
                    success: z.boolean(),
                    result: z.string(),
                }
            },
            "400": {
                description: "Error: Event not released",
                schema: {
                    success: z.boolean(),
                    result: z.string(),
                }
            },
            "500": {
                description: "Internal server error",
                schema: {
                    success: z.boolean(),
                    error: z.string(),
                },
            },
        },
    };

    async handle(c: RouteContext) {
        const db = c.env.DB as D1Database;
		const reqBody = await this.getValidatedData<typeof this.schema>();
        const {
            name,
        } = reqBody.body;

        // Validate if event exists
        const eventExistsQuery = `SELECT id, stage FROM events WHERE name = ?`;
        const eventExistsResult = await db.prepare(eventExistsQuery).bind(name).first();

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

        // Validate if event is in ready stage
        if (stage != 0) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Event is not in ready stage (stage 0)",
                }),
                { status: 400 }
            );
        }
        
        // Construct the SQL query
        const query = `
            UPDATE SET stage = 1
            WHERE id = ?
        `;

        try {
            await db.prepare(query).bind(event_id).run();

            return new Response(
                JSON.stringify({
                    success: true,
                    result: "Event set to visible to public",
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
