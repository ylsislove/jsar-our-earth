let audioIndex = 0;
let isFirst = true;
export function initGesture(callback) {
  spaceDocument.addEventListener("handtracking", (event) => {
    const { inputData } = event;
    // 右手拳头捏合
    if (inputData.Type === 1 && inputData.Gesture === 1) {
      if (isFirst) {
        isFirst = false;
        callback("start");
        callback("自转");
        audioIndex = 1;
      } else {
        if (audioIndex === 0) {
          callback("自转");
          audioIndex = 1;
        } else {
          callback("公转");
          audioIndex = 0;
        }
      }
    }
  });
  spaceDocument.watchInputEvent();
}
