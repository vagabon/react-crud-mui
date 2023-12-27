import { ReactNode } from 'react';
import { useId } from '../../hook/useId';

export interface IMdContentProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

const MdContent: React.FC<IMdContentProps> = (props) => {
  const { id } = useId(props.id);

  return (
    <div id={id} className={'flex max-width ' + props.className}>
      {props.children}
    </div>
  );
};

export default MdContent;
