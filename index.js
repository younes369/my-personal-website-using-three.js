/*scrolling function*/
const elements = document.getElementsByClassName("redirect");

for (let i = 0; i < elements.length; i++) {
  let element = elements[i];
  element.parentElement.addEventListener("click", smoothScrolling);
  element.addEventListener("click", smoothScrolling);
  function smoothScrolling(event) {
    event.preventDefault();
    let id = element.attributes.href.value;
    let target = document.querySelector(id);
    let position = target.getBoundingClientRect();
    let positionY = position.top;
    window.scroll({ top: positionY, behavior: "smooth" });
  }
}
/*animation function*/
function animate() {
  let y = document.body.getBoundingClientRect().top;
  let elements = document.getElementsByClassName("animate");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let id = element.id;
    let positionPage = Math.floor(elements[0].getBoundingClientRect().top);

    if (positionPage <= 200 || positionPage < 0) {
      if (id == "left-to-right") {
        element.classList.add("animation3");
      } else if (id == "down-to-up") {
        element.classList.add("animation2");
      }
    }
  }
}
document.addEventListener("scroll", animate);

/*mobile version*/
let state = false;
const arrow = document.getElementsByClassName("arrow");
const button = arrow[0];
const navElements = document.getElementsByClassName("nav-bar");
const navbar = navElements[0];
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    navbar.style.display = "block";
  } else {
    navbar.style.display = "none";
  }
});
button.addEventListener("click", () => {
  if (state == false) {
    button.classList.add("animation4");
    button.classList.remove("animation5");
    navbar.style.display = "block";
    console.log(state);
    state = true;
  } else if (state == true) {
    button.classList.add("animation5");
    button.classList.remove("animation4");
    navbar.style.display = "none";
    console.log(state);
    state = false;
  }
});

const canvas = document.getElementById("canvas");

const texts = [
  "HTML5",
  "Javascript",
  "CSS",
  "Python",
  "MongoDB",
  "React",
  "NodeJS",
  "C++",
  "photoshop",
  "Figma",
  "Adobe XD",
  "three.js",
];
const counts = [1, 2, 4, 5, 4, 2, 1];

const options = {
  tilt: Math.PI / 9,
  initialVelocityX: 0.09,
  initialVelocityY: 0.09,
  initialRotationX: Math.PI * 0.14,
  initialRotationZ: 0,
};

wordSphere(canvas, texts, counts, options);

/**
 * WordSphere
 * Written by Hyojun Kim in 2017. Licensed in MIT.
 */
function wordSphere(canvas, texts, counts, options) {
  const π = Math.PI; // happy math!
  const {
    width = 1000,
    height = 800,
    radius = 350,
    padding = 50,
    fontSize = 30,
    tilt = 0,
    initialVelocityX = 0,
    initialVelocityY = 0,
    initialRotationX = 0,
    initialRotationZ = 0,
  } = options;

  let vx = initialVelocityX,
    vy = initialVelocityY;
  let rx = initialRotationX,
    rz = initialRotationZ;

  // canvas setup
  let ctx = canvas.getContext("2d");
  ctx.textAlign = "center";

  // Hi-DPI support
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(2, 2);

  // scrolling
  let clicked = false,
    lastX,
    lastY;
  canvas.addEventListener("mousedown", (event) => {
    clicked = true;
    lastX = event.screenX;
    lastY = event.screenY;
  });
  canvas.addEventListener("mousemove", (event) => {
    if (!clicked) return;
    [dx, dy] = [event.screenX - lastX, event.screenY - lastY];
    [lastX, lastY] = [event.screenX, event.screenY];

    // rotation update
    rz += -dy * 0.01;
    rx += dx * 0.01;

    // velocity update
    vx = dx * 0.1;
    vy = dy * 0.1;

    if (!looping) startLoop();
  });
  canvas.addEventListener("mouseup", (e) => (clicked = false));
  canvas.addEventListener("mouseleave", (e) => (clicked = false));

  function rot(x, y, t) {
    return [
      x * Math.cos(t) - y * Math.sin(t),
      x * Math.sin(t) + y * Math.cos(t),
    ];
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let ix = 0,
      iz = 0,
      i = 1;
    for (const text of texts) {
      const degZ = (π / (counts.length - 1)) * iz;
      const degX = ((2 * π) / counts[iz]) * ix;

      let x = radius * Math.sin(degZ) * Math.cos(degX);
      let y = radius * Math.sin(degZ) * Math.sin(degX);
      let z = radius * Math.cos(degZ) + 8 * (ix % 2); /* randomness */

      // camera transform
      [y, z] = rot(y, z, tilt);
      [x, z] = rot(x, z, rz);
      [x, y] = rot(x, y, rx);

      // convert to cartesian and then draw.
      const alpha = 0.6 + 0.4 * (x / radius);
      const size = fontSize + 2 + 5 * (x / radius);
      ctx.fillStyle = `rgba(256,256,256,${alpha})`;
      ctx.font = `${size}px "Helvetica Neue", sans-serif`;
      ctx.fillText(text, y + width / 2, -z + height / 2);

      ix--;
      if (ix < 0) {
        iz++;
        ix = counts[iz] - 1;
      }
      i++;
    }
  }

  // renderer
  let looping = false;
  function rendererLoop() {
    if (looping) window.requestAnimationFrame(rendererLoop);
    render();

    // deacceleration - dirty code xD
    if (vx > 0) vx = vx - 0.01;
    if (vy > 0) vy = vy - 0.01;
    if (vx < 0) vx = vx + 0.01;
    if (vy > 0) vy = vy + 0.01;
    if (vx == 0 && vy == 0) stopLoop();

    rz += vy * 0.01;
    rx += vx * 0.01;
  }

  function startLoop() {
    looping = true;
    window.requestAnimationFrame(rendererLoop);
  }

  function stopLoop() {
    looping = false;
  }
  startLoop();
}
