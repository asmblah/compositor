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
    'js/Promise'
], function (
    util,
    Promise
) {
    'use strict';

    var TYPE = 'type';

    function Program(clauseRepository, widgetTypeRepository, widgetRepository, options) {
        this.canvasWidget = widgetTypeRepository.getWidgetTypeByName('canvas').spawn();
        this.clauseRepository = clauseRepository;
        this.options = options;
        this.widgetRepository = widgetRepository;
        this.widgetTypeRepository = widgetTypeRepository;
    }

    util.extend(Program.prototype, {
        exportSnapshot: function () {
            var program = this;

            return {
                behaviour: {

                },
                ui: program.canvasWidget.exportSnapshot()
            };
        },

        getWidgetByID: function (id) {
            var program = this;

            return program.widgetRepository.getWidgetByID(id) || null;
        },

        getWidgets: function () {
            return this.widgetRepository.getWidgets();
        },

        getWidgetTypeByName: function (name) {
            return this.widgetTypeRepository.getWidgetTypeByName(name);
        },

        load: function (components) {
            var program = this,
                promise = new Promise();

            util.each(components.widgets, function (attributes, id) {
                var widgetType = program.widgetTypeRepository.getWidgetTypeByName(attributes[TYPE]);

                program.widgetRepository.add(widgetType.spawn(id, attributes));
            });

            promise.resolve();

            return promise;
        }
    });

    return Program;
});
