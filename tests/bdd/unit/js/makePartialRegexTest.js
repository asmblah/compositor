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
            'when the pattern is not anchored to start of string so should match further along': {
                pattern: /first$/,
                string: 'first then second then first',
                expectedMatch: {
                    0: 'first',
                    input: 'first then second then first',
                    index: 23
                }
            },
            'when the pattern should fail to match because it expects the end of the string': {
                pattern: /^here there$/,
                string: 'here there everywhere',
                expectedMatch: null
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
