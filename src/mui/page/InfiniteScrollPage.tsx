import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import React, { ReactNode, SyntheticEvent } from 'react';
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
      {props.search !== undefined && <MdSearchBar callBack={handleSearch} search={props.search} />}
      <MdInfiniteScrool id='infinite-container' callBack={onScroll} className={props.className}>
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
