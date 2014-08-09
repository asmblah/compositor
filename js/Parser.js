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

    function Parser(repository, entryItemName) {
        this.repository = repository;
        this.entryItemName = entryItemName;
    }

    util.extend(Parser.prototype, {
        parse: function (text) {
            var parser = this,
                entryItem = parser.repository.getByName(parser.entryItemName),
                match = entryItem.match(text);

            if (!match || match.length < text.length) {
                throw new Error('Invalid syntax near "' + text.substr(match.length, 10) + '"');
            }

            return {
                ast: match.match,
                length: match.length
            };
        }
    });

    return Parser;
});
