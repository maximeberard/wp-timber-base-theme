/**
 * Copyright Maxime Bérard 2016
 *
 * @file in-view-block.js
 * @copyright Maxime Bérard 2016
 * @author Maxime Bérard
 */

import $ from 'jquery';
import {Utils} from "utils/utils";
import {waypoint} from 'waypoint';
import {DefaultBlock} from 'blocks/default-block';
import {BootstrapMedia} from "utils/bootstrapMedia";

export class InviewBlock extends DefaultBlock
{
    init() {
        super.init();

        // console.log('👀 In view block');

        if (this.page.context == 'static') {
            let delayInView = 500; // (this.page.context == 'static') ? 500 : 1500;
            setTimeout(() => {
                this.initInView();
                // this.page.router.$window.trigger('resize');
            }, delayInView);
        }

        this.inViewDuration = 800;

        this.inViewOffset = '75%';

        if (this.$cont[0].getAttribute('data-inview-offset')){
            this.inViewOffset = this.$cont[0].getAttribute('data-inview-offset');
        }

        this.index = Number(this.$cont[0].getAttribute('data-index'));
    }

    initEvents () {
        super.initEvents();
    }

    destroyEvents () {
        super.destroyEvents();
    }
    
    initInView () {
        // super.initInView();

        if (BootstrapMedia.isMinSM()) { // this.page.router.deviceType == 'desktop' && 

            this.waypoint = [];
            this.isInView = false;

            // console.log('👀 INVIEW - '+this.id+' - Init');
            // console.log('offset : '+this.inViewOffset);
            // console.log('---');

            this.waypoint = new Waypoint({
                element: this.$cont[0],
                handler: this.onInView.bind(this),
                offset: this.inViewOffset
            });
        }
    }

    onInView (index) {
        // console.log('👀 INVIEW - '+this.id+' - on view');

        if(!this.isInView){
            this.isInView = true;
            Utils.addClass(this.$cont[0], 'in-view');
            // console.log('👀 INVIEW - '+this.id+' - OK');
            this.inViewAnimation();
        }
        // else console.log('< already Inview');
    }

    inViewAnimation () {
        // console.log('👀 INVIEW - '+this.id+' - Animation');
        
        setTimeout(() => {
            Utils.addClass(this.$cont[0], 'in-view-finished');
        }, this.inViewDuration);
    }
}
