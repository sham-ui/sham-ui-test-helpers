import { Widget, options } from 'sham-ui';
import renderer from '../src';

class Label extends Widget {
    @options
    get text() {
        return 'Foo';
    }

    html() {
        return this.options.text;
    }
}

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
