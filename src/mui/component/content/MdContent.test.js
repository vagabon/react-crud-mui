import { render } from '@testing-library/react';
import MdContent from './MdContent';

describe('MdContent', () => {
  test('Given MdContent when its mount then ButtonGroup is shown', () => {
    const { container } = render(<MdContent>Content</MdContent>);
    expect(container.getElementsByClassName('max-width')[0]).toBeDefined();
  });
});
