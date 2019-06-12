# sham-ui-test-helpers

## Install
```
npm install sham-ui-test-helpers -D
```

### Usage
```js
import Label from './Label.sht';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( Label );

    expect( meta.component.ID ).toEqual( 'component' );
    expect( meta.component.container.innerHTML ).toEqual( 'Foo' );
    expect( meta.rendered ).toEqual( [ 'component' ] );
} );

it( 'snapshot correctly', () => {
    const tree = renderer( Label ).toJSON();
    expect( tree ).toMatchSnapshot();
} );

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
                
                class dummy extends Template {
                    @options title = 'Default title';
                    @options content = 'Default content';
                }
            </script>
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
```
