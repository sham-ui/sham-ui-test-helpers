import ShamUI, { DI } from 'sham-ui';
import pretty from 'pretty';

const DEFAULT_SELECTOR = 'body';
const DEFAULT_ID = 'component';

function prepareOptions( options ) {
    return {
        ...Object.getPrototypeOf( options ),
        ...options
    };
}

function toJSON( component ) {
    let html = null;
    if ( component.container !== undefined ) {
        html = pretty( component.container.innerHTML );
        if ( html.indexOf( '\n' ) !== -1 ) {
            html = `\n${html}\n`;
        }
    }
    return {
        html,
        Constructor: component.constructor.name,
        Options: prepareOptions( component.options )
    };
}

export default function renderer(
    componentClass,
    componentOptions = {}
) {
    const rendered = [];

    const options = {
        ID: DEFAULT_ID,
        containerSelector: DEFAULT_SELECTOR,
        ...componentOptions
    };

    DI.resolve( 'sham-ui:store' ).clear();
    document.querySelector( options.containerSelector ).innerHTML = '';

    let component;
    DI.bind( 'component-binder', () => {
        component = new componentClass( options );
    } );

    const UI = new ShamUI();
    UI.render.on( 'RenderComplete', ( renderedComponents ) => {
        rendered.push( ...renderedComponents );
    } );
    UI.render.ALL();

    return {
        component,
        rendered,
        toJSON() {
            return toJSON( component );
        }
    };
}
