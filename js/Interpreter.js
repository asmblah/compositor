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
    'js/Promise'
], function (
    util,
    Promise
) {
    'use strict';

    var TYPE = 'type';

    function Interpreter(clauseRepository) {
        this.clauseRepository = clauseRepository;
    }

    util.extend(Interpreter.prototype, {
        interpret: function (program, node) {
            /*jshint evil: true */

            function interpret(node) {
                var clause,
                    code = '';

                if (node) {
                    clause = clauseRepository.getByQualifiedName(node[TYPE]);
                    code = clause.interpret(node, interpret);
                }

                return code;
            }

            var clauseRepository = this.clauseRepository,
                result = new Function('program', interpret(node))(program);

            return new Promise().resolve(result);
        }
    });

    return Interpreter;
});
