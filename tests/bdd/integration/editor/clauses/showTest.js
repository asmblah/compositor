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

    describe('Editor "Show" clause integration test', function () {
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
            'when the developer views a list of available widgets for the result of an arithmetic expression': {
                initialComponents: {
                    widgets: {
                        'lhs': {type: 'textbox'},
                        'rhs': {type: 'textbox'},
                        'result': {type: 'textbox'},
                        'add_button': {type: 'button'}
                    }
                },
                typedText: 'When add_button is clicked, show lhs plus rhs in ',
                expectContextMenu: true,
                expectedContextMenuTextPosition: 49,
                expectedContextMenuItems: [
                    {type: 'widget', id: 'lhs'},
                    {type: 'widget', id: 'rhs'},
                    {type: 'widget', id: 'result'},
                    {type: 'widget', id: 'add_button'}
                ],
                unexpectedContextMenuItems: [
                    {type: 'program'},
                    {type: 'invalid_widget'}
                ]
            }
        }, function (scenario, description) {
            describe(description, function () {
                beforeEach(function (done) {
                    program.load(scenario.initialComponents).done(function () {
                        done();
                    });
                });

                describe('when the developer types the text', function () {
                    beforeEach(function () {
                        editor.insert(scenario.typedText);
                    });

                    if (scenario.expectContextMenu) {
                        it('should display the context menu', function () {
                            expect(contextMenu.isVisible()).to.be.true;
                        });
                    } else {
                        it('should not display the context menu', function () {
                            expect(contextMenu.isVisible()).to.be.false;
                        });
                    }

                    if (scenario.hasOwnProperty('expectedContextMenuTextPosition')) {
                        it('should display the context menu at the correct text position', function () {
                            expect(contextMenu.getTextPosition()).to.equal(scenario.expectedContextMenuTextPosition);
                        });
                    }

                    util.each(scenario.expectedContextMenuItems, function (attributes) {
                        if (attributes.type === 'program') {
                            it('should show a context menu item that represents the running program', function () {
                                expect(contextMenu.showsComponent(program)).to.be.true;
                            });
                        } else if (attributes.type === 'event') {
                            it('should show a context menu item that represents event "' + attributes.name + '"', function () {
                                var event = program.getWidgetByID(attributes.widgetID).getEventTypeByName(attributes.name);

                                expect(contextMenu.showsComponent(event)).to.be.true;
                            });
                        } else {
                            it('should show a context menu item that represents widget "' + attributes.id + '"', function () {
                                var widget = program.getWidgetByID(attributes.id);

                                expect(contextMenu.showsComponent(widget)).to.be.true;
                            });
                        }
                    });

                    util.each(scenario.unexpectedContextMenuItems, function (attributes) {
                        if (attributes.type === 'program') {
                            it('should not show a context menu item that represents the running program', function () {
                                expect(contextMenu.showsComponent(program)).to.be.false;
                            });
                        } else if (attributes.type === 'event') {
                            it('should not show a context menu item that represents event "' + attributes.name + '"', function () {
                                var event = program.getWidgetByID(attributes.widgetID).getEventTypeByName(attributes.name);

                                expect(contextMenu.showsComponent(event)).to.be.false;
                            });
                        } else if (attributes.type === 'invalid_widget') {
                            it('should not show a context menu item that represents an invalid widget', function () {
                                expect(contextMenu.showsComponent(new Widget())).to.be.false;
                            });
                        } else {
                            it('should not show a context menu item that represents widget "' + attributes.id + '"', function () {
                                var widget = program.getWidgetByID(attributes.id);

                                expect(contextMenu.showsComponent(widget)).to.be.false;
                            });
                        }
                    });
                });
            });
        });
    });
});
