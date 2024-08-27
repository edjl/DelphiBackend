import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

interface RouteContext {
    env: {
        DB: D1Database;
    };
}

export class RecalculateStocks extends OpenAPIRoute {

    schema = {
        tags: ["calculation"],
        summary: "Recalculating the value of all stocks",
        responses: {
            "200": {
                description: "Shares recalculated",
                schema: z.object({
                    success: z.boolean(),
                    result: z.string(),
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
        
        const baseShares = 100;
        const updateOptionsQuery = `
            WITH OptionCounts AS (
                SELECT 
                    event_id, 
                    COUNT(option_id) AS num_options,
                    SUM(negative_shares) AS total_negative_shares
                FROM options
                GROUP BY event_id
            ),
            CalculatedShares AS (
                SELECT 
                    e.id AS event_id, 
                    o.option_id AS option_id, 
                    (o.positive_shares + FLOOR((oc.total_negative_shares - o.negative_shares) / (COALESCE(oc.num_options, 0) - 1)) + ${baseShares}) AS option_shares,
                    (e.shares + ${baseShares} * COALESCE(oc.num_options, 0)) AS total_shares
                FROM events AS e
                LEFT JOIN options o ON e.id = o.event_id
                LEFT JOIN OptionCounts oc ON e.id = oc.event_id
                WHERE e.stage = 1
            )
            UPDATE options
            SET positive_price = 1 + FLOOR(100 * cs.option_shares / cs.total_shares),
                negative_price = 1 + FLOOR(100 * (cs.total_shares - cs.option_shares) / cs.total_shares)
            FROM CalculatedShares cs
            WHERE options.event_id = cs.event_id AND options.option_id = cs.option_id;
        `;

        try {
            await db.prepare(updateOptionsQuery).run()

            return new Response(
                JSON.stringify({
                    success: true,
                    error: `Stocks recalculated successfully`,
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
