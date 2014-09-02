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

    function EntityDefinition(name) {
        this.name = name;
        this.properties = [];
    }

    util.extend(EntityDefinition.prototype, {
        addProperty: function (property) {
            this.properties.push(property);
        },

        exportSnapshot: function () {
            var properties = [];

            util.each(this.properties, function (property) {
                properties.push(property.exportSnapshot());
            });

            return {
                'properties': properties
            };
        },

        getName: function () {
            return this.name;
        }
    });

    return EntityDefinition;
});
