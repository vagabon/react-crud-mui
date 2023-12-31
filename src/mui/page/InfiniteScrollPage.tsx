import { ReactNode, useCallback } from 'react';
import MdFabAdd, { IMdFabAddProps } from '../component/fab/add/MdFabAdd';
import MdInfiniteScrool from '../component/infinite-scroll/MdInfiniteScrool';
import MdSearchBar from '../component/searchbar/MdSearchBar';

export interface InfiniteScroolPageProps extends IMdFabAddProps {
  className?: string;
  search?: string;
  children: ReactNode;
  doChangePage?: (pageToAdd: number) => void;
  doSearch?: (search: string) => void;
}

const InfiniteScrollPage: React.FC<InfiniteScroolPageProps> = (props: InfiniteScroolPageProps) => {
  const handleSearch = useCallback(
    (callback?: (search: string) => void) => (search: string) => {
      callback?.(search);
    },
    [],
  );

  const onScroll = useCallback(
    (callback?: (pageToAdd: number) => void) => () => {
      callback?.(1);
    },
    [],
  );

  return (
    <>
      {props.search !== undefined && <MdSearchBar callBack={handleSearch(props.doSearch)} search={props.search} />}
      <MdInfiniteScrool id='infinite-container' callBack={onScroll(props.doChangePage)} className={props.className}>
        {props.children}
      </MdInfiniteScrool>
      <MdFabAdd {...props} />
    </>
  );
};

export default InfiniteScrollPage;
