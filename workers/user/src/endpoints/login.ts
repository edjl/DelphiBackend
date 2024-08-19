import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { comparePassword } from '../authUtils';

interface RouteContext {
    env: {
        DB: D1Database;
    };
    request: {
        body: any;
    };
}

export class Login extends OpenAPIRoute {

    schema = {
        tags: ["account"],
        summary: "Login using email and password",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: z.object({
                            email: z.string(),
                            password: z.string(),
                        }),
                    },
                },
            },
        },
        responses: {
            "200": {
                description: "Login success",
                schema: {
                    success: z.boolean(),
                    user_id: z.number(),
                }
            },
            "400": {
                description: "Login error",
                schema: {
                    success: z.boolean(),
                    error: z.string(),
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
        const { email, password } = reqBody.body;
        
        // Query to get user ID and salted password
        const getPasswordQuery = `
            SELECT id, password as saltedPassword
            FROM users
            WHERE email = ?
        `;

        try {
            const userRecord = await db.prepare(getPasswordQuery).bind(email).first();

            if (!userRecord) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        error: "Email not found",
                    }),
                    { status: 400 }
                );
            }

            const { id: user_id, saltedPassword } = userRecord;

            var isPasswordValid = false;
            if (typeof saltedPassword === 'string') {
                isPasswordValid = await comparePassword(password, saltedPassword);
            }

            if (!isPasswordValid) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        error: "Invalid password",
                    }),
                    { status: 400 }
                );
            }

            return new Response(
                JSON.stringify({
                    success: true,
                    user_id: user_id,
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
