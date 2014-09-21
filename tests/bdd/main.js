/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

// FIXME!! (In Modular)
require.config({
    paths: {
        'Modular': '/../../modular'
    }
});

/*global define, document */
define({
    cache: false
}, [
    'modular',
    'require',

    // Mocha has to be handled specially as it is not an AMD module
    'mocha/mocha'
], function (
    modular,
    require
) {
    'use strict';

    var global = modular.util.global,
        query = global.Mocha.utils.parseQuery(global.location.search || '');

    define('Mocha', function () {
        return global.Mocha;
    });

    define('test-environment', function () {
        return {
            click: function (element) {
                element.click();
            },
            createWindow: function () {
                var iframe = document.createElement('iframe');

                document.body.appendChild(iframe);

                return iframe.contentWindow;
            },
            destroyWindow: function (window) {
                window.frameElement.parentNode.removeChild(window.frameElement);
            },
            selectOption: function (optionElement) {
                optionElement.parentNode.value = optionElement.value;
            }
        };
    });

    require([
        './runner'
    ], function (
        runner
    ) {
        runner({
            grep: query.grep,
            reporter: 'html'
        });
    });
});
