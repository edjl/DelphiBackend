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

// CORS Middleware: Handle preflight (OPTIONS) requests and add necessary headers
app.use('*', async (ctx, next) => {
  const origin = ctx.req.header('Origin') || '*';  // Allow requests from any origin by default
  const allowedMethods = 'GET, POST, OPTIONS';
  const allowedHeaders = 'Content-Type, Authorization';
  
  // Handle preflight (OPTIONS) requests
  if (ctx.req.method === 'OPTIONS') {
    // Create a new Response with status and headers set
    const response = new Response(null, {
      status: 200, // Make sure to return a 200 OK status for OPTIONS requests
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': allowedMethods,
        'Access-Control-Allow-Headers': allowedHeaders,
        'Access-Control-Max-Age': '86400', // Cache preflight response for 24 hours
      },
    });
    return response;
  }

  // Add CORS headers for non-preflight requests
  ctx.res.headers.set('Access-Control-Allow-Origin', origin);
  ctx.res.headers.set('Access-Control-Allow-Methods', allowedMethods);
  ctx.res.headers.set('Access-Control-Allow-Headers', allowedHeaders);

  // Proceed to the next middleware/handler
  await next();
});

// Export the Hono app
export default app;
