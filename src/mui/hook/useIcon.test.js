import { render, screen } from '@testing-library/react';
import { ICONS, useIcon } from './useIcon';

const ReactModal = () => {
  const { getIcon } = useIcon();
  return (
    <>
      {Object.entries(ICONS).map(([key]) => (
        <div key={key} data-testid='Icon'>
          {getIcon(key)}
        </div>
      ))}
    </>
  );
};

describe('useIcon', () => {
  test('Given useIcon when is mount with an id Then ', () => {
    render(<ReactModal />);
    expect(screen.getAllByTestId('Icon').length).toBe(Object.entries(ICONS).length);
  });
});
