/**
 * Copyright Maxime Bérard 2016
 *
 * @file nav.js
 * @copyright Maxime Bérard 2016
 * @author Maxime Bérard
 */
import $ from "jquery";
// import scrollTo from "scrollTo";
import { Utils } from "utils/utils";
import { debounce } from "utils/debounce";
import { AbstractNav } from "abstract-nav";
import { BootstrapMedia } from "utils/bootstrapMedia";

export class Nav extends AbstractNav {
    constructor() {
        super();

        this.$cont = $("#nav");
        this.$list = $("#nav-list");
        this.$item = this.$list.find(".nav-item");
        this.$link = this.$list.find(".nav-link");
        this.$links = this.$cont.find("a").not('[target="_blank"]');

        this.$btn = $("#nav-btn");
        this.hasOverlay = false;
        if (this.hasOverlay) this.$overlay = $("#nav-overlay");

        this.$bar = $("#navbar");
        this.$btnBar = this.$bar.find(".nav-btn-bar");
        // this.$barBg = $('#navbar-bg');

        // this.$backTop = $('#back-top');

        this.minifyLimit = BootstrapMedia.isMinMD() ? 165 : 50;

        this.opened = false;
    }

    initEvents(router) {
        super.initEvents(router);

        if (router.options.ajaxEnabled) {
            this.$links.on("click", router.onLinkClick.bind(router));
        }

        this.$btn.on("click", this.btnClick.bind(this));
        if (this.hasOverlay) this.$overlay.on("click", this.close.bind(this));

        // this.$backTop.on('click', this.backTopOnClick.bind(this));

        // window.addEventListener('keyup', this.onKeyUp.bind(this));
        window.addEventListener("scroll", this.onScroll.bind(this));
        window.addEventListener(
            "resize",
            debounce(this.onResize.bind(this), 100, false)
        );
    }

    destroyEvents(router) {
        super.destroyEvents(router);

        if (router.options.ajaxEnabled) {
            this.$links.off("click", router.onLinkClick.bind(router));
        }

        this.$btn.off("click", this.btnClick.bind(this));
        if (this.hasOverlay) this.$overlay.off("click", this.close.bind(this));

        // this.$backTop.off('click', this.backTopOnClick.bind(this));

        // window.removeEventListener('keyup', this.onKeyUp.bind(this));
        window.removeEventListener("scroll", this.onScroll.bind(this));
        window.removeEventListener(
            "resize",
            debounce(this.onResize.bind(this), 100, false)
        );
    }

    onScroll(e) {
        if (window.scrollY > this.minifyLimit) {
            if (!this.minified) this.minify();
        } else {
            if (this.minified) this.unminify();
        }
    }

    minify() {
        Utils.addClass(document.body, "nav-minified");
        this.minified = true;
    }

    unminify() {
        Utils.removeClass(document.body, "nav-minified");
        this.minified = false;
    }

    btnClick(e) {
        if (!BootstrapMedia.isMinSM()) {
            if (!this.opened) this.open();
            else this.close();
        }
    }

    onKeyUp(e) {
        if (e.keyCode == 27 && this.opened) this.close();
    }

    open() {
        if (!BootstrapMedia.isMinSM() && !this.opened) {
            Utils.addClass(document.body, "nav-opened");

            this.$cont[0].style.display = "block";
            gsap.fromTo(
                this.$cont,
                { xPercent: -100 },
                { xPercent: 0, duration: 0.4 }
            );

            if (this.hasOverlay) {
                this.$overlay[0].style.display = "block";
                gsap.to(this.$overlay, { opacity: 1, duration: 1.2 });
            }

            // Btn
            gsap.to(this.$btnBar[0], { y: 9, duration: 0.3 });
            gsap.to(this.$btnBar[2], { y: -9, duration: 0.3 });
            gsap.to(this.$btnBar[1], { opacity: 0, duration: 0.3 });

            gsap.to(this.$btnBar[0], {
                rotation: 45,
                duration: 0.4,
                delay: 0.2,
            });
            gsap.to(this.$btnBar[2], {
                rotation: -45,
                duration: 0.4,
                delay: 0.2,
            });

            this.opened = true;
        }
    }

    close() {
        if (!BootstrapMedia.isMinSM() && this.opened) {
            gsap.to(this.$cont, {
                xPercent: -100,
                duration: 0.4,
                onComplete: () => {
                    if (!this.opened) this.$cont[0].style.display = "none";
                    // document.body.removeAttribute('style');
                },
            });

            if (this.hasOverlay) {
                gsap.to(this.$overlay, {
                    opacity: 0,
                    duration: 1.2,
                    onComplete: () => {
                        this.$overlay[0].style.display = "none";
                    },
                });
            }

            // Btn
            gsap.to(this.$btnBar[0], { rotation: 0, duration: 0.4 });
            gsap.to(this.$btnBar[2], { rotation: 0, duration: 0.4 });

            gsap.to(this.$btnBar[0], { y: 0, duration: 0.3, delay: 0.2 });
            gsap.to(this.$btnBar[2], { y: 0, duration: 0.3, delay: 0.2 });
            gsap.to(this.$btnBar[1], { opacity: 1, duration: 0.3, delay: 0.2 });

            Utils.removeClass(document.body, "nav-opened");

            this.opened = false;
        }
    }

    backTopOnClick(e) {
        gsap.to(window, { scrollTo: { y: 0 }, duration: 0.6 });
        e.preventDefault();
    }

    onResize() {}
}
