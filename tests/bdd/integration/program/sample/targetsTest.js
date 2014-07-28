/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    './Fixtures/targetsComponents',
    'js/util',
    'js/Compositor',
    'js/Widget'
], function (
    components,
    util,
    Compositor,
    Widget
) {
    'use strict';

    describe('Targets example program integration test', function () {
        var compositor,
            display,
            editor,
            program;

        beforeEach(function (done) {
            compositor = new Compositor();

            program = compositor.createProgram();
            editor = compositor.createEditor();
            display = compositor.createDisplay();

            //editor.attachTo(document.getElementById("editor"));
            //display.attachTo(document.getElementById("display"));

            editor.load(program);
            display.load(program);

            program.load(components).done(function () {
                done();
            });
        });

        describe('when the program first loads', function () {
            it('should add the subject list screen widget to the display', function () {
                expect(display.getWidgetByID('subject_list_screen')).to.be.an.instanceOf(Widget);
            });

            it('should add the subject screen to the display', function () {
                expect(display.getWidgetByID('subject_screen')).to.be.an.instanceOf(Widget);
            });
        });
    });
});
