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
    './OptionType',
    './PageType',
    './RowType',
    './SelectType',
    './TextBoxType',
    './TextType'
], function (
    ButtonType,
    CanvasType,
    OptionType,
    PageType,
    RowType,
    SelectType,
    TextBoxType,
    TextType
) {
    'use strict';

    return [
        ButtonType,
        CanvasType,
        OptionType,
        PageType,
        RowType,
        SelectType,
        TextBoxType,
        TextType
    ];
});
