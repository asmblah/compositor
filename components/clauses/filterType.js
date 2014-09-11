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

    var ENTITY_DEFINITION = 'entityDefinition',
        ID = 'id',
        NAME = 'name',
        PROPERTY = 'property',
        PROPERTY_VALUE = 'propertyValue';

    var filterClause = new Clause('Filter', [/^([^ ]+?)s? of ([^ ]+?) ([^ ]+)/], function (match1) {
        var context = this,
            entityDefinition,
            entityDefinitionName = match1 ? match1[1] : '',
            property,
            propertyName = match1 ? match1[2] : '',
            propertyValue,
            propertyValueExpression = match1 ? match1[3] : '';

        function processPropertyValue(expression) {
            var widget = context.program.getWidgetByID(expression);

            return widget ? {
                'type': 'widget',
                'id': expression
            } : null;
        }

        entityDefinition = context.program.getEntityDefinitionByName(entityDefinitionName);
        property = entityDefinition ? entityDefinition.getPropertyByName(propertyName) : null;
        propertyValue = propertyValueExpression ? processPropertyValue(propertyValueExpression) : null;

        return {
            'entityDefinition': entityDefinition ? {
                'type': 'entityDefinition',
                'name': entityDefinitionName
            } : {
                'type': 'invalid_component',
                'invalid_name': entityDefinitionName,
                'invalid_match_offset': 0
            },
            'property': property ? {
                'type': 'property',
                'name': propertyName
            } : {
                'type': 'invalid_name',
                'invalid_name': propertyName,
                'invalid_match_offset': 0
            },
            'propertyValue': propertyValue
        };
    }, function () {

    }, function (node) {
        var propertyValueExpression = 'program.getWidgetByID("' + node[PROPERTY_VALUE][ID] + '").getTextContent()',
            args = '{"' + node[PROPERTY][NAME] + '": ' + propertyValueExpression + '}';

        return 'program.getEntityDefinitionByName("' + node[ENTITY_DEFINITION][NAME] + '").getEntitiesBy(' + args + ')';
    });

    return filterClause;
});
