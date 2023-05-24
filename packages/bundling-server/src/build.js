const esbuild = require("esbuild");
const path = require("path");

const nodeModulesPath = process.env.NODE_MODULES_PATH || "../../node_modules/";

async function build({ define, minify, format }) {
  let buildOutput;

  try {
    buildOutput = await esbuild.build({
      entryPoints: [
        path.join(
          process.cwd(),
          nodeModulesPath,
          "/@bundling-server-example/sdk-release/index.js"
        ),
      ],
      bundle: true,
      write: false,
      globalName: "drums",
      define,
      minify,
      format,
    });
  } catch (err) {
    console.log("build failed!", err);
  }

  const [{ text }] = buildOutput.outputFiles;
  return text;
}

module.exports = build;
