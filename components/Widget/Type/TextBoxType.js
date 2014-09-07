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

    function TextBoxType(widgetRepository) {
        WidgetType.call(this, widgetRepository, 'textbox');

        this.addAttribute(new Attribute('text', function (widget) {
            return widget.getAttributeByName('text');
        }));
    }

    util.inherit(TextBoxType).from(WidgetType);

    return TextBoxType;
});
