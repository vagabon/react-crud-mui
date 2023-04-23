import { render } from '@testing-library/react';
import { useLocationHistory } from './useLocationHistory';

const menu = [];

describe('useLocationHistory', () => {
  test('Given useLocationHistory when location is / then dispatch is called', () => {
    useAppSelectorSpy.mockImplementation((callback) => callback({ common: { scrolls: [] } }));
    useAppDispatchSpy.mockReturnValue(mockDispatch);
    mockeUsedLocation.pathname = '/';
    const ReactTested = () => {
      useLocationHistory(menu);
      return <></>;
    };
    render(<ReactTested />);
    expect(mockDispatch).toBeCalledTimes(1);
  });

  test('Given useLocationHistory when location is /apd/param then dispatch is called twice', () => {
    useAppSelectorSpy.mockImplementation((callback) => callback({ common: { scrolls: [] } }));
    useAppDispatchSpy.mockReturnValue(mockDispatch);
    mockeUsedLocation.pathname = '/apd/param';
    const ReactTested = () => {
      useLocationHistory(menu);
      return <></>;
    };
    render(<ReactTested />);
    expect(mockDispatch).toBeCalledTimes(2);
  });
});
