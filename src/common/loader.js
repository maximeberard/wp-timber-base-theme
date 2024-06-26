/**
 * Copyright Maxime Bérard 2020
 *
 * @file loader.js
 * @copyright Maxime Bérard 2020
 * @author Maxime Bérard
 */
import $ from "jquery";
import { Utils } from "utils/utils";
import { Scroll } from "utils/scroll";
import { BootstrapMedia } from "utils/bootstrapMedia";

export class Loader {
    constructor() {
        // console.log('🌀 LOADER INIT');

        this.$cont = $("#loading");
        // this.$bg = $('#loading-bg');
        this.$inner = $("#loading-inner");

        // Scroll.disable(); // enable();
        // console.log('SCROLL DISABLE');
        // $(window).scrollTop(0);
        // gsap.to(window, { duration:0.6, scrollTo:{y:0}});

        this.context = "static";

        this.$body = $("body");

        this.isHome = this.$body[0].className.indexOf("home") >= 0;

        this.active = true;

        this.showStatic();
    }

    showStatic() {
        // console.log('🌀 LOADER SHOW STATIC');
        // Utils.addClass(this.$cont[0],'active');
        gsap.to(window, { duration: 0.6, scrollTo: { y: 0 } });

        // if (this.isHome) this.initHome();
        // else
        // gsap.fromTo(this.$cont, {duration: 0.6, opacity:0}, {opacity:1});

        Utils.addClass(this.$body[0], "loading-active");
        Utils.addClass(this.$body[0], "static");
    }

    // initHome () {
    //     this.spanHomeText();

    //     let $homeLink = this.$home.find('a');
    //     $homeLink.addClass('no-ajax-link');

    //     //     gsap.to(this.$homeText, {duration:1, opacity:1, onComplete: ()=> {
    //         $homeLink.addClass('active');
    //     }});
    // }

    show() {
        setTimeout(() => {
            // console.log('🌀 LOADER SHOW');

            this.active = true;

            // Scroll.disable();
            gsap.to(window, {
                duration: 0.6,
                scrollTo: { y: 0 },
                delay: 0.4,
            });

            setTimeout(() => {
                Utils.addClass(this.$body[0], "loading-active");
            }, 1000);

            // if (document.body.className.indexOf('nav-opened') >= 0)
            // let viewportSize = Utils.getViewportSize();
            // this.$cont[0].style.display = 'block';
            // gsap.fromTo(this.$cont, { duration:0.6, y:viewportSize.height}, {y:0});
        }, 50);
    }

    hide() {
        // console.log('🌀 LOADER HIDE');

        let hideDelay = 600;
        // if (this.context == 'static' && this.isHome) hideDelay = 1600;

        $(window).scrollTop(0);
        gsap.to(window, { duration: 0.6, scrollTo: { y: 0 } });
        Utils.removeClass(this.$body[0], "loading-active");

        // console.log('🌀 LOADER HIDE ANIM');
        let viewportSize = Utils.getViewportSize();

        // if(window.location.hash == '') gsap.to(window, { duration:0.6,scrollTo:{y:0}});

        // gsap.to(this.$cont,{ duration:0.6, y:-viewportSize.height, onComplete: () => {
        //     this.onHidden();
        // }});

        if (this.context == "static") {
            gsap.to(this.$cont, {
                duration: 1,
                opacity: 0,
                onComplete: () => {
                    this.onHidden();
                },
            });
        } else this.onHidden();
    }

    onHidden() {
        // console.log('🌀 LOADER ON HIDDEN');
        this.active = false;

        this.$cont[0].style.display = "none";
        // console.log('SCROLL ENABLE');
        // $(window).scrollTop(0);
        // Scroll.enable();

        if (this.context == "static") {
            this.context = "ajax";
            Utils.removeClass(this.$body[0], "static");
            Utils.addClass(this.$body[0], "ajax");
            Utils.addClass(this.$cont[0], "loading-ajax");
            // if (this.isHome) this.isHome = false;
        }
    }
}
