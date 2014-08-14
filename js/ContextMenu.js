/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/util'
], function (
    util
) {
    'use strict';

    function ContextMenu() {
        this.items = [];
        this.textPosition = 0;
        this.visible = false;
    }

    util.extend(ContextMenu.prototype, {
        addItem: function (item) {
            this.items.push(item);
        },

        getItems: function () {
            return this.items.slice();
        },

        getTextPosition: function () {
            return this.textPosition;
        },

        hide: function () {
            this.visible = false;
        },

        isVisible: function () {
            return this.visible;
        },

        setTextPosition: function (textPosition) {
            this.textPosition = textPosition;
        },

        show: function () {
            this.visible = true;
        },

        showsComponent: function (component) {
            return this.items.indexOf(component) > -1;
        }
    });

    return ContextMenu;
});
