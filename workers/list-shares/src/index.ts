import { fromHono } from "chanfana";
import { Hono } from "hono";
import { ListUserShares } from "./endpoints/listUserShares";
import { ListUserEventShares } from "./endpoints/listUserEventShares";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
    docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints with correct methods and paths
openapi.get("/api/user-shares/all", ListUserShares);
openapi.get("/api/user-shares", ListUserEventShares);

// Export the Hono app
export default app;
