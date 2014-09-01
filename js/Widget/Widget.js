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

    function Widget(type, id, attributes) {
        Component.call(this);

        this.attributes = attributes;
        this.children = [];
        this.id = id || null;
        this.parent = null;
        this.type = type;
    }

    util.inherit(Widget).from(Component);

    util.extend(Widget.prototype, {
        appendChild: function (child) {
            this.children.push(child);
        },

        exportSnapshot: function () {
            var widget = this;

            return widget.type.exportSnapshot(widget);
        },

        getAttributeByName: function (name) {
            return this.attributes[name] || null;
        },

        getChildren: function () {
            return this.children;
        },

        getEventTypeByName: function (name) {
            return this.type.getEventTypeByName(name);
        },

        getEventTypes: function () {
            return this.type.getEventTypes();
        },

        getID: function () {
            return this.id;
        },

        getParent: function () {
            return this.parent;
        },

        setParent: function (parent) {
            this.parent = parent;
        }
    });

    return Widget;
});
