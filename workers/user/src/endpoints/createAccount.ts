import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { hashPassword } from '../authUtils';

interface RouteContext {
    env: {
        DB: D1Database;
    };
    request: {
        body: any;
    };
}

export class CreateAccount extends OpenAPIRoute {

    schema = {
        tags: ["account"],
        summary: "Create a new account",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: z.object({
                            username: z.string(),
                            email: z.string(),
                            password: z.string(),
                            admin: z.number().optional(),
                            balance: z.number().optional(),
                            bankruptcy_count: z.number().optional(),
                            bets_count: z.number().optional(),
                            total_credits_bet: z.number().optional(),
                            total_credits_won: z.number().optional(),
                            premium_account: z.number().optional(),
                            profit_multiplier: z.number().optional(),
                        }),
                    },
                },
            },
        },
        responses: {
            "200": {
                description: "Account creation successful",
                schema: {
                    success: z.boolean(),
                    result: z.string(),
                }
            },
            "400": {
                description: "Account creation error",
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
        const {
            username,
            email,
            password,
            admin,
            balance,
            bankruptcy_count,
            bets_count,
            total_credits_bet,
            total_credits_won,
            premium_account,
            profit_multiplier,
        } = reqBody.body;
        
        // Check for existing username
        const checkQueryUsername = `
            SELECT *
            FROM users
            WHERE username = ?
        `;
        const checkDuplicateUsername = await db.prepare(checkQueryUsername).bind(username).first();

        if (checkDuplicateUsername) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Username already exists",
                }),
                { status: 400 }
            );
        }
        
        // Check for existing email
        const checkQueryEmail = `
            SELECT *
            FROM users
            WHERE email = ?
        `;
        const checkDuplicateEmail = await db.prepare(checkQueryEmail).bind(email).first();

        if (checkDuplicateEmail) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Email already exists",
                }),
                { status: 400 }
            );
        }

        // Hash the password before storing it
        const hashedPassword = await hashPassword(password);

        // Build the query dynamically based on provided fields
        const fields: string[] = [];
        const values: any[] = [];
        const placeholders: string[] = [];

        fields.push("username", "email", "password");
        values.push(username, email, hashedPassword); // Use hashed password
        placeholders.push("?", "?", "?");
        if (admin !== undefined) {
            fields.push("admin");
            values.push(admin);
            placeholders.push("?");
        }
        if (balance !== undefined) {
            fields.push("balance");
            values.push(balance);
            placeholders.push("?");
        }
        if (bankruptcy_count !== undefined) {
            fields.push("bankruptcy_count");
            values.push(bankruptcy_count);
            placeholders.push("?");
        }
        if (bets_count !== undefined) {
            fields.push("bets_count");
            values.push(bets_count);
            placeholders.push("?");
        }
        if (total_credits_bet !== undefined) {
            fields.push("total_credits_bet");
            values.push(total_credits_bet);
            placeholders.push("?");
        }
        if (total_credits_won !== undefined) {
            fields.push("total_credits_won");
            values.push(total_credits_won);
            placeholders.push("?");
        }
        if (premium_account !== undefined) {
            fields.push("premium_account");
            values.push(premium_account);
            placeholders.push("?");
        }
        if (profit_multiplier !== undefined) {
            fields.push("profit_multiplier");
            values.push(profit_multiplier);
            placeholders.push("?");
        }

        // Construct the SQL query
        const query = `
            INSERT INTO users (${fields.join(", ")})
            VALUES (${placeholders.join(", ")})
        `;

        try {
            await db.prepare(query).bind(...values).run();

            return new Response(
                JSON.stringify({
                    success: true,
                    result: "Account created successfully",
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
