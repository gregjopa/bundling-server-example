/*eslint-env node*/

const fs = require("fs");

const files = fs.readdirSync("samples");

for (const file of files) {
  if (file.endsWith(".wav")) {
    const name = file.substring(0, file.indexOf(".wav"));

    const base64String = fs.readFileSync(`samples/${file}`).toString("base64");
    const sample = {
      name,
      value: base64String,
    };

    fs.writeFileSync(
      `samples/${name}_base64.js`,
      `export const sample = ${JSON.stringify(sample)}`
    );
  }
}
