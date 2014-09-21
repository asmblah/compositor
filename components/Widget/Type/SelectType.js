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

    function SelectType(widgetRepository, widgetTypeRepository) {
        WidgetType.call(this, widgetRepository, 'select');

        this.on('post.spawn', function (widget) {
            util.each(widget.getAttributeByName('options'), function (optionText) {
                var optionWidget = widgetTypeRepository.getWidgetTypeByName('option').spawn();

                optionWidget.setTextContent(optionText);

                widget.appendChild(optionWidget);
            });
        });
    }

    util.inherit(SelectType).from(WidgetType);

    return SelectType;
});
