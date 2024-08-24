import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

interface RouteContext {
    env: {
        DB: D1Database;
    };
    request: {
        body: any;
    };
}

export class CreateEvent extends OpenAPIRoute {

    schema = {
        tags: ["event"],
        summary: "Create an event, along with its options and corresponding images",
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: z.object({
                            event_name: z.string(),
                            category_name: z.string(),
                            end_date: z.number(),
                            options: z.array(z.object({
                                title: z.string(),
                                image_link: z.string().optional(),
                            })),
                        }),
                    },
                },
            },
        },
        responses: {
            "200": {
                description: "Event successfully created",
                schema: z.object({
                    success: z.boolean(),
                    result: z.string(),
                })
            },
            "400": {
                description: "Error creating event",
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
        const { event_name, category_name, end_date, options = [] } = reqBody.body;

        // Validate at least 2 options
        if (options.length < 2) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Minimum of 2 options, listed " + options.length,
                }),
                { status: 400 }
            );
        }

        // Check for duplicates in options
        const titlesSet = new Set<string>();
        for (const option of options) {
            if (titlesSet.has(option.title)) {
                return new Response(
                    JSON.stringify({
                        success: false,
                        error: `Duplicate option title detected: ${option.title}`,
                    }),
                    { status: 400 }
                );
            }
            titlesSet.add(option.title);
        }

        // Validate that event name does not exist
        const eventExistsQuery = `SELECT 1 FROM events WHERE name = ?`;
        const eventExistsResult = await db.prepare(eventExistsQuery).bind(event_name).first();
        if (eventExistsResult) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Event name already exists",
                }),
                { status: 400 }
            );
        }

        // Validate that category name exists
        const categoryExistsQuery = `SELECT id FROM category WHERE name = ?`;
        const categoryExistsResult = await db.prepare(categoryExistsQuery).bind(category_name).first();
        if (!categoryExistsResult) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Category name does not exist",
                }),
                { status: 400 }
            );
        }
        const { id: category_id } = categoryExistsResult;

        // Validate that the date format is valid
        if (end_date < 10000000 || 100000000 < end_date) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Date format is incorrect (8 digit numbers only)",
                }),
                { status: 400 }
            );
        }

        try {
            // Insert the event into the `events` table
            const insertEventQuery = `
                INSERT INTO events (name, category_id, end_date)
                VALUES (?, ?, ?) 
                RETURNING id
            `;
            const eventResult = await db.prepare(insertEventQuery).bind(event_name, category_id, end_date).first();
            if (!eventResult) {
                throw new Error("Failed to create event");
            }
            const { id: event_id } = eventResult;


            // Process options and images
            const options_count = options.length
            let option_id = 0;
            for (const option of options) {
                option_id += 1;

                // Insert image if it is provided
                let image_id = null;
                if (option.image_link && option.image_link !== '') {
                    const insertImageQuery = `INSERT INTO images (link) VALUES (?) RETURNING id`;
                    const imageResult = await db.prepare(insertImageQuery).bind(option.image_link).first();
                    if (imageResult) {
                        const { id: img_id } = eventResult;
                        image_id = img_id;
                    }
                }

                // Insert option into the `options` table
                const insertOptionQuery = `
                    INSERT INTO options (event_id, option_id, title, positive_price, negative_price, image_id)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                await db.prepare(insertOptionQuery).bind(
                    event_id, 
                    option_id, 
                    option.title, 
                    Math.floor(100 / options_count) + 1, 
                    100 - Math.floor(100 / options_count) + 1, 
                    image_id
                ).run();
            }

            return new Response(
                JSON.stringify({
                    success: true,
                    result: `Event created successfully`,
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


