import { DrumSequencer } from "@bundling-server-example/drum-sequencer";

export function addAdvancedButton(container = document.body) {
  const text = "Play Advanced";
  const sequencer = new DrumSequencer({
    hihatOpen: "11000010",
    snare: "00011000",
    kick: "11010010",
  });
  const buttonElement = document.createElement("button");
  buttonElement.innerHTML = text;

  container.appendChild(buttonElement);

  sequencer.decodeSamples().then(() => {
    buttonElement.onclick = function () {
      if (this.innerHTML === text) {
        sequencer.play();
        this.innerHTML = "Stop";
      } else {
        sequencer.stop();
        this.innerHTML = text;
      }
    };
  });
}
