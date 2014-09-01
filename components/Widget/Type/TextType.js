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
    'js/Attribute',
    'js/Widget/WidgetType'
], function (
    util,
    Attribute,
    WidgetType
) {
    'use strict';

    function TextType(widgetRepository) {
        WidgetType.call(this, widgetRepository, 'text');

        this.addAttribute(new Attribute('text', function (widget) {
            return widget.getAttributeByName('text');
        }));
    }

    util.inherit(TextType).from(WidgetType);

    return TextType;
});
