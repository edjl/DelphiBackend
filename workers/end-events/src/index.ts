import { fromHono } from "chanfana";
import { Hono } from "hono";
import { EndEvent } from "./endpoints/endEvent";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
    docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints with correct methods and paths
openapi.post("/api/EndEvent", EndEvent);

// Export the Hono app
export default app;
