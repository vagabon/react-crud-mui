import { fireEvent, render } from '@testing-library/react';
import MdInfiniteScrool from './MdInfiniteScrool';

describe('MdInfiniteScrool', () => {
  test('Given MdInfiniteScrool When its mount Then LinearProgress is shown', () => {
    const children = () => {
      return <div style={{ width: '1500px', height: '1500px' }}></div>;
    };
    const { container } = render(
      <MdInfiniteScrool id='id' className='className'>
        {children}
      </MdInfiniteScrool>,
    );
    expect(container.getElementsByClassName('container')[0]).toBeDefined();
    fireEvent.scroll(container.getElementsByClassName('container')[0], { target: { scrollY: 1500 } });
  });
});
