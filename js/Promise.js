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
    'Modular/js/Promise'
], function (
    util,
    ModularPromise
) {
    'use strict';

    var parent = ModularPromise.prototype,
        slice = [].slice;

    function Promise() {
        ModularPromise.call(this);
    }

    util.inherit(Promise).from(ModularPromise);

    util.extend(Promise.prototype, {
        always: function (callback) {
            return this.then(callback, callback);
        },

        done: function (callback) {
            return this.then(callback);
        },

        fail: function (callback) {
            return this.then(null, callback);
        },

        resolve: function () {
            return parent.resolve.call(this, slice.call(arguments));
        },

        then: function (onResolve, onReject) {
            return parent.then.call(this, onResolve ? function (args) {
                onResolve.apply(null, args);
            } : null, onReject);
        }
    });

    return Promise;
});
