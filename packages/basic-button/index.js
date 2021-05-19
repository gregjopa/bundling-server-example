import { DrumSequencer } from "@bundling-server-example/drum-sequencer";

export function addBasicButton(container = document.body) {
  const text = "Play Basic";
  const sequencer = new DrumSequencer();
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
