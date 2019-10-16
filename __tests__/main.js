import { Component, options } from 'sham-ui';
import renderer from '../src';

class Label extends Component {
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

    expect( meta.component.ID ).toEqual( 'component' );
    expect( meta.component.container.innerHTML ).toEqual( 'Foo' );
} );

it( 'snapshot correctly', () => {
    const tree = renderer( Label ).toJSON();
    expect( tree ).toMatchSnapshot();
} );

it( 'options', () => {
    const { component } = renderer( Label );
    expect( component.options.text ).toEqual( 'Foo' );
} );
