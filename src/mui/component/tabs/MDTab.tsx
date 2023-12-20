import { Tab } from '@mui/material';

export interface IMDTabProps {
  value: string;
  label: string;
}

const MDTab: React.FC<IMDTabProps> = ({ value, label }) => {
  return <Tab value={value} label={label} />;
};

export default MDTab;
