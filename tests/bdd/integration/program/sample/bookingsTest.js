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
    'js/Widget/Widget',
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
    Widget,
    WidgetTypeClassRepository
) {
    'use strict';

    describe('Bookings example program integration test', function () {
        var behaviourText = util.heredoc(function () {/*<<<EOS
When update is clicked, show total number of passengers of class passenger_class in passenger_count
EOS
*/;}), // jshint ignore:line
            entityDefinitions = {
                'Passenger': {
                    properties: [
                        {property: 'text', name: 'class', constraints: []},
                        {property: 'text', name: 'name', constraints: []}
                    ]
                }
            },
            entities = {
                'Passenger': [
                    {'class': 'First', 'name': 'Frank Bernard-Wimslow'},
                    {'class': 'First', 'name': 'Albert Bartlett-Flamingo'},
                    {'class': 'Business', 'name': 'George Robertson'},
                    {'class': 'Coach', 'name': 'Fred Ericksson'}
                ]
            },
            widgets = {
                'passenger_class': {
                    type: 'select',
                    options: [
                        'Coach',
                        'Business',
                        'First'
                    ]
                },
                'passenger_count': {
                    type: 'textbox',
                    textContent: '0'
                },
                'update': {
                    type: 'button'
                }
            },
            compositor,
            contextMenu,
            display,
            editor,
            parser,
            program;

        beforeEach(function () {
            var clauseRepository = new ClauseRepository(clauses),
                propertyTypeClassRepository = new PropertyTypeClassRepository(propertyTypeClasses),
                widgetTypeClassRepository = new WidgetTypeClassRepository(widgetTypeClasses);

            parser = new Parser(clauseRepository, 'Program');
            compositor = new Compositor(clauseRepository, widgetTypeClassRepository, propertyTypeClassRepository, parser);

            program = compositor.createProgram();
            editor = compositor.createEditor();
            display = compositor.createDisplay();

            contextMenu = editor.getContextMenu();

            editor.load(program);
            display.load(program);
        });

        util.each({
            'when the user selects Business class but does not click "Update"': {
                uiInteractions: [
                    {type: 'select option', widget: 'passenger_class', text: 'Business'}
                ],
                expectedResults: {
                    'should leave the initial 0 in passenger_count': {
                        widget: 'passenger_count',
                        expectedTextContent: '0'
                    }
                }
            },
            'when the user selects First class and clicks "Update"': {
                uiInteractions: [
                    {type: 'select option', widget: 'passenger_class', text: 'First'},
                    {type: 'click', widget: 'update'}
                ],
                expectedResults: {
                    'should display 2 as the passenger count': {
                        widget: 'passenger_count',
                        expectedTextContent: '2'
                    }
                }
            }
        }, function (scenario, description) {
            describe(description, function () {
                beforeEach(function (done) {
                    program.loadEntityDefinitions(entityDefinitions);
                    program.loadEntities(entities);
                    program.loadUI(widgets);
                    editor.insert(behaviourText);
                    program.loadBehaviour(editor.getAST());

                    program.load().done(function () {
                        util.each(scenario.uiInteractions, function (uiInteraction) {
                            var widget = program.getWidgetByID(uiInteraction.widget);

                            if (uiInteraction.type === 'enter text') {
                                widget.setTextContent(uiInteraction.text);
                            } else if (uiInteraction.type === 'select option') {
                                widget.getChildByTextContent(uiInteraction.text).select();
                            } else if (uiInteraction.type === 'click') {
                                widget.click();
                            }
                        });

                        done();
                    });
                });

                util.each(scenario.expectedResults, function (expectedResult, description) {
                    if (expectedResult.widget) {
                        it(description, function () {
                            expect(program.getWidgetByID(expectedResult.widget).getTextContent()).to.equal(expectedResult.expectedTextContent);
                        });
                    }
                });
            });
        });
    });
});
