import { getEarthMat, getEarthPlaneMat, getEarthOrbitPlaneMat } from './matManager';
const scene = spaceDocument.scene as BABYLON.Scene;
const sun = spaceDocument.getNodeById('sun') as BABYLON.Mesh;
const earth = spaceDocument.getNodeById('earth') as BABYLON.Mesh;

function clg(params:any) {
  console.log('ylsislove', params);
}

// 定义地球距太阳的距离
const earth2Sun = 30;
let earthAngle = 0;
let earthX = earth2Sun * Math.cos(earthAngle);
let earthY = earth2Sun * Math.sin(earthAngle);

// 创建地球赤道平面
const earthPlane = BABYLON.MeshBuilder.CreateDisc("earthPlane", {
  radius: 6,
  tessellation: 64,
  sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);
earthPlane.setParent(earth);
earthPlane.position = new BABYLON.Vector3(0, 0, 0);
earthPlane.rotation = new BABYLON.Vector3(0, 0, 0);
earthPlane.rotate(new BABYLON.Vector3(1, 0, 0), (90/180*Math.PI), BABYLON.Space.LOCAL);

// 创建地球公转轨道平面
const earthOrbitPlane = BABYLON.MeshBuilder.CreateDisc("earthOrbitPlane", {
  radius: earth2Sun,
  tessellation: 64,
  sideOrientation: BABYLON.Mesh.DOUBLESIDE
}, scene);
// earthOrbitPlane.setParent(sun);
earthOrbitPlane.position = new BABYLON.Vector3(0, 0, 0);
earthOrbitPlane.rotation = new BABYLON.Vector3(0, 0, 0);
earthOrbitPlane.rotate(new BABYLON.Vector3(1, 0, 0), (90/180*Math.PI), BABYLON.Space.LOCAL);

// 设置材质
getEarthMat().then(mat => earth.material = mat);
getEarthPlaneMat().then(mat => earthPlane.material = mat);
getEarthOrbitPlaneMat().then(mat => earthOrbitPlane.material = mat);

// 设置地球自转动画
// function earthRotationAnim() {
//   earth.rotate(new BABYLON.Vector3(0, -1, 0), 1/24, BABYLON.Space.LOCAL);
// }
// const earthRotationTimer = setInterval(earthRotationAnim, 1);

// 设置地球公转动画
// function earthOrbitAnim() {
//   earthAngle += 1/24/365;
//   earthX = earth2Sun * Math.cos(earthAngle);
//   earthY = earth2Sun * Math.sin(earthAngle);
//   earth.position = new BABYLON.Vector3(earthX, 0, earthY);
// }
// const earthOrbitTimer = setInterval(earthOrbitAnim, 1);

// 设置太阳自转动画
// const sunRotationTimer = setInterval(() => {
//   sun.rotate(new BABYLON.Vector3(0, 0, 1), 1/24/25.38, BABYLON.Space.LOCAL);
// }, 1);

// 动画设置
scene.registerBeforeRender(function () {
  // 设置地球自转动画
  earth.rotate(new BABYLON.Vector3(0, -1, 0), 1/24, BABYLON.Space.LOCAL);
  // 设置地球公转动画
  earthAngle += 1/24/36.5;
  earthX = earth2Sun * Math.cos(earthAngle);
  earthY = earth2Sun * Math.sin(earthAngle);
  earth.position = new BABYLON.Vector3(earthX, 0, earthY);
  // 设置太阳自转动画
  sun.rotate(new BABYLON.Vector3(0, 0, 1), 1/24/25.38, BABYLON.Space.LOCAL);
});

async function createAudioPlayer(name: string) {
  const arrayBuffer = await import(`../audio/${name}`);
  const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
  const objectUrl = URL.createObjectURL(blob);
  return (volume?: number) => {
    const audio = new Audio(objectUrl);
    if (volume) {
      audio.volume = volume;
    }
    audio.play();
  };
}

const audios = {} as Record<string, (volume?: number) => void>;
(async function() {
  audios['earthOrbit'] = await createAudioPlayer('earthOrbit.wav');
  audios['earthRotation'] = await createAudioPlayer('earthRotation.wav');
})();

// 控制面板监听事件处理函数
let isEarthOrbitAudioPlaying = false;
let isEarthRotationAudioPlaying = false;
export function ctrlPanelListener(params: any) {
  switch (params) {
    case '公转语音讲解':
      playEarthOrbitAudio()
      break;
    case '试试右手握拳':
      playEarthRotationAudio()
      break;
    default:
      break;
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
    }, 31000);
  }
}

let audioIndex = 0;
spaceDocument.addEventListener('handtracking', (event) => {
  const { inputData } = event;
  // 右手拳头捏合
  if (inputData.Type === 1 && inputData.Gesture === 1) {
    if (audioIndex === 0) {
      playEarthOrbitAudio()
      audioIndex = 1
    } else {
      playEarthRotationAudio()
      audioIndex = 0
    }
  }
});
