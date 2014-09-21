/*
 * Compositor
 * http://asmblah.github.com/compositor/
 *
 * Released under the MIT license
 * https://github.com/asmblah/compositor/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/util'
], function (
    util
) {
    'use strict';

    function DOMRenderer(document, domElement) {
        this.document = document;
        this.domElement = domElement;
    }

    util.extend(DOMRenderer.prototype, {
        getWidgetNode: function (widget) {
            return this.document.getElementById(getWidgetNodeID(widget));
        },

        load: function (program) {
            var renderer = this;

            program.getWidgetTypeByName('button').on('pre.spawn', function (widget) {
                var element = renderer.document.createElement('button');

                element.id = getWidgetNodeID(widget);

                element.addEventListener('click', function () {
                    widget.click();
                });

                renderer.domElement.appendChild(element);
            }).on('textContent.set', function (widget) {
                renderer.getWidgetNode(widget).textContent = widget.getTextContent();
            });

            program.getWidgetTypeByName('option').on('pre.spawn', function (widget) {
                var element = renderer.document.createElement('option');

                element.id = getWidgetNodeID(widget);

                renderer.domElement.appendChild(element);
            }).on('parent.set', function (widget) {
                renderer.getWidgetNode(widget.getParent()).appendChild(renderer.getWidgetNode(widget));
            }).on('textContent.set', function (widget) {
                renderer.getWidgetNode(widget).textContent = widget.getTextContent();
                renderer.getWidgetNode(widget).value = widget.getTextContent();
            });

            program.getWidgetTypeByName('select').on('pre.spawn', function (widget) {
                var element = renderer.document.createElement('select');

                element.id = getWidgetNodeID(widget);

                renderer.domElement.appendChild(element);
            }).on('textContent.get', function (widget) {
                widget.setAttributeByName('textContent', renderer.getWidgetNode(widget).value);
            });

            program.getWidgetTypeByName('textbox').on('pre.spawn', function (widget) {
                var element = renderer.document.createElement('input');

                element.type = 'text';
                element.id = getWidgetNodeID(widget);

                renderer.domElement.appendChild(element);
            }).on('textContent.set', function (widget) {
                renderer.getWidgetNode(widget).value = widget.getTextContent();
            });
        }
    });

    function getWidgetNodeID(widget) {
        return 'widget_' + widget.getUniqueID();
    }

    return DOMRenderer;
});
