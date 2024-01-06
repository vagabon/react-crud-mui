import { Checkbox, Divider, ListItemAvatar } from '@mui/material';
import React, { Fragment, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IApiDto, ID } from '../../../../dto/api/ApiDto';
import { useMessage } from '../../../../hook/message/useMessage';
import { useMdTrans } from '../../../../hook/trans/useMdTrans';
import MdAvatar from '../../../../mui/component/avatar/MdAvatar';
import MdChip from '../../../../mui/component/chip/MdChip';
import MdList from '../../../../mui/component/list/MdList';
import MdListItem from '../../../../mui/component/list/MdListItem';
import MdListItemButton from '../../../../mui/component/list/MdListItemButton';
import MdListItemIcon from '../../../../mui/component/list/MdListItemIcon';
import MdListItemText from '../../../../mui/component/list/MdListItemText';
import CustomIcon from '../../icon/component/CustomIcon';
import CustomModaleConfirm from '../../modale/component/CustomModaleConfirm';

export interface ICustomListDto extends IApiDto {
  avatar?: string;
  user?: IApiDto;
  icon?: string;
  chip?: string;
  secondary?: string;
  name: string;
  checked?: boolean;
}

export interface ICustomListProps {
  className?: string;
  datas: ICustomListDto[];
  buttonChildren?: (id: ID) => React.JSX.Element;
  callback?: (data: IApiDto) => void;
  callbackAvatar?: (data: IApiDto) => () => void;
  callbackCheckbox?: (id: ID, checked: boolean) => void;
  callbackDelete?: (id: ID) => void;
  callbackSettings?: (data: IApiDto) => void;
}

const CustomList: React.FC<ICustomListProps> = ({
  className,
  datas,
  buttonChildren,
  callback,
  callbackAvatar,
  callbackCheckbox,
  callbackDelete,
  callbackSettings,
}) => {
  const { t } = useMdTrans();
  const [disabled, setDisabled] = useState<boolean>();
  const { message } = useMessage();

  useEffect(() => {
    if (message !== '') {
      setDisabled(false);
    }
  }, [message]);

  const handleClick = useCallback(
    (data: IApiDto) => () => {
      callback?.(data);
    },
    [callback],
  );

  const handleClickChecbox = useCallback(
    (id: ID, checked: boolean, callback?: (id: ID, checked: boolean) => void) =>
      (event: MouseEvent | MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setDisabled(true);
        callback?.(id, checked);
      },
    [],
  );

  const getIconColor = useCallback(
    (checked?: boolean) => {
      if (!callbackCheckbox) {
        return 'info';
      } else {
        return checked ? 'success' : 'error';
      }
    },
    [callbackCheckbox],
  );

  const getTextColor = useCallback((checked?: boolean) => {
    return checked ? 'success' : '';
  }, []);

  return (
    <MdList className={'custom-list overflow overflow-x-none ' + className}>
      {!datas || datas.length === 0 ? (
        <MdListItem component='div' disablePadding>
          <MdListItemButton>
            <MdListItemText color='flex align-center' label={t('NO_RESULT')} />
          </MdListItemButton>
        </MdListItem>
      ) : (
        datas?.map((data) => (
          <Fragment key={data.id}>
            <MdListItem component='div' disablePadding callback={handleClick(data)}>
              {data.avatar && (
                <ListItemAvatar>
                  <MdAvatar name={data.avatar} image={data.avatar} callback={callbackAvatar?.(data.user as IApiDto)} />
                </ListItemAvatar>
              )}
              {data.icon && (
                <MdListItemIcon>
                  <CustomIcon icon={data.icon} color={getIconColor(data.checked)} disabled={true} />
                </MdListItemIcon>
              )}
              {callbackCheckbox && (
                <MdListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={data.checked}
                    tabIndex={-1}
                    disableRipple
                    onClick={handleClickChecbox(data.id, !data.checked, callbackCheckbox)}
                    disabled={disabled}
                  />
                </MdListItemIcon>
              )}
              <MdListItemText color={getTextColor(data.checked)} label={data.name} secondary={<>{data.secondary}</>} />
              {data.chip && <MdChip label={data.chip} />}
              {buttonChildren && <>{buttonChildren(data.id)}</>}
              {callbackSettings && (
                <MdListItemIcon>
                  <CustomIcon icon='settings' color='primary' callback={() => callbackSettings(data)} />
                </MdListItemIcon>
              )}
              {callbackDelete && data.id && (
                <MdListItemIcon>
                  <CustomModaleConfirm id={data.id} icon='delete' iconColor='error' callback={callbackDelete} />
                </MdListItemIcon>
              )}
            </MdListItem>
            <Divider variant={data.avatar ? 'inset' : 'fullWidth'} component='li' />
          </Fragment>
        ))
      )}
    </MdList>
  );
};

export default CustomList;
