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

    var ACTION = 'action',
        EVENT = 'event',
        ID = 'id',
        INVALID_MATCH_OFFSET = 'invalid_match_offset',
        NAME = 'name',
        OBJECT = 'object',
        TYPE = 'type';

    var whenClause = new Clause('When', [/^When /, /^(.*?) is /, /^(.*?), /, 'Show'], function (match1, match2, match3, action) {
        var component,
            context = this,
            eventType,
            object,
            verbPhrase = match3 ? match3[1] : '',
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

        if (component && (eventType = component.getEventTypeByPhrase(verbPhrase))) {
            eventType = {
                'type': 'event',
                'name': eventType.getName()
            };
        } else {
            eventType = {
                'type': 'invalid_event',
                'invalid_verb_phrase': verbPhrase
            };

            if (match2) {
                eventType[INVALID_MATCH_OFFSET] = match1[0].length + match2[0].length;
            }
        }

        return {
            'object': object,
            'event': eventType,
            'action': action
        };
    }, function (node, walkSubNode) {
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

            util.each(component.getEventTypes(), function (eventType) {
                context.addContextMenuItem(eventType);
            });
        }

        if (node[ACTION]) {
            walkSubNode(node[ACTION]);
        }
    }, function (node, interpret) {
        var body = interpret(node[ACTION]),
            code = 'program.getWidgetByID("' + node[OBJECT][ID] + '").on("' + node[EVENT][NAME] + '", function () {' + body + '});';

        return code;
    });

    return whenClause;
});
