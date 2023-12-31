import { fireEvent, render, screen } from '@testing-library/react';
import AuthService from '../../../service/AuthService';
import LoginGoogle from './LoginGoogle';

jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => <div data-testid='GOOGLE'>{children}</div>,
  useGoogleLogin: ({ onSuccess }) => {
    return onSuccess;
  },
}));

jest.mock('../../../../../mui/component/button/MdButton', () => ({ onClick }) => {
  return <button onClick={onClick}></button>;
});

describe('LoginGoogle', () => {
  test('Given LoginGoogle when its mount then ', () => {
    const { container } = render(<LoginGoogle />);
    jest.spyOn(AuthService, 'googleConnect').mockReturnValue(Promise.resolve({}));
    expect(container.getElementsByClassName('align-center')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button')[0]);
  });
});
