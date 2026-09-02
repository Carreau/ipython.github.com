import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Base path is only needed when previewing under https://<owner>.github.io/<repo>/.
// Production lives at the root of https://ipython.org.
let base = process.env.BASE_PATH || "";
if (base && !base.startsWith("/")) base = "/" + base;
if (base.endsWith("/") && base !== "/") base = base.slice(0, -1);

const site = process.env.SITE_URL || "https://ipython.org";

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "ignore",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/features": "/learn",
    "/get-started": "/learn",
  },
});
