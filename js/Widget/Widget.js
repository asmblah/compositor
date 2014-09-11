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

    var TEXT_CONTENT = 'textContent';

    function Widget(type, id, attributes) {
        Component.call(this);

        this.attributes = attributes || {};
        this.children = [];
        this.id = id || null;
        this.parent = null;
        this.type = type;
    }

    util.inherit(Widget).from(Component);

    util.extend(Widget.prototype, {
        appendChild: function (child) {
            var widget = this;

            child.setParent(widget);
            widget.children.push(child);
        },

        click: function () {
            this.emit('click');
        },

        exportSnapshot: function () {
            var widget = this;

            return widget.type.exportSnapshot(widget);
        },

        getAttributeByName: function (name) {
            return this.attributes[name] || null;
        },

        getChildByTextContent: function (text) {
            var child = null;

            util.each(this.children, function (otherChild) {
                if (otherChild.getTextContent() === text) {
                    child = otherChild;
                    return false;
                }
            });

            return child;
        },

        getChildren: function () {
            return this.children;
        },

        getEventTypeByName: function (name) {
            return this.type.getEventTypeByName(name);
        },

        getEventTypeByPhrase: function (phrase) {
            return this.type.getEventTypeByPhrase(phrase);
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

        getTextContent: function () {
            return this.attributes[TEXT_CONTENT] || '';
        },

        select: function () {
            this.emit('select');
        },

        setParent: function (parent) {
            this.parent = parent;
        },

        setTextContent: function (text) {
            // Always cast text content value to string
            this.attributes[TEXT_CONTENT] = text + '';
        }
    });

    return Widget;
});
