import fs from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { unoCSSConfig } from "@tutorialkit/astro";
import { convertPathToPattern, globSync } from "fast-glob";
import {
	defineConfig,
	presetIcons,
	presetUno,
	transformerDirectives,
} from "unocss";

const iconPaths = globSync("./icons/languages/*.svg");

const customIconCollection = iconPaths.reduce(
	(acc, iconPath) => {
		const collectionName = basename(dirname(iconPath));
		const [iconName] = basename(iconPath).split(".");

		acc[collectionName] ??= {};
		acc[collectionName][iconName] = async () => fs.readFile(iconPath, "utf8");

		return acc;
	},
	{} as Record<string, Record<string, () => Promise<string>>>,
);

// @ts-expect-error - This is a valid UnoCSS config
export default defineConfig({
	...unoCSSConfig,
	content: {
		inline: globSync([
			`${convertPathToPattern(join(require.resolve("@tutorialkit/components-react"), ".."))}/**/*.js`,
			`${convertPathToPattern(join(require.resolve("@tutorialkit/astro"), ".."))}/default/**/*.astro`,
		]).map((filePath) => {
			return () => fs.readFile(filePath, { encoding: "utf8" });
		}),
	},
	transformers: [transformerDirectives()],
	presets: [
		presetUno({
			dark: {
				dark: '[data-theme="dark"]',
			},
		}),
		presetIcons({
			collections: {
				...customIconCollection,
			},
		}),
	],
});
