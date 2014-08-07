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

    function SequenceMatcher(matchers) {
        var subMatchers = [];

        Matcher.call(this);

        util.each(matchers, function (subMatcher) {
            subMatchers.push(Matcher.from(subMatcher));
        });

        this.subMatchers = subMatchers;
    }

    util.inherit(SequenceMatcher).from(Matcher);

    util.extend(SequenceMatcher.prototype, {
        match: function (text, offset) {
            var length = 0,
                matches = [];

            offset = offset || 0;

            util.each(this.subMatchers, function (subMatcher) {
                var match = subMatcher.match(text, offset);

                if (!match) {
                    return false;
                }

                matches.push(match.match);

                offset += match.length;
                length += match.length;
            });

            if (matches.length === 0) {
                return null;
            }

            return {
                match: matches,
                length: length
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

    return SequenceMatcher;
});
