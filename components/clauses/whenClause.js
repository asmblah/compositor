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
    'js/Clause/Clause'
], function (
    util,
    Clause
) {
    'use strict';

    var EVENT = 'event',
        ID = 'id',
        OBJECT = 'object',
        TYPE = 'type';

    var whenClause = new Clause('When', [/^When (.*?) is (.*?)/], function (match) {
        var component,
            context = this,
            event,
            object,
            verbPhrase = match[2],
            componentID = match[1];

        component = context.program.getWidgetByID(componentID);

        if (component) {
            object = {
                'type': 'widget',
                'id': componentID
            };
        } else {
            object = {
                'type': 'invalid_component',
                'invalid_id': componentID
            };
        }

        if (component && (event = component.getEventByName(verbPhrase))) {
            event = {
                'type': 'event',
                'name': event.getName()
            };
        } else {
            event = {
                'type': 'invalid_event',
                'invalid_verb_phrase': verbPhrase
            };
        }

        return {
            'object': object,
            'event': event
        };
    }, function (node) {
        var component,
            context = this;

        if (node[OBJECT][TYPE] === 'invalid_component') {
            context.addContextMenuItem(context.program);

            util.each(context.program.getWidgets(), function (widget) {
                context.addContextMenuItem(widget);
            });
        } else if (node[EVENT][TYPE] === 'invalid_event') {
            component = context.program.getWidgetByID(node[OBJECT][ID]);

            util.each(component.getEvents(), function (event) {
                context.addContextMenuItem(event);
            });
        }
    });

    return whenClause;
});
