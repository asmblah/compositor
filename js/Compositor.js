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
    'js/Program',
    'js/Walker'
], function (
    util,
    Display,
    Editor,
    Program,
    Walker
) {
    'use strict';

    function Compositor(clauseRepository, widgetRepository, parser) {
        this.clauseRepository = clauseRepository;
        this.parser = parser;
        this.widgetRepository = widgetRepository;
    }

    util.extend(Compositor.prototype, {
        createDisplay: function (options) {
            return new Display(options);
        },

        createEditor: function (options) {
            var compositor = this;

            return new Editor(
                compositor.parser,
                new Walker(compositor.clauseRepository),
                options
            );
        },

        createProgram: function (options) {
            var compositor = this;

            return new Program(
                compositor.clauseRepository,
                compositor.widgetRepository,
                options
            );
        }
    });

    return Compositor;
});
