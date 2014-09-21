/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/util'
], function (
    util
) {
    'use strict';

    function Display(options) {
        this.options = options;
        this.program = null;
        this.renderers = [];
    }

    util.extend(Display.prototype, {
        addRenderer: function (renderer) {
            var display = this;

            display.renderers.push(renderer);
            renderer.load(display.program);
        },

        load: function (program) {
            this.program = program;
        }
    });

    return Display;
});
