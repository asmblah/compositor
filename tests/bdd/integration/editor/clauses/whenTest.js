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

    describe('Editor "When" clause integration test', function () {
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
            'when the program has no widgets and the developer types "When" followed by a space': {
                initialComponents: {
                    widgets: {}
                },
                typedText: 'When ',
                expectContextMenu: true,
                expectedContextMenuTextPosition: 5,
                expectedContextMenuItems: [
                    {type: 'program'}
                ],
                unexpectedContextMenuItems: [
                    {type: 'invalid_widget'}
                ]
            },
            'when the program has two widgets and the developer types "When" followed by a space': {
                initialComponents: {
                    widgets: {
                        'button1': {type: 'button'},
                        'button2': {type: 'button'}
                    }
                },
                typedText: 'When ',
                expectContextMenu: true,
                expectedContextMenuTextPosition: 5,
                expectedContextMenuItems: [
                    {type: 'program'},
                    {type: 'widget', id: 'button1'},
                    {type: 'widget', id: 'button2'}
                ],
                unexpectedContextMenuItems: [
                    {type: 'invalid_widget'}
                ]
            },
            'when the developer views a list of available events of a widget by typing "When " then selecting the widget and typing a space': {
                initialComponents: {
                    widgets: {
                        'my_button': {type: 'button'}
                    }
                },
                typedText: 'When my_button ',
                expectContextMenu: true,
                expectedContextMenuTextPosition: 15,
                expectedContextMenuItems: [
                    {type: 'event', widgetID: 'my_button', name: 'click'}
                ],
                unexpectedContextMenuItems: [
                    {type: 'program'},
                    {type: 'widget', id: 'button1'},
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
