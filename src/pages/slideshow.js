/**
 * Copyright Maxime Bérard 2016
 *
 * @file slideshow-page.js
 * @copyright Maxime Bérard 2016
 * @author Maxime Bérard
 */

import $ from "jquery";
import Hammer from "Hammer";
import Masonry from "masonry";
import { Utils } from "utils/utils";
import { DefaultPage } from "pages/default-page";
import { BootstrapMedia } from "utils/bootstrapMedia";

export class SlideshowPage extends DefaultPage {
    init() {
        super.init();

        this.$image = this.$cont.find(".galerie-image");

        // Slideshow
        this.$slideshow = this.$cont.find(".galerie-slideshow");
        this.$slideshowImage = this.$slideshow.find(".galerie-slideshow-image");
        this.$slideshowImg = this.$slideshowImage.find(
            ".galerie-slideshow-img"
        );
        this.slideshowImageLength = this.$slideshowImage.length;
        this.slideshowImg = [];
        this.slideshowImagesLoaded = 0;
        this.slideshowFirstOpening = true;

        // this.$slideshowCurrentText = this.$slideshow.find('.galerie-slideshow-current');
        this.$slideshowNavItem = this.$slideshow.find(
            ".galerie-slideshow-nav-item"
        );
        this.$slideshowClose = this.$slideshow.find(".galerie-slideshow-close");

        this.slideshowOpened = false;
        this.slideshowIndexActive = null;

        this.viewportSize = Utils.getViewportSize();

        this.hammer = new Hammer(this.$slideshow[0], { preventDefault: false });
    }

    initEvents() {
        super.initEvents();

        this.$image.on("click", this.imageOnClick.bind(this));

        window.addEventListener("keyup", this.windowOnKeyUp.bind(this));
        if (this.slideshowImageLength > 1) {
            // this.router.deviceType == 'mobile'
            this.hammer.on("swipe", this.slideshowOnSwipe.bind(this));
        }
        this.$slideshowNavItem.on(
            "click",
            this.slideshowNavItemOnClick.bind(this)
        );
        this.$slideshowClose.on("click", this.slideshowCloseOnClick.bind(this));
    }

    destroyEvents() {
        super.destroyEvents();

        this.$image.off("click", this.imageOnClick.bind(this));

        window.removeEventListener("keyup", this.windowOnKeyUp.bind(this));
        if (this.slideshowImageLength > 1) {
            // this.router.deviceType == 'mobile'
            this.hammer.off("swipe", this.slideshowOnSwipe.bind(this));
        }
        this.$slideshowNavItem.off(
            "click",
            this.slideshowNavItemOnClick.bind(this)
        );
        this.$slideshowClose.off(
            "click",
            this.slideshowCloseOnClick.bind(this)
        );
    }

    imageOnClick(e) {
        if (BootstrapMedia.isMinSM()) {
            let index = Number(e.currentTarget.getAttribute("data-index"));
            // console.log('img on click : ' + index);
            this.openSlideshow(index);
        }
        e.preventDefault();
    }

    slideshowNavItemOnClick(e) {
        if (!this.slideshowOpened) return;

        if (e.currentTarget.className.indexOf("prev") >= 0) {
            this.switchImage(null, "left");
        } else {
            this.switchImage(null, "right");
        }
        e.preventDefault();
    }

    slideshowCloseOnClick(e) {
        if (!this.slideshowOpened) return;

        this.closeSlideshow();
        e.preventDefault();
    }

    windowOnKeyUp(e) {
        if (!this.slideshowOpened) return;

        switch (e.keyCode) {
            case 27: // esc
                this.closeSlideshow();
                break;
            case 37: // <-
                this.switchImage(null, "left");
                break;
            case 39: // ->
                this.switchImage(null, "right");
                break;
        }
    }

    openSlideshow(index) {
        if (!BootstrapMedia.isMinSM() || this.slideshowOpened) return;

        if (this.slideshowFirstOpening) {
            this.loadImages();
            this.slideshowFirstOpening = false;
        }

        this.$slideshow[0].style.display = "block";

        gsap.fromTo(
            this.$slideshow,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 }
        );
        // y: this.viewportSize.height y:0
        if (index !== this.slideshowIndexActive) {
            Utils.addClass(this.$slideshowImage[index], "active");
            if (this.slideshowIndexActive !== null) {
                Utils.removeClass(
                    this.$slideshowImage[this.slideshowIndexActive],
                    "active"
                );
            }
            // this.$slideshowCurrentText[0].innerHTML = (index + 1);
        }

        this.slideshowOpened = true;
        this.slideshowIndexActive = index;
    }

    closeSlideshow() {
        if (!this.slideshowOpened) return;

        gsap.to(this.$slideshow, { opacity: 1, duration: 0.4 }); // y: this.viewportSize.height

        setTimeout(() => {
            this.$slideshow[0].style.display = "none";
            this.$slideshowImage[this.slideshowIndexActive].removeAttribute(
                "style"
            );
        }, 400);

        this.slideshowSide = null;

        this.slideshowOpened = false;
    }

    loadImages() {
        // console.log('LOAD IMAGES');
        for (
            let indexImage = 0;
            indexImage < this.slideshowImageLength;
            indexImage++
        ) {
            this.slideshowImg[indexImage] = new Image();
            this.slideshowImg[indexImage].onload = this.imageOnLoad.bind(
                this,
                indexImage
            );
            this.slideshowImg[indexImage].src =
                this.$slideshowImg[indexImage].getAttribute("data-src");
            this.slideshowImg[indexImage].loaded = false;
        }
    }

    imageOnLoad(index) {
        if (this.slideshowImg[index].loaded) return;
        // if (this.slideshowImagesLoaded > this.slideshowImageLength) return;

        this.slideshowImg[index].loaded = true;
        this.slideshowImagesLoaded++;
        Utils.addClass(this.$slideshowImage[index], "loaded");
        this.$slideshowImg[index].src = this.slideshowImg[index].src;

        // console.log('image on load : ' + index);
        // console.log(this.$slideshowImg[index]);
        // console.log('images loaded : ' + this.slideshowImagesLoaded + ' / ' + this.slideshowImageLength);
        // console.log('---');
    }

    slideshowOnSwipe(e) {
        let dir = e.direction; // 2:left - 4:right - 8:up - 16:down
        if (dir == 2) this.switchImage(null, "right");
        else if (dir == 4) this.switchImage(null, "left");

        e.preventDefault();
    }

    switchImage(index, dir) {
        if (
            index === this.slideshowIndexActive ||
            !this.slideshowOpened ||
            this.switchActive
        )
            return;

        let futureIndex,
            oldIndex = this.slideshowIndexActive;

        this.switchActive = true;

        if (index !== null) futureIndex = index;
        else {
            if (dir == "left")
                futureIndex =
                    oldIndex > 0 ? oldIndex - 1 : this.slideshowImageLength - 1;
            else if (dir == "right")
                futureIndex =
                    oldIndex < this.slideshowImageLength - 1 ? oldIndex + 1 : 0;
        }

        let oldXTo = this.viewportSize.width;
        if (dir == "right") oldXTo *= -1;
        let futureXFrom = -oldXTo;

        // console.log('> Switch item : ' + dir);
        // console.log('current index : ' + oldIndex);
        // console.log('future index  : ' + futureIndex);
        // console.log('-------------');

        gsap.set(this.$slideshowImage[futureIndex], { x: 0 });
        Utils.addClass(this.$slideshowImage[futureIndex], "future");
        Utils.addClass(this.$slideshowImage[futureIndex], "active");

        gsap.to(this.$slideshowImage[oldIndex], { x: oldXTo, duration: 0.8 });
        gsap.fromTo(
            this.$slideshowImage[futureIndex],
            { x: futureXFrom },
            { x: 0, duration: 0.8 }
        );

        // this.$slideshowCurrentText[0].innerHTML = (futureIndex + 1);

        setTimeout(() => {
            Utils.removeClass(this.$slideshowImage[oldIndex], "active");
            Utils.removeClass(this.$slideshowImage[futureIndex], "future");
            this.$slideshowImage[oldIndex].removeAttribute("style");
            this.slideshowIndexActive = futureIndex;
            this.switchActive = false;
        }, 850);
    }

    onResize(e) {
        super.onResize(e);

        this.viewportSize = Utils.getViewportSize();
    }
}
