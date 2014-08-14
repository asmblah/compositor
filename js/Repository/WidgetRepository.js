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
    'js/Widget'
], function (
    util,
    Widget
) {
    'use strict';

    function WidgetRepository(widgets) {
        this.widgets = {};

        this.addMultiple(widgets);
    }

    util.extend(WidgetRepository.prototype, {
        add: function (widget) {
            if (!(widget instanceof Widget)) {
                throw new Error('Non widget given');
            }

            this.widgets[widget.getID()] = widget;
        },

        addMultiple: function (widgets) {
            var repository = this;

            util.each(widgets, function (widget) {
                repository.add(widget);
            });
        },

        getWidgetByID: function (id) {
            return this.widgets[id] || null;
        },

        getWidgets: function () {
            return this.widgets;
        }
    });

    return WidgetRepository;
});
