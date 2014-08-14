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
    'js/Component'
], function (
    util,
    Component
) {
    'use strict';

    function Widget(id, parent, options) {
        Component.call(this, options);

        this.id = id;
        this.parent = parent;
    }

    util.inherit(Widget).from(Component);

    util.extend(Widget.prototype, {
        extend: function (id, attributes) {
            var child = new Widget(id, this);

            return child;
        },

        getEventByName: function (name) {
            var widget = this;

            return Component.prototype.getEventByName.call(this, name) ||
                (widget.parent ? widget.parent.getEventByName(name) : null);
        },

        getEvents: function () {
            var widget = this,
                events = widget.parent ? widget.parent.getEvents() : {};

            return util.extend({}, events, Component.prototype.getEvents.call(widget));
        },

        getID: function () {
            return this.id;
        }
    });

    return Widget;
});
