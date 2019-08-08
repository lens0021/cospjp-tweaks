"strict";

class ViewPhotoTweak {
  constructor() {
    this.body = document.querySelector("body");
    this.baseLayer = document.querySelector("#baseLayer");
    this.imageBox = document.querySelector(".image_box");
    this.imageMask = document.querySelector(".image_mask");
    this.imgView = document.querySelector("#imgView");
  }

  /**
   * Tweak.
   */
  tweak() {
    // Attach functions to existing Elements
    document.addEventListener("keydown", e => {
      if (!"key" in e || e.key !== "Escape") {
        return;
      }
      e.preventDefault();
      this._toggleImageBox();
    });
    this.imageBox.addEventListener("click", e => {
      e.stopPropagation();
      this._toggleImageBox();
    });
    this.baseLayer.addEventListener("click", e => {
      if (e.target !== this.baseLayer) {
        return;
      }
      e.stopPropagation();
      this._toggleImageBox();
    });

    this.imageMask.addEventListener("click", e => {
      e.stopPropagation();
      if (
        this._isImageMagnifiable() &&
        !this.imageBox.classList.contains("magnified")
      ) {
        this._magnifyImage();
        this._mouseMoveToScroll(e);
      } else {
        this._minimiseImage();
      }
    });

    document.addEventListener("mousemove", this._mouseMoveToScroll.bind(this));

    // Add new elements
    this.closeButton = this._createButton({
      class: "close-button",
      innerText: "×",
      eventListener: e => {
        e.stopPropagation();
        window.close();
      },
      parent: this.body
    });
    this.rotateButton = this._createButton({
      class: "rotate-button",
      innerText: "↷",
      eventListener: e => {
        e.stopPropagation();
        const match = this.imgView.style.transform.match(/(\d+)deg/);
        const deg = match != null ? parseInt(match[1]) : 0;
        const newDeg = (deg + 90) % 360;
        this.imgView.style.transform = `rotate(${newDeg}deg)`;
        this.imageMask.style.transform = `rotate(${newDeg}deg)`;

        this.imageBox.classList.toggle("xy-swapped");
        this._adjustMaskSize();
        this.imageMask.style.cursor = this._isImageMagnifiable()
          ? "pointer"
          : "auto";
      },
      parent: this.imageBox
    });
    const originalLink = document.querySelector("#originalLink > .site");
    if (originalLink !== null) {
      this._createButton({
        class: "more-magnify-button",
        innerText: "⧉",
        href: originalLink.href,
        parent: this.imageBox
      });
    }

    // Other initializing processes
    this.imageBox.parentElement.removeChild(this.imageBox);
    this.body.append(this.imageBox);

    this._adjustMaskSize();

    if (!this._isImageMagnifiable()) {
      this.imageMask.style.cursor = "auto";
    }
  }

  /**
   * Hide/show the image box.
   */
  _toggleImageBox() {
    this.imageBox.style.visibility =
      this.imageBox.style.visibility == "hidden" ? "visible" : "hidden";
  }

  /**
   * Scroll large image based on the movement of the user's mouse pointer.
   */
  _mouseMoveToScroll(e) {
    if (!this.imageBox.classList.contains("magnified")) {
      return;
    }
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    this.imageBox.scroll(
      (e.pageX / windowW) * (this.imageBox.scrollWidth - windowW),
      (e.pageY / windowH) * (this.imageBox.scrollHeight - windowH)
    );
  }

  _magnifyImage() {
    this.imageBox.classList.add("magnified");
    const swapped = this.imageBox.classList.contains("xy-swapped");
    const high = !swapped
      ? this.imgView.scrollHeight > window.innerHeight
      : this.imgView.scrollWidth > window.innerHeight;
    const wide = !swapped
      ? this.imgView.scrollWidth > window.innerWidth
      : this.imgView.scrollHeight > window.innerWidth;
    if (high) {
      this.imageBox.classList.add("high");
    }
    if (wide) {
      this.imageBox.classList.add("wide");
    }

    if (this.imageBox.classList.contains("xy-swapped")) {
      var margin = (this.imgView.scrollWidth - this.imgView.scrollHeight) / 2;
      const marginV = high
        ? `${margin}px`
        : (window.innerHeight - this.imgView.height) / 2;
      const marginH = wide
        ? `${-margin}px`
        : (window.innerWidth - this.imgView.width) / 2;
      margin = `${marginV} ${marginH}`;

      this.imgView.style.margin = margin;
      this.imageMask.style.margin = margin;
    }

    this._adjustMaskSize();
  }

  _minimiseImage() {
    this.imageBox.classList.remove("magnified", "high", "wide");
    this.imgView.style.margin = null;
    this.imageMask.style.margin = null;
    this._adjustMaskSize();
  }

  /**
   * Always guarantee that size of the image mask equals to image's.
   */
  _adjustMaskSize() {
    this.imageMask.style.width = this.imgView.width;
    this.imageMask.style.height = this.imgView.height;
  }

  _createButton(options) {
    const element = document.createElement("a");
    element.classList.add("button", options.class);
    element.innerText = options.innerText;
    if (options.eventListener) {
      element.addEventListener("click", options.eventListener);
    }
    if (options.href) {
      element.href = options.href;
    }
    options.parent.appendChild(element);

    return element;
  }

  _isImageMagnifiable() {
    return !this.imageBox.classList.contains("xy-swapped")
      ? this.imgView.attributes.height.value != this.imgView.height ||
          this.imgView.attributes.width.value != this.imgView.width
      : this.imgView.attributes.height.value != this.imgView.width ||
          this.imgView.attributes.width.value != this.imgView.height;
  }
}

new ViewPhotoTweak().tweak();
