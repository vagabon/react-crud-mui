import { Avatar, Checkbox, Divider, ListItem, ListItemAvatar, ListItemIcon } from '@mui/material';
import { Fragment, MouseEvent, useCallback } from 'react';
import { IApiDto, ID } from '../../../../dto/api/ApiDto';
import { useMdTrans } from '../../../../hook/trans/useMdTrans';
import MdListItemText from '../../../../mui/component/list/MdListItemText';
import Mdlist from '../../../../mui/component/list/Mdlist';
import MdlistItem from '../../../../mui/component/list/MdlistItem';
import MdlistItemButton from '../../../../mui/component/list/MdlistItemButton';
import CustomIcon from '../../icon/component/CustomIcon';
import CustomModaleConfirm from '../../modale/component/CustomModaleConfirm';

export interface ICustomListDto extends IApiDto {
  avatar?: string;
  icon?: string;
  name: string;
  checked?: boolean;
}

export interface ICustomList {
  datas: ICustomListDto[];
  callback?: (data: IApiDto) => void;
  callbackCheckbox?: (id: ID) => void;
  callbackDelete?: (id: ID) => void;
}

const CustomList: React.FC<ICustomList> = ({ datas, callback, callbackCheckbox, callbackDelete }) => {
  const { t } = useMdTrans();

  const handleClick = useCallback(
    (data: IApiDto) => () => {
      console.log('ok');
      callback?.(data);
    },
    [callback],
  );

  const handleClickIcon = useCallback(
    (id: ID, callback?: (id: ID) => void) => (event: MouseEvent | MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      callback?.(id);
    },
    [],
  );

  return (
    <Mdlist className='overflow'>
      {!datas || datas.length === 0 ? (
        <MdlistItem component='div' disablePadding>
          <MdlistItemButton>
            <MdListItemText label={t('NO_RESULT')} />
          </MdlistItemButton>
        </MdlistItem>
      ) : (
        datas?.map((data) => (
          <Fragment key={data.id}>
            <MdlistItem component='div' disablePadding>
              <ListItem onClick={handleClick(data)}>
                {data.avatar && (
                  <ListItemAvatar>
                    <Avatar alt={data.avatar} src={data.avatar} />
                  </ListItemAvatar>
                )}
                {data.icon && (
                  <ListItemIcon>
                    <CustomIcon icon={data.icon} color='info' disabled={true} />
                  </ListItemIcon>
                )}
                {callbackCheckbox && (
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={data.checked}
                      tabIndex={-1}
                      disableRipple
                      onClick={handleClickIcon(data.id, callbackCheckbox)}
                    />
                  </ListItemIcon>
                )}
                <MdListItemText label={data.name} />
                {callbackDelete && (
                  <ListItemIcon>
                    <CustomIcon icon='settings' />
                  </ListItemIcon>
                )}
                {callbackDelete && (
                  <ListItemIcon>
                    <CustomModaleConfirm id={data.id} icon='delete' callback={callbackDelete} />
                  </ListItemIcon>
                )}
              </ListItem>
            </MdlistItem>
            <Divider variant={data.avatar ? 'inset' : 'fullWidth'} component='li' />
          </Fragment>
        ))
      )}
    </Mdlist>
  );
};

export default CustomList;
