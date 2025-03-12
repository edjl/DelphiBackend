import { Hono } from "hono";
import { fromHono } from "chanfana";
import { ChangeProfitMultiplier } from "./endpoints/changeProfitMultiplier";
import { CreateAccount } from "./endpoints/createAccount";
import { Login } from "./endpoints/login";
import { GetProfileDetails } from "./endpoints/getProfileDetails";
import { DeleteAccount } from "./endpoints/deleteAccount";

// Start a Hono app
const app = new Hono();

// CORS middleware to handle preflight requests and allow multiple localhost origins
app.use('*', async (c, next) => {
  const origin = c.req.header('Origin');

  if (!origin) {
    return next(); // If there's no origin, just proceed to the next middleware
  }

  // Check if the origin is a valid localhost origin (localhost or 127.0.0.1 with any port)
  const allowedOrigins = [
    /^http:\/\/localhost:\d+$/,        // any port on localhost
    /^http:\/\/127.0.0.1:\d+$/,        // any port on 127.0.0.1
  ];

  const isAllowedOrigin = allowedOrigins.some(pattern => pattern.test(origin));

  // Set CORS headers for allowed origins
  if (isAllowedOrigin) {
    c.res.headers.set('Access-Control-Allow-Origin', origin); // Allow the specific origin
    c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  } else {
    c.res.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins, or specify a trusted origin
  }

  // Handle preflight requests (OPTIONS)
  if (c.req.method === 'OPTIONS') {
    // Send a 200 OK response with no body for preflight request
    c.status(200);  // Set status to 200 OK
    return c.text(""); // Send empty response body
  }

  return next(); // Proceed to the next middleware for other HTTP methods
});

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints with correct methods and paths
openapi.post("/api/ChangeProfitMultiplier", ChangeProfitMultiplier);
openapi.post("/api/CreateAccount", CreateAccount);
openapi.post("/api/Login", Login);
openapi.get("/api/GetProfileDetails/:id", GetProfileDetails);
openapi.get("/api/DeleteAccount/:id", DeleteAccount);

// Export the Hono app
export default app;
