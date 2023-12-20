import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { ReactNode, SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICurrentUserDto } from '../../dto/current-user/CurrentUserDto';
import { IUserDto } from '../../module/user/dto/UserDto';
import { useAppSelector } from '../../store/Store';
import RoleUtils from '../../utils/role/RoleUtils';
import MdInfiniteScrool from '../component/infinite-scroll/MdInfiniteScrool';
import MdSearchBar from '../component/searchbar/MdSearchBar';

export interface InfiniteScroolPageProps {
  className?: string;
  search?: string;
  urlAdd?: string;
  urlAddRole?: string[];
  children: ReactNode;
  doChangePage: (pageToAdd: number) => void;
  doSearch?: (search: string) => void;
}

const InfiniteScrollPage: React.FC<InfiniteScroolPageProps> = (props: InfiniteScroolPageProps) => {
  const currentUser = useAppSelector<ICurrentUserDto<IUserDto> | null>((state) => state.auth.user);

  const navigate = useNavigate();

  const handleSearch = useCallback(
    (callback?: (search: string) => void) => (search: string) => {
      callback?.(search);
    },
    [],
  );

  const onScroll = useCallback(
    (callback: (pageToAdd: number) => void) => () => {
      callback(1);
    },
    [],
  );

  const doCreate = useCallback(
    (event: SyntheticEvent<Element, Event>) => {
      event.stopPropagation();
      props.urlAdd && navigate(props.urlAdd);
    },
    [props.urlAdd, navigate],
  );

  const fabStyle = {
    position: 'absolute',
    bottom: 5,
    right: 10,
  };

  return (
    <>
      {props.search !== undefined && <MdSearchBar callBack={handleSearch(props.doSearch)} search={props.search} />}
      <MdInfiniteScrool id='infinite-container' callBack={onScroll(props.doChangePage)} className={props.className}>
        {props.children}
      </MdInfiniteScrool>
      {props.urlAdd && RoleUtils.hasProfile(currentUser, props.urlAddRole) && (
        <div style={{ position: 'relative', display: 'flex', alignSelf: 'end' }}>
          <Fab size='medium' color='primary' aria-label='add' sx={fabStyle} onClick={doCreate}>
            <AddIcon />
          </Fab>
        </div>
      )}
    </>
  );
};

export default InfiniteScrollPage;
