import { fromHono } from "chanfana";
import { Hono } from "hono";
import { ListUserEvents } from "./endpoints/listUserEvents";
import { ListEvents } from "./endpoints/listEvents";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
    docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints with correct methods and paths
openapi.get("/api/user-events", ListUserEvents);
openapi.get("/api/user-events/all", ListEvents);

// Export the Hono app
export default app;
