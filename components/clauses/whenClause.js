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
        INVALID_MATCH_OFFSET = 'invalid_match_offset',
        OBJECT = 'object',
        TYPE = 'type';

    var whenClause = new Clause('When', [/^When /, /^(.*?) is /, /^(.*?)/], function (match1, match2, match3) {
        var component,
            context = this,
            event,
            object,
            verbPhrase = match3 ? match3[2] : '',
            componentID = match2 ? match2[1] : '';

        component = context.program.getWidgetByID(componentID);

        if (component) {
            object = {
                'type': 'widget',
                'id': componentID
            };
        } else {
            object = {
                'type': 'invalid_component',
                'invalid_id': componentID,
                'invalid_match_offset': match1[0].length
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

            if (match2) {
                event[INVALID_MATCH_OFFSET] = match1[0].length + match2[0].length;
            }
        }

        return {
            'object': object,
            'event': event
        };
    }, function (node) {
        var component,
            context = this;

        if (node[OBJECT][TYPE] === 'invalid_component') {
            context.setContextMenuTextPosition(node[OBJECT][INVALID_MATCH_OFFSET]);
            context.addContextMenuItem(context.program);

            util.each(context.program.getWidgets(), function (widget) {
                context.addContextMenuItem(widget);
            });
        } else if (node[EVENT][TYPE] === 'invalid_event') {
            context.setContextMenuTextPosition(node[EVENT][INVALID_MATCH_OFFSET]);
            component = context.program.getWidgetByID(node[OBJECT][ID]);

            util.each(component.getEvents(), function (event) {
                context.addContextMenuItem(event);
            });
        }
    });

    return whenClause;
});
