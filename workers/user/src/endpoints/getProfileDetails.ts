import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

interface RouteContext {
    env: {
        DB: D1Database;
    };
    data: {
        params: {
            id: number;
        };
    }
}

export class GetProfileDetails extends OpenAPIRoute {

    schema = {
        tags: ["account"],
        summary: "Get user details",
        request: {
            params: z.object({
                id: z.number(),
            }),
        },
        responses: {
            "200": {
                description: "Details successfully retrieved",
                schema: z.object({
                    success: z.boolean(),
                    user: z.object({
                        username: z.string(),
                        admin: z.number(),
                        balance: z.number(),
                        bankruptcy_count: z.number(),
                        bets_count: z.number(),
                        total_bets: z.number(),
                        curr_bets: z.number(),
                        total_credits_playing: z.number(),
                        total_credits_bet: z.number(),
                        total_credits_won: z.number(),
                        premium_account: z.number(),
                        profit_multiplier: z.number(),
                    }),
                })
            },
            "400": {
                description: "Error retrieving details",
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
        const { id } = reqBody.params;

        // Query to get user details
        const getUserDetailsQuery = `
            SELECT username, admin, balance, bankruptcy_count, total_bets, 
            curr_bets, total_credits_playing, total_credits_bet, 
            total_credits_won, premium_account, profit_multiplier
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

            const { username, admin, balance, bankruptcy_count, total_bets, 
                curr_bets, total_credits_playing, total_credits_bet, 
                total_credits_won, premium_account, profit_multiplier } = userRecord;

            return new Response(
                JSON.stringify({
                    success: true,
                    user: {
                        username: username,
                        admin: admin,
                        balance: balance,
                        bankruptcy_count: bankruptcy_count,
                        total_bets: total_bets,
                        curr_bets: curr_bets,
                        total_credits_playing: total_credits_playing,
                        total_credits_bet: total_credits_bet,
                        total_credits_won: total_credits_won,
                        premium_account: premium_account,
                        profit_multiplier: profit_multiplier,
                    },
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
