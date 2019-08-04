"strict";

const body = document.querySelector("body");
const imageBox = document.querySelector(".image_box");
const imageMask = document.querySelector(".image_mask");
const photoFooter = document.querySelector("#photo_footer");

const toggleImageBox = e => {
  e.stopPropagation();
  imageBox.style.visibility =
    imageBox.style.visibility == "hidden" ? "visible" : "hidden";
};

imageBox.addEventListener("click", toggleImageBox);
body.addEventListener("click", toggleImageBox);

document.querySelector("body").addEventListener("click", e => {});

imageMask.addEventListener("click", e => {
  e.stopPropagation();
  imageBox.classList.toggle("magnified");
});
