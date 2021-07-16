const elements = document.getElementsByClassName("redirect");

for (let i = 0; i < elements.length; i++) {
  let element = elements[i];
  element.addEventListener("click", function (event) {
    event.preventDefault();
    let id = element.attributes.href.value;
    let target = document.querySelector(id);
    let position = target.getBoundingClientRect();
    let positionY = position.top;
    window.scroll({ top: positionY, behavior: "smooth" });
  });
}

function animate() {
  let y = document.body.getBoundingClientRect().top;
  let elements = document.getElementsByClassName("animate");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let id = element.id;
    let positionPage = Math.floor(elements[0].getBoundingClientRect().top);
    console.log(id);
    console.log(positionPage);
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
