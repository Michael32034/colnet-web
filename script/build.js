let esbuild = require("esbuild");

let config = {
	entryPoints: ["src/index.ts"],
	bundle: true,
	outfile: "www/js/bundle.js",
	minify: true,
	platform: "browser",
};

if (Object.hasOwn(process.env, "DEBUG")) {
	config["sourcemap"] = true;
}

esbuild.build(config).catch(() => process.exit(1));
