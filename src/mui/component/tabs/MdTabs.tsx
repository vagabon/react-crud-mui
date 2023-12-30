import { Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type TabsType = {
  name: string;
  label: string;
};

export interface IMdTabsProps {
  value: string;
  callback?: (value: string) => void;
  indicatorColor?: 'secondary' | 'primary';
  color?: 'secondary' | 'primary' | 'inherit';
  label?: string;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  scrollButtons?: 'auto' | true | false;
  tabs: TabsType[];
}

const MdTabs: React.FC<IMdTabsProps> = ({
  value,
  callback,
  indicatorColor,
  color,
  label,
  variant,
  scrollButtons,
  tabs,
}) => {
  const { t } = useTranslation();

  const handleChange = useCallback(
    (event: SyntheticEvent<Element, Event>, newValue: React.SetStateAction<string>) => {
      event.stopPropagation();
      callback?.(newValue as string);
    },
    [callback],
  );

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor={indicatorColor ?? 'secondary'}
      textColor={color ?? 'secondary'}
      aria-label={label ?? ''}
      variant={variant ?? 'scrollable'}
      scrollButtons={scrollButtons ?? 'auto'}>
      {tabs.map((tab) => (
        <Tab key={tab.name} value={tab.name} label={t(tab.label)} />
      ))}
    </Tabs>
  );
};

export default MdTabs;
