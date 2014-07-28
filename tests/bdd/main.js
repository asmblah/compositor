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

/*global define */
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

    var global = modular.util.global;

    define('Mocha', function () {
        return global.Mocha;
    });

    require([
        './runner'
    ], function (
        runner
    ) {
        runner({
            reporter: 'html'
        });
    });
});
