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
    'js/Renderer/DOMRenderer',
    'js/Editor',
    'js/Repository/EntityDefinitionRepository',
    'js/Repository/EntityRepository',
    'js/Interpreter',
    'js/Program',
    'js/Walker',
    'js/Repository/WidgetRepository'
], function (
    util,
    Display,
    DOMRenderer,
    Editor,
    EntityDefinitionRepository,
    EntityRepository,
    Interpreter,
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

        createDOMRenderer: function (domElement) {
            return new DOMRenderer(domElement.ownerDocument, domElement);
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
                interpreter = new Interpreter(compositor.clauseRepository),
                propertyTypeRepository = compositor.propertyTypeClassRepository.createPropertyTypeRepository(),
                widgetRepository = new WidgetRepository(),
                widgetTypeRepository = compositor.widgetTypeClassRepository.createWidgetTypeRepository(widgetRepository);

            return new Program(
                compositor.clauseRepository,
                widgetTypeRepository,
                widgetRepository,
                entityDefinitionRepository,
                new EntityRepository(),
                propertyTypeRepository,
                interpreter,
                options
            );
        }
    });

    return Compositor;
});
