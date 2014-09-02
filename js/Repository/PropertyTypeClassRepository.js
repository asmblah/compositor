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
    './PropertyTypeRepository'
], function (
    util,
    PropertyTypeRepository
) {
    'use strict';

    function PropertyTypeClassRepository(propertyTypeClasses) {
        this.propertyTypeClasses = propertyTypeClasses;
    }

    util.extend(PropertyTypeClassRepository.prototype, {
        createPropertyTypeRepository: function () {
            return new PropertyTypeRepository(this.propertyTypeClasses);
        }
    });

    return PropertyTypeClassRepository;
});
