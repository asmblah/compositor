/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'modular'
], function (
    modular
) {
    'use strict';

    var inheritFrom = Object.create || function (from) {
        function F() {}
        F.prototype = from;
        return new F();
    },
        util = inheritFrom(modular.util);

    return util.extend(util, {
        from: function (from) {
            return {
                to: function (to, callback) {
                    var number;

                    for (number = from; number < to; number += 1) {
                        callback(number, number - from);
                    }
                }
            };
        },

        heredoc: function (fn, variables) {
            var match = function () {}.toString.call(fn).match(/\/\*<<<(\w+)[\r\n](?:([\s\S]*)[\r\n])?\1\s*\*\//),
                string;

            if (!match) {
                throw new Error('util.heredoc() :: Function does not contain a heredoc');
            }

            string = match[2] || '';

            string = util.stringTemplate(string, variables);

            return string;
        },

        inherit: function (To) {
            return {
                from: function (From) {
                    To.prototype = inheritFrom(From.prototype);
                    To.prototype.constructor = To;
                }
            };
        },

        regexEscape: function (text) {
            // See http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
            return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        },

        stringTemplate: function (string, variables) {
            util.each(variables, function (value, name) {
                var pattern = new RegExp(('${' + name + '}').replace(/[^a-z0-9]/g, '\\$&'), 'g');

                string = string.replace(pattern, value);
            }, {keys: true});

            return string;
        }
    });
});
