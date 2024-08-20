import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Category, CategoryType} from "../category"

interface RouteContext {
    env: {
        DB: D1Database;
    }
}

export class ListCategories extends OpenAPIRoute {

    schema = {
        tags: ["categories"],
        summary: "Get categories list",
        responses: {
            "200": {
                description: "Categories successfully retrieved",
                schema: z.object({
                    success: z.boolean(),
                    categories: z.array(Category),
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

        // Query to get user details
        const getCategoriesQuery = `
            SELECT grouping, name 
            FROM category
        `;

        try {
            const result = await db.prepare(getCategoriesQuery).all();

            // Map the result to Category objects
            const categories = result.results.map((row: any) => ({
                grouping: row.grouping,
                name: row.name,
            }));

            return new Response(
                JSON.stringify({
                    success: true,
                    categories: categories,
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
