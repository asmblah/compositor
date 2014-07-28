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
    'js/Promise',
    'js/Widget'
], function (
    util,
    Promise,
    Widget
) {
    'use strict';

    function Program(options) {
        this.options = options;
        this.widgets = {};
    }

    util.extend(Program.prototype, {
        getWidgetByID: function (id) {
            return this.widgets[id] || null;
        },

        getWidgets: function () {
            return this.widgets;
        },

        load: function (components) {
            var program = this,
                promise = new Promise();

            util.each(components.widgets, function (widgetData, id) {
                program.widgets[id] = new Widget();
            });

            promise.resolve();

            return promise;
        }
    });

    return Program;
});
