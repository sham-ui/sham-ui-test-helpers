import { start, createDI, createRootContext } from 'sham-ui';
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
    return {
        ...Object.getPrototypeOf( options ),
        ...options
    };
}


/**
 * @inner
 * @param {Component} component
 * @return {RenderResultSnapshot}
 */
function toJSON( component ) {
    let html = null;
    const container = component.ctx.container;
    if ( container !== undefined ) {
        html = pretty( container.innerHTML, {
            inline: [ 'code', 'pre', 'em', 'strong', 'span' ]
        } );
        if ( html.indexOf( '\n' ) !== -1 ) {
            html = `\n${html}\n`;
        }
    }
    return {
        html,
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
 *     expect( meta.component.ctx.ID ).toEqual( 'component' );
 *     expect( meta.component.ctx.container.innerHTML ).toEqual( 'Foo' );
 * } );
 *
 * @example
 * import Label from './Label.sht';
 * import renderer from 'sham-ui-test-helpers';
 *
 * it( 'snapshot correctly', () => {
 *     const meta = renderer( Label );
 *
 *     expect( meta.toJSON() ).toMatchSnapshot()
 * } );
 *
 * @param {Class<Component>} componentClass Component class for rendering
 * @param {Object} [componentOptions={}] Options
 * @param {Object} [context={}] Extra root context parameters
 * @return {RenderResult}
 */
export default function renderer(
    componentClass,
    componentOptions = {},
    context = {}
) {
    const DI = 'DI' in context ?
        context.DI :
        createDI()
    ;
    const ctx = createRootContext( {
        DI,
        ID: DEFAULT_ID,
        container: document.querySelector( DEFAULT_SELECTOR ),
        ...context
    } );

    DI.resolve( 'sham-ui:store' ).byId.clear();
    ctx.container.innerHTML = '';

    const component = new componentClass( ctx, componentOptions );
    start( DI );

    return {
        DI,
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
 * sham-ui di container
 * @external DI
 * @see https://github.com/sham-ui/sham-ui#DI
 */


/**
 * Result of renderer
 * @typedef {Object} RenderResult
 * @property {Component} component Rendered component instance
 * @property {DI} DI Container, used for render
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
 * @property {Object} Options Component options
 */
