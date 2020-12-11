/**
 * Copyright Maxime Bérard 2020
 *
 * @file loader.js
 * @copyright Maxime Bérard 2020
 * @author Maxime Bérard
 */
import $ from 'jquery';
import {TweenMax} from "TweenMax";
import scrollTo from "scrollTo";
import {Utils} from "utils/utils";
import {Scroll} from 'utils/scroll';
import {BootstrapMedia} from "utils/bootstrapMedia";

export class Loader {

    constructor() {
        // console.log('🌀 LOADER INIT');

        this.$cont = $('#loading');
        // this.$bg = $('#loading-bg');
        this.$inner = $('#loading-inner');

        // Scroll.disable(); // enable();
        // console.log('SCROLL DISABLE');
        // $(window).scrollTop(0);
        // TweenLite.to(window, 0.6, {scrollTo:{y:0, autokill:false}});

        this.context = 'static';

        this.$body = $('body');

        this.isHome = (this.$body[0].className.indexOf('home') >= 0);

        this.active = true;

        this.showStatic();
    }

    showStatic () {
        // console.log('🌀 LOADER SHOW STATIC');
        // Utils.addClass(this.$cont[0],'active');
        TweenLite.to(window, 0.6, {scrollTo:{y:0, autokill:false}});
        
        // if (this.isHome) this.initHome();
        // else
        // TweenLite.fromTo(this.$cont, 0.6, {opacity:0}, {opacity:1});

        Utils.addClass(this.$body[0],'loading-active');
        Utils.addClass(this.$body[0],'static');
    }

    // initHome () {
    //     this.spanHomeText();

    //     let $homeLink = this.$home.find('a');
    //     $homeLink.addClass('no-ajax-link');
        
    //     TweenLite.to(this.$homeText, 1, {opacity:1, onComplete: ()=> {
    //         $homeLink.addClass('active');
    //     }});
    // }

    show () {

        setTimeout(() => {
            // console.log('🌀 LOADER SHOW');
            
            this.active = true;

            // Scroll.disable();
            TweenLite.to(window, 0.6, {scrollTo:{y:0}, delay:0.4, autokill:false});

            setTimeout(() => {
                Utils.addClass(this.$body[0], 'loading-active');
            }, 1000);

            // if (document.body.className.indexOf('nav-opened') >= 0)
            // let viewportSize = Utils.getViewportSize();
            // this.$cont[0].style.display = 'block';
            // TweenLite.fromTo(this.$cont, 0.6, {y:viewportSize.height}, {y:0});

        }, 50);
    }

    hide () {
        // console.log('🌀 LOADER HIDE');

        let hideDelay = 600;
        // if (this.context == 'static' && this.isHome) hideDelay = 1600;

        $(window).scrollTop(0);
        TweenLite.to(window, 0.6, {scrollTo:{y:0, autokill:false}});
        Utils.removeClass(this.$body[0],'loading-active');
        
        // console.log('🌀 LOADER HIDE ANIM');
        let viewportSize = Utils.getViewportSize();

        // if(window.location.hash == '') TweenLite.to(window, 0.6, {scrollTo:{y:0}});

        // TweenLite.to(this.$cont, 0.6, {y:-viewportSize.height, onComplete: () => {
        //     this.onHidden();
        // }});

        if (this.context == 'static'){
            TweenLite.to(this.$cont, 1, {opacity:0, onComplete: () => {
                this.onHidden();
            }});
        }
        else this.onHidden();
    }

    onHidden () {
        // console.log('🌀 LOADER ON HIDDEN');
        this.active = false;

        this.$cont[0].style.display = 'none';
        // console.log('SCROLL ENABLE');
        // $(window).scrollTop(0);
        // Scroll.enable();


        if (this.context == 'static') {
            this.context = 'ajax';
            Utils.removeClass(this.$body[0],'static');
            Utils.addClass(this.$body[0],'ajax');
            Utils.addClass(this.$cont[0], 'loading-ajax');
            // if (this.isHome) this.isHome = false;
        }
    }
}
