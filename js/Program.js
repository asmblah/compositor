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
    'js/Repository/WidgetRepository'
], function (
    util,
    Promise,
    WidgetRepository
) {
    'use strict';

    var EXTENDS = 'extends';

    function Program(clauseRepository, widgetRepository, options) {
        this.clauseRepository = clauseRepository;
        this.options = options;
        this.parentWidgetRepository = widgetRepository;
        this.widgetRepository = new WidgetRepository();
    }

    util.extend(Program.prototype, {
        getWidgetByID: function (id) {
            var program = this;

            return program.widgetRepository.getWidgetByID(id) || program.parentWidgetRepository.getWidgetByID(id) || null;
        },

        getWidgets: function () {
            return this.widgetRepository.getWidgets();
        },

        load: function (components) {
            var program = this,
                promise = new Promise();

            util.each(components.widgets, function (attributes, id) {
                var parentWidget = program.getWidgetByID(attributes[EXTENDS]);

                program.widgetRepository.add(parentWidget.extend(id, attributes));
            });

            promise.resolve();

            return promise;
        }
    });

    return Program;
});
