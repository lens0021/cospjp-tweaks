"strict";

//
// Tweak Existing Elements.
//
const body = document.querySelector("body");
const baseLayer = document.querySelector("#baseLayer");

const imageBox = document.querySelector(".image_box");
const imageMask = document.querySelector(".image_mask");
const imgView = document.querySelector("#imgView");
const photoFooter = document.querySelector("#photo_footer");

const imageIsMagnifiable =
  imgView.attributes.width.value != imgView.width ||
  imgView.attributes.height.value != imgView.height;

// Define functions
/**
 * Hide/show the image box.
 */
const toggleImageBox = () => {
  imageBox.style.visibility =
    imageBox.style.visibility == "hidden" ? "visible" : "hidden";
};
/**
 * Scroll large image based on the movement of the user's mouse pointer.
 */
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
/**
 * Always guarantee that size of the image mask equals to image's.
 */
const adjustMaskSize = () => {
  imageMask.style.width = imgView.width;
  imageMask.style.height = imgView.height;
};

// Attach functions
document.onkeydown = e => {
  e = e || window.event;
  if (!"key" in e || e.key !== "Escape") {
    return;
  }
  e.preventDefault();
  toggleImageBox();
};
imageBox.addEventListener("click", e => {
  e.stopPropagation();
  toggleImageBox();
});
baseLayer.addEventListener("click", e => {
  if (e.target !== baseLayer) {
    return;
  }
  e.stopPropagation();
  toggleImageBox();
});
imageMask.addEventListener("click", e => {
  e.stopPropagation();
  if (!imageBox.classList.contains("magnified") && !imageIsMagnifiable) {
    return;
  }
  imageBox.classList.toggle("magnified");
  mouseMoveToScroll(e);
  adjustMaskSize();
});
document.onmousemove = mouseMoveToScroll;

//
// Add new elements
//

const closeButton = document.createElement("a");
const rotateButton = document.createElement("a");

closeButton.classList.add("button", "close-button");
closeButton.innerText = "×";
closeButton.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  window.close();
});
body.appendChild(closeButton);

rotateButton.classList.add("button", "rotate-button");
rotateButton.innerText = "↷";
rotateButton.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  const match = imgView.style.transform.match(/(\d+)deg/);
  const deg = match == null ? 0 : parseInt(match[1]);
  imgView.style.transform = `rotate(${(deg + 90) % 360}deg)`;
  imageMask.style.transform = `rotate(${(deg + 90) % 360}deg)`;

  imgView.classList.toggle("xy-swapped");
  imageMask.classList.toggle("xy-swapped");
  adjustMaskSize();
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

//
// Etc initializing processes
//
imageBox.parentElement.removeChild(imageBox);
body.append(imageBox);

adjustMaskSize();

if (!imageIsMagnifiable) {
  imageMask.style.cursor = "auto";
}
