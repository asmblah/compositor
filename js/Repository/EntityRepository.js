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
    'js/Entity/Entity'
], function (
    util,
    Entity
) {
    'use strict';

    function EntityRepository(entities) {
        this.entities = [];

        this.addMultiple(entities);
    }

    util.extend(EntityRepository.prototype, {
        add: function (entity) {
            if (!(entity instanceof Entity)) {
                throw new Error('Non entity given');
            }

            this.entities.push(entity);
        },

        addMultiple: function (entities) {
            var repository = this;

            util.each(entities, function (entity) {
                repository.add(entity);
            });
        },

        getEntityByID: function (id) {
            var entity = null;

            util.each(this.entities, function (otherEntity) {
                if (otherEntity.getID() === id) {
                    entity = otherEntity;
                    return false;
                }
            });

            return entity;
        },

        getEntities: function () {
            return this.entities;
        }
    });

    return EntityRepository;
});
