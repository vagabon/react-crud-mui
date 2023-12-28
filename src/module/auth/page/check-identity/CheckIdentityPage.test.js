import { fireEvent, render, screen } from '@testing-library/react';
import AuthService from '../../service/AuthService';
import CheckIdentityPage from './CheckIdentityPage';

describe('CheckIdentityPage', () => {
  test('Given CheckIdentityPage when its mount then ', () => {
    const mockCheckIdentityToken = jest
      .spyOn(AuthService, 'checkIdentityToken')
      .mockReturnValue(Promise.resolve({ token: 'token' }));
    const mockResetPassword = jest
      .spyOn(AuthService, 'resetPassword')
      .mockReturnValue(Promise.resolve({ token: 'token' }));
    render(<CheckIdentityPage />);
    expect(screen.getByText(/AUTH:CHECK_IDENTITY.TITLE/)).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockCheckIdentityToken).not.toBeCalled();
    expect(mockResetPassword).not.toBeCalled();
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: '111111' } });
    fireEvent.click(screen.getAllByRole('button')[0]);
    setTimeout(() => {
      expect(mockCheckIdentityToken).toBeCalledTimes(1);
      expect(mockResetPassword).toBeCalledTimes(1);
    }, 100);
  });
});
