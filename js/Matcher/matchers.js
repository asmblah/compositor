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
    'js/util',
    'js/Matcher/Matcher',
    'js/Matcher/MultipleMatcher',
    'js/Matcher/OneOfMatcher',
    'js/Matcher/ReferenceMatcher',
    'js/Matcher/RegExpMatcher',
    'js/Matcher/SequenceMatcher'
], function (
    makePartialRegex,
    util,
    Matcher,
    MultipleMatcher,
    OneOfMatcher,
    ReferenceMatcher,
    RegExpMatcher,
    SequenceMatcher
) {
    'use strict';

    var matcherGroup = {
        from: function (matcher) {
            if (matcher instanceof Matcher) {
                return matcher;
            }

            if (util.isArray(matcher)) {
                return new SequenceMatcher(matcher);
            }

            if (matcher instanceof RegExp) {
                return new RegExpMatcher(makePartialRegex(matcher));
            }

            if (util.isString(matcher)) {
                return new ReferenceMatcher(matcher);
            }

            throw new Error('matchers.from() :: Unrecognised matcher "' + matcher + '"');
        },

        Multiple: MultipleMatcher,
        OneOf: OneOfMatcher,
        Reference: ReferenceMatcher,
        RegExp: RegExpMatcher,
        Sequence: SequenceMatcher
    };

    util.each([
        MultipleMatcher,
        OneOfMatcher,
        SequenceMatcher
    ], function (SubMatcher) {
        SubMatcher.setMatcherGroup(matcherGroup);
    });

    return matcherGroup;
});
