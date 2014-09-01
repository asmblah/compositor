/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/util'
], function (
    util
) {
    'use strict';

    function WidgetTypeRepository(widgetRepository, widgetTypeClasses) {
        this.widgetRepository = widgetRepository;
        this.widgetTypes = {};

        this.addMultiple(widgetTypeClasses);
    }

    util.extend(WidgetTypeRepository.prototype, {
        add: function (WidgetTypeClass) {
            var repository = this,
                widgetType = new WidgetTypeClass(repository.widgetRepository, repository);

            repository.widgetTypes[widgetType.getName()] = widgetType;
        },

        addMultiple: function (widgetTypeClasses) {
            var repository = this;

            util.each(widgetTypeClasses, function (widgetTypeClass) {
                repository.add(widgetTypeClass);
            });
        },

        getWidgetTypeByName: function (name) {
            return this.widgetTypes[name] || null;
        },

        getWidgetTypes: function () {
            return this.widgetTypes;
        }
    });

    return WidgetTypeRepository;
});
