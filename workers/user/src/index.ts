import { fromHono } from "chanfana";
import { Hono } from "hono";
import { CreateAccount } from "./endpoints/createAccount"

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints
openapi.post("/api/CreateAccount", CreateAccount)

// Export the Hono app
export default app;
