import { render, screen } from '@testing-library/react';
import MdCard from './MdCard';

describe('MdCard', () => {
  test('Given MdCard when its mount then ButtonGroup is shown', () => {
    render(
      <MdCard
        id={1}
        title='title'
        date='date'
        url='url'
        urlUpdate='urlUpdate'
        avatar='avatar'
        image='image'
        className='classNamme'></MdCard>,
    );
    expect(screen.getByTestId('Card')).toBeInTheDocument();
  });
});
