const elements = document.getElementsByClassName("scroll");
console.log(elements[0]);
console.log(elements);

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
