import { fromHono } from "chanfana";
import { Hono } from "hono";
import { ListUserOutcomes } from "./endpoints/listUserOutcomes";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
    docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints with correct methods and paths
openapi.get("/api/user-outcomes", ListUserOutcomes);
//openapi.get("/api/user-outcomes/:user_id/:categories/:order_by/:order_direction/:page", ListUserOutcomes);
//openapi.get("/api/user-outcomes/:user_id/:order_by/:order_direction/:page", ListUserOutcomes);

// Export the Hono app
export default app;
