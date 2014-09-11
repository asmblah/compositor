/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/Matcher/matchers',
    'js/util',
    'js/Clause/Clause'
], function (
    matchers,
    util,
    Clause
) {
    'use strict';

    var EXPRESSION = 'expression',
        INVALID_EXPRESSION = 'invalid_expression';

    var countClause = new Clause('Count', [/^total number of /, new matchers.OneOf(['Filter'])], function (match1, match2) {
        var expression = match2 ? match2[0] : '';

        return {
            'expression': expression || {
                'type': INVALID_EXPRESSION,
                'invalid_match_offset': 0
            }
        };
    }, function () {

    }, function (node, interpret) {
        return interpret(node[EXPRESSION]) + '.length';
    });

    return countClause;
});
