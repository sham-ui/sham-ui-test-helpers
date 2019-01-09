import ShamUI, { DI } from 'sham-ui';
import pretty from 'pretty';

const DEFAULT_SELECTOR = 'body';
const DEFAULT_ID = 'widget';

function prepareOptions( options ) {
    return {
        ...Object.getPrototypeOf( options ),
        ...options
    };
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
        Constructor: widget.constructor.name,
        Options: prepareOptions( widget.options )
    };
}

export default function renderer(
    widgetClass,
    widgetOptions = {}
) {
    const rendered = [];

    const options = {
        ID: DEFAULT_ID,
        containerSelector: DEFAULT_SELECTOR,
        ...widgetOptions
    };

    DI.resolve( 'sham-ui:store' ).clear();
    document.querySelector( options.containerSelector ).innerHTML = '';

    let widget;
    DI.bind( 'widget-binder', () => {
        widget = new widgetClass( options );
    } );

    const UI = new ShamUI();
    UI.render.on( 'RenderComplete', ( renderedWidgets ) => {
        rendered.push( ...renderedWidgets );
    } );
    UI.render.ALL();

    return {
        widget,
        rendered,
        toJSON() {
            return toJSON( widget );
        }
    };
}
