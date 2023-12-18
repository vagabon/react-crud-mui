import { Chip } from '@mui/material';
import { ID } from '../../dto/api/ApiDto';

export interface IMDChipProps {
  label: string;
  callbackDelete?: (id: ID) => void;
}

const MDChip: React.FC<IMDChipProps> = ({ label, callbackDelete }) => {
  return <Chip label={label} onDelete={callbackDelete} />;
};

export default MDChip;
