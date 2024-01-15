let isEarthOrbitAudioPlaying = false;
let isEarthRotationAudioPlaying = false;

// const audios = {} as Record<string, HTMLAudioElement>;
const audios = {} as Record<string, (volume?: number, loop?: boolean) => void>;

async function createAudioPlayer(name: string, type: string) {
  const arrayBuffer = await import(`../audio/${name}`);
  const blob = new Blob([arrayBuffer], { type: type });
  const objectUrl = URL.createObjectURL(blob);
  // return new Audio(objectUrl);
  return (volume?: number, loop?: boolean) => {
    const audio = new Audio(objectUrl);
    if (volume) {
      audio.volume = volume;
    }
    if (loop) {
      audio.loop = loop;
    }
    audio.play();
    return audio;
  };
}

(async function () {
  audios["earthOrbit"] = await createAudioPlayer("earthOrbit.mp3", "audio/mpeg");
  audios["earthRotation"] = await createAudioPlayer("earthRotation.mp3", "audio/mpeg");
  audios["bgMusic"] = await createAudioPlayer("bgMusic.mp3", "audio/mpeg");
})();

// 播放背景音乐
export function playBgMusic() {
  const bgMusicFunc = audios["bgMusic"];
  if (!bgMusicFunc) return;
  const bgMusic = bgMusicFunc(0.2, true);
  // bgMusic.volume = 0.3;
  // bgMusic.loop = true;
  // bgMusic.play();
}

let index = 0
export function playExplainAudio() {
  if (index === 0) {
    playEarthRotationAudio()
  } else {
    playEarthOrbitAudio()
  }
}

function playEarthOrbitAudio() {
  const earthOrbitAudio = audios['earthOrbit'];
  if (earthOrbitAudio && !isEarthOrbitAudioPlaying && !isEarthRotationAudioPlaying) {
    isEarthOrbitAudioPlaying = true;
    earthOrbitAudio(1.0);
    // 58s后停止播放
    setTimeout(() => {
      isEarthOrbitAudioPlaying = false;
      index = 0
    }, 50000);
  }
}

function playEarthRotationAudio() {
  const earthRotationAudio = audios['earthRotation'];
  if (earthRotationAudio && !isEarthRotationAudioPlaying && !isEarthOrbitAudioPlaying) {
    isEarthRotationAudioPlaying = true;
    earthRotationAudio(1.0);
    // 47s后停止播放
    setTimeout(() => {
      isEarthRotationAudioPlaying = false;
      index = 1
    }, 31000);
  }
}

// let earthOrbitAudio;
// let earthRotationAudio;

// // 播放公转讲解音频
// export function playEarthOrbitAudio() {
//   const earthOrbitAudioFunc = audios["earthOrbit"];
//   const earthRotationAudioFunc = audios["earthRotation"];
//   if (!earthOrbitAudioFunc) return;
//   // 停止播放自转音频
//   if (earthRotationAudio) {
//     earthRotationAudio.pause();
//     earthRotationAudio.currentTime = 0;
//     isEarthRotationAudioPlaying = false;
//   }
//   // 播放公转音频
//   if (!isEarthOrbitAudioPlaying) {
//     isEarthOrbitAudioPlaying = true;
//     // earthOrbitAudio.volume = 1.0;
//     // earthOrbitAudio.play();
//     earthOrbitAudio = earthOrbitAudioFunc(1.0, false);
//   } else {
//     earthOrbitAudio.pause();
//     isEarthOrbitAudioPlaying = false;
//   }
// }

// // 播放自转讲解音频
// export function playEarthRotationAudio() {
//   const earthOrbitAudioFunc = audios["earthOrbit"];
//   const earthRotationAudioFunc = audios["earthRotation"];
//   if (!earthOrbitAudioFunc) return;
//   // 停止播放公转音频
//   if (earthOrbitAudio) {
//     earthOrbitAudio.pause();
//     earthOrbitAudio.currentTime = 0;
//     isEarthOrbitAudioPlaying = false;
//   }
//   // 播放自转音频
//   if (!isEarthRotationAudioPlaying) {
//     isEarthRotationAudioPlaying = true;
//     // earthRotationAudio.volume = 1.0;
//     // earthRotationAudio.play();
//     earthRotationAudio = earthRotationAudioFunc(1.0, false);
//   } else {
//     earthRotationAudio.pause();
//     isEarthRotationAudioPlaying = false;
//   }
// }
