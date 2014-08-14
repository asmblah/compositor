/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/Matcher/matchers',
    'js/util',
    'js/Component'
], function (
    matchers,
    util,
    Component
) {
    'use strict';

    function Clause(name, matcher, processor, options) {
        Component.call(this, options);

        this.name = name;
        this.matcher = matchers.from(matcher);
        this.processor = processor;
    }

    util.inherit(Clause).from(Component);

    util.extend(Clause.prototype, {
        getMatcher: function () {
            return this.matcher;
        },

        getName: function () {
            return this.name;
        },

        getProcessor: function () {
            return this.processor;
        },

        match: function (text, offset, context) {
            var clause = this,
                match = clause.matcher.match(text, offset, context),
                node;

            if (!match) {
                return match;
            }

            node = util.isArray(match.match) ?
                clause.processor.apply(context.context, match.match) :
                clause.processor.call(context.context, match.match);

            node.type = clause.name + 'Clause';

            if (context.captureLocation) {
                node.location = {
                    start: offset,
                    end: offset + match.length
                };
            }

            return {
                match: node,
                length: match.length
            };
        }
    });

    return Clause;
});
