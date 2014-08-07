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
    'js/Clause/Clause',
    'js/Repository/ClauseRepository',
    'js/Parser'
], function (
    util,
    Clause,
    ClauseRepository,
    Parser
) {
    'use strict';

    describe('Parser test', function () {
        var parser;

        beforeEach(function () {
            var clauseRepository = new ClauseRepository([
                    new Clause('Program', [
                        new Parser.Multiple(new Parser.OneOf(['Verb', 'When']))
                    ], function (match) {
                        var nodes = [];

                        if (match.length > 0) {
                            util.each(match.match, function (subMatch) {
                                nodes.push(subMatch[0].match);
                            });
                        }

                        return {
                            body: nodes
                        };
                    }),
                    new Clause('Verb', [/^([Oo]pen) (the) (door|magical seal)/], function (match) {
                        return {
                            article: match.match[0][2],
                            object: match.match[0][3],
                            verb: match.match[0][1]
                        };
                    }),
                    new Clause('When', [/^When (the) (.*?) is (.*?),\s*/, 'Verb', /\./], function (match) {
                        return {
                            article: match.match[0][1] || null,
                            object: match.match[0][2] || null,
                            verb: match.match[0][3] || null,
                            consequence: match.match[1] || null
                        };
                    })
                ]);

            parser = new Parser(clauseRepository, 'Program');
        });

        describe('parse()', function () {
            util.each({
                'when the input is an empty program': {
                    code: '',
                    expectedASTs: [{
                        type: 'ProgramClause',
                        body: []
                    }]
                },
                'when the input is a single clause': {
                    code: 'Open the door',
                    expectedASTs: [{
                        type: 'ProgramClause',
                        body: [{
                            type: 'VerbClause',
                            verb: 'Open',
                            article: 'the',
                            object: 'door'
                        }]
                    }]
                },
                'when the input has a nested clause': {
                    code: 'When the Z button is clicked, open the magical seal.',
                    expectedASTs: [{
                        type: 'ProgramClause',
                        body: [{
                            type: 'WhenClause',
                            article: 'the',
                            object: 'Z button',
                            verb: 'clicked',
                            consequence: {
                                type: 'VerbClause',
                                verb: 'open',
                                article: 'the',
                                object: 'magical seal'
                            }
                        }]
                    }]
                },
                'when the input partially matches one clause': {
                    code: 'When ',
                    expectedASTs: [{
                        type: 'ProgramClause',
                        body: [{
                            type: 'WhenClause',
                            article: null,
                            object: null,
                            verb: null,
                            consequence: null
                        }]
                    }]
                }
            }, function (scenario, description) {
                describe(description, function () {
                    it('should return the expected ASTs', function () {
                        expect(parser.parse(scenario.code)).to.deep.equal(scenario.expectedASTs);
                    });
                });
            });
        });
    });
});
