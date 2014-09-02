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

    describe('UI "row" widget integration test', function () {
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
            'when the developer does not add any widgets to the program': {
                initialComponents: {
                    widgets: {}
                },
                widgetOperations: [],
                expectedExportedSnapshot: {
                    behaviour: {},
                    ui: {
                        widget: 'canvas',
                        pages: [{
                            widget: 'page',
                            id: 'page1',
                            children: []
                        }]
                    }
                }
            },
            'when the developer adds a single row with 3 columns containing text to the default page': {
                initialComponents: {
                    widgets: {}
                },
                widgetOperations: [
                    {widget: 'row', inside: 'page1', as: 'my_row', with: {columns: 3}},
                    {widget: 'text', inside: 'my_row', column: 0, span: 1, with: {
                        text: 'My heading'
                    }},
                    {widget: 'text', inside: 'my_row', column: 1, span: 1, with: {
                        text: 'This is the first column of text.'
                    }},
                    {widget: 'text', inside: 'my_row', column: 2, span: 1, with: {
                        text: 'This is the second column of text.'
                    }}
                ],
                expectedExportedSnapshot: {
                    behaviour: {},
                    ui: {
                        widget: 'canvas',
                        pages: [{
                            widget: 'page',
                            id: 'page1',
                            children: [{
                                widget: 'row',
                                id: 'my_row',
                                columns: [
                                    [{
                                        widget: 'text',
                                        text: 'My heading'
                                    }],
                                    [{
                                        widget: 'text',
                                        text: 'This is the first column of text.'
                                    }],
                                    [{
                                        widget: 'text',
                                        text: 'This is the second column of text.'
                                    }]
                                ]
                            }]
                        }]
                    }
                }
            }
        }, function (scenario, description) {
            describe(description, function () {
                beforeEach(function (done) {
                    program.load(scenario.initialComponents).done(function () {
                        util.each(scenario.widgetOperations, function (widgetOperation) {
                            var widgetType = program.getWidgetTypeByName(widgetOperation.widget),
                                parentWidget = program.getWidgetByID(widgetOperation.inside),
                                childWidget = widgetType.spawn(widgetOperation.as, widgetOperation.with);

                            parentWidget.appendChild(childWidget);
                        });

                        done();
                    });
                });

                it('should result in the expected structure when a snapshot is exported', function () {
                    expect(program.exportSnapshot()).to.deep.equal(scenario.expectedExportedSnapshot);
                });
            });
        });
    });
});
