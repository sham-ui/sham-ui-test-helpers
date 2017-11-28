import ShamUI, { DI } from 'sham-ui';

const DEFAULT_SELECTOR = 'body';
const DEFAULT_ID = 'widget';

function toJSON( widget ) {
    return {
        ID: widget.ID,
        html: widget.container === undefined ? null : widget.container.innerHTML,
        options: widget.options === undefined ? null : widget.options,
        nodes: widget.nodes === undefined ? null : widget.nodes.map( toJSON ),
        __data__: widget.__data__ === undefined ? null : widget.__data__
    }
}

export default function renderer(
    widgetClass,
    widgetOptions = {},
    selector = DEFAULT_SELECTOR,
    ID = DEFAULT_ID
) {
    const rendered = [];

    document.querySelector( selector ).innerHTML = '';

    let widget;
    DI.bind( 'widget-binder', () => {
        widget = new widgetClass( selector, ID, widgetOptions );
    } );

    const UI = new ShamUI();
    UI.render.on( 'RenderComplete', ( event, renderedWidgets ) => {
        rendered.push( ...renderedWidgets );
    } );
    UI.render.FORCE_ALL();

    return {
        widget,
        rendered,
        toJSON() {
            return toJSON( widget );
        }
    };
}
