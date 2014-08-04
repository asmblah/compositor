/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global __dirname, global, process, require */
(function () {
    'use strict';

    var modular = require('modular-amd'),
        optionsManager = require('node-getopt').create([
            ['g', 'grep=<pattern>', 'Optional filter grep to restrict tests to run']
        ]),
        parsedOptions = optionsManager.parseSystem();

    // FIXME: Modular.js is reading the wrong value as "global" ("this" object is not global in Node.js)
    modular.util.global = global;

    modular.define('chai/chai', function () {
        return require('chai');
    });
    modular.define('fs', {
        basePath: __dirname,
        fs: require('fs')
    });
    modular.define('Mocha', function () {
        return require('mocha');
    });
    modular.define('sinon/sinon', function () {
        return require('sinon');
    });
    modular.define('sinon-chai/sinon-chai', function () {
        return require('sinon-chai');
    });

    // FIXME!! (In Modular)
    modular.configure({
        paths: {
            'Modular': '/../../node_modules/modular-amd'
        }
    });

    modular.require({
        baseUrl: __dirname
    }, [
        './runner'
    ], function (
        runner
    ) {
        runner({
            grep: parsedOptions.options.grep,
            reporter: 'spec'
        }, function (result) {
            process.exit(result);
        });
    });
}());
