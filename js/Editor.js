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

    function Editor(parser, walker, options) {
        this.ast = null;
        this.contextMenu = new ContextMenu();
        this.options = options;
        this.parser = parser;
        this.program = null;
        this.walker = walker;
    }

    util.extend(Editor.prototype, {
        getAST: function () {
            return this.ast;
        },

        getContextMenu: function () {
            return this.contextMenu;
        },

        insert: function (text) {
            var editor = this,
                context = {
                    contextMenu: editor.contextMenu,
                    program: editor.program
                },
                ast = editor.parser.parse(text, context, {'captureLocation': true}).ast;

            editor.walker.walk(ast, {
                addContextMenuItem: function (item) {
                    editor.contextMenu.addItem(item);
                },
                program: editor.program,
                setContextMenuTextPosition: function (textPosition) {
                    editor.contextMenu.setTextPosition(textPosition);
                }
            });

            if (editor.contextMenu.getItems().length > 0) {
                editor.contextMenu.show();
            }

            editor.ast = ast;
        },

        load: function (program) {
            var editor = this;

            editor.program = program;
        }
    });

    return Editor;
});
