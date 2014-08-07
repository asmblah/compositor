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
            index,
            match,
            result = '',
            closing = '',
            pattern = '',
            token;

        for (index = position; index < source.length && !endPattern.test(source.substr(index)); index += token.length) {
            // Advance one token
            match = source.substr(index).match(/^(\\[\s\S]|\[[^\]]*\]|[\s\S])[.*?+]*/);

            if (match) {
                token = match[0];
            } else {
                token = source.charAt(index);
            }

            if (token === '(') {
                result = processGroup(source, index + 1);
                pattern += '(' + result.pattern + ')';
                index = result.nextPosition;
            } else {
                if (index === 0) {
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
        return new RegExp(processGroup(regex.source, 0).pattern + '$');
    }

    return makePartialRegex;
});
