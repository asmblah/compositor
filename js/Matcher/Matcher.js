/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/makePartialRegex',
    'js/util'
], function (
    makePartialRegex,
    util
) {
    'use strict';

    function Matcher() {
        this.repository = null;
    }

    util.extend(Matcher.prototype, {
        setRepository: function (repository) {
            this.repository = repository;
        }
    });

    return Matcher;
});
