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
    './Matcher/Matcher',
    'js/Matcher/MultipleMatcher',
    'js/Matcher/OneOfMatcher',
    'js/Matcher/ReferenceMatcher',
    'js/Matcher/RegExpMatcher',
    'js/Matcher/SequenceMatcher'
], function (
    util,
    Matcher,
    MultipleMatcher,
    OneOfMatcher,
    ReferenceMatcher,
    RegExpMatcher,
    SequenceMatcher
) {
    'use strict';

    function Parser(repository, entryItemName) {
        this.repository = repository;
        this.entryItemName = entryItemName;
    }

    util.extend(Parser, {
        Multiple: MultipleMatcher,
        OneOf: OneOfMatcher,
        Reference: ReferenceMatcher,
        RegExp: RegExpMatcher,
        Sequence: SequenceMatcher
    });

    util.extend(Parser.prototype, {
        parse: function (text) {
            var parser = this,
                entryItem = parser.repository.getByName(parser.entryItemName),
                match = entryItem.match(text);

            if (!match || match.length < text.length) {
                throw new Error('Invalid syntax near "' + text.substr(match.length, 10) + '"');
            }

            return match.match;
        }
    });

    Matcher.setSubClasses(Parser);

    return Parser;
});
