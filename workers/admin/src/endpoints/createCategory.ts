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

export class CreateCategory extends OpenAPIRoute {

    schema = {
        tags: ["category"],
        summary: "Create a new category",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: z.object({
                            name: z.string(),
                            grouping: z.number(),
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
            grouping,
        } = reqBody.body;
        

        // Construct the SQL query
        const query = `
            INSERT INTO category (grouping, name)
            VALUES (?, ?)
        `;

        try {
            await db.prepare(query).bind(grouping, name).run();

            return new Response(
                JSON.stringify({
                    success: true,
                    result: "Category created successfully",
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
