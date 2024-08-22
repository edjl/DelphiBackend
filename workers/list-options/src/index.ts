import { fromHono } from "chanfana";
import { Hono } from "hono";
import { ListOptions } from "./endpoints/listOptions";
import { ListUserOptions } from "./endpoints/listUserOptions";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
    docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints with correct methods and paths
openapi.get("/api/user-options", ListUserOptions);
openapi.get("/api/user-options/all", ListOptions);

// Export the Hono app
export default app;
