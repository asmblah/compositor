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
    'js/EventEmitter',
    './Widget'
], function (
    util,
    EventEmitter,
    Widget
) {
    'use strict';

    var ID = 'id',
        WIDGET = 'widget';

    function WidgetType(widgetRepository, name) {
        EventEmitter.call(this);

        this.attributes = [];
        this.eventTypes = {};
        this.name = name;
        this.widgetRepository = widgetRepository;
    }

    util.inherit(WidgetType).from(EventEmitter);

    util.extend(WidgetType.prototype, {
        addAttribute: function (attribute) {
            this.attributes.push(attribute);
        },

        addEventType: function (eventType) {
            this.eventTypes[eventType.getName()] = eventType;
        },

        exportSnapshot: function (widget) {
            var widgetType = this,
                attributes = {};

            attributes[WIDGET] = this.name;

            if (widget.getID()) {
                attributes[ID] = widget.getID();
            }

            util.each(widgetType.attributes, function (attribute) {
                attributes[attribute.getName()] = attribute.exportForWidget(widget);
            });

            return attributes;
        },

        getEventTypeByName: function (name) {
            return this.eventTypes[name] || null;
        },

        getEventTypeByPhrase: function (phrase) {
            var eventType = null;

            util.each(this.eventTypes, function (otherEventType) {
                if (otherEventType.hasPhrase(phrase)) {
                    eventType = otherEventType;
                    return false;
                }
            });

            return eventType;
        },

        getEventTypes: function () {
            return util.extend({}, this.eventTypes);
        },

        getName: function () {
            return this.name;
        },

        spawn: function (id, attributes) {
            var type = this,
                widget = new Widget(type, id, attributes);

            type.widgetRepository.add(widget);
            type.emit('spawn', widget);

            return widget;
        }
    });

    return WidgetType;
});
