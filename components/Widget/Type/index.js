/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    './ButtonType',
    './CanvasType',
    './PageType',
    './RowType',
    './TextType'
], function (
    ButtonType,
    CanvasType,
    PageType,
    RowType,
    TextType
) {
    'use strict';

    return [
        ButtonType,
        CanvasType,
        PageType,
        RowType,
        TextType
    ];
});
