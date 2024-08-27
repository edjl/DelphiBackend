import { fromHono } from "chanfana";
import { Hono } from "hono";
import { RecalculateStocks } from "./endpoints/recalculateStocks";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
    docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints with correct methods and paths
openapi.post("/api/RecalculateStocks", RecalculateStocks);

// Export the Hono app
export default app;
