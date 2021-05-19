export function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function mixDown({
  audioContext,
  bufferList,
  totalLength = 44100,
  numberOfChannels = 2,
}) {
  //create a buffer using the totalLength and sampleRate of the first buffer node
  let finalMix = audioContext.createBuffer(
    numberOfChannels,
    totalLength,
    bufferList[0].sampleRate
  );

  // first loop for buffer list
  for (let i = 0; i < bufferList.length; i++) {
    // second loop for each channel ie. left and right
    for (let channel = 0; channel < numberOfChannels; channel++) {
      // here we get a reference to the final mix buffer data
      let buffer = finalMix.getChannelData(channel);

      // last is loop for updating/summing the track buffer with the final mix buffer
      for (let j = 0; j < bufferList[i].length; j++) {
        buffer[j] += bufferList[i].getChannelData(channel)[j];
      }
    }
  }

  return finalMix;
}
