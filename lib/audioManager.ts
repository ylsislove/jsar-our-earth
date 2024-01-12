let isEarthOrbitAudioPlaying = false;
let isEarthRotationAudioPlaying = false;

const audios = {} as Record<string, HTMLAudioElement>;

async function createAudioPlayer(name: string, type: string) {
  const arrayBuffer = await import(`../audio/${name}`);
  const blob = new Blob([arrayBuffer], { type: type });
  const objectUrl = URL.createObjectURL(blob);
  return new Audio(objectUrl);
}

(async function () {
  audios["earthOrbit"] = await createAudioPlayer("earthOrbit.mp3", "audio/mpeg");
  audios["earthRotation"] = await createAudioPlayer("earthRotation.mp3", "audio/mpeg");
  audios["bgMusic"] = await createAudioPlayer("bgMusic.mp3", "audio/mpeg");
})();

// 播放背景音乐
export function playBgMusic() {
  const bgMusic = audios["bgMusic"];
  if (!bgMusic) return;
  bgMusic.volume = 0.3;
  bgMusic.loop = true;
  bgMusic.play();
}

// 播放公转讲解音频
export function playEarthOrbitAudio() {
  const earthOrbitAudio = audios["earthOrbit"];
  const earthRotationAudio = audios["earthRotation"];
  if (!earthOrbitAudio) return;
  // 停止播放自转音频
  earthRotationAudio.pause();
  earthRotationAudio.currentTime = 0;
  isEarthRotationAudioPlaying = false;
  // 播放公转音频
  if (!isEarthOrbitAudioPlaying) {
    isEarthOrbitAudioPlaying = true;
    earthOrbitAudio.volume = 1.0;
    earthOrbitAudio.play();
  } else {
    earthOrbitAudio.pause();
    isEarthOrbitAudioPlaying = false;
  }
}

// 播放自转讲解音频
export function playEarthRotationAudio() {
  const earthOrbitAudio = audios["earthOrbit"];
  const earthRotationAudio = audios["earthRotation"];
  if (!earthOrbitAudio) return;
  // 停止播放公转音频
  earthOrbitAudio.pause();
  earthOrbitAudio.currentTime = 0;
  isEarthOrbitAudioPlaying = false;
  // 播放自转音频
  if (!isEarthRotationAudioPlaying) {
    isEarthRotationAudioPlaying = true;
    earthRotationAudio.volume = 1.0;
    earthRotationAudio.play();
  } else {
    earthRotationAudio.pause();
    isEarthRotationAudioPlaying = false;
  }
}
