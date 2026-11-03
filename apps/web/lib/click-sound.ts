/**
 * "Click Soft" by Kenney (CC0, no attribution required), as packaged by
 * soundcn. About 7ms long, so it is inlined instead of fetched.
 */
const CLICK_SOFT =
  "data:audio/mpeg;base64,SUQzBAAAAAAAIlRTU0UAAAAOAAADTGF2ZjYyLjMuMTAwAAAAAAAAAAAAAAD/+1DAAAAAAAAAAAAAAAAAAAAAAABJbmZvAAAADwAAAAIAAAJxAKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr//////////////////////////////////////////////////////////////////wAAAABMYXZjNjIuMTEAAAAAAAAAAAAAAAAkBYYAAAAAAAACcU7MYgYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//tQxAAACghZUlTHgAGDlWufHzAAAVWgJg3EszX3mlF95pSk7enve+GBDEMNMg4R8BLACwAsA7BVjjOhDEMQxWKx5EcJwfB/KBiU8/wI7QH+BHaA/ynv6PB8/LgQEMgD78CHO/oGiAIBAQBAYFAA1hDi4z22DmJ7Et+PSEd1f8Y4PmLI5uDYKAWyCmBlSZJ3gAmD0RBEUDS/HKFzC5iZIr/5FTIvE0Yl3/8ipkXi8Yl0u/xEFQVER7/WCoiCoKiL/4VBURPOqgAQuacbblgZh//7UsQEg8aUBv9cMIAgAAA0gAAABIKqErhFDZUNQ7PRK4S8s8r1HiuGlHuSnenrcW9yvO/PcFflep5XqPKfrO9NTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

let context: AudioContext | null = null;
let buffer: Promise<AudioBuffer> | null = null;

function decode(audio: AudioContext): Promise<AudioBuffer> {
  const base64 = CLICK_SOFT.slice(CLICK_SOFT.indexOf(",") + 1);
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  return audio.decodeAudioData(bytes.buffer);
}

/** Plays the click. Call it from a click or key handler, so audio may start. */
export function playClickSound(volume = 0.3) {
  if (typeof window === "undefined" || !("AudioContext" in window)) {
    return;
  }

  context ??= new AudioContext();
  const audio = context;
  buffer ??= decode(audio);

  Promise.all([audio.resume(), buffer])
    .then(([, decoded]) => {
      const source = audio.createBufferSource();
      const gain = audio.createGain();
      source.buffer = decoded;
      gain.gain.value = volume;
      source.connect(gain).connect(audio.destination);
      source.start();
    })
    .catch(() => {
      // Sound is a flourish: a blocked or failed decode stays silent.
      buffer = null;
    });
}
