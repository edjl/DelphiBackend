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
            user_only?: boolean;
        };
    }
}

export class ListUserEvents extends OpenAPIRoute {

    schema = {
        tags: ["user-events"],
        summary: "Get events that user bought",
        request: {
            query: z.object({
                user_id: z.number(),
                categories: z.array(z.string()).optional(),
                order_by: z.enum(['shares', 'market_cap', 'end_date']).default('end_date'),
                order_direction: z.enum(['asc', 'desc']).default('asc'),
                page: z.number().min(1).default(1),
                user_only: z.boolean().default(false),
            }),
        },
        responses: {
            "200": {
                description: "Events successfully retrieved",
                schema: z.object({
                    success: z.boolean(),
                    outcomes: z.array(z.object({
                        name: z.string(),
                        shares: z.number(),
                        market_cap: z.number(),
                        end_date: z.number(),
                        top_option_title: z.string(),
                        top_option_price: z.number(),
                        top_option_image: z.string(),
                        user_bought: z.boolean(),
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
        const { user_id, categories = [], order_by = 'end_date', order_direction = 'asc', page = 1, user_only = false } = reqQuery.query;

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
            ? `AND category.name IN (${categories.map(str => `'${str}'`).join(', ')})`
            : '';

        // Adjust query based on only showing events the user bought
        const sharesCondition = user_only ? `AND EXISTS (SELECT 1 FROM shares s WHERE s.event_id = e.id AND s.user_id = ${user_id})` : ``;

        const getEventsQuery = `
            SELECT 
                e.name AS name, e.shares AS shares, e.market_cap AS market_cap, e.end_date AS end_date, 
                o.title AS top_option_title, o.positive_price AS top_option_price, 
                i.link AS top_option_image, 
                CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM shares s 
                        WHERE s.event_id = e.id AND s.user_id = ?
                        LIMIT 1
                    ) THEN 1 
                    ELSE 0 
                END AS user_bought
            FROM events e 
                LEFT JOIN options o ON e.id = o.event_id 
                LEFT JOIN images i ON o.image_id = i.id 
            WHERE e.stage = 1 
                AND o.option_id = ( 
                    SELECT o2.option_id 
                    FROM options o2 
                    WHERE o2.event_id = e.id 
                    ORDER BY o2.positive_price DESC, o2.title ASC 
                    LIMIT 1 
                )
                ${categoriesCondition}
                ${sharesCondition}
            ORDER BY ${order_by} ${order_direction}
            LIMIT ? OFFSET ?
        ;`;


        try {
            const userRecord = await db.prepare(getEventsQuery).bind(user_id, limit, offset).all();

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
