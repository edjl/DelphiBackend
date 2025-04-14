# Delphi Backend

This repository contains the backend logic and configuration for the Delphi platform. It includes serverless functions, database scripts, and deployment instructions using Cloudflare's developer tools.

---

## 🛠 Requirements

- Cloudflare Wrangler CLI  
  Install it using:

```bash
npm install -g wrangler
```

---

## 🔐 Authenticate with Cloudflare

Before deploying or making changes, log in to your Cloudflare account:

```bash
wrangler login
```

This command opens a browser window for authentication and sets up access credentials locally.

---

## 🗃️ Publish SQL Changes to Cloudflare D1

To apply schema updates or execute SQL commands on the remote Cloudflare D1 database:

```bash
npx wrangler d1 execute delphi-database --remote --file=<path to sql file>
```

Replace `<path to sql file>` with the path to your `.sql` file.

---

## 🚀 Deploy a Cloudflare Worker

To deploy a Cloudflare Worker (e.g., for API routing or backend logic):

```bash
npx wrangler deploy <path to worker's index.ts>
```

Replace `<path to worker's index.ts>` with the file path of your worker entry point.
