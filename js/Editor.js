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
    'js/ContextMenu'
], function (
    util,
    ContextMenu
) {
    'use strict';

    function Editor(options) {
        this.contextMenu = new ContextMenu();
        this.options = options;
        this.program = null;
    }

    util.extend(Editor.prototype, {
        getContextMenu: function () {
            return this.contextMenu;
        },

        insert: function (text) {
            var editor = this;

            editor.contextMenu.addItem(editor.program);

            util.each(editor.program.getWidgets(), function (widget) {
                editor.contextMenu.addItem(widget);
            });

            editor.contextMenu.show();
        },

        load: function (program) {
            var editor = this;

            editor.program = program;
        }
    });

    return Editor;
});
