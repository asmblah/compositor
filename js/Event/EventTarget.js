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
        this.eventListeners = {};
        this.eventTypes = {};
    }

    util.extend(EventTarget.prototype, {
        addEventType: function (eventType) {
            this.eventTypes[eventType.getName()] = eventType;
        },

        emit: function (eventName) {
            var target = this;

            util.each(this.eventListeners[eventName], function (eventListener) {
                eventListener.call(target);
            });
        },

        getEventTypeByName: function (name) {
            return this.eventTypes[name] || null;
        },

        getEventTypes: function () {
            return util.extend({}, this.eventTypes);
        },

        on: function (eventName, callback) {
            var eventListeners = this.eventListeners;

            if (!eventListeners[eventName]) {
                eventListeners[eventName] = [];
            }

            eventListeners[eventName].push(callback);
        }
    });

    return EventTarget;
});
