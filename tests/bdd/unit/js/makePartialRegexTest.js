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
    'js/makePartialRegex'
], function (
    util,
    makePartialRegex
) {
    'use strict';

    describe('makePartialRegex() test', function () {
        util.each({
            'when the pattern is a single character': {
                pattern: /a/,
                string: 'a',
                expectedMatch: {
                    0: 'a',
                    input: 'a',
                    index: 0
                }
            },
            'when the pattern is just a simple literal and is only partially matched': {
                pattern: /hello world/,
                string: 'hel',
                expectedMatch: {
                    0: 'hel',
                    input: 'hel',
                    index: 0
                }
            },
            'when the pattern is just a simple literal and is not partially matched': {
                pattern: /hello world/,
                string: 'jax',
                expectedMatch: null
            },
            'when the pattern is anchored to start of string and is not partially matched': {
                pattern: /^hello world/,
                string: 'jax',
                expectedMatch: null
            },
            'when the pattern is anchored to start of string, immediately followed by a capturing group, and is not partially matched': {
                pattern: /^(hello) world/,
                string: 'jax',
                expectedMatch: null
            },
            'when the pattern has one literal capturing group and is only partially matched outside that group': {
                pattern: /welcome (to) the jungle/,
                string: 'welcome',
                expectedMatch: {
                    0: 'welcome',
                    1: undefined,
                    input: 'welcome',
                    index: 0
                }
            },
            'when the pattern has one literal capturing group and is only partially matched into that group': {
                pattern: /welcome (to) the jungle/,
                string: 'welcome t',
                expectedMatch: {
                    0: 'welcome t',
                    1: 't',
                    input: 'welcome t',
                    index: 0
                }
            },
            'when the pattern has one pattern capturing group and the match reaches into that group': {
                pattern: /what (.*?) you do\?/,
                string: 'what did',
                expectedMatch: {
                    0: 'what did',
                    1: 'did',
                    input: 'what did',
                    index: 0
                }
            },
            'when the pattern is not anchored to start of string, a partial match is possible but a full match is further along': {
                pattern: /first$/,
                string: 'first then second then first',
                expectedMatch: {
                    0: 'first',
                    input: 'first then second then first',
                    index: 23
                }
            },
            'when the pattern is not anchored to start of string but cannot match further along, and a partial match is not possible': {
                pattern: /first$/,
                string: 'first then second then third',
                expectedMatch: null
            },
            'when the anchored pattern should fail to match because it expects the end of the string, but a partial match is possible': {
                pattern: /^here there$/,
                string: 'here the',
                expectedMatch: {
                    0: 'here the',
                    input: 'here the',
                    index: 0
                }
            },
            'when the pattern contains a character class': {
                pattern: /hello [md]e/,
                string: 'hello me',
                expectedMatch: {
                    0: 'hello me',
                    input: 'hello me',
                    index: 0
                }
            },
            'when the pattern ends with a greedy quantifier': {
                pattern: /hello .*/,
                string: 'hello you and also you',
                expectedMatch: {
                    0: 'hello you and also you',
                    input: 'hello you and also you',
                    index: 0
                }
            },
            'when the pattern is not anchored to the end of the string and does not match it fully': {
                pattern: /welcome to here/,
                string: 'welcome to here, you',
                expectedMatch: {
                    0: 'welcome to here',
                    input: 'welcome to here, you',
                    index: 0
                }
            },
            'when the pattern contains an ungreedy capturing group followed by text': {
                pattern: /welcome to (.*?) near you/,
                string: 'welcome to somewhere near you',
                expectedMatch: {
                    0: 'welcome to somewhere near you',
                    1: 'somewhere',
                    input: 'welcome to somewhere near you',
                    index: 0
                }
            },
            'when the pattern uses alternation inside a capturing group': {
                pattern: /welcome to (it|that), you/,
                string: 'welcome to that, you',
                expectedMatch: {
                    0: 'welcome to that, you',
                    1: 'that',
                    input: 'welcome to that, you',
                    index: 0
                }
            }
        }, function (scenario, description) {
            describe(description, function () {
                var partializedRegex;

                beforeEach(function () {
                    partializedRegex = makePartialRegex(scenario.pattern);
                });

                it('should return the expected match', function () {
                    expect(scenario.string.match(partializedRegex)).to.deep.equal(scenario.expectedMatch);
                });
            });
        });
    });
});
