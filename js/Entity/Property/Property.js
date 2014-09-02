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

    function Property(type, name) {
        this.constraints = [];
        this.name = name;
        this.type = type;
    }

    util.extend(Property.prototype, {
        exportSnapshot: function () {
            var property = this;

            return {
                'property': property.type.getName(),
                'name': property.name,
                'constraints': []
            };
        },

        getName: function () {
            return this.name;
        }
    });

    return Property;
});
