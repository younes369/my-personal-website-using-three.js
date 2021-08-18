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
