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
    './Entity'
], function (
    util,
    Entity
) {
    'use strict';

    function EntityDefinition(entityRepository, name) {
        this.entityRepository = entityRepository;
        this.name = name;
        this.properties = [];
    }

    util.extend(EntityDefinition.prototype, {
        addProperty: function (property) {
            this.properties.push(property);
        },

        exportSnapshot: function () {
            var properties = [];

            util.each(this.properties, function (property) {
                properties.push(property.exportSnapshot());
            });

            return {
                'properties': properties
            };
        },

        getEntitiesBy: function (expectedProperties) {
            var entities = [];

            util.each(this.entityRepository.getEntities(), function (entity) {
                util.each(expectedProperties, function (value, name) {
                    if (entity.getPropertyByName(name) === value) {
                        entities.push(entity);
                    }
                });
            });

            return entities;
        },

        getName: function () {
            return this.name;
        },

        getPropertyByName: function (name) {
            var property = null;

            util.each(this.properties, function (otherProperty) {
                if (otherProperty.getName().toLowerCase() === name.toLowerCase()) {
                    property = otherProperty;
                    return false;
                }
            });

            return property;
        },

        spawn: function (data) {
            var entityDefinition = this,
                entity = new Entity(entityDefinition, data);

            entityDefinition.entityRepository.add(entity);

            return entity;
        }
    });

    return EntityDefinition;
});
