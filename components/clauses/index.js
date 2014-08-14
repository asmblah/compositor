/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    './programClause',
    './whenClause'
], function (
    programClause,
    whenClause
) {
    'use strict';

    return [
        programClause,
        whenClause
    ];
});
