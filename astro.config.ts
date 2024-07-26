import vercel from "@astrojs/vercel/serverless";
import tutorialkit from "@tutorialkit/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	integrations: [tutorialkit()],
	output: "server",
	adapter: vercel(),
});
