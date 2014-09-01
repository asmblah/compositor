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
    'js/Widget/Widget'
], function (
    util,
    Widget
) {
    'use strict';

    function WidgetRepository(widgets) {
        this.widgets = [];

        this.addMultiple(widgets);
    }

    util.extend(WidgetRepository.prototype, {
        add: function (widget) {
            if (!(widget instanceof Widget)) {
                throw new Error('Non widget given');
            }

            this.widgets.push(widget);
        },

        addMultiple: function (widgets) {
            var repository = this;

            util.each(widgets, function (widget) {
                repository.add(widget);
            });
        },

        getWidgetByID: function (id) {
            var widget = null;

            util.each(this.widgets, function (otherWidget) {
                if (otherWidget.getID() === id) {
                    widget = otherWidget;
                    return false;
                }
            });

            return widget;
        },

        getWidgets: function () {
            return this.widgets;
        }
    });

    return WidgetRepository;
});
