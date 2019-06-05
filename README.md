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
```
