import { Widget, options } from 'sham-ui';
import renderer from '../src';

class Label extends Widget {
    @options
    get text() {
        return 'Foo';
    }

    render() {
        return this.container.innerHTML = this.options.text;
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

it( 'options', () => {
    const { widget } = renderer( Label );
    expect( widget.options.types ).toEqual( [] );
    expect( widget.options.text ).toEqual( 'Foo' );
} );
