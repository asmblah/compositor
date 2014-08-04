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

    function OneOfMatcher(matchers) {
        var subMatchers = [];

        Matcher.call(this);

        util.each(matchers, function (subMatcher) {
            subMatchers.push(Matcher.from(subMatcher));
        });

        this.subMatchers = subMatchers;
    }

    util.inherit(OneOfMatcher).from(Matcher);

    util.extend(OneOfMatcher.prototype, {
        match: function (text, offset) {
            var match = null;

            util.each(this.subMatchers, function (subMatcher) {
                match = subMatcher.match(text, offset);

                if (match) {
                    return false;
                }
            });

            if (!match) {
                return null;
            }

            return {
                match: match,
                length: match.length
            };
        },

        setRepository: function (repository) {
            var matcher = this;

            Matcher.prototype.setRepository.call(matcher, repository);

            util.each(matcher.subMatchers, function (subMatcher) {
                subMatcher.setRepository(repository);
            });
        }
    });

    return OneOfMatcher;
});
