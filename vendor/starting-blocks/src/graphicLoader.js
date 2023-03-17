/**
 * Copyright © 2016, Ambroise Maupate
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * @file graphicLoader.js
 * @author Ambroise Maupate
 */
import log from "loglevel";

/**
 * Handle your application main loader animation.
 *
 * **Do not instanciate this class directly, create a sub-class**.
 */
export class GraphicLoader {

    /**
     * Interface for a graphic loader element.
     *
     * Any child implementations must implements
     * show and hide methods.
     *
     * @abstract
     */
    constructor() {

    }

    /**
     * Show loader.
     *
     * @abstract
     */
    show() {
        log.debug('🌀 Show loader');
    }

    /**
     * Hide loader.
     *
     * @abstract
     */
    hide() {
        log.debug('🌀 Hide loader');
    }
}
