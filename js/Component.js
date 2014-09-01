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
    'js/Event/EventTarget'
], function (
    util,
    EventTarget
) {
    'use strict';

    function Component(options) {
        EventTarget.call(this);

        this.options = options || {};
    }

    util.inherit(Component).from(EventTarget);

    util.extend(Component.prototype, {

    });

    return Component;
});
