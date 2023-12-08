const scene = spaceDocument.scene as BABYLON.Scene;
const animationGroups = scene.animationGroups.filter((ag) => ag.name.endsWith('#model'));

if (animationGroups.length >= 1) {
  animationGroups[0].start(true);
}

