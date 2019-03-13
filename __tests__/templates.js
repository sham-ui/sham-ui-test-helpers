import Link from './Link.sht';
import Dummy from './Dummy.sht';
import Panel from './Panel.sfw';
import renderer from '../src';

it( 'renders correctly', () => {
    const meta = renderer( Link, {
        url: '127.0.0.1',
        label: 'Link label'
    } );
    expect( meta.widget.ID ).toEqual( 'widget' );
    expect( meta.widget.container.innerHTML ).toEqual( '<a href="127.0.0.1">Link label</a>' );
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
    meta.widget.update( {
        label: 'Updated link label'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'pretty html', () => {
    const meta = renderer( Dummy, {
        url: '127.0.0.1',
        label: 'Link label'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.widget.update();
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'single file widget', () => {
    const meta = renderer( Panel );
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.widget.update( {
        title: 'Custom title',
        content: 'Custom content'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
