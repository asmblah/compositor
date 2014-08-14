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

    function Component(options) {
        this.events = {};
        this.options = options || {};
    }

    util.extend(Component.prototype, {
        addEvent: function (event) {
            this.events[event.getName()] = event;
        },

        getEventByName: function (name) {
            return this.events[name];
        },

        getEvents: function () {
            return this.events;
        }
    });

    return Component;
});
