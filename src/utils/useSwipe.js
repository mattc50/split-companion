// let touchArea = document.getElementById("touch-area");
// let output = document.getElementById("output");

// initial mouse X and Y positions are 0
let mouseX, initialX = 0;
let mouseY, initialY = 0;

// events for touch and mouse
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup"
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend"
  }
}

let deviceType = "";

//detect touch device
const isTouchDevice = () => {
  try {
    // try to create TouchEvent (it would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (err) {
    deviceType = "mouse";
    return false;
  }
}

const useSwipe = (id) => {
  console.log(id)
  let touchArea = document.getElementById(id);
  let rectLeft = touchArea.getBoundingClientRect().left;
  let rectTop = touchArea.getBoundingClientRect().top;
  console.log(rectLeft, rectTop)
  // let output = document.getElementById("output");
}

// get left and top of touch area

export { useSwipe }
