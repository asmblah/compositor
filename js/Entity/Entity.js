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

    function Entity(definition, properties) {
        this.properties = properties;
        this.definition = definition;
    }

    util.extend(Entity.prototype, {
        getPropertyByName: function (name) {
            return this.properties[name] || null;
        }
    });

    return Entity;
});
