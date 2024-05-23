/**
 * Copyright Maxime Bérard 2016
 *
 * @file default-page.js
 * @copyright Maxime Bérard 2016
 * @author Maxime Bérard
 */

import scrollTo from "scrollTo";
import { Utils } from "utils/utils";
import { AbstractPage } from "abstract-page";
import { BootstrapMedia } from "utils/bootstrapMedia";

/**
 * Abstract class to do common actions on every pages (like custom lazyload actions, etc.). Do not instanciate this class.
 */
export class DefaultPage extends AbstractPage {
    init() {
        super.init();
        // if (this.context == "ajax") this.initAjax();

        this.$scrollToLink = this.$cont.find(".scroll-to-link");

        this.viewportSize = Utils.getViewportSize();
    }

    initEvents() {
        super.initEvents();
        this.$scrollToLink.on("click", this.scrollToLinkOnClick.bind(this));
    }

    destroyEvents() {
        super.destroyEvents();
        this.$scrollToLink.off("click", this.scrollToLinkOnClick.bind(this));
    }

    scrollToLinkOnClick(e) {
        let $target = $("#" + e.currentTarget.getAttribute("data-target"));

        if ($target.length) {
            let yPos = $target.offset().top - 20;
            yPos -= BootstrapMedia.isMinSM()
                ? this.router.nav.$cont[0].offsetHeight
                : this.router.nav.$bar[0].offsetHeight;
            // console.log(yPos);
            TweenLite.to(window, 0.6, {
                scrollTo: { y: Math.round(yPos), autokill: false },
            });
        }
        e.preventDefault();
    }

    initAjax() {
        super.initAjax();

        // Matomo
        if (typeof _paq !== "undefined") {
            // console.log(window.location.pathname);
            // console.log(document.title);
            _paq.push(["setCustomUrl", window.location.pathname]);
            _paq.push(["setDocumentTitle", document.title]);
            _paq.push(["trackPageView"]);
        }

        // Analytics
        if (typeof gtag !== "undefined") {
            // console.log('🚩 Push Analytics for: ' + window.location.pathname);
            gtag("event", "page_view", {
                page_title: document.title,
                page_location: window.location.pathname,
            });
        }
    }

    onResize(e) {
        super.onResize(e);

        this.viewportSize = Utils.getViewportSize();
    }
}
