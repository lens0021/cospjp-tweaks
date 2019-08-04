"strict";

const body = document.querySelector("body");
const imageBox = document.querySelector(".image_box");
const imageMask = document.querySelector(".image_mask");
const photoFooter = document.querySelector("#photo_footer");
const closeButton = document.createElement("button");

const toggleImageBox = () => {
  imageBox.style.visibility =
    imageBox.style.visibility == "hidden" ? "visible" : "hidden";
};

document.onkeydown = e => {
  e = e || window.event;
  if (
    !"key" in e ||
    (e.key !== "Escape" && e.key !== "Esc" && e.keyCode !== 27)
  ) {
    return;
  }

  toggleImageBox();
};

imageBox.addEventListener("click", e => {
  e.stopPropagation();
  toggleImageBox();
});

body.addEventListener("click", e => {
  e.stopPropagation();
  toggleImageBox();
});

imageMask.addEventListener("click", e => {
  e.stopPropagation();
  imageBox.classList.toggle("magnified");
});

closeButton.classList.add("close-button");
closeButton.innerText = "×";
body.appendChild(closeButton);
closeButton.addEventListener("click", e => {
  e.preventDefault();
  window.close();
});
