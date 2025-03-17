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

export class ChangeProfitMultiplier extends OpenAPIRoute {

    schema = {
        tags: ["account"],
        summary: "Get user details",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: z.object({
                            id: z.number(),
                            profit_multiplier: z.number(),
                        }),
                    },
                },
            },
        },
        responses: {
            "200": {
                description: "Multiplier successfully changed",
                schema: z.object({
                    success: z.boolean(),
                })
            },
            "400": {
                description: "User id does not exist",
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
        const reqBody = await this.getValidatedData<typeof this.schema>();
        const {
            id,
            profit_multiplier,
        } = reqBody.body;

        // Query to get user details
        const getUserDetailsQuery = `
            SELECT profit_multiplier
            FROM users
            WHERE id = ?
        `;

        try {
            const userRecord = await db.prepare(getUserDetailsQuery).bind(id).first();

            if (!userRecord) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        error: "ID not found",
                    }),
                    { status: 400 }
                );
            }


            // Query to update the profit_multiplier
            const updateProfitMultiplierQuery = `
                UPDATE users
                SET profit_multiplier = ?
                WHERE id = ?
            `;

            // Check if the profit_multiplier does not match
            if (userRecord.profit_multiplier !== profit_multiplier) {
                await db.prepare(updateProfitMultiplierQuery).bind(profit_multiplier, id).run();
            }

            return new Response(
                JSON.stringify({
                    success: true,
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
