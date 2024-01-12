import { getEarthMat, getEarthPlaneMat, getEarthOrbitPlaneMat } from './matManager';
import { playEarthOrbitAudio, playEarthRotationAudio, playBgMusic } from "./audioManager";

// 模型
const scene = spaceDocument.scene as BABYLON.Scene;
const startText = spaceDocument.getNodeById('startText') as BABYLON.Mesh;
const sun = spaceDocument.getNodeById('sun') as BABYLON.Mesh;
const earth = spaceDocument.getNodeById('earth') as BABYLON.Mesh;
const earthAxis = spaceDocument.getNodeById('earthAxis') as BABYLON.Mesh;
const spring = spaceDocument.getNodeById('spring') as BABYLON.Mesh;
const summer = spaceDocument.getNodeById('summer') as BABYLON.Mesh;
const autumn = spaceDocument.getNodeById('autumn') as BABYLON.Mesh;
const winter = spaceDocument.getNodeById('winter') as BABYLON.Mesh;
const ctrlPanel = spaceDocument.getNodeById('ctrlPanel') as BABYLON.Mesh;
const radLineParent = spaceDocument.getNodeById('radLineParent') as BABYLON.Mesh;

// 材质
// const matWhite = spaceDocument.getMaterialById('white');

function clg(params:any) {
  console.log('ylsislove', params);
}

// 10s后隐藏开始提示
// setTimeout(() => {
//   startText.scaling = new BABYLON.Vector3(0, 0, 0);
// }, 10000);

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
let earthRotationSpeed = 1/2.4;
function earthRotationAnim() {
  earth.rotate(new BABYLON.Vector3(0, -1, 0), earthRotationSpeed, BABYLON.Space.LOCAL);
}
let earthRotationTimer = setInterval(earthRotationAnim, 16);

// 设置地球公转动画
function earthOrbitAnim() {
  earthAngle += 1/2.4/365;
  earthX = earth2Sun * Math.cos(earthAngle);
  earthY = earth2Sun * Math.sin(earthAngle);
  earth.position = new BABYLON.Vector3(earthX, 0, earthY);
}
let earthOrbitTimer = setInterval(earthOrbitAnim, 16);

// 设置太阳自转动画
function sunRotationAnim() {
  sun.rotate(new BABYLON.Vector3(0, 0, 1), 1/2.4/25.38, BABYLON.Space.LOCAL);
}
let sunRotationTimer = setInterval(sunRotationAnim, 16);

// 动画设置
scene.registerBeforeRender(function () {
  // 设置地球自转动画
  // earth.rotate(new BABYLON.Vector3(0, -1, 0), 1/24, BABYLON.Space.LOCAL);
  // 设置地球公转动画
  // earthAngle += 1/24/36.5;
  // earthX = earth2Sun * Math.cos(earthAngle);
  // earthY = earth2Sun * Math.sin(earthAngle);
  // earth.position = new BABYLON.Vector3(earthX, 0, earthY);
  // 设置太阳自转动画
  // sun.rotate(new BABYLON.Vector3(0, 0, 1), 1/24/25.38, BABYLON.Space.LOCAL);
});

let radLineAngle = 66.5;    // 弧线总度数
let radLineRadius = 11.5;     // 地心到圆弧的半径
function createRadLineAndText(radLineCount: number) {
  const radLineAnglePer = radLineAngle / (radLineCount - 1);
  const radLineRadPer = radLineAnglePer * Math.PI / 180;
  for (let i = 0; i < radLineCount; i++)
  {
      // 创建一个圆柱体
      const radLine = BABYLON.MeshBuilder.CreateCylinder("angleObj", {
        height: 0.5, 
        diameter: 0.1,
      }, scene);
      // 设置材质为白色
      // radLine.material = new BABYLON.StandardMaterial(matWhite, scene);
      radLine.setParent(radLineParent);
      // 设置弧线的位置
      const x = radLineRadius * Math.cos(radLineRadPer * i);
      const y = radLineRadius * Math.sin(radLineRadPer * i);
      radLine.position = new BABYLON.Vector3(x, y, 0);
      // 设置弧线绕z轴旋转的角度
      radLine.rotation = new BABYLON.Vector3(0, 0, radLineRadPer * i);
  }
  radLineParent.rotate(new BABYLON.Vector3(0, 1, 0), (Math.PI), BABYLON.Space.LOCAL);
  // 公转模式下隐藏
  radLineParent.scaling = new BABYLON.Vector3(0, 0, 0);
}
createRadLineAndText(15);

// 切换自转演示模式
const framePerSecond = 30;
const totalFrame = 60;
function switchEarthRotationDemo() {
  clearInterval(sunRotationTimer);                  // 停止太阳自转动画
  clearInterval(earthOrbitTimer);                   // 停止地球公转动画
  sun.scaling = new BABYLON.Vector3(0, 0, 0);       // 隐藏太阳
  spring.scaling = new BABYLON.Vector3(0, 0, 0);    // 隐藏春天
  summer.scaling = new BABYLON.Vector3(0, 0, 0);    // 隐藏夏天
  autumn.scaling = new BABYLON.Vector3(0, 0, 0);    // 隐藏秋天
  winter.scaling = new BABYLON.Vector3(0, 0, 0);    // 隐藏冬天
  earthRotationSpeed = 1/24/4;          // 自转速度设为慢
  // 设置地球位置
  earthX = earth2Sun * Math.cos(Math.PI / 2);
  earthY = earth2Sun * Math.sin(Math.PI / 2);
  BABYLON.Animation.CreateAndStartAnimation(
    'animSwitchEarthRotationDemoPosition', 
    earth, 'position', framePerSecond, totalFrame,
    earth.position,
    new BABYLON.Vector3(earthX, 0, earthY),
    0
  );
  // 地球放大一倍
  BABYLON.Animation.CreateAndStartAnimation(
    'animSwitchEarthRotationDemoScaling', 
    earth, 'scaling', framePerSecond, totalFrame,
    earth.scaling,
    new BABYLON.Vector3(3, 3, 3),
    0, null, () => {
      radLineParent.scaling = new BABYLON.Vector3(1, 1, 1);   // 显示弧线
    }
  );
  // 地轴拉长
  earthAxis.scaling = new BABYLON.Vector3(1, 1.15, 1);
  // 设置控制面板位置
  BABYLON.Animation.CreateAndStartAnimation(
    'animSwitchEarthRotationDemoCtrlPanelPosition', 
    ctrlPanel, 'position', framePerSecond, totalFrame,
    ctrlPanel.position,
    new BABYLON.Vector3(30, 0, 20),
    0
  );
}
// switchEarthRotationDemo();

// 切换为公转演示模式
function switchEarthOrbitDemo() {
  radLineParent.scaling = new BABYLON.Vector3(0, 0, 0); // 隐藏弧线
  // 设置地球位置
  earthX = earth2Sun * Math.cos(earthAngle);
  earthY = earth2Sun * Math.sin(earthAngle);
  BABYLON.Animation.CreateAndStartAnimation(
    'animSwitchEarthOrbitDemoPosition', 
    earth, 'position', framePerSecond, totalFrame,
    earth.position,
    new BABYLON.Vector3(earthX, 0, earthY),
    0
  );
  // 地球恢复原始大小
  BABYLON.Animation.CreateAndStartAnimation(
    'animSwitchEarthOrbitDemoScaling', 
    earth, 'scaling', framePerSecond, totalFrame,
    earth.scaling,
    new BABYLON.Vector3(1, 1, 1),
    0, null, () => {
      sun.scaling = new BABYLON.Vector3(1, 1, 1);           // 显示太阳
      sunRotationTimer = setInterval(sunRotationAnim, 16);  // 开始太阳自转动画
      earthOrbitTimer = setInterval(earthOrbitAnim, 16);    // 开始地球公转动画
      spring.scaling = new BABYLON.Vector3(1, 1, 1);    // 显示春天
      summer.scaling = new BABYLON.Vector3(1, 1, 1);    // 显示夏天
      autumn.scaling = new BABYLON.Vector3(1, 1, 1);    // 显示秋天
      winter.scaling = new BABYLON.Vector3(1, 1, 1);    // 显示冬天
      earthRotationSpeed = 1/2.4;          // 自转速度设为快
    }
  );
  // 地轴恢复原始大小
  earthAxis.scaling = new BABYLON.Vector3(1, 1, 1);
  // 设置控制面板位置
  BABYLON.Animation.CreateAndStartAnimation(
    'animSwitchEarthOrbitDemoCtrlPanelPosition', 
    ctrlPanel, 'position', framePerSecond, totalFrame,
    ctrlPanel.position,
    new BABYLON.Vector3(48, 0, 0),
    0
  );
}

// 控制面板监听事件处理函数
let isEarthOrbitMode = true;
let isEarthRotationMode = false;
export function ctrlPanelListener(params: any) {
  switch (params) {
    case 'start':
      playBgMusic();
      // 隐藏开始提示
      startText.scaling = new BABYLON.Vector3(0, 0, 0);
      break;
    case '公转':
      if (!isEarthOrbitMode) {
        switchEarthOrbitDemo();
        isEarthOrbitMode = true;
        isEarthRotationMode = false;
      }
      playEarthOrbitAudio();
      break;
    case '自转':
      if (!isEarthRotationMode) {
        switchEarthRotationDemo();
        isEarthRotationMode = true;
        isEarthOrbitMode = false;
      }
      playEarthRotationAudio();
      break;
    default:
      break;
  }
}
