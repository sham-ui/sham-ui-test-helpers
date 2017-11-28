import Link from './Link.sht';
import renderer from '../';

it( 'renders correctly', () => {
    const meta = renderer( Link, {
        url: '127.0.0.1',
        label: 'Link label'
    } );
    expect( meta.widget.ID ).toEqual( 'widget' );
    expect( meta.widget.container.innerHTML ).toEqual( '<a></a>' );
    expect( meta.rendered ).toEqual( [ 'widget' ] );

    meta.widget.update();
    expect( meta.widget.ID ).toEqual( 'widget' );
    expect( meta.widget.container.innerHTML ).toEqual( '<a href=\"127.0.0.1\">Link label</a>' );
    expect( meta.rendered ).toEqual( [ 'widget' ] );
} );

it( 'snapshot correctly', () => {
    const meta = renderer( Link, {
        url: '127.0.0.1',
        label: 'Link label'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.widget.update();
    expect( meta.toJSON() ).toMatchSnapshot();
} );


