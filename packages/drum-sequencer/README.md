# Drum Sequencer

This JavaScript library provides a basic drum sequencer.

## Installation

```bash
npm install @bundling-server-example/drum-sequencer
```

## Usage

```js
import { DrumSequencer } from "@bundling-server-example/drum-sequencer";

/*
  8th note tracks:
  - 1 = play
  - 0 = do not play
*/
const sequencer = new DrumSequencer({
  hihatOpen: "10000000",
  snare: "00100010",
  kick: "10001000",
});
sequencer.decodeSamples().then(() => {
  // ready for use with sequencer.play()
});
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
