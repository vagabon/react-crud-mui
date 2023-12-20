import { Tab } from '@mui/material';

export interface IMdTabProps {
  value: string;
  label: string;
}

const MdTab: React.FC<IMdTabProps> = ({ value, label }) => {
  return <Tab value={value} label={label} />;
};

export default MdTab;
