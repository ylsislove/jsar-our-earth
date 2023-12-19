import { getEarthMat, getEarthPlaneMat, getEarthOrbitPlaneMat } from './matManager';
const scene = spaceDocument.scene as BABYLON.Scene;
const sun = scene.getNodeById('model') as BABYLON.Mesh;
const earth = scene.getNodeById('earth') as BABYLON.Mesh;

function clg(params:any) {
  console.log('ylsislove', params);
}

// // 定义地球距太阳的距离
// const earth2Sun = 30;
// let earthAngle = 0;
// let earthX = earth2Sun * Math.cos(earthAngle);
// let earthY = earth2Sun * Math.sin(earthAngle);

// // 创建地球
// const earth = BABYLON.MeshBuilder.CreateSphere('earth', {
//   diameter: 6,
// }, scene);

// // 创建地轴
// const earthAxis = BABYLON.MeshBuilder.CreateCylinder('earthAxis', {
//   height: 8,
//   diameter: 0.2,
//   tessellation: 64
// }, scene);
// earthAxis.setParent(earth);

// // 创建地球赤道平面
// const earthPlane = BABYLON.MeshBuilder.CreateDisc("earthPlane", {
//   radius: 6,
//   tessellation: 64,
//   sideOrientation: BABYLON.Mesh.DOUBLESIDE
// }, scene);
// earthPlane.setParent(earth);

// // 创建地球公转轨道平面
// const earthOrbitPlane = BABYLON.MeshBuilder.CreateDisc("earthOrbitPlane", {
//   radius: earth2Sun,
//   tessellation: 64,
//   sideOrientation: BABYLON.Mesh.DOUBLESIDE
// }, scene);
// earth.setParent(earthOrbitPlane);

// 设置材质
getEarthMat().then(mat => earth.material = mat);
// getEarthPlaneMat().then(mat => earthPlane.material = mat);
// getEarthOrbitPlaneMat().then(mat => earthOrbitPlane.material = mat);

// // 设置位置
// earthOrbitPlane.rotate(new BABYLON.Vector3(1, 0, 0), (90/180*Math.PI), BABYLON.Space.LOCAL);
// earth.position = new BABYLON.Vector3(earthX, earthY, 0);
// earth.rotate(new BABYLON.Vector3(1, 0, 0), -(90/180*Math.PI), BABYLON.Space.LOCAL);
// earth.rotate(new BABYLON.Vector3(0, 0, 1), (23.5/180*Math.PI), BABYLON.Space.LOCAL);
// earthPlane.rotate(new BABYLON.Vector3(1, 0, 0), (90/180*Math.PI), BABYLON.Space.LOCAL);

// sun.rotate(new BABYLON.Vector3(1, 0, 0), -(90/180*Math.PI), BABYLON.Space.LOCAL);



// // 动画设置
// scene.registerBeforeRender(function () {
//   earthAngle += 1/24/365;
//   earthX = earth2Sun * Math.cos(earthAngle);
//   earthY = earth2Sun * Math.sin(earthAngle);
//   // 地球自转
//   earth.rotate(new BABYLON.Vector3(0, -1, 0), 1/24, BABYLON.Space.LOCAL);
//   // 地球公转
//   earth.position = new BABYLON.Vector3(earthX, earthY, 0);
//   // earth.rotateAround(sun.position, new BABYLON.Vector3(0, 0, 1), 1/24/10);
//   // earth.rotate(new BABYLON.Vector3(0, 1, 0), 1/24/10, BABYLON.Space.WORLD);
//   // 太阳自转
//   sun.rotate(new BABYLON.Vector3(0, 0, -1), 1/24/25.38, BABYLON.Space.LOCAL);
// })

// const earthRotationAnimation = new BABYLON.Animation(
//   'earthRotation',
//   'rotation',
//   60,
//   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
//   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
// );
// const keyFrames = []; 
// keyFrames.push({
//   frame: 0,
//   value: earth.rotation
// });
// keyFrames.push({
//   frame: 60,
//   value: earth.rotation.add(new BABYLON.Vector3(0, 2*Math.PI, 0))
// });
// earthRotationAnimation.setKeys(keyFrames);
// earth.animations.push(earthRotationAnimation);
// scene.beginAnimation(earth, 0, 60, true, 0.25);
