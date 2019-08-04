"strict";

const body = document.querySelector("body");
const imageBox = document.querySelector(".image_box");
const photoFooter = document.querySelector("#photo_footer");

const toggleImageBox = e => {
  e.stopPropagation();
  imageBox.style.visibility =
    imageBox.style.visibility == "hidden" ? "visible" : "hidden";
  console.log("visibility: ", imageBox.style.visibility);
};

imageBox.addEventListener("click", toggleImageBox);
body.addEventListener("click", toggleImageBox);

document.querySelector("body").addEventListener("click", e => {
  console.log("test");
});
