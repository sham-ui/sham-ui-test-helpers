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

    expect( meta.widget.ID ).toEqual( 'widget' );
    expect( meta.widget.container.innerHTML ).toEqual( 'Foo' );
    expect( meta.rendered ).toEqual( [ 'widget' ] );
} );

it( 'snapshot correctly', () => {
    const tree = renderer( Label ).toJSON();
    expect( tree ).toMatchSnapshot();
} );
```
