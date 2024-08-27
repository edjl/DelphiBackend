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

export class ListUserShares extends OpenAPIRoute {

    schema = {
        tags: ["user-shares"],
        summary: "Get user's shares",
        request: {
            query: z.object({
                user_id: z.number(),
                categories: z.array(z.string()).optional(), // Make categories optional
                order_by: z.enum(['purchase_date_time', 'event_end_date', 'shares']).default('purchase_date_time'),
                order_direction: z.enum(['asc', 'desc']).default('desc'),
                page: z.number().min(1).default(1),
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
        const { user_id, categories = [], order_by = 'purchase_date_time', order_direction = 'desc', page = 1 } = reqQuery.query;

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
        const limit = 20;
        const offset = (page - 1) * limit;

        // Adjust query based on whether categories are provided
        const categoriesCondition = categories.length > 0 
            ? `AND category.name IN (${ categories.map(str => `'${str}'`).join(', ') })`
            : '';


        const getSharesQuery = `
            SELECT e.name AS event_name, o.title AS option_name, purchase_date_time, e.end_date AS event_end_date, 
                s.shares as shares, s.price as price, 
                i.link AS image_link
            FROM shares AS s
            LEFT JOIN events e ON s.event_id = e.id
            LEFT JOIN options o ON s.event_id = o.event_id AND s.option_id = o.option_id 
            LEFT JOIN images i ON o.image_id = i.id
            LEfT JOIN category ON e.category_id = category.id 
            WHERE s.user_id = ? ${categoriesCondition}
            ORDER BY ${order_by} ${order_direction}
            LIMIT ? OFFSET ?
        `;

        try {
            const userRecord = await db.prepare(getSharesQuery).bind(user_id, limit, offset).all();

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
