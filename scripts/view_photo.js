"strict";

const body = document.querySelector("body");
const imageBox = document.querySelector(".image_box");
const imageMask = document.querySelector(".image_mask");
const imgView = document.querySelector("#imgView");
const photoFooter = document.querySelector("#photo_footer");
const closeButton = document.createElement("a");
const rotateButton = document.createElement("a");

const toggleImageBox = () => {
  imageBox.style.visibility =
    imageBox.style.visibility == "hidden" ? "visible" : "hidden";
};

const mouseMoveToScroll = e => {
  if (!imageBox.classList.contains("magnified")) {
    return;
  }
  const windowW = window.innerWidth;
  const windowH = window.innerHeight;
  imageBox.scroll(
    (e.pageX / windowW) * (imageBox.scrollWidth - windowW),
    (e.pageY / windowH) * (imageBox.scrollHeight - windowH)
  );
};

const adjustMaskSize = () => {
  imageMask.style.width = imgView.width;
  imageMask.style.height = imgView.height;
};

closeButton.classList.add("button", "close-button");
closeButton.innerText = "×";
body.appendChild(closeButton);
closeButton.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  window.close();
});

rotateButton.classList.add("button", "rotate-button");
rotateButton.innerText = "↷";
rotateButton.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  const match = imgView.style.transform.match(/(\d+)deg/);
  const deg = match == null ? 0 : parseInt(match[1]);
  imgView.style.transform = `rotate(${(deg + 90) % 360}deg)`;
  imageMask.style.transform = `rotate(${(deg + 90) % 360}deg)`;
});
imageBox.appendChild(rotateButton);

const originalLink = document.querySelector("#originalLink > .site");
if (originalLink !== null) {
  const moreMagnifyButton = document.createElement("a");
  moreMagnifyButton.classList.add("button", "more-magnify-button");
  moreMagnifyButton.innerText = "⧉";
  moreMagnifyButton.href = originalLink.href;
  imageBox.appendChild(moreMagnifyButton);
}

document.onkeydown = e => {
  e = e || window.event;
  if (
    !"key" in e ||
    (e.key !== "Escape" && e.key !== "Esc" && e.keyCode !== 27)
  ) {
    return;
  }
  e.preventDefault();
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
  mouseMoveToScroll(e);
  adjustMaskSize();
});

document.onmousemove = mouseMoveToScroll;

adjustMaskSize();

if (
  imgView.attributes.width.value == imgView.width &&
  imgView.attributes.height.value == imgView.height
) {
  imageMask.style.cursor = "auto";
}
