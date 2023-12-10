import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { ICurrentUserDto } from 'dto/current-user/CurrentUserDto';
import { IUserDto } from 'module/user/dto/UserDto';
import InfiniteScrool from 'mui/infinite-scroll/InfiniteScrool';
import SearchBar from 'mui/searchbar/SearchBar';
import React, { ReactNode, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/store';
import RoleUtils from 'utils/role/RoleUtils';

export interface InfiniteScroolPageProps2 {
  className?: string;
  search?: string;
  urlAdd?: string;
  urlAddRole?: string[];
  children: ReactNode;
  doChangePage: (pageToAdd: number) => void;
  doSearch?: (search: string) => void;
}

const InfiniteScrollPage: React.FC<InfiniteScroolPageProps2> = (props: InfiniteScroolPageProps2) => {
  const currentUser = useAppSelector<ICurrentUserDto<IUserDto> | null>((state) => state.auth.user);

  const navigate = useNavigate();

  const handleSearch = (search: string) => {
    props.doSearch!(search);
  };

  const onScroll = () => {
    props.doChangePage(1);
  };

  const doCreate = (event: SyntheticEvent<Element, Event>) => {
    event.stopPropagation();
    props.urlAdd && navigate(props.urlAdd);
  };

  const fabStyle = {
    position: 'absolute',
    bottom: 5,
    right: 10,
  };

  return (
    <>
      {props.search !== undefined && <SearchBar callBack={handleSearch} search={props.search} />}
      <InfiniteScrool id='infinite-container' callBack={onScroll} className={props.className}>
        {props.children}
      </InfiniteScrool>
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
