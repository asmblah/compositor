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

    function EventTarget() {
        this.eventTypes = {};
    }

    util.extend(EventTarget.prototype, {
        addEventType: function (eventType) {
            this.eventTypes[eventType.getName()] = eventType;
        },

        getEventTypeByName: function (name) {
            return this.eventTypes[name] || null;
        },

        getEventTypes: function () {
            return util.extend({}, this.eventTypes);
        }
    });

    return EventTarget;
});
