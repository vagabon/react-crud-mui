import { render, screen } from '@testing-library/react';
import MdTabs from './MdTabs';

describe('MdTabs', () => {
  test('Given MdTabs when its mount then Tabs is shown', () => {
    render(
      <MdTabs
        label='label'
        tabs={[
          { name: 'tab1', label: 'Tab1' },
          { name: 'tab2', label: 'Tab2' },
        ]}>
        Content
      </MdTabs>,
    );
    expect(screen.getByTestId('Tabs')).toBeDefined();
  });
});
