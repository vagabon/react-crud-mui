import { fireEvent, render, screen } from '@testing-library/react';
import AuthService from '../../service/AuthService';
import ForgetPasswordPage from './ForgetPasswordPage';

describe('ForgetPasswordPage', () => {
  test('Given ForgetPasswordPage when its mount then ', () => {
    const mockCreateIdentityToken = jest.spyOn(AuthService, 'createIdentityToken').mockReturnValue(Promise.resolve({}));
    render(<ForgetPasswordPage />);
    expect(screen.getByText(/AUTH:FORGET_PASSWORD.TITLE/)).toBeInTheDocument();
    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'test@gmail.com' } });
    fireEvent.click(screen.getAllByRole('button')[0]);
    setTimeout(() => {
      expect(mockCreateIdentityToken).toBeCalledTimes(1);
    }, 100);
  });
});
