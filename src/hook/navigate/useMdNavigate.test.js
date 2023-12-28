import { render } from '@testing-library/react';
import { useMdNavigate, useMdParams } from './useMdNavigate';

const menu = [];

describe('useMdNavigate', () => {
  test('Given useMdNavigate When its mmount Then ', () => {
    const ReactTested = () => {
      useMdNavigate();
      useMdParams();
      return <></>;
    };
    render(<ReactTested />);
  });
});
