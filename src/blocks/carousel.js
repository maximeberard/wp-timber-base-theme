/**
 * Copyright Maxime Bérard 2016
 *
 * @file carousel.js
 * @copyright Maxime Bérard 2016
 * @author Maxime Bérard
 */

import $ from "jquery";
import Hammer from "Hammer";
import { Utils } from "utils/utils";
import { DefaultBlock } from "blocks/default-block";
import { BootstrapMedia } from "utils/bootstrapMedia";

export class Carousel extends DefaultBlock {
    init() {
        super.init();

        this.$image = this.$cont.find(".carousel-image");
        this.$img = this.$image.find(".carousel-img");
        this.imageLength = this.$image.length;

        // this.$currentText = this.$cont.find('-current');
        this.$navItem = this.$cont.find(".carousel-nav-item");

        this.indexActive = 0; // null

        this.viewportSize = Utils.getViewportSize();

        this.hammer = new Hammer(this.$cont[0], { preventDefault: false });
    }

    initEvents() {
        super.initEvents();

        // this.$image.on("click", this.imageOnClick.bind(this));
        // window.addEventListener("keyup", this.windowOnKeyUp.bind(this));
        if (this.imageLength > 1) {
            // this.router.deviceType == 'mobile'
            this.hammer.on("swipe", this.contOnSwipe.bind(this));
        }
        this.$navItem.on("click", this.navItemOnClick.bind(this));
    }

    destroyEvents() {
        super.destroyEvents();

        // this.$image.off("click", this.imageOnClick.bind(this));
        // window.removeEventListener("keyup", this.windowOnKeyUp.bind(this));
        if (this.imageLength > 1) {
            // this.router.deviceType == 'mobile'
            this.hammer.off("swipe", this.contOnSwipe.bind(this));
        }
        this.$navItem.off("click", this.navItemOnClick.bind(this));
    }

    navItemOnClick(e) {
        if (e.currentTarget.className.indexOf("active") >= 0) return;

        // Dots
        let index = Number(e.currentTarget.getAttribute("data-index"));
        this.switchImage(index, null);

        // Prev / next
        // if (e.currentTarget.className.indexOf("prev") >= 0) {
        //     this.switchImage(null, "left");
        // } else {
        //     this.switchImage(null, "right");
        // }
        e.preventDefault();
    }

    contOnSwipe(e) {
        let dir = e.direction; // 2:left - 4:right - 8:up - 16:down
        if (dir == 2) this.switchImage(null, "right");
        else if (dir == 4) this.switchImage(null, "left");

        e.preventDefault();
    }

    switchImage(index, dir) {
        if (index === this.indexActive || this.switchActive) return;

        let futureIndex,
            oldIndex = this.indexActive;

        this.switchActive = true;

        if (index !== null) {
            futureIndex = index;
            dir = futureIndex > index ? "right" : "left";
        } else {
            if (dir == "left")
                futureIndex =
                    oldIndex > 0 ? oldIndex - 1 : this.imageLength - 1;
            else if (dir == "right")
                futureIndex =
                    oldIndex < this.imageLength - 1 ? oldIndex + 1 : 0;
        }

        let oldXTo = this.viewportSize.width;
        if (dir == "right") oldXTo *= -1;
        let futureXFrom = -oldXTo;

        console.log("> Switch item : " + dir);
        console.log("current index : " + oldIndex);
        console.log("future index  : " + futureIndex);
        console.log("-------------");

        gsap.set(this.$image[futureIndex], { x: 0 });
        Utils.addClass(this.$image[futureIndex], "future");
        Utils.addClass(this.$image[futureIndex], "active");

        // nav item
        Utils.removeClass(this.$navItem[oldIndex], "active");
        Utils.addClass(this.$navItem[futureIndex], "active");

        gsap.to(this.$image[oldIndex], { x: oldXTo, duration: 0.8 });
        gsap.fromTo(
            this.$image[futureIndex],
            { x: futureXFrom },
            { x: 0, duration: 0.8 }
        );

        // this.$currentText[0].innerHTML = (futureIndex + 1);

        setTimeout(() => {
            Utils.removeClass(this.$image[oldIndex], "active");
            Utils.removeClass(this.$image[futureIndex], "future");
            // this.$image[oldIndex].removeAttribute("style");
            this.indexActive = futureIndex;
            this.switchActive = false;
        }, 850);
    }

    onResize(e) {
        super.onResize(e);

        this.viewportSize = Utils.getViewportSize();
    }
}
