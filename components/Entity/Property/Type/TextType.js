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
    'js/Entity/Property/PropertyType'
], function (
    util,
    PropertyType
) {
    'use strict';

    function TextType() {
        PropertyType.call(this, 'text');
    }

    util.inherit(TextType).from(PropertyType);

    return TextType;
});
