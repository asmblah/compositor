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

    var BODY = 'body';

    var programClause = new Clause('Program', [
        new matchers.Multiple([new matchers.OneOf(['When']), /\.\s*/])
    ], function (match) {
        var body = [];

        if (match.length > 0) {
            util.each(match, function (match) {
                body.push(match[0]);
            });
        }

        return {
            'body': body
        };
    }, function (node, walkSubNode) {
        util.each(node[BODY], function (subNode) {
            walkSubNode(subNode[0]);
        });
    }, function (node, interpret) {
        var code = '';

        util.each(node[BODY][0], function (bodyNode) {
            code += interpret(bodyNode);
        });

        return code;
    });

    return programClause;
});
