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

    describe('Adder example program integration test', function () {
        var behaviourText = util.heredoc(function () {/*<<<EOS
When calculate is clicked, show lhs plus rhs in result
EOS
*/;}), // jshint ignore:line
            widgets = {
                'lhs': {
                    type: 'textbox'
                },
                'rhs': {
                    type: 'textbox'
                },
                'result': {
                    type: 'text'
                },
                'calculate': {
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
            'when the user adds 2 to 3': {
                uiInteractions: [
                    {type: 'enter text', widget: 'lhs', text: '2'},
                    {type: 'enter text', widget: 'rhs', text: '3'},
                    {type: 'click', widget: 'calculate'}
                ],
                expectedResults: {
                    'should display 5 as the result': {
                        widget: 'result',
                        expectedTextContent: '5'
                    }
                }
            },
            'when the user adds 3 to 4': {
                uiInteractions: [
                    {type: 'enter text', widget: 'lhs', text: '3'},
                    {type: 'enter text', widget: 'rhs', text: '4'},
                    {type: 'click', widget: 'calculate'}
                ],
                expectedResults: {
                    'should display 7 as the result': {
                        widget: 'result',
                        expectedTextContent: '7'
                    }
                }
            }
        }, function (scenario, description) {
            describe(description, function () {
                beforeEach(function (done) {
                    program.loadUI(widgets);
                    editor.insert(behaviourText);
                    program.loadBehaviour(editor.getAST());

                    program.load().done(function () {
                        util.each(scenario.uiInteractions, function (uiInteraction) {
                            var widget = program.getWidgetByID(uiInteraction.widget);

                            if (uiInteraction.type === 'enter text') {
                                widget.setTextContent(uiInteraction.text);
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
