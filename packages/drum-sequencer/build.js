/*eslint-env node*/

const esbuild = require("esbuild");

async function build() {
  try {
    await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      outfile: "dist/output.js",
      define: {
        __SNARE__: true,
        __KICK__: true,
        __HIHAT__: true,
      },
      minify: true,
      format: "esm",
    });
  } catch (err) {
    console.log("build failed!", err);
  }
}

build().then(() => {
  console.log("build complete!");
});
