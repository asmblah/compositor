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

    function RowType(widgetRepository) {
        WidgetType.call(this, widgetRepository, 'row');

        this.addAttribute(new Attribute('columns', function (widget) {
            var snapshot = [];

            util.each(widget.getChildren(), function () {
                snapshot.push([this.exportSnapshot()]);
            });

            return snapshot;
        }));
    }

    util.inherit(RowType).from(WidgetType);

    return RowType;
});
