import { fromHono } from "chanfana";
import { Hono } from "hono";
import { ChangeProfitMultiplier } from "./endpoints/changeProfitMultiplier";
import { CreateAccount } from "./endpoints/createAccount";
import { Login } from "./endpoints/login";
import { GetProfileDetails } from "./endpoints/getProfileDetails";

// Start a Hono app
const app = new Hono();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints with correct methods and paths
openapi.post("/api/ChangeProfitMultiplier", ChangeProfitMultiplier);
openapi.post("/api/CreateAccount", CreateAccount);
openapi.post("/api/Login", Login);
openapi.get("/api/GetProfileDetails/:id", GetProfileDetails);


// Export the Hono app
export default app;
