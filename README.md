# sham-ui-test-helpers

### Install

`yarn add sham-ui-test-helpers --dev`

### API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

##### Table of Contents

-   [renderer](#renderer)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
-   [Component](#component)
-   [RenderResult](#renderresult)
    -   [Properties](#properties)
-   [ToJSON](#tojson)
-   [RenderResultSnapshot](#renderresultsnapshot)
    -   [Properties](#properties-1)

#### renderer

Render component with options

##### Parameters

-   `componentClass` **Class&lt;[Component](#component)>** Component class for rendering
-   `componentOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options (optional, default `{}`)

##### Examples

```javascript
import Label from './Label.sht';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( Label );

    expect( meta.component.ID ).toEqual( 'component' );
    expect( meta.component.container.innerHTML ).toEqual( 'Foo' );
} );
```

```javascript
import Label from './Label.sht';
import renderer from 'sham-ui-test-helpers';

it( 'snapshot correctly', () => {
    const meta = renderer( Label );

    expect( tree ).toMatchSnapshot()
} );
```

Returns **[RenderResult](#renderresult)** 

#### Component

-   **See: <https://github.com/sham-ui/sham-ui#component>**

sham-ui component

#### RenderResult

Result of renderer

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

##### Properties

-   `component` **[Component](#component)** Rendered component instance
-   `toJSON` **[ToJSON](#tojson)** Dump to JSON for jest's snapshot testing

#### ToJSON

Function for dump render result (using for jest-snapshots)

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

Returns **[RenderResultSnapshot](#renderresultsnapshot)** 

#### RenderResultSnapshot

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

##### Properties

-   `html` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Rendered html
-   `Constructor` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of Component
-   `Options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Component options

### Usage

```js
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
```
