import { fromHono } from "chanfana";
import { Hono } from "hono";
import { ListLeaders } from "./endpoints/listLeaders";

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
        "https://delphi-oracle.pages.dev",
        /^http:\/\/localhost:\d+$/,  // Allow any port on localhost
        /^http:\/\/127.0.0.1:\d+$/    // Allow any port on 127.0.0.1
    ];

    // Check if the request's origin is allowed
    const isAllowedOrigin = allowedOrigins.some(pattern =>
        typeof pattern === "string" ? pattern === origin : pattern.test(origin)
    );

    if (isAllowedOrigin) {
        c.res.headers.set('Access-Control-Allow-Origin', origin); // Allow the specific origin
        c.res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        c.res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    } else {
        // Optional: Allow all origins or specify some trusted production URLs
        c.res.headers.set('Access-Control-Allow-Origin', '*');
    }

    // Handle preflight requests
    if (c.req.method === 'OPTIONS') {
        return c.json(null, 204); // Empty response for OPTIONS requests
    }

    return next(); // Proceed to the next middleware
});

// Setup OpenAPI registry
const openapi = fromHono(app, {
    docs_url: "/", // URL to access OpenAPI documentation
});

// Register OpenAPI endpoints with correct methods and paths
openapi.get("/api/leaderboard", ListLeaders);

// Export the Hono app
export default app;
