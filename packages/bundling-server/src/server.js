const fastify = require("fastify")({ logger: true });
const path = require("path");
const build = require("./build");

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "../public"),
  prefix: "/public/",
  list: true,
});

const cache = {};

fastify.get("/sdk/js", async (request, reply) => {
  let text;

  if (cache[request.url]) {
    text = cache[request.url];
  } else {
    const {
      format = "iife",
      debug = "false",
      components = "hihat,snare,kick",
    } = request.query;
    const componentsArray = components.split(",");

    text = await build({
      define: {
        __SNARE__: String(componentsArray.includes("snare")),
        __KICK__: String(componentsArray.includes("kick")),
        __HIHAT__: String(componentsArray.includes("hihat")),
      },
      minify: debug === "false",
      format,
    });

    cache[request.url] = text;
  }

  reply
    .code(200)
    .header("Content-Type", "application/javascript; charset=utf-8")
    .send(text);
});

fastify.get("/", (request, reply) => {
  reply.redirect("/public/dynamic.html?components=hihat");
});

const start = async () => {
  try {
    await fastify.listen({
      port: process.env.PORT || 3000,
      host: process.env.HOST || "::",
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
