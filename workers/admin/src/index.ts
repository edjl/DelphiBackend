import { fromHono } from "chanfana";
import { Hono } from "hono";
import { CreateCategory } from "./endpoints/createCategory";
import { CreateEvent } from "./endpoints/createEvent";
import { ReleaseEvent } from "./endpoints/releaseEvent";
import { GetExpiredEvents } from "./endpoints/getExpiredEvents";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
    docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints with correct methods and paths
openapi.post("/api/CreateCategory", CreateCategory);
openapi.post("/api/CreateEvent", CreateEvent);
openapi.post("/api/ReleaseEvent", ReleaseEvent);
openapi.post("/api/GetExpiredEvents", GetExpiredEvents);

// Export the Hono app
export default app;
