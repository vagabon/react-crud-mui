import { Tabs } from '@mui/material';
import { ReactNode, SyntheticEvent, useCallback } from 'react';

export interface IMDTabsProps {
  value: string;
  callback?: (value: string) => void;
  indicatorColor?: 'secondary' | 'primary';
  color?: 'secondary' | 'primary' | 'inherit';
  label?: string;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  scrollButtons?: 'auto' | true | false;
  tabs: ReactNode[];
}

const MDTabs: React.FC<IMDTabsProps> = ({
  value,
  callback,
  indicatorColor,
  color,
  label,
  variant,
  scrollButtons,
  tabs,
}) => {
  const handleChange = useCallback(
    (event: SyntheticEvent<Element, Event>, newValue: React.SetStateAction<string>) => {
      event.stopPropagation();
      callback!(newValue as string);
    },
    [callback],
  );

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor={indicatorColor ?? 'primary'}
      textColor={color ?? 'primary'}
      aria-label={label ?? ''}
      variant={variant ?? 'scrollable'}
      scrollButtons={scrollButtons ?? 'auto'}>
      {tabs}
    </Tabs>
  );
};

export default MDTabs;
