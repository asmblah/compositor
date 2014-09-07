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

    var TYPE = 'type';

    function Program(clauseRepository, widgetTypeRepository, widgetRepository, entityDefinitionRepository, propertyTypeRepository, interpreter, options) {
        this.behaviourNode = null;
        this.canvasWidget = widgetTypeRepository.getWidgetTypeByName('canvas').spawn();
        this.clauseRepository = clauseRepository;
        this.entityDefinitionRepository = entityDefinitionRepository;
        this.interpreter = interpreter;
        this.options = options;
        this.propertyTypeRepository = propertyTypeRepository;
        this.widgetRepository = widgetRepository;
        this.widgetTypeRepository = widgetTypeRepository;
    }

    util.extend(Program.prototype, {
        createEntityDefinition: function (name) {
            this.entityDefinitionRepository.add(new EntityDefinition(name));
        },

        exportDataStructureSnapshot: function () {
            var entityDefinitions = {};

            util.each(this.entityDefinitionRepository.getEntityDefinitions(), function (entityDefinition) {
                entityDefinitions[entityDefinition.getName()] = entityDefinition.exportSnapshot();
            });

            return {
                entityDefinitions: entityDefinitions
            };
        },

        exportSnapshot: function () {
            var program = this;

            return {
                behaviour: {

                },
                ui: program.canvasWidget.exportSnapshot()
            };
        },

        getEntityDefinitionByName: function (name) {
            return this.entityDefinitionRepository.getEntityDefinitionByName(name);
        },

        getPropertyTypeByName: function (name) {
            return this.propertyTypeRepository.getPropertyTypeByName(name);
        },

        getWidgetByID: function (id) {
            var program = this;

            return program.widgetRepository.getWidgetByID(id) || null;
        },

        getWidgets: function () {
            return this.widgetRepository.getWidgets();
        },

        getWidgetTypeByName: function (name) {
            return this.widgetTypeRepository.getWidgetTypeByName(name);
        },

        load: function (components) {
            var program = this,
                promise;

            components = components || {};

            if (components.widgets) {
                program.loadUI(components.widgets);
            }

            promise = program.interpreter.interpret(program, components.behaviour || program.behaviourNode);

            return promise;
        },

        loadBehaviour: function (behaviourNode) {
            this.behaviourNode = behaviourNode;
        },

        loadUI: function (widgets) {
            var program = this;

            program.widgets = widgets;

            util.each(widgets, function (attributes, id) {
                var widgetType = program.widgetTypeRepository.getWidgetTypeByName(attributes[TYPE]);

                program.widgetRepository.add(widgetType.spawn(id, attributes));
            });
        }
    });

    return Program;
});
