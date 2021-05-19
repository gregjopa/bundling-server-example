import {
  hihatClosedSample,
  hihatOpenSample,
  snareSample,
  kickSample,
} from "@bundling-server-example/drum-samples";
import { base64ToArrayBuffer, mixDown } from "./utils";

/*
  8th note tracks:
  - 1 = play
  - 0 = do not play
*/
const defaultTrack = {
  hihatOpen: "10000000",
  snare: "00100010",
  kick: "10001000",
};

export class DrumSequencer {
  constructor(track = defaultTrack) {
    this.track = track;
    this.isPlaying = false;
    this.interval = null;
    this.durationInSeconds = 0.5;
    this.hihatBufferSource = null;
    this.snareBufferSource = null;
    this.kickBufferSource = null;
    this.beatCount = 1;
    this.totalBeats = 8;

    const AudioContextCrossBrowser =
      window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContextCrossBrowser();
    this.gainNode = this.audioContext.createGain();
  }

  async decodeSamples() {
    try {
      const sample = base64ToArrayBuffer(hihatClosedSample.value);
      const decodedAudioData = await this.audioContext.decodeAudioData(sample);
      this.hihatClosedBufferSource = decodedAudioData;
    } catch (err) {
      console.error("failed to decode hihat closed sample");
    }

    if (__HIHAT__) {
      try {
        const sample = base64ToArrayBuffer(hihatOpenSample.value);
        const decodedAudioData = await this.audioContext.decodeAudioData(
          sample
        );
        this.hihatOpenBufferSource = decodedAudioData;
      } catch (err) {
        console.error("failed to decode hihat open sample");
      }
    }

    if (__SNARE__) {
      try {
        const sample = base64ToArrayBuffer(snareSample.value);
        const decodedAudioData = await this.audioContext.decodeAudioData(
          sample
        );
        this.snareBufferSource = decodedAudioData;
      } catch (err) {
        console.error("failed to decode snare sample");
      }
    }

    if (__KICK__) {
      try {
        const sample = base64ToArrayBuffer(kickSample.value);
        const decodedAudioData = await this.audioContext.decodeAudioData(
          sample
        );
        this.kickBufferSource = decodedAudioData;
      } catch (err) {
        console.error("failed to decode kick sample");
      }
    }
  }

  scheduleNextPlay() {
    // console.log('this.audioContext.currentTime', this.audioContext.currentTime);
    if (this.nextPlayTime < this.audioContext.currentTime + 0.5) {
      this.playSample();
      this.nextPlayTime += this.durationInSeconds;

      if (this.beatCount === this.totalBeats) {
        this.beatCount = 1;
      } else {
        this.beatCount = this.beatCount + 1;
      }
    }
  }

  playSample() {
    const bufferList = [];

    const source = this.audioContext.createBufferSource();
    source.buffer = this.snareBufferSource;

    const { hihatOpen, snare, kick } = this.track;
    const beatIndex = this.beatCount - 1;

    // not configurable - the closed hihat plays on every beat
    if (this.hihatClosedBufferSource) {
      bufferList.push(this.hihatClosedBufferSource);
    }

    const shouldPlayHihatOpen = hihatOpen.split("")[beatIndex] === "1";
    if (this.hihatOpenBufferSource && shouldPlayHihatOpen) {
      bufferList.push(this.hihatOpenBufferSource);
    }

    const shouldPlaySnare = snare.split("")[beatIndex] === "1";
    if (this.snareBufferSource && shouldPlaySnare) {
      bufferList.push(this.snareBufferSource);
    }

    const shouldPlayKick = kick.split("")[beatIndex] === "1";
    if (this.kickBufferSource && shouldPlayKick) {
      bufferList.push(this.kickBufferSource);
    }

    const result = mixDown({
      audioContext: this.audioContext,
      bufferList,
    });

    const mix = this.audioContext.createBufferSource();
    mix.buffer = result;

    mix.connect(this.gainNode);
    mix.start(this.nextPlayTime);
  }

  play(volume = 1) {
    if (this.isPlaying) {
      return;
    }

    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);

    this.isPlaying = true;
    this.nextPlayTime = this.audioContext.currentTime;
    this.scheduleNextPlay();
    this.interval = setInterval(this.scheduleNextPlay.bind(this), 100);
  }

  stop() {
    if (this.isPlaying) {
      this.gainNode.gain.linearRampToValueAtTime(
        0,
        this.audioContext.currentTime + 1
      );
      this.isPlaying = false;
      clearInterval(this.interval);
    }
  }
}
