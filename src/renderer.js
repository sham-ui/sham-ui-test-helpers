import { start, DI } from 'sham-ui';
import pretty from 'pretty';

const DEFAULT_SELECTOR = 'body';
const DEFAULT_ID = 'component';

function prepareOptions( options ) {
    const result = {
        ...Object.getPrototypeOf( options ),
        ...options
    };
    if ( result.container ) {
        delete result.container;
    }
    return result;
}

function toJSON( component ) {
    let html = null;
    if ( component.container !== undefined ) {
        html = pretty( component.container.innerHTML, {
            inline: [ 'code', 'pre', 'em', 'strong', 'span' ]
        } );
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
    const options = {
        ID: DEFAULT_ID,
        container: document.querySelector( DEFAULT_SELECTOR ),
        ...componentOptions
    };

    DI.resolve( 'sham-ui:store' ).clear();
    options.container.innerHTML = '';

    const component = new componentClass( options );
    start();

    return {
        component,
        toJSON() {
            return toJSON( component );
        }
    };
}
