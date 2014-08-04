/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/util'
], function (
    util
) {
    'use strict';

    var ReferenceMatcher,
        RegExpMatcher,
        SequenceMatcher;

    function Matcher() {
        this.repository = null;
    }

    util.extend(Matcher, {
        from: function (matcher) {
            if (matcher instanceof Matcher) {
                return matcher;
            }

            if (util.isArray(matcher)) {
                return new SequenceMatcher(matcher);
            }

            if (matcher instanceof RegExp) {
                return new RegExpMatcher(matcher);
            }

            if (util.isString(matcher)) {
                return new ReferenceMatcher(matcher);
            }

            throw new Error('Matcher.from() :: Unrecognised matcher "' + matcher + '"');
        },

        setSubClasses: function (Parser) {
            ReferenceMatcher = Parser.Reference;
            RegExpMatcher = Parser.RegExp;
            SequenceMatcher = Parser.Sequence;
        }
    });

    util.extend(Matcher.prototype, {
        setRepository: function (repository) {
            this.repository = repository;
        }
    });

    return Matcher;
});
