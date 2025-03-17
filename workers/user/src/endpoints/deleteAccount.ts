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

export class DeleteAccount extends OpenAPIRoute {

    schema = {
        tags: ["account"],
        summary: "Delete Account",
        request: {
            params: z.object({
                id: z.number(),
            }),
        },
        responses: {
            "200": {
                description: "Account successfully deleted",
                schema: z.object({
                    success: z.boolean(),
                    result: z.string(),
                })
            },
            "400": {
                description: "Error retrieving details",
                schema: z.object({
                    success: z.boolean(),
                    result: z.string(),
                })
            },
            "500": {
                description: "Internal server error",
                schema: z.object({
                    success: z.boolean(),
                    result: z.string(),
                }),
            },
        },
    };

    async handle(c: RouteContext) {
        const db = c.env.DB as D1Database;
        const reqBody = await this.getValidatedData<typeof this.schema>();
        const { id } = reqBody.params;

        // Check for existing id
        const checkUserExistsQuery = `
            SELECT *
            FROM users
            WHERE id = ? AND active = 1
        `;
        const checkUserExists = await db.prepare(checkUserExistsQuery).bind(id).first();

        if (!checkUserExists) {
            return new Response(
                JSON.stringify({
                    success: false,
                    result: "User doesn't exists",
                }),
                { status: 400 }
            );
        }

        const deleteUserQuery = `
            UPDATE users SET active = 0 WHERE id = ?
        `;

        try {
            const deleteUser = await db.prepare(deleteUserQuery).bind(id).run();

            if (!deleteUser) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        result: "Delete not successful",
                    }),
                    { status: 400 }
                );
            }
            return new Response(
                JSON.stringify({
                    success: true,
                    result: "Delete successful",
                }),
                { status: 200 }
            );

        } catch (error) {
            return new Response(
                JSON.stringify({
                    success: false,
                    result: `${error}`,
                }),
                { status: 500 }
            );
        }
    }
}
