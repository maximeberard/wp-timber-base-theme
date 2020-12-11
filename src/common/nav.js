/**
 * Copyright Maxime Bérard 2016
 *
 * @file nav.js
 * @copyright Maxime Bérard 2016
 * @author Maxime Bérard
 */
import $ from 'jquery';
import {Utils} from "utils/utils";
import {BootstrapMedia} from "utils/bootstrapMedia";
import {debounce} from "utils/debounce";
import {AbstractNav} from 'abstract-nav';

/**
 *
 */
export class Nav extends AbstractNav {
    constructor() {
        super();

        this.$cont = $('#nav');
        this.$list = $('#nav-list');
        this.$item = this.$list.find('.nav-item');
        this.$link = this.$list.find('.nav-link');
        this.$links = this.$cont.find('a').not('[target="_blank"]');

        this.$btn = $('#nav-btn');
        this.hasOverlay = false; 
        if (this.hasOverlay) this.$overlay = $('#nav-overlay');
        
        this.$bar = $('#navbar');
        this.$btnBar = this.$bar.find('.nav-btn-bar');
        // this.$barBg = $('#navbar-bg');

        this.minifyLimit = BootstrapMedia.isMinMD() ? 165 : 50;

        this.opened = false;
    }

    initEvents(router) {
        super.initEvents(router);

        if (router.options.ajaxEnabled) {
            this.$links.on('click', router.onLinkClick.bind(router));
        }

        this.$btn.on('click', this.btnClick.bind(this));
        if (this.hasOverlay) this.$overlay.on('click', this.close.bind(this));

        window.addEventListener('scroll', this.onScroll.bind(this));
        window.addEventListener('resize', debounce(this.onResize.bind(this), 100, false));
    }

    destroyEvents(router) {

        super.destroyEvents(router);

        if (router.options.ajaxEnabled) {
            this.$links.off('click', router.onLinkClick.bind(router));
        }

        this.$btn.off('click', this.btnClick.bind(this));
        if (this.hasOverlay) this.$overlay.off('click', this.close.bind(this));

        window.removeEventListener('scroll', this.onScroll.bind(this));
        window.removeEventListener('resize', debounce(this.onResize.bind(this), 100, false));
    }

    /**
     * Scroll
     */
    onScroll(e) {

        if(window.scrollY > this.minifyLimit){
            if(!this.minified) this.minify();
        }
        else{
            if(this.minified) this.unminify();
        }
    }

    minify() {

        Utils.addClass(document.body,'nav-minified');
        this.minified = true;
    }

    unminify() {

        Utils.removeClass(document.body,'nav-minified');
        this.minified = false;
    }


    /**
     * Btn click
     */
    btnClick(e) {
        if(!BootstrapMedia.isMinSM()) {
            if(!this.opened) this.open();
            else this.close();
        }
    }

    open() {
        if(!BootstrapMedia.isMinSM() && !this.opened){

            this.$cont[0].style.display = 'block';
            TweenLite.fromTo(this.$cont, 0.4, {xPercent:-100}, {xPercent:0});

            if (this.hasOverlay) {
                this.$overlay[0].style.display = 'block';
                TweenLite.to(this.$overlay, 1.2, {opacity:1});
            }

            // Btn
            TweenLite.to(this.$btnBar[0], 0.3, {y:9});
            TweenLite.to(this.$btnBar[2], 0.3, {y:-9});
            TweenLite.to(this.$btnBar[1], 0.3, {opacity:0});

            TweenLite.to(this.$btnBar[0], 0.4, {rotation:45, delay:0.2});
            TweenLite.to(this.$btnBar[2], 0.4, {rotation:-45, delay:0.2});

            this.opened = true;
        }
    }

    close() {
        if(!BootstrapMedia.isMinSM() && this.opened){

            TweenLite.to(this.$cont, 0.4, {xPercent:-100, onComplete: () => {
                if(!this.opened) this.$cont[0].style.display = 'none';
               // document.body.removeAttribute('style');
            }});

            if (this.hasOverlay) {
                TweenLite.to(this.$overlay, 1.2, {opacity:0, onComplete: () => {
                    this.$overlay[0].style.display = 'none';
                }});
            }

            // Btn
            TweenLite.to(this.$btnBar[0], 0.4, {rotation:0});
            TweenLite.to(this.$btnBar[2], 0.4, {rotation:0});

            TweenLite.to(this.$btnBar[0], 0.3, {y:0, delay:0.2});
            TweenLite.to(this.$btnBar[2], 0.3, {y:0, delay:0.2});
            TweenLite.to(this.$btnBar[1], 0.3, {opacity:1, delay:0.2});

            this.opened = false;
        }
    }

    onResize() {

    }
}
