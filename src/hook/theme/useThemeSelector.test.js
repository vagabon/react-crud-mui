import { fireEvent, render } from '@testing-library/react';
import { useThemeSelector } from './useThemeSelector';

describe('useThemeSelector', () => {
  test('Given useThemeSelector When click on theme Then container is visible', async () => {
    const ReactTested = () => {
      const { open, handleTheme } = useThemeSelector();
      return (
        <>
          <div className='theme' onClick={handleTheme(!open)}></div>
          {open && <div className='visible'></div>}
        </>
      );
    };
    const { container } = render(<ReactTested />);
    fireEvent.click(container.getElementsByClassName('theme')[0]);
    expect(container.getElementsByClassName('visible').length).toBe(1);
    fireEvent.click(container.getElementsByClassName('theme')[0]);
    expect(container.getElementsByClassName('visible').length).toBe(0);
  });
});
