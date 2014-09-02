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
    'js/Display',
    'js/Editor',
    'js/Repository/EntityDefinitionRepository',
    'js/Program',
    'js/Walker',
    'js/Repository/WidgetRepository'
], function (
    util,
    Display,
    Editor,
    EntityDefinitionRepository,
    Program,
    Walker,
    WidgetRepository
) {
    'use strict';

    function Compositor(clauseRepository, widgetTypeClassRepository, propertyTypeClassRepository, parser) {
        this.clauseRepository = clauseRepository;
        this.parser = parser;
        this.propertyTypeClassRepository = propertyTypeClassRepository;
        this.widgetTypeClassRepository = widgetTypeClassRepository;
    }

    util.extend(Compositor.prototype, {
        createDisplay: function (options) {
            return new Display(options);
        },

        createEditor: function (options) {
            var compositor = this;

            return new Editor(
                compositor.parser,
                new Walker(compositor.clauseRepository),
                options
            );
        },

        createProgram: function (options) {
            var compositor = this,
                entityDefinitionRepository = new EntityDefinitionRepository(),
                propertyTypeRepository = compositor.propertyTypeClassRepository.createPropertyTypeRepository(),
                widgetRepository = new WidgetRepository(),
                widgetTypeRepository = compositor.widgetTypeClassRepository.createWidgetTypeRepository(widgetRepository);

            return new Program(
                compositor.clauseRepository,
                widgetTypeRepository,
                widgetRepository,
                entityDefinitionRepository,
                propertyTypeRepository,
                options
            );
        }
    });

    return Compositor;
});
