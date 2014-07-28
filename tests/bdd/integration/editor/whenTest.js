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
    'js/Compositor',
    'js/Widget'
], function (
    util,
    Compositor,
    Widget
) {
    'use strict';

    describe('Editor "When" action integration test', function () {
        var compositor,
            contextMenu,
            display,
            editor,
            program;

        beforeEach(function () {
            compositor = new Compositor();

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
                expectedContextMenuItems: [
                    {type: 'program'}
                ]
            },
            'when the program has two widgets and the developer types "When" followed by a space': {
                initialComponents: {
                    widgets: {
                        'button1': {},
                        'button2': {}
                    }
                },
                typedText: 'When ',
                expectContextMenu: true,
                expectedContextMenuItems: [
                    {type: 'program'},
                    {type: 'widget', id: 'button1'},
                    {type: 'widget', id: 'button2'}
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

                        util.each(scenario.expectedContextMenuItems, function (attributes) {
                            if (attributes.type === 'program') {
                                it('should show a context menu item that represents the running program', function () {
                                    expect(contextMenu.showsComponent(program)).to.be.true;
                                });
                            } else {
                                it('should show a context menu item that represents widget "' + attributes.id + '"', function () {
                                    var widget = program.getWidgetByID(attributes.id);

                                    expect(contextMenu.showsComponent(widget)).to.be.true;
                                });
                            }
                        });

                        it('should not show a context menu item that represents an invalid widget', function () {
                            expect(contextMenu.showsComponent(new Widget())).to.be.false;
                        });
                    } else {
                        it('should not display the context menu', function () {
                            expect(contextMenu.isVisible()).to.be.false;
                        });
                    }
                });
            });
        });
    });
});
