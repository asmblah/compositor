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
    './WidgetTypeRepository'
], function (
    util,
    WidgetTypeRepository
) {
    'use strict';

    function WidgetTypeClassRepository(widgetTypeClasses) {
        this.widgetTypeClasses = widgetTypeClasses;
    }

    util.extend(WidgetTypeClassRepository.prototype, {
        createWidgetTypeRepository: function (widgetRepository) {
            return new WidgetTypeRepository(widgetRepository, this.widgetTypeClasses);
        }
    });

    return WidgetTypeClassRepository;
});
