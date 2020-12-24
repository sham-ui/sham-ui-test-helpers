import { Compiler } from 'sham-ui-templates';
import { sourceNode } from 'sham-ui-templates/lib/compiler/sourceNode';
import { transformSync } from '@babel/core';
import findBabelConfig from 'find-babel-config';
const compiler = new Compiler( {
    asModule: true,
    removeDataTest: false
} );

const compilerForSFC = new Compiler( {
    asSingleFileComponent: true,
    asModule: false,
    removeDataTest: false
} );

function evalComponent( code, mappings = {} ) {
    const body = [
        'var module=exports;',
        code,
        'return module.exports || exports.default;'
    ].join( '\n' );
    const fn = new Function(
        'require',
        'exports',
        ...Object.keys( mappings ),
        body
    );
    return fn( require, {}, ...Object.values( mappings ) );
}

function _compile( strings ) {
    const node = sourceNode( '' );
    node.add(
        compiler.compile(
            'dummy.sht',
            strings.join( '\n' ).trim()
        )
    );
    return node.toString();
}

/**
 * Compile component. Can call with mapping object
 * @example
 * import renderer, { compile } from 'sham-ui-test-helpers';
 * it( 'inline', () => {
 *   const meta = renderer(
 *       compile`
 *           <main>
 *               <div>
 *                   {{title}}
 *               </div>
 *               <div>
 *                   {{content}}
 *               </div>
 *           </main>
 *
 *       `,
 *       {
 *           title: 'title from options',
 *           content: 'content from options'
 *       }
 *   );
 *   expect( meta.toJSON() ).toMatchSnapshot();
 *   expect( meta.component ).toBeInstanceOf( Component );
 *   meta.component.update( {
 *       title: 'new title',
 *       content: 'new content'
 *   } );
 *   expect( meta.toJSON() ).toMatchSnapshot();
 * } );
 *
 * @example
 * import renderer, { compile } from 'sham-ui-test-helpers';
 * it( 'inline with mappings', () => {
 *   const meta = renderer(
 *       compile( {
 *           TitleComponent: compile`<h1>{{text}}</h1>`
 *       } )`
 *           <TitleComponent text={{title}}/>
 *
 *           <main>
 *               <div>
 *                   {{title}}
 *               </div>
 *               <div>
 *                   {{content}}
 *               </div>
 *           </main>
 *
 *       `,
 *       {
 *           title: 'title from options',
 *           content: 'content from options'
 *       }
 *   );
 *   expect( meta.toJSON() ).toMatchSnapshot();
 *   expect( meta.component ).toBeInstanceOf( Component );
 *   meta.component.update( {
 *       title: 'new title',
 *       content: 'new content'
 *   } );
 *   expect( meta.toJSON() ).toMatchSnapshot();
 * } );
 *
 * @param {string|Object} arg
 * @return {Component|Function}
 */
export function compile( arg ) {
    if ( !Array.isArray( arg ) ) {
        return function( strings ) {
            return evalComponent(
                _compile( strings ),
                arg
            );
        };
    }
    return evalComponent( _compile( arg ) );
}

function _compileAsSFC( strings ) {
    const node = sourceNode( '' );
    node.add(
        compilerForSFC.compile(
            'dummy.sfc',
            strings.join( '\n' ).trim()
        )
    );
    const { config } = findBabelConfig.sync( process.cwd() );
    const { code } = transformSync( node.toString(), config );
    return code;
}

/**
 * Compile as single file component (SFС). Also can call with mapping object
 * @example
 * import renderer, { compileAsSFC } from 'sham-ui-test-helpers';
 * it( 'sfc', () => {
 *   const meta = renderer(
 *       compileAsSFC`
 *           <template>
 *               <div>
 *                   {{title}}
 *               </div>
 *               <div>
 *                   {{content}}
 *               </div>
 *           </template>
 *
 *           <script>
 *               import { options } from 'sham-ui';
 *
 *               class dummy extends Template {
 *                   \@options title = 'Default title';
 *                   \@options content = 'Default content';
 *               }
 *           </script>
 *       `,
 *       {
 *           title: 'title from options',
 *           content: 'content from options'
 *       }
 *   );
 *   expect( meta.toJSON() ).toMatchSnapshot();
 *   expect( meta.component ).toBeInstanceOf( Component );
 *   meta.component.update( {
 *       title: 'new title',
 *       content: 'new content'
 *   } );
 *   expect( meta.toJSON() ).toMatchSnapshot();
 * } );
 *
 * @example
 * import renderer, { compileAsSFC } from 'sham-ui-test-helpers';
 * it( 'sfc with mappings', () => {
 *   const meta = renderer(
 *       compileAsSFC( {
 *           Header: compile`<header>{{text}}</header>`
 *       } )`
 *           <template>
 *               <Header text={{title}}/>
 *
 *               <div>
 *                   {{title}}
 *               </div>
 *               <div>
 *                   {{content}}
 *               </div>
 *           </template>
 *
 *           <script>
 *               import { options } from 'sham-ui';
 *
 *               export default class extends Template {
 *                   \@options title = 'Default sfc title';
 *                   \@options content = 'Default sfc content';
 *               }
 *           </script>
 *       `,
 *       {
 *           title: 'title from sfc options',
 *           content: 'content from sfc options'
 *       }
 *   );
 *   expect( meta.toJSON() ).toMatchSnapshot();
 *   expect( meta.component ).toBeInstanceOf( Component );
 *   meta.component.update( {
 *       title: 'new sfc title',
 *       content: 'new sfc content'
 *   } );
 *   expect( meta.toJSON() ).toMatchSnapshot();
 * } );
 * @param {string|Object} arg
 * @return {Component|Function}
 */
export function compileAsSFC( arg ) {
    if ( !Array.isArray( arg ) ) {
        return function( strings ) {
            return evalComponent(
                _compileAsSFC( strings ),
                arg
            );
        };
    }
    return evalComponent( _compileAsSFC( arg ) );
}
