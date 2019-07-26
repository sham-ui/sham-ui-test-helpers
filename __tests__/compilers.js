import { Component } from 'sham-ui';
import renderer, { compile, compileAsSFC } from '../src';

it( 'inline', () => {
    const meta = renderer(
        compile`
            <main>
                <div>
                    {{title}}
                </div>
                <div>
                    {{content}}
                </div>
            </main>
            
        `,
        {
            title: 'title from options',
            content: 'content from options'
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( meta.component ).toBeInstanceOf( Component );
    meta.component.update( {
        title: 'new title',
        content: 'new content'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'inline with mappings', () => {
    const meta = renderer(
        compile( {
            TitleComponent: compile`<h1>{{text}}</h1>`
        } )`
            <TitleComponent text={{title}}/>

            <main>
                <div>
                    {{title}}
                </div>
                <div>
                    {{content}}
                </div>
            </main>
            
        `,
        {
            title: 'title from options',
            content: 'content from options'
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( meta.component ).toBeInstanceOf( Component );
    meta.component.update( {
        title: 'new title',
        content: 'new content'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'sfc', () => {
    const meta = renderer(
        compileAsSFC`
            <template>
                <div>
                    {{title}}
                </div>
                <div>
                    {{content}}
                </div>
            </template>
            
            <script>
                import { options } from 'sham-ui';
                
                export default class extends Template {
                    @options title = 'Default sfc title';
                    @options content = 'Default sfc content';
                }
            </script>
        `,
        {
            title: 'title from sfc options',
            content: 'content from sfc options'
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( meta.component ).toBeInstanceOf( Component );
    meta.component.update( {
        title: 'new sfc title',
        content: 'new sfc content'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );

it( 'sfc with mappings', () => {
    const meta = renderer(
        compileAsSFC( {
            Header: compile`<header>{{text}}</header>`
        } )`
            <template>
                <Header text={{title}}/>
            
                <div>
                    {{title}}
                </div>
                <div>
                    {{content}}
                </div>
            </template>
            
            <script>
                import { options } from 'sham-ui';
                
                export default class extends Template {
                    @options title = 'Default sfc title';
                    @options content = 'Default sfc content';
                }
            </script>
        `,
        {
            title: 'title from sfc options',
            content: 'content from sfc options'
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    expect( meta.component ).toBeInstanceOf( Component );
    meta.component.update( {
        title: 'new sfc title',
        content: 'new sfc content'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
