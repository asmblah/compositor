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

    var EXPRESSION = 'expression',
        ID = 'id',
        INVALID_MATCH_OFFSET = 'invalid_match_offset',
        OBJECT = 'object',
        TYPE = 'type';

    var showClause = new Clause('Show', [/^show /, 'Arithmetic', /^ in ([^ ]+)/], function (match1, match2, match3) {
        var component,
            context = this,
            object,
            arithmeticExpression = match2 ? match2 : {
                'type': 'invalid_expression'
            },
            componentID = match3 ? match3[1] : '';

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
                'invalid_match_offset': match2.location.end + match3[0].length
            };
        }

        return {
            'expression': arithmeticExpression,
            'object': object
        };
    }, function (node) {
        var context = this;

        if (node[OBJECT][TYPE] === 'invalid_component') {
            context.setContextMenuTextPosition(node[OBJECT][INVALID_MATCH_OFFSET]);

            util.each(context.program.getWidgets(), function (widget) {
                context.addContextMenuItem(widget);
            });
        }
    }, function (node, interpret) {
        var expression = interpret(node[EXPRESSION]);

        return 'program.getWidgetByID("' + node[OBJECT][ID] + '").setTextContent(' + expression + ');';
    });

    return showClause;
});
