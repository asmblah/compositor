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
    'js/Clause/Clause'
], function (
    util,
    Clause
) {
    'use strict';

    var hasOwn = {}.hasOwnProperty;

    function ClauseRepository(clauses) {
        this.clauses = {};

        this.addMultiple(clauses);
    }

    util.extend(ClauseRepository.prototype, {
        add: function (clause) {
            var repository = this;

            if (!(clause instanceof Clause)) {
                throw new Error('Non clause given');
            }

            clause.getMatcher().setRepository(repository);

            repository.clauses[clause.getName()] = clause;
        },

        addMultiple: function (clauses) {
            var repository = this;

            util.each(clauses, function (clause) {
                repository.add(clause);
            });
        },

        getAll: function () {
            return this.clauses;
        },

        getByName: function (name) {
            var repository = this;

            return hasOwn.call(repository.clauses, name) ? repository.clauses[name] : null;
        }
    });

    return ClauseRepository;
});
