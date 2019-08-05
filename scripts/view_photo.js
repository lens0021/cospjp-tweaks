"strict";

const body = document.querySelector("body");
const imageBox = document.querySelector(".image_box");
const imageMask = document.querySelector(".image_mask");
const imgView = document.querySelector("#imgView");
const photoFooter = document.querySelector("#photo_footer");
const closeButton = document.createElement("button");

const toggleImageBox = () => {
  imageBox.style.visibility =
    imageBox.style.visibility == "hidden" ? "visible" : "hidden";
};

const moveToScroll = e => {
  if (!imageBox.classList.contains("magnified")) {
    return;
  }
  const windowW = window.innerWidth;
  const windowH = window.innerHeight;
  imageBox.scroll(
    (e.pageX / window.innerWidth) * (imageBox.scrollWidth - windowW),
    (e.pageY / window.innerHeight) * (imageBox.scrollHeight - windowH)
  );
};

const adjustMaskSize = () => {
  imageMask.style.width = imgView.width;
  imageMask.style.height = imgView.height;
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
  if (
    !imageBox.classList.contains("magnified") &&
    imgView.attributes.width.value == imgView.width &&
    imgView.attributes.height.value == imgView.height
  ) {
    return;
  }
  imageBox.classList.toggle("magnified");
  moveToScroll(e);
  adjustMaskSize();
});

closeButton.classList.add("close-button");
closeButton.innerText = "×";
body.appendChild(closeButton);
closeButton.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  window.close();
});

document.onmousemove = moveToScroll;

adjustMaskSize();
