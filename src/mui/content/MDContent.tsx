import { ReactNode } from 'react';
import { useId } from '../../mui/hook/useId';

interface IMDContentProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

const MDContent: React.FC<IMDContentProps> = (props) => {
  const { id } = useId(props.id);

  return (
    <div id={id} className={'flex width100 ' + props.className}>
      {props.children}
    </div>
  );
};

export default MDContent;
