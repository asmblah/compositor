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
    'js/Component',
    'js/Matcher/Matcher'
], function (
    util,
    Component,
    Matcher
) {
    'use strict';

    function Clause(name, matcher, processor, options) {
        Component.call(this, options);

        this.name = name;
        this.matcher = Matcher.from(matcher);
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

        match: function (text, offset) {
            var clause = this,
                match = clause.matcher.match(text, offset),
                node;

            if (!match) {
                return match;
            }

            node = clause.processor(match);

            node.type = clause.name + 'Clause';

            return {
                match: node,
                length: match.length
            };
        }
    });

    return Clause;
});
