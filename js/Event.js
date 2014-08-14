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

    function Event(name, options) {
        Component.call(this, options);

        this.name = name;
    }

    util.inherit(Event).from(Component);

    util.extend(Event.prototype, {
        getName: function () {
            return this.name;
        }
    });

    return Event;
});
