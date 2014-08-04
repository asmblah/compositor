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
    './Matcher'
], function (
    util,
    Matcher
) {
    'use strict';

    function MultipleMatcher(matcher) {
        Matcher.call(this);

        this.matcher = Matcher.from(matcher);
    }

    util.inherit(MultipleMatcher).from(Matcher);

    util.extend(MultipleMatcher.prototype, {
        match: function (text, offset) {
            /*jshint loopfunc:true */
            var matcher = this,
                length = 0,
                match,
                matches = [];

            offset = offset || 0;

            while (offset < text.length) {
                match = matcher.matcher.match(text, offset);

                if (!match) {
                    break;
                }

                matches.push(match.match);

                offset += match.length;
                length += match.length;
            }

            return {
                match: matches,
                length: length
            };
        },

        setRepository: function (repository) {
            Matcher.prototype.setRepository.call(this, repository);

            this.matcher.setRepository(repository);
        }
    });

    return MultipleMatcher;
});
