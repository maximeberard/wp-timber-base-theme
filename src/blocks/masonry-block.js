/**
 * Copyright Maxime Bérard 2016
 *
 * @file masonry-block.js
 * @copyright Maxime Bérard 2016
 * @author Maxime Bérard
 */

import $ from "jquery";
import log from "loglevel";
import Masonry from "masonry";
import { DefaultBlock } from "blocks/default-block";
import { BootstrapMedia } from "utils/bootstrapMedia";

export class MasonryBlock extends DefaultBlock {
    init() {
        super.init();

        this.masonry = null;
        if (BootstrapMedia.isMinSM()) this.initMasonry();
    }

    destroy() {
        super.destroy();

        if (this.masonry !== null) this.masonry.destroy();
    }

    initEvents() {
        super.initEvents();
    }

    destroyEvents() {
        super.destroyEvents();
    }

    initMasonry() {
        this.masonry = new Masonry(".list", {
            itemSelector: ".item",
            columnWidth: ".item",
        });
    }

    onResize() {
        super.onResize();

        if (this.masonry !== null) {
            this.masonry.layout();
        }
    }
}
