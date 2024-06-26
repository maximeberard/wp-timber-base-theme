/**
 * Copyright Maxime Bérard 2016
 *
 * @file horizontal-scroll.js
 * @copyright Maxime Bérard 2016
 * @author Maxime Bérard
 */

import $ from "jquery";
import actual from "actual";
import { Utils } from "utils/utils";
import { BootstrapMedia } from "utils/bootstrapMedia";
import { DefaultBlock } from "blocks/default-block";

export class HorizontalScroll extends DefaultBlock {
    init() {
        super.init();

        // console.log("👋 --- Horizontal scroll --- 👋");
        // console.log(this.id);

        this.dir = "left"; // this.$cont[0].getAttribute('data-dir');
        this.dirMultiplier = this.dir == "right" ? 1 : -1;

        this.animationDuration = 18; // seconds

        this.enabledXs = true; //(Number(this.$cont[0].getAttribute('data-enabled-xs')) == 1);
        this.enabled = true; //(Number(this.$cont[0].getAttribute('data-enabled')) == 1);
        // console.log('enable xs : '+this.enabledXs);
        // console.log('---');

        this.$inner = this.$cont.find(".horizontal-scroll-inner");
        this.$item = this.$cont.find(".horizontal-scroll-item");
        this.itemHTML = this.$item.length ? this.$item[0].outerHTML : "";

        this.itemWidth = 0;
        this.itemMarginRight = 0;
        this.itemsCount = 1;

        this.bodyWidth = document.body.clientWidth;
        this.contWidth = 0;
        this.windowSize = Utils.getViewportSize();

        this.itemTimeline = null;

        this.firstSetup = true;

        this.onResize();

        // this.bindedOnFrame = this.onFrame.bind(this);
        // this.RAF = null;

        // console.log('dir : '+this.dir);
        // console.log('width : '+this.itemWidth);
        // console.log('DOM : ');
        // console.log(this.itemHTML);
        // console.log('---');
    }

    initEvents() {
        super.initEvents();
        // this.$cont.on("mouseenter", this.contOnEnter.bind(this));
        // this.$cont.on("mouseleave", this.contOnLeave.bind(this));
    }

    destroyEvents() {
        super.destroyEvents();
        // this.$cont.off("mouseenter", this.contOnEnter.bind(this));
        // this.$cont.off("mouseleave", this.contOnLeave.bind(this));
    }

    contOnEnter(e) {
        this.pause();
        e.preventDefault();
    }

    contOnLeave(e) {
        this.play();
        e.preventDefault();
    }

    setInnerDOM(itemsCount) {
        if (itemsCount !== this.itemsCount) {
            let innerHTML = "";

            for (let indexItem = 0; indexItem <= itemsCount - 1; indexItem++) {
                innerHTML += this.itemHTML;
            }

            this.$inner[0].innerHTML = innerHTML;
            this.$item = this.$cont.find(".horizontal-scroll-item");

            this.itemsCount = itemsCount;

            this.$inner[0].style.width =
                (this.itemWidth + this.itemMarginRight) * this.itemsCount +
                5 +
                "px";

            this.setInitialItemsPos();
        }
    }

    setInitialItemsPos() {
        let centerItemIndex = Math.floor(this.itemsCount / 2) - 1,
            // centerItemOffset = (this.itemWidth + this.itemMarginRight) * centerItemIndex,
            // itemCenterPos = (this.windowSize.width / 2) - (this.itemWidth / 2),
            innerXInitial = 10; //- (centerItemOffset - itemCenterPos);

        let lastCenterItemIndex = Math.ceil(this.itemsCount / 2),
            firstLastItemsDiff = lastCenterItemIndex - centerItemIndex,
            innerXFinal =
                innerXInitial -
                firstLastItemsDiff * (this.itemWidth + this.itemMarginRight);

        // console.log("inner X initial : " + innerXInitial);
        // console.log("inner X final : " + innerXFinal);

        this.innerXFrom = this.dir == "left" ? innerXInitial : innerXFinal;
        this.innerXTo = this.dir == "left" ? innerXFinal : innerXInitial;
        this.innerXCurrent = this.innerXFrom;

        this.animationDuration = -innerXFinal / 80;
        // console.log(this.animationDuration);
        // console.log('inner X from : '+this.innerXFrom);

        if (this.firstSetup) {
            // gsap.to(this.$cont, {opacity:1, duration:0.8, });
            this.firstSetup = false;
        }

        // this.initAnimation();
        this.animate();
    }

    // initAnimation () {
    //     console.log('INIT ANIMATION : '+this.id);
    //     this.RAF = requestAnimFrame(this.bindedOnFrame);
    // }

    // stopAnimation () {
    //     console.log('STOP ANIMATION : '+this.id);
    //     if (this.RAF !== null) cancelAnimFrame(this.RAF);
    // }

    // onFrame () {

    //     if (this.innerXCurrent !== this.innerXTo) {
    //         this.innerXCurrent += this.dirMultiplier;
    //     } else{
    //         this.innerXCurrent = this.innerXFrom;
    //     }

    //     gsap.set(this.$inner, {x:this.innerXCurrent});

    //     this.RAF = requestAnimFrame(this.bindedOnFrame);
    // }

    animate() {
        if (this.itemTimeline !== null) this.itemTimeline.kill();

        this.itemTimeline = new TimelineMax({ repeat: -1, repeatDelay: 0 }); // , onComplete:this.onAnimationComplete
        this.itemTimeline.fromTo(
            this.$inner,
            this.animationDuration,
            { x: this.innerXFrom },
            { x: this.innerXTo, ease: Linear.easeNone }
        );
        // this.itemTimeline.pause();
        // gsap.set(this.$inner, {x:this.innerXFrom});
        // gsap.fromTo(this.$inner, {x:this.innerXFrom}, {x:this.innerXTo, duration:5, ease:Linear.none});
    }

    onAnimationComplete() {
        // console.log('ANIMATION COMPLETE');
    }

    play() {
        // console.log('⏯ PLAY - '+this.id);
        if (this.itemTimeline !== null) this.itemTimeline.play();
    }

    pause() {
        // console.log('⏯ PAUSE - '+this.id);
        if (this.itemTimeline !== null) this.itemTimeline.pause();
    }

    onResize() {
        // console.log('Horizontal scroll - RESIZE - '+this.id);
        // console.log(Utils.getViewportSize());
        // console.log(BootstrapMedia.isMinSM());
        // console.log(this.enabledXs);

        if (!this.enabled || (!BootstrapMedia.isMinSM() && !this.enabledXs))
            return;

        // console.log("horizontal scroll ok");

        this.windowSize = Utils.getViewportSize();
        this.bodyWidth = document.body.clientWidth;
        this.$cont[0].style.width = "";
        this.contWidth = this.$cont.actual("width");

        // if (this.contWidth < this.bodyWidth) {
        //     let marginLeft = (Math.round(-(this.bodyWidth - this.contWidth) / 2));

        //     this.$cont[0].style.marginLeft = '';

        //     this.$cont[0].style.width = this.bodyWidth + 'px';
        //     this.$cont[0].style.marginLeft = marginLeft + 'px';
        //     this.contWidth = this.bodyWidth;

        //     this.$cont[0].setAttribute('data-margin-left',marginLeft);
        // }

        this.itemWidth = this.$item.length
            ? this.$item.eq(0).actual("width")
            : 0;

        this.itemMarginRight = this.$item.length
            ? parseInt(this.getStyle(this.$item[0], "margin-right"))
            : 0;

        // if (this.id == 'prestation-title-2'){
        //     console.log(this.id);
        //     console.log('window size : '+this.windowSize.width);
        //     console.log('cont width  : '+this.contWidth);
        //     // console.log('item width  : '+this.itemWidth);
        //     // console.log('item mr     : '+this.itemMarginRight);
        // }

        let itemsCount = Math.ceil(
            (2 * this.windowSize.width) / this.itemWidth
        );
        if (itemsCount < 2) itemsCount = 2;

        this.setInnerDOM(itemsCount);

        // console.log("number items : " + itemsCount);
        // console.log("----");
    }

    getStyle(e, styleName) {
        var styleValue = "";
        if (document.defaultView && document.defaultView.getComputedStyle) {
            styleValue = document.defaultView
                .getComputedStyle(e, "")
                .getPropertyValue(styleName);
        } else if (e.currentStyle) {
            styleName = styleName.replace(/\-(\w)/g, function (strMatch, p1) {
                return p1.toUpperCase();
            });
            styleValue = e.currentStyle[styleName];
        }
        return styleValue;
    }
}
