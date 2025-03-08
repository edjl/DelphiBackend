import { fromHono } from "chanfana";
import { Hono } from "hono";
import { RecalculateStocks } from "./endpoints/recalculateStocks";

const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
    docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints
openapi.post("/api/RecalculateStocks", RecalculateStocks);

export default {
    fetch: app.fetch, // Keep handling HTTP requests

    async scheduled(event: ScheduledEvent, env: any, ctx: ExecutionContext) {
        console.log("Running scheduled task at", new Date(event.scheduledTime).toISOString());

        try {
            // Passing the Hono app instance as the router in RouteOptions
            const options = {
                router: app,  // Use the Hono app instance
                raiseUnknownParameters: true, // This is optional based on your setup
            };

            const recalculator = new RecalculateStocks(options); // Pass the options

            // Call handle() with a mock RouteContext
            await recalculator.handle({ env });

            console.log("Stocks recalculated successfully.");
        } catch (error) {
            console.error("Error recalculating stocks:", error);
        }
    }
};
