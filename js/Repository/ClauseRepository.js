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
        this.suffix = 'Clause';

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

        getByName: function (name) {
            var repository = this;

            return hasOwn.call(repository.clauses, name) ? repository.clauses[name] : null;
        },

        getByQualifiedName: function (name) {
            var repository = this,
                suffix = repository.suffix;

            if (name.substr(name.length - suffix.length) !== suffix) {
                throw new Error('ClauseRepository.getByQualifiedName() :: Unrecognised suffix');
            }

            return repository.getByName(name.substr(0, name.length - suffix.length));
        }
    });

    return ClauseRepository;
});
