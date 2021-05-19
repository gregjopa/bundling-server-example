# Drum samples

This JavaScript library provides base64 encoded drum samples.

Drum samples downloaded from here: https://www.musicradar.com/news/drums/1000-free-drum-samples

## Installation

```bash
npm install @bundling-server-example/drum-samples
```

## Usage

```js
import { snareSample, kickSample } from "@bundling-server-example/drum-samples";

console.log(snareSample);
/*
  prints the following object:
  {
    name: "CYCdh_K1close_ClHat-01",
    value: "UklGRhTpAgBXQVZFZm10IBA"  <-- a very long base64 encoded string
  }
*/
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
