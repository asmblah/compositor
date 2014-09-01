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

    function CanvasType(widgetRepository, widgetTypeRepository) {
        WidgetType.call(this, widgetRepository, 'canvas');

        this.addAttribute(new Attribute('pages', function (widget) {
            var snapshot = [];

            util.each(widget.getChildren(), function () {
                snapshot.push(this.exportSnapshot());
            });

            return snapshot;
        }));

        this.on('spawn', function (widget) {
            var defaultPage = widgetTypeRepository.getWidgetTypeByName('page').spawn('page1');

            widget.appendChild(defaultPage);
        });
    }

    util.inherit(CanvasType).from(WidgetType);

    return CanvasType;
});
