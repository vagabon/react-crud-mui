import { Chip } from '@mui/material';
import { ID } from '../../../dto/api/ApiDto';

export interface IMdChipProps {
  label: string;
  callbackDelete?: (id: ID) => void;
}

const MdChip: React.FC<IMdChipProps> = ({ label, callbackDelete }) => {
  return <Chip label={label} onDelete={callbackDelete} />;
};

export default MdChip;
