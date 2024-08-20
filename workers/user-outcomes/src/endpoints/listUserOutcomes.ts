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

export class ListUserOutcomes extends OpenAPIRoute {

    schema = {
        tags: ["user-outcomes"],
        summary: "Get user's outcomes",
        request: {
            query: z.object({
                user_id: z.number(),
                categories: z.array(z.string()).optional(), // Make categories optional
                order_by: z.enum(['profit', 'multiplier', 'sell_date']).default('sell_date'),
                order_direction: z.enum(['asc', 'desc']).default('desc'),
                page: z.number().min(1).default(1),
            }),
        },
        responses: {
            "200": {
                description: "User's outcomes successfully retrieved",
                schema: z.object({
                    success: z.boolean(),
                    outcomes: z.array(z.object({
                        bet_title: z.string(),
                        purchase_date: z.string(),
                        profit: z.number(),
                        multiplier: z.number(),
                        sell_date: z.string(),
                        link: z.string().nullable(),
                    })),
                })
            },
            "400": {
                description: "Error retrieving user's outcomes",
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
        const { user_id, categories = [], order_by = 'sell_date', order_direction = 'desc', page = 1 } = reqQuery.query;

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

        // Validate if categories exist if categories are provided
        if (categories.length > 0) {
            const categoriesList = categories.map(cat => `'${cat}'`).join(',');
            const categoriesExistQuery = `SELECT COUNT(*) as count FROM category WHERE name IN (${categoriesList})`;
            const categoriesExistResult = await db.prepare(categoriesExistQuery).all();
            if (!categoriesExistResult || !categoriesExistResult.results || !categoriesExistResult.results[0] || categoriesExistResult.results[0].count !== categories.length) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        error: "One or more categories do not exist",
                    }),
                    { status: 400 }
                );
            }
        }

        // Calculate offset based on page number
        const limit = 30;
        const offset = (page - 1) * limit;

        // Adjust query based on whether categories are provided
        const categoriesCondition = categories.length > 0 
            ? `AND category.name IN (${ categories.map(str => `'${str}'`).join(', ') })`
            : '';

        const getOutcomesQuery = `
            SELECT bet_title, purchase_date, profit, multiplier, sell_date, link
            FROM outcomes
            JOIN category ON outcomes.category_id = category.id
            LEFT JOIN images ON outcomes.image_id = images.id
            WHERE outcomes.user_id = ? ${categoriesCondition}
            ORDER BY ${order_by} ${order_direction}
            LIMIT ? OFFSET ?
        `;

        try {
            const userRecord = await db.prepare(getOutcomesQuery).bind(user_id, limit, offset).all();

            if (!userRecord || userRecord.results.length === 0) {
                return new Response(
                    JSON.stringify({
                        success: true,
                        error: "No records found on this page",
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
