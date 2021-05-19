# Bundling Server

Node.js web server that uses esbuild to create bundles on the fly.

## Installation

```bash
npm install @bundling-server-example/bundling-server
```

## Usage

```bash
npm install @bundling-server-example/bundling-server
```

## Routes

- /sdk/js - serves up the sdk bundle. Accepts the following query parameters:
  - components - comma separated string of samples (hihat, snare, kick)
  - format - iife or esm
  - debug - boolean flag for toggling minification

## License

[MIT](https://choosealicense.com/licenses/mit/)
