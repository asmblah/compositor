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

    function ReferenceMatcher(reference) {
        Matcher.call(this);

        this.reference = reference;
    }

    util.inherit(ReferenceMatcher).from(Matcher);

    util.extend(ReferenceMatcher.prototype, {
        match: function (text, offset) {
            var matcher = this,
                item = matcher.repository.getByName(matcher.reference);

            if (!item) {
                throw new Error('Non-existent item referenced in repository: "' + matcher.reference + '"');
            }

            return item.match(text, offset);
        }
    });

    return ReferenceMatcher;
});
