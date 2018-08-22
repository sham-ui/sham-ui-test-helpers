import ShamUI, { DI } from 'sham-ui';
import pretty from 'pretty';

const DEFAULT_SELECTOR = 'body';
const DEFAULT_ID = 'widget';

function withNullAsDefaul( value ) {
    return undefined === value ? null : value;
}

function toJSON( widget ) {
    let html = null;
    if ( widget.container !== undefined ) {
        html = pretty( widget.container.innerHTML );
        if ( html.indexOf( '\n' ) !== -1 ) {
            html = `\n${html}\n`;
        }
    }
    return {
        html,
        ID: widget.ID,
        options: withNullAsDefaul( widget.options ),
        nodes: widget.nodes === undefined ? null : widget.nodes.map( toJSON ),
        constructorOptions: withNullAsDefaul( widget.constructorOptions )
    };
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
