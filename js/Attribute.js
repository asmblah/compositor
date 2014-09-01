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

    var TYPE = 'type';

    function Attribute(name, exporter) {
        this.exporter = exporter;
        this.name = name;
    }

    util.extend(Attribute.prototype, {
        exportForWidget: function (widget) {
            return this.exporter(widget);
        },

        getName: function () {
            return this.name;
        }
    });

    return Attribute;
});
