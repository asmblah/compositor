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
    './Matcher'
], function (
    util,
    Matcher
) {
    'use strict';

    function RegExpMatcher(pattern) {
        Matcher.call(this);

        this.pattern = pattern;
    }

    util.inherit(RegExpMatcher).from(Matcher);

    util.extend(RegExpMatcher.prototype, {
        match: function (text, offset) {
            var match = text.substr(offset || 0).match(this.pattern);

            if (!match) {
                return null;
            }

            return {
                match: match,
                length: match[0].length
            };
        }
    });

    return RegExpMatcher;
});
