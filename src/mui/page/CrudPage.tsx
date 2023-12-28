import { ReactNode } from 'react';
import MdFabAdd, { IMdFabAddProps } from '../component/fab/add/MdFabAdd';

export interface CrudPageProps extends IMdFabAddProps {
  className?: string;
  children: ReactNode;
  doCreate?: () => void;
}

const CrudPage: React.FC<CrudPageProps> = (props: CrudPageProps) => {
  return (
    <>
      <div className='main-container'>
        <div className={'flex container ' + props.className}>{props.children}</div>
      </div>
      <MdFabAdd {...props} />
    </>
  );
};

export default CrudPage;
