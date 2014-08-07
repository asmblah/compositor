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
            token;

        for (index = position; index < source.length && !endPattern.test(source.substr(index)); index += token.length) {
            // Read one token
            match = source.substr(index).match(/^(\\[\s\S]|\[[^\]]*\]|[\s\S])[*?+]*/);

            token = match[0];

            if (token === '(') {
                result = processGroup(source, index + 1);
                pattern += '(' + result.pattern + ')';
                index = result.nextPosition;
            } else if (token === '|') {
                pattern += closing + token;
                closing = '';
            } else {
                if (index <= firstNonZeroWidthTokenIndex) {
                    pattern += token;
                } else {
                    pattern += '(?:' + token;
                    closing += '|$)';
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
