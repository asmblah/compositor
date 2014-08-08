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
                        new Parser.Multiple([new Parser.OneOf(['Verb', 'When', 'Where']), /\.\s*/])
                    ], function (match) {
                        var body = [];

                        if (match.length > 0) {
                            util.each(match, function (match) {
                                body.push(match[0]);
                            });
                        }

                        return {
                            body: body
                        };
                    }),
                    new Clause('Verb', [/^([Oo]pen) (the) (door|magical seal)/], function (match) {
                        return {
                            article: match[2],
                            object: match[3],
                            verb: match[1]
                        };
                    }),
                    new Clause('When', [/^When (the) (.*?) is (.*?),\s*/, 'Verb'], function (match, consequence) {
                        return {
                            article: match[1] || null,
                            object: match[2] || null,
                            verb: match[3] || null,
                            consequence: consequence || null
                        };
                    }),
                    new Clause('Where', [/^Where is (.*?)/], function (match) {
                        return {
                            object: match[1] || null
                        };
                    })
                ]);

            parser = new Parser(clauseRepository, 'Program');
        });

        describe('parse()', function () {
            util.each({
                'when the input is an empty program': {
                    code: '',
                    expectedAST: {
                        type: 'ProgramClause',
                        body: []
                    },
                    expectedLength: 0
                },
                'when the input is a single clause': {
                    code: 'Open the door',
                    expectedAST: {
                        type: 'ProgramClause',
                        body: [
                            [{
                                type: 'VerbClause',
                                verb: 'Open',
                                article: 'the',
                                object: 'door'
                            }]
                        ]
                    },
                    expectedLength: 13
                },
                'when the input has a nested clause': {
                    code: 'When the Z button is clicked, open the magical seal.',
                    expectedAST: {
                        type: 'ProgramClause',
                        body: [
                            [{
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
                        ]
                    },
                    expectedLength: 52
                },
                'when the input partially matches one clause': {
                    code: 'When ',
                    expectedAST: {
                        type: 'ProgramClause',
                        body: [
                            [{
                                type: 'WhenClause',
                                article: null,
                                object: null,
                                verb: null,
                                consequence: null
                            }]
                        ]
                    },
                    expectedLength: 5
                },
                'when the input partially matches multiple clauses': {
                    code: 'Whe',
                    expectedAST: {
                        type: 'ProgramClause',
                        body: [
                            [{
                                type: 'WhenClause',
                                article: null,
                                object: null,
                                verb: null,
                                consequence: null
                            }, {
                                type: 'WhereClause',
                                object: null
                            }]
                        ]
                    },
                    expectedLength: 3
                },
                'when the input fully matches one clause, then next partially matches multiple clauses': {
                    code: 'Open the door. Whe',
                    expectedAST: {
                        type: 'ProgramClause',
                        body: [
                            [{
                                type: 'VerbClause',
                                verb: 'Open',
                                article: 'the',
                                object: 'door'
                            }],
                            [{
                                type: 'WhenClause',
                                article: null,
                                object: null,
                                verb: null,
                                consequence: null
                            }, {
                                type: 'WhereClause',
                                object: null
                            }]
                        ]
                    },
                    expectedLength: 18
                }
            }, function (scenario, description) {
                describe(description, function () {
                    it('should return the expected AST', function () {
                        expect(parser.parse(scenario.code).ast).to.deep.equal(scenario.expectedAST);
                    });

                    it('should return a match of the correct length', function () {
                        expect(parser.parse(scenario.code).length).to.equal(scenario.expectedLength);
                    });
                });
            });
        });
    });
});
