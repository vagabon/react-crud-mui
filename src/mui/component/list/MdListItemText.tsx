import { ListItemText } from '@mui/material';
import { useMdTrans } from '../../../hook/trans/useMdTrans';

export interface IMdListItemTextProps {
  label: string;
}
const MdListItemText: React.FC<IMdListItemTextProps> = ({ label }) => {
  const { t } = useMdTrans();

  return <ListItemText primary={t(label)} />;
};

export default MdListItemText;
