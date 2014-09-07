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

    function ButtonType(widgetRepository) {
        WidgetType.call(this, widgetRepository, 'button');

        this.addEventType(new EventType('click', ['clicked']));
    }

    util.inherit(ButtonType).from(WidgetType);

    return ButtonType;
});
