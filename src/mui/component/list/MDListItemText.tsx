import { ListItemText } from '@mui/material';
import { useMdTrans } from '../../../hook/trans/useMdTrans';

export interface IMDListItemTextProps {
  label: string;
}
const MDListItemText: React.FC<IMDListItemTextProps> = ({ label }) => {
  const { t } = useMdTrans();

  return <ListItemText primary={t(label)} />;
};

export default MDListItemText;
