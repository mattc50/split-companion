const carousel = document.querySelector("carousel");

const dragging = (e) => {
  console.log(e.pageX)
}

carousel.addEventListener("onmousemove", dragging);