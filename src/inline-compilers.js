import { Compiler } from 'sham-ui-templates';
import { sourceNode } from 'sham-ui-templates/lib/compiler/sourceNode';
import { transformSync } from '@babel/core';
import findBabelConfig from 'find-babel-config';
const compiler = new Compiler( {
    asModule: true
} );

const compilerForSFC = new Compiler( {
    asSingleFileComponent: true,
    asModule: false
} );

function evalComponent( code ) {
    const fn = new Function( [
        'var module, exports, require;',
        'require=arguments[0];',
        'module=exports=arguments[1];',
        code,
        'return module.exports || exports.default;'
    ].join( '\n' ) );
    return fn( require, {} );
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
    const { config } = findBabelConfig.sync( process.cwd() );
    const { code } = transformSync( node.toString(), config );
    return evalComponent( code );
}
