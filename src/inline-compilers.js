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
            'dummy.shc',
            strings.join( '\n' ).trim()
        )
    );
    const { config } = findBabelConfig.sync( process.cwd() );
    const { code } = transformSync( node.toString(), config );
    return code;
}

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
