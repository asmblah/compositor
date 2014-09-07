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
    'js/Component',
    'js/Event/Event'
], function (
    util,
    Component,
    Event
) {
    'use strict';

    function EventType(name, phrases) {
        Component.call(this);

        this.context = null;
        this.name = name;
        this.phrases = phrases;
    }

    util.inherit(EventType).from(Component);

    util.extend(EventType.prototype, {
        emit: function () {
            var type = this,
                event = new Event(type, type.context);

            return event;
        },

        getName: function () {
            return this.name;
        },

        hasPhrase: function (phrase) {
            var hasPhrase = false;

            util.each(this.phrases, function (otherPhrase) {
                if (otherPhrase === phrase) {
                    hasPhrase = true;
                    return false;
                }
            });

            return hasPhrase;
        },

        setContext: function (context) {
            this.context = context;
        }
    });

    return EventType;
});
