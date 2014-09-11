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
    'js/Entity/EntityDefinition'
], function (
    util,
    EntityDefinition
) {
    'use strict';

    function EntityDefinitionRepository(entityDefinitions) {
        this.entityDefinitions = [];

        this.addMultiple(entityDefinitions);
    }

    util.extend(EntityDefinitionRepository.prototype, {
        add: function (entityDefinition) {
            if (!(entityDefinition instanceof EntityDefinition)) {
                throw new Error('Non Entity-Definition given');
            }

            this.entityDefinitions.push(entityDefinition);
        },

        addMultiple: function (entityDefinitions) {
            var repository = this;

            util.each(entityDefinitions, function (entityDefinition) {
                repository.add(entityDefinition);
            });
        },

        getEntityDefinitionByName: function (name) {
            var entityDefinition = null;

            util.each(this.entityDefinitions, function (otherEntityDefinition) {
                if (otherEntityDefinition.getName().toLowerCase() === name.toLowerCase()) {
                    entityDefinition = otherEntityDefinition;
                    return false;
                }
            });

            return entityDefinition;
        },

        getEntityDefinitions: function () {
            return this.entityDefinitions;
        }
    });

    return EntityDefinitionRepository;
});
