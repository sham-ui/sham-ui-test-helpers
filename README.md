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
-   [DI](#di)
-   [RenderResult](#renderresult)
    -   [Properties](#properties)
-   [ToJSON](#tojson)
-   [RenderResultSnapshot](#renderresultsnapshot)
    -   [Properties](#properties-1)
-   [compile](#compile)
    -   [Parameters](#parameters-1)
    -   [Examples](#examples-1)
-   [compileAsSFC](#compileassfc)
    -   [Parameters](#parameters-2)
    -   [Examples](#examples-2)

#### renderer

Render component with options

##### Parameters

-   `componentClass` **Class&lt;[Component](#component)>** Component class for rendering
-   `componentOptions` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Options (optional, default `{}`)
-   `context` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Extra root context parameters (optional, default `{}`)

##### Examples

```javascript
import Label from './Label.sht';
import renderer from 'sham-ui-test-helpers';

it( 'renders correctly', () => {
    const meta = renderer( Label );

    expect( meta.ctx.ID ).toEqual( 'component' );
    expect( meta.ctx.container.innerHTML ).toEqual( 'Foo' );
} );
```

```javascript
import Label from './Label.sht';
import renderer from 'sham-ui-test-helpers';

it( 'snapshot correctly', () => {
    const meta = renderer( Label );

    expect( meta.toJSON() ).toMatchSnapshot()
} );
```

Returns **[RenderResult](#renderresult)** 

#### Component

-   **See: <https://github.com/sham-ui/sham-ui#component>
    **

sham-ui component

#### DI

-   **See: <https://github.com/sham-ui/sham-ui#DI>
    **

sham-ui di container

#### RenderResult

Result of renderer

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

##### Properties

-   `component` **[Component](#component)** Rendered component instance
-   `DI` **[DI](#di)** Container, used for render
-   `ctx` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Context of rendered component
-   `toJSON` **[ToJSON](#tojson)** Dump to JSON for jest's snapshot testing

#### ToJSON

Function for dump render result (using for jest-snapshots)

Type: [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)

Returns **[RenderResultSnapshot](#renderresultsnapshot)** 

#### RenderResultSnapshot

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

##### Properties

-   `html` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Rendered html
-   `Options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Component options

#### compile

Compile component. Can call with mapping object

##### Parameters

-   `arg` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))** 

##### Examples

```javascript
import renderer, { compile } from 'sham-ui-test-helpers';
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
```

```javascript
import renderer, { compile } from 'sham-ui-test-helpers';
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
```

Returns **([Component](#component) \| [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function))** 

#### compileAsSFC

Compile as single file component (SFС). Also can call with mapping object

##### Parameters

-   `arg` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object))** 

##### Examples

```javascript
import renderer, { compileAsSFC } from 'sham-ui-test-helpers';
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
              function dummy( options ) {
                  const title = ref();
                  const content = ref();
                  options( {
                      [ title ]: 'Default title',
                      [ content ]: 'Default content'
                  } )
              }
              export default( Template, dummy );
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

```javascript
import renderer, { compileAsSFC } from 'sham-ui-test-helpers';
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
              function dummy( options ) {
                  const title = ref();
                  const content = ref();
                  options( {
                      [ title ]: 'Default title',
                      [ content ]: 'Default content'
                  } )
              }
              export default( Template, dummy );
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

Returns **([Component](#component) \| [Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function))** 
