/**
 * Copyright Maxime Bérard 2016
 *
 * @file default-page.js
 * @copyright Maxime Bérard 2016
 * @author Maxime Bérard
 */

import $ from 'jquery';
import { Utils } from "utils/utils";
import { AbstractPage } from 'abstract-page';

/**
 * Abstract class to do common actions on every pages (like custom lazyload actions, etc.). Do not instanciate this class.
 */
export class DefaultPage extends AbstractPage {
    init() {
        super.init();
        if (this.context == 'ajax') this.initAjax();
    }

    initEvents() {
        super.initEvents();
    }

    destroyEvents() {
        super.destroyEvents();
    }

    initAjax() {
        if (typeof gtag !== "undefined") {
            // console.log('🚩 Push Analytics for: ' + window.location.pathname);
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.pathname
            });
        }
    }
}
