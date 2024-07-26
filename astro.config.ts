import tutorialkit from "@tutorialkit/astro";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [tutorialkit()],
  output: "server",
  adapter: vercel()
});