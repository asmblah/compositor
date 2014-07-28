/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/util',
    'js/Display',
    'js/Editor',
    'js/Program'
], function (
    util,
    Display,
    Editor,
    Program
) {
    'use strict';

    function Compositor() {

    }

    util.extend(Compositor.prototype, {
        createDisplay: function (options) {
            return new Display(options);
        },

        createEditor: function (options) {
            return new Editor(options);
        },

        createProgram: function (options) {
            return new Program(options);
        }
    });

    return Compositor;
});
