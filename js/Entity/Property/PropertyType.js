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
    'js/EventEmitter',
    './Property'
], function (
    util,
    EventEmitter,
    Property
) {
    'use strict';

    function PropertyType(name) {
        EventEmitter.call(this);

        this.name = name;
    }

    util.inherit(PropertyType).from(EventEmitter);

    util.extend(PropertyType.prototype, {
        getName: function () {
            return this.name;
        },

        spawn: function (name) {
            var type = this,
                property = new Property(type, name);

            return property;
        }
    });

    return PropertyType;
});
