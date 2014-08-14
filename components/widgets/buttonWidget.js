/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/Event',
    'js/Widget'
], function (
    Event,
    Widget
) {
    'use strict';

    var buttonWidget = new Widget('button');

    buttonWidget.addEvent(new Event('click'));

    return buttonWidget;
});
