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
    './countClause',
    './filterType',
    './programClause',
    './showClause',
    './whenClause'
], function (
    arithmeticClause,
    countClause,
    filterType,
    programClause,
    showClause,
    whenClause
) {
    'use strict';

    return [
        arithmeticClause,
        countClause,
        filterType,
        programClause,
        showClause,
        whenClause
    ];
});
