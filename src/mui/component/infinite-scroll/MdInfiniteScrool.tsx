import { ReactNode, useCallback, useState } from 'react';

export interface IMdInfiniteScroolProps {
  id: string;
  className?: string;
  children?: ReactNode;
  callBack?: () => void;
}

const MdInfiniteScrool: React.FC<IMdInfiniteScroolProps> = (props: IMdInfiniteScroolProps) => {
  const [stopScroll, setStopScroll] = useState(false);

  const handleNavigation = useCallback(
    (actualStopScroll: boolean, callBack?: () => void) => () => {
      const wrappedElement = document.getElementById(props.id);
      if (
        wrappedElement &&
        callBack &&
        wrappedElement.scrollHeight - wrappedElement.scrollTop <= wrappedElement.clientHeight + 30
      ) {
        if (actualStopScroll === false) {
          setStopScroll(true);
          console.log('scroll bottom reached');
          callBack();
          setTimeout(() => {
            setStopScroll(false);
          }, 500);
        }
      }
    },
    [props.id],
  );

  return (
    <div
      id={props.id}
      className={'flex container ' + props.className}
      onScroll={handleNavigation(stopScroll, props.callBack)}>
      <div className='flex max-width'>{props.children}</div>
    </div>
  );
};

MdInfiniteScrool.defaultProps = {
  callBack: () => {},
  className: '',
};

export default MdInfiniteScrool;
