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

    function Event(type, context) {
        this.context = context;
        this.listeners = [];
        this.type = type;
    }

    util.extend(Event.prototype, {
        emit: function () {
            var event = this,
                args = [].slice.call(arguments, 1);

            if (event.listeners) {
                util.each(event.listeners, function (listener) {
                    listener.callback.apply(event.context, args);
                });
            }

            return event;
        },

        getName: function () {
            return this.type.getName();
        }
    });

    return Event;
});
