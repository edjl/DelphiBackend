import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

interface RouteContext {
    env: {
        DB: D1Database;
    };
    data: {
        query: {
            order_by?: string;
            order_direction?: 'asc' | 'desc';
        };
    }
}

export class ListLeaders extends OpenAPIRoute {

    schema = {
        tags: ["leaderboard"],
        summary: "Get leaders",
        request: {
            query: z.object({
                order_by: z.enum(['balance', 'total_credits_won']).default('balance'),
                order_direction: z.enum(['asc', 'desc']).default('desc'),
            }),
        },
        responses: {
            "200": {
                description: "Events successfully retrieved",
                schema: z.object({
                    success: z.boolean(),
                    outcomes: z.array(z.object({
                        username: z.string(),
                        balance: z.number(),
                        total_credits_won: z.number(),
                    })),
                })
            },
            "400": {
                description: "Error retrieving events",
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
        const { order_by = 'balance', order_direction = 'desc' } = reqQuery.query;
        const limit = 100;


        const getLeadersQuery = `
            SELECT 
                u.username AS username, u.balance AS balance, u.total_credits_won AS totalCreditsWon
            FROM users u
            ORDER BY ${order_by} ${order_direction}
            LIMIT ?
        ;`;


        try {
            const userRecord = await db.prepare(getLeadersQuery).bind(limit).all();

            if (!userRecord || userRecord.results.length === 0) {
                return new Response(
                    JSON.stringify({
                        success: true,
                        error: "No users found",
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
