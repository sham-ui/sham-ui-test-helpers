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
                export default Component( Template, function( options ) {
                    const title = $();
                    const content = $();
                    
                    options( {
                        [ title ]: 'Default sfc title',
                        [ content ]: 'Default sfc content'
                    } )
                } );
            </script>
        `,
        {
            title: 'title from sfc options',
            content: 'content from sfc options'
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
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
                export default Component( Template, function( options ) {
                    const title = $();
                    const content = $();
                    
                    options( {
                        [ title ]: 'Default sfc title',
                        [ content ]: 'Default sfc content'
                    } )
                } );
            </script>
        `,
        {
            title: 'title from sfc options',
            content: 'content from sfc options'
        }
    );
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.component.update( {
        title: 'new sfc title',
        content: 'new sfc content'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'inline compiler don\'t remove data-test attributes', () => {
    const { ctx } = renderer(
        compile`
            <div data-test-label={{elemRef}}>
                {{title}}
            </div>
        `,
        {
            elemRef: 'ref-name',
            title: 'Content'
        }
    );
    expect(
        ctx.container.querySelector( '[data-test-label="ref-name"]' ).textContent
    ).toBe(
        'Content'
    );
} );


it( 'sfc compiler don\'t remove data-test attributes', () => {
    const { ctx } = renderer(
        compileAsSFC`
            <template>
                <div data-test-label={{elemRef}}>
                    {{title}}
                </div>
            </template>
            <script>
                export default Component( Template, function( options ) {
                    const elemRef = $();
                    const title = $();
                    options( {
                        [ elemRef ]: 'ref-name',
                        [ title ]: 'Content',
                    } )
                } );
            </script>
            
        `
    );
    expect(
        ctx.container.querySelector( '[data-test-label="ref-name"]' ).textContent
    ).toBe(
        'Content'
    );
} );
