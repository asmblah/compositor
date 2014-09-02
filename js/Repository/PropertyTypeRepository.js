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

    function PropertyTypeRepository(propertyTypeClasses) {
        this.propertyTypes = {};

        this.addMultiple(propertyTypeClasses);
    }

    util.extend(PropertyTypeRepository.prototype, {
        add: function (PropertyTypeClass) {
            var repository = this,
                propertyType = new PropertyTypeClass(repository);

            repository.propertyTypes[propertyType.getName()] = propertyType;
        },

        addMultiple: function (propertyTypeClasses) {
            var repository = this;

            util.each(propertyTypeClasses, function (propertyTypeClass) {
                repository.add(propertyTypeClass);
            });
        },

        getPropertyTypeByName: function (name) {
            return this.propertyTypes[name] || null;
        },

        getPropertyTypes: function () {
            return this.propertyTypes;
        }
    });

    return PropertyTypeRepository;
});
