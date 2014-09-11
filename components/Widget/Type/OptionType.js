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
    'js/Event/EventType',
    'js/Widget/WidgetType'
], function (
    util,
    EventType,
    WidgetType
) {
    'use strict';

    function OptionType(widgetRepository) {
        WidgetType.call(this, widgetRepository, 'option');

        this.on('spawn', function (widget) {
            widget.on('select', function () {
                widget.getParent().setTextContent(widget.getTextContent());
            });
        });
    }

    util.inherit(OptionType).from(WidgetType);

    return OptionType;
});
