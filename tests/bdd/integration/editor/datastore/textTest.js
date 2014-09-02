/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'components/clauses/index',
    'components/Entity/Property/Type/index',
    'js/util',
    'components/Widget/Type/index',
    'js/Repository/ClauseRepository',
    'js/Compositor',
    'js/Parser',
    'js/Repository/PropertyTypeClassRepository',
    'js/Repository/WidgetTypeClassRepository'
], function (
    clauses,
    propertyTypeClasses,
    util,
    widgetTypeClasses,
    ClauseRepository,
    Compositor,
    Parser,
    PropertyTypeClassRepository,
    WidgetTypeClassRepository
) {
    'use strict';

    describe('Datastore "text" entity property integration test', function () {
        var compositor,
            contextMenu,
            display,
            editor,
            program;

        beforeEach(function () {
            var clauseRepository = new ClauseRepository(clauses),
                parser = new Parser(clauseRepository, 'Program'),
                propertyTypeClassRepository = new PropertyTypeClassRepository(propertyTypeClasses),
                widgetTypeClassRepository = new WidgetTypeClassRepository(widgetTypeClasses);

            compositor = new Compositor(clauseRepository, widgetTypeClassRepository, propertyTypeClassRepository, parser);

            program = compositor.createProgram();
            editor = compositor.createEditor();
            display = compositor.createDisplay();

            contextMenu = editor.getContextMenu();

            editor.load(program);
            display.load(program);
        });

        util.each({
            'when the developer does not add any entity types to the program': {
                initialComponents: {},
                entityDefinitionOperations: [],
                expectedExportedDataStructureSnapshot: {
                    entityDefinitions: {}
                }
            },
            'when the developer adds one entity type to the program with one text property with no constraints': {
                initialComponents: {},
                entityDefinitionOperations: [
                    {as: 'Planet'},
                    {property: 'text', to: 'Planet', as: 'planet_name'}
                ],
                expectedExportedDataStructureSnapshot: {
                    entityDefinitions: {
                        'Planet': {
                            properties: [
                                {property: 'text', name: 'planet_name', constraints: []}
                            ]
                        }
                    }
                }
            }
        }, function (scenario, description) {
            describe(description, function () {
                beforeEach(function (done) {
                    program.load(scenario.initialComponents).done(function () {
                        util.each(scenario.entityDefinitionOperations, function (entityDefinitionOperation) {
                            var entityDefinition,
                                propertyType,
                                property;

                            // Adding a property to an entity
                            if (entityDefinitionOperation.hasOwnProperty('property')) {
                                entityDefinition = program.getEntityDefinitionByName(entityDefinitionOperation.to);
                                propertyType = program.getPropertyTypeByName(entityDefinitionOperation.property);
                                property = propertyType.spawn(entityDefinitionOperation.as);

                                entityDefinition.addProperty(property);
                            // Adding a new entity
                            } else {
                                program.createEntityDefinition(entityDefinitionOperation.as);
                            }
                        });

                        done();
                    });
                });

                it('should result in the expected structure when a snapshot of the data structure is exported', function () {
                    expect(program.exportDataStructureSnapshot()).to.deep.equal(scenario.expectedExportedDataStructureSnapshot);
                });
            });
        });
    });
});
