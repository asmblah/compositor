/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define(function () {
    'use strict';

    function processGroup(source, position) {
        var endPattern = (position === 0) ? /^$/ : /^\)/,
            firstNonZeroWidthTokenIndex = source.search(/[^^]/),
            index,
            match,
            result = '',
            closing = '',
            pattern = '',
            token,
            tokenLength;

        for (index = position; index < source.length && !endPattern.test(source.substr(index)); index += tokenLength) {
            // Advance one token
            match = source.substr(index).match(/^(\\[\s\S]|\[[^\]]*\]|[\s\S])[.*?+]*/);

            if (match) {
                token = match[0];
                tokenLength = token.length;

                // Making everything optional makes everything lazy,
                // so make sure any lazy quantifiers are removed
                if (/[*+]\?$/.test(token)) {
                    token = token.substr(0, token.length - 1);
                }
            } else {
                token = source.charAt(index);
                tokenLength = token.length;
            }

            if (token === '(') {
                result = processGroup(source, index + 1);
                pattern += '(' + result.pattern + ')';
                index = result.nextPosition;
            } else {
                if (index <= firstNonZeroWidthTokenIndex) {
                    pattern += token;
                } else {
                    pattern += '(?:' + token;
                    closing += ')?';
                }
            }
        }

        return {
            pattern: pattern + closing,
            nextPosition: index
        };
    }

    function makePartialRegex(regex) {
        return new RegExp(processGroup(regex.source, 0).pattern + '(?!^)');
    }

    return makePartialRegex;
});
