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

    var TYPE = 'type';

    function Walker(componentRepository) {
        this.componentRepository = componentRepository;
    }

    util.extend(Walker.prototype, {
        walk: function (ast, context) {
            var walker = this;

            function walkNode(node) {
                var component = walker.componentRepository.getByQualifiedName(node[TYPE]);

                if (!component) {
                    throw new Error('Walker.walk() :: Unrecognised AST node type "' + node[TYPE] + '"');
                }

                component.walk(node, walkNode, context);
            }

            walkNode(ast);
        }
    });

    return Walker;
});
