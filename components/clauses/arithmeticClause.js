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

    var ID = 'id',
        LEFT_HAND_OBJECT = 'leftHandObject',
        RIGHT_HAND_OBJECT = 'rightHandObject';

    var arithmeticClause = new Clause('Arithmetic', [/^([^ ]+?) plus ([^ ]+)/], function (match1) {
        var context = this,
            leftHandComponentID = match1 ? match1[1] : '',
            rightHandComponentID = match1 ? match1[2] : '';

        function getComponentNode(id) {
            var component = context.program.getWidgetByID(id);

            if (component) {
                component = {
                    'type': 'widget',
                    'id': id
                };
            } else {
                component = {
                    'type': 'invalid_component',
                    'invalid_id': id,
                    'invalid_match_offset': 0
                };
            }

            return component;
        }

        return {
            'leftHandObject': getComponentNode(leftHandComponentID),
            'rightHandObject': getComponentNode(rightHandComponentID)
        };
    }, function () {

    }, function (node) {
        var leftHandExpression = 'parseInt(program.getWidgetByID("' + node[LEFT_HAND_OBJECT][ID] + '").getTextContent(), 10)',
            rightHandExpression = 'parseInt(program.getWidgetByID("' + node[RIGHT_HAND_OBJECT][ID] + '").getTextContent(), 10)';

        return leftHandExpression + ' + ' + rightHandExpression;
    });

    return arithmeticClause;
});
