import { fireEvent, render, screen } from '@testing-library/react';
import MdCommonModal from './MdCommonModal';

describe('MdCommonModal', () => {
  test('Given MdCommonModal When its mount Then Modal is shown', () => {
    const mockhandleClose = jest.fn();
    render(<MdCommonModal handleClose={mockhandleClose}></MdCommonModal>);
    expect(screen.getByTestId('Modal')).toBeDefined();
    fireEvent.click(screen.getByTestId('ModalClick'));
    fireEvent.click(screen.getByTestId('ModalClose'));
    expect(mockhandleClose).toBeCalled();
  });
});
