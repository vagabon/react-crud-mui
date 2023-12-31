import { ListItemText } from '@mui/material';
import { useMdTrans } from '../../../hook/trans/useMdTrans';

export interface IMdListItemTextProps {
  color?: string;
  label: string;
  secondary?: React.JSX.Element;
}
const MdListItemText: React.FC<IMdListItemTextProps> = ({ label, color, secondary }) => {
  const { t } = useMdTrans();

  return <ListItemText className={color} primary={t(label)} secondary={secondary} />;
};

export default MdListItemText;
