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

    function EventEmitter() {
        this.listeners = {};
    }

    util.extend(EventEmitter.prototype, {
        emit: function (eventName) {
            var args = [].slice.call(arguments, 1),
                eventEmitter = this,
                listeners = eventEmitter.listeners[eventName];

            if (listeners) {
                util.each(listeners, function (listener) {
                    listener.callback.apply(eventEmitter, args);
                });
            }

            return eventEmitter;
        },

        forward: function (sourceEventName) {
            var eventEmitter = this;

            return {
                to: function (object) {
                    return {
                        as: function (destEventName) {
                            eventEmitter.on(sourceEventName, function () {
                                object.emit.apply(object, [destEventName].concat([].slice.call(arguments, 1)));
                            });
                        }
                    };
                }
            };
        },

        off: function (eventName, filter, callback) {
            var eventEmitter = this,
                listeners = eventEmitter.listeners[eventName];

            if (util.isFunction(filter)) {
                callback = filter;
                filter = null;
            }

            if (listeners) {
                util.each(listeners, function (listener, index) {
                    if (listener.callback === callback && listener.filter === filter) {
                        listeners.splice(index, 1);
                        return false;
                    }
                });
            }

            return eventEmitter;
        },

        on: function (eventName, filter, callback) {
            var eventEmitter = this;

            if (!eventEmitter.listeners[eventName]) {
                eventEmitter.listeners[eventName] = [];
            }

            if (util.isFunction(filter)) {
                callback = filter;
                filter = null;
            }

            if (filter) {
                callback = (function (callback) {
                    return function () {
                        var actualArgs = [].slice.call(arguments),
                            match = true;

                        util.each(filter, function (expectedArg, index) {
                            if (actualArgs[index] !== expectedArg) {
                                match = false;
                                return false;
                            }
                        });

                        if (match) {
                            callback.apply(eventEmitter, actualArgs.slice(filter.length));
                        }
                    };
                }(callback));
            }

            eventEmitter.listeners[eventName].push({
                callback: callback,
                filter: filter
            });

            return eventEmitter;
        },

        one: function (eventName, filter, callback) {
            var eventEmitter = this;

            return eventEmitter.on(eventName, filter, function proxy() {
                eventEmitter.off(eventName, filter, proxy);

                callback.apply(this, arguments);
            });
        }
    });

    return EventEmitter;
});
