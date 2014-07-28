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
    'js/Component'
], function (
    util,
    Component
) {
    'use strict';

    function Widget(options) {
        Component.call(this, options);
    }

    util.inherit(Widget).from(Component);

    util.extend(Widget.prototype, {

    });

    return Widget;
});
