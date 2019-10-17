import { start, DI } from 'sham-ui';
import pretty from 'pretty';

const DEFAULT_SELECTOR = 'body';
const DEFAULT_ID = 'component';

/**
 * Prepare options for snapshot
 * @inner
 * @param {Options} options
 * @return {Object}
 */
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


/**
 * @inner
 * @param {Component} component
 * @return {RenderResultSnapshot}
 */
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

/**
 * Render component with options
 * @example
 * import Label from './Label.sht';
 * import renderer from 'sham-ui-test-helpers';
 *
 * it( 'renders correctly', () => {
 *     const meta = renderer( Label );
 *
 *     expect( meta.component.ID ).toEqual( 'component' );
 *     expect( meta.component.container.innerHTML ).toEqual( 'Foo' );
 * } );
 *
 * @example
 * import Label from './Label.sht';
 * import renderer from 'sham-ui-test-helpers';
 *
 * it( 'snapshot correctly', () => {
 *     const meta = renderer( Label );
 *
 *     expect( tree ).toMatchSnapshot()
 * } );
 *
 * @param {Class<Component>} componentClass Component class for rendering
 * @param {Object} [componentOptions={}] Options
 * @return {RenderResult}
 */
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

/**
 * sham-ui component
 * @external Component
 * @see https://github.com/sham-ui/sham-ui#component
 */

/**
 * Result of renderer
 * @typedef {Object} RenderResult
 * @property {Component} component Rendered component instance
 * @property {ToJSON} toJSON Dump to JSON for jest's snapshot testing
 */


/**
 * Function for dump render result (using for jest-snapshots)
 * @typedef {Function} ToJSON
 * @return {RenderResultSnapshot}
 */

/**
 * @typedef {Object} RenderResultSnapshot
 * @property {string} html Rendered html
 * @property {string} Constructor Name of Component
 * @property {Object} Options Component options
 */
