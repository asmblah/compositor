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

    var TEXT_CONTENT = 'textContent',
        hasOwn = {}.hasOwnProperty,
        nextUniqueID = 0;

    function Widget(type, id, attributes) {
        Component.call(this);

        attributes = attributes || {};

        this.attributes = attributes;
        this.children = [];
        this.id = id || null;
        this.parent = null;
        this.type = type;
        this.uniqueID = id || null;

        if (type) {
            type.emit('pre.spawn', this);

            if (hasOwn.call(attributes, 'textContent')) {
                type.emit('textContent.set', this);
            }
        }
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
            var widget = this;

            widget.type.emit('textContent.get', widget);

            return widget.attributes[TEXT_CONTENT] || '';
        },

        getUniqueID: function () {
            var widget = this;

            if (widget.uniqueID === null) {
                widget.uniqueID = nextUniqueID++;
            }

            return widget.uniqueID;
        },

        select: function () {
            this.emit('select');
        },

        setAttributeByName: function (name, value) {
            this.attributes[name] = value;
        },

        setParent: function (parent) {
            var widget = this;

            widget.parent = parent;

            widget.type.emit('parent.set', widget);
        },

        setTextContent: function (text) {
            var widget = this;

            // Always cast text content value to string
            widget.attributes[TEXT_CONTENT] = text + '';

            widget.type.emit('textContent.set', widget);
        }
    });

    return Widget;
});
