/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    './arithmeticClause',
    './programClause',
    './showClause',
    './whenClause'
], function (
    arithmeticClause,
    programClause,
    showClause,
    whenClause
) {
    'use strict';

    return [
        arithmeticClause,
        programClause,
        showClause,
        whenClause
    ];
});
