import Link from './Link.sht';
import Dummy from './Dummy.sht';
import Panel from './Panel.sfc';
import renderer from '../src';

it( 'renders correctly', () => {
    const meta = renderer( Link, {
        url: '127.0.0.1',
        label: 'Link label'
    } );
    expect( meta.component.ID ).toEqual( 'component' );
    expect( meta.component.container.innerHTML ).toEqual( '<a href="127.0.0.1">Link label</a>' );
    expect( meta.rendered ).toEqual( [ 'component' ] );
} );

it( 'snapshot correctly', () => {
    const meta = renderer( Link, {
        url: '127.0.0.1',
        label: 'Link label'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.component.update();
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.component.update( {
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
    meta.component.update();
    expect( meta.toJSON() ).toMatchSnapshot();
} );


it( 'single file component', () => {
    const meta = renderer( Panel );
    expect( meta.toJSON() ).toMatchSnapshot();
    meta.component.update( {
        title: 'Custom title',
        content: 'Custom content'
    } );
    expect( meta.toJSON() ).toMatchSnapshot();
} );
