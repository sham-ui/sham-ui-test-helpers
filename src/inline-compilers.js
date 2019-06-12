import { Compiler } from 'sham-ui-templates';
import { sourceNode } from 'sham-ui-templates/lib/compiler/sourceNode';
import { transformSync } from '@babel/core';

const babel = {
    'presets': [
        [
            '@babel/preset-env',
            {
                'targets': {
                    'browsers': [
                        'last 2 versions',
                        'safari >= 7'
                    ]
                }
            }
        ]
    ],
    'plugins': [
        [
            '@babel/plugin-proposal-decorators',
            {
                'legacy': true
            }
        ],
        [
            '@babel/plugin-proposal-class-properties',
            {
                'loose': true
            }
        ],
        '@babel/plugin-transform-modules-umd',
        '@babel/plugin-proposal-function-bind',
        [
            '@babel/plugin-proposal-object-rest-spread',
            {
                'useBuiltIns': true
            }
        ]
    ]
};

const compiler = new Compiler( {
    asModule: false
} );

const compilerForSFC = new Compiler( {
    asSingleFileComponent: true,
    asModule: false
} );

function evalComponent( code ) {
    const fn = new Function( `var require=arguments[0];var exports=arguments[1];${code}return dummy;` );
    return fn( require, exports );
}

export function compile( strings ) {
    const node = sourceNode( '' );
    node.add(
        compiler.compile(
            'dummy.sht',
            strings.join( '\n' ).trim()
        )
    );
    return evalComponent( node.toString() );
}

export function compileAsSFC( strings ) {
    const node = sourceNode( '' );
    node.add(
        compilerForSFC.compile(
            'dummy.shc',
            strings.join( '\n' ).trim()
        )
    );
    const { code } = transformSync( node.toString(), babel );
    return evalComponent( code );
}
