import { ReactNode, useState } from 'react';

export interface IMdInfiniteScroolProps {
  id: string;
  className?: string;
  children?: ReactNode;
  callBack?: () => void;
}

const MdInfiniteScrool: React.FC<IMdInfiniteScroolProps> = (props: IMdInfiniteScroolProps) => {
  const [stopScroll, setStopScroll] = useState(false);

  const handleNavigation = () => {
    const wrappedElement = document.getElementById(props.id);
    if (
      wrappedElement &&
      props.callBack &&
      wrappedElement.scrollHeight - wrappedElement.scrollTop <= wrappedElement.clientHeight + 30
    ) {
      if (stopScroll === false) {
        setStopScroll(true);
        console.log('scroll bottom reached');
        props.callBack();
        setTimeout(() => {
          setStopScroll(false);
        }, 500);
      }
    }
  };

  return (
    <div id={props.id} className={'flex container ' + props.className} onScroll={handleNavigation}>
      <div className='flex width100'>{props.children}</div>
    </div>
  );
};

MdInfiniteScrool.defaultProps = {
  callBack: () => {},
  className: '',
};

export default MdInfiniteScrool;
