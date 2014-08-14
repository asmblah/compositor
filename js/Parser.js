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

    var CAPTURE_LOCATION = 'captureLocation';

    function Parser(repository, entryItemName) {
        this.repository = repository;
        this.entryItemName = entryItemName;
    }

    util.extend(Parser.prototype, {
        parse: function (text, context, options) {
            var parser = this,
                entryItem = parser.repository.getByName(parser.entryItemName),
                match = entryItem.match(text, 0, {
                    captureLocation: !!options[CAPTURE_LOCATION],
                    context: context
                });

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
