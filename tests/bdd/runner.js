/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define, require */
define({
    cache: false,
    paths: {
        'bdd': '.',
        'components': '/../../components',
        'js': '/../../js',
        'languages': '/../../languages',

        // FIXME!! (In Modular)
        'Modular': require.config().paths.Modular,

        'vendor': '/../../vendor'
    }
}, [
    'chai/chai',
    'modular',
    'require',
    'sinon/sinon',
    'sinon-chai/sinon-chai',
    'Mocha'
], function (
    chai,
    modular,
    require,
    sinon,
    sinonChai,
    Mocha
) {
    'use strict';

    var global = modular.util.global;

    chai.use(sinonChai);

    global.expect = chai.expect;
    global.sinon = sinon;

    return function (options, callback) {
        var mocha = new Mocha({
            'ui': 'bdd',
            'reporter': options.reporter || mocha.reporters.HTML,
            'globals': ['setTimeout', 'setInterval', 'clearTimeout', 'clearInterval']
        });

        if (options.grep) {
            mocha.grep(new RegExp(options.grep));
        }

        // Expose Mocha functions in the global scope
        mocha.suite.emit('pre-require', global, null, mocha);

        require([
            'bdd/integration/editor/clauses/showTest',
            'bdd/integration/editor/clauses/whenTest',
            'bdd/integration/editor/datastore/textTest',
            'bdd/integration/editor/ui/rowTest',
            'bdd/integration/program/sample/adderTest',
            'bdd/integration/program/sample/bookingsTest',
            'bdd/integration/program/sample/domRenderer/bookingsTest',
            'bdd/unit/js/makePartialRegexTest',
            'bdd/unit/js/ParserTest'
        ], function () {
            mocha.run(callback);
        });
    };
});
