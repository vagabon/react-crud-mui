import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { SyntheticEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICurrentUserDto } from '../../../dto/current-user/CurrentUserDto';
import { IUserDto } from '../../../module/user/dto/UserDto';
import { useAppSelector } from '../../../store/Store';
import RoleUtils from '../../../utils/role/RoleUtils';
import MdContent from '../content/MdContent';

export interface IMdFabAddProps {
  urlAdd?: string;
  urlAddRole?: string[];
}

const fabStyle = {
  position: 'absolute',
  bottom: 5,
  right: 10,
};

const MdFabAdd: React.FC<IMdFabAddProps> = (props) => {
  const currentUser = useAppSelector<ICurrentUserDto<IUserDto> | null>((state) => state.auth.user);
  const navigate = useNavigate();

  const doCreate = useCallback(
    (event: SyntheticEvent<Element, Event>) => {
      event.stopPropagation();
      props.urlAdd && navigate(props.urlAdd);
    },
    [props.urlAdd, navigate],
  );

  return (
    <MdContent className='relative'>
      {props.urlAdd && RoleUtils.hasProfile(currentUser, props.urlAddRole) && (
        <div style={{ position: 'absolute', bottom: '13px', right: '13px' }}>
          <Fab size='medium' color='primary' aria-label='add' sx={fabStyle} onClick={doCreate}>
            <AddIcon />
          </Fab>
        </div>
      )}
    </MdContent>
  );
};

export default MdFabAdd;
