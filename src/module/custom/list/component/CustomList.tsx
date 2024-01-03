import { Checkbox, Divider, ListItem, ListItemAvatar, ListItemIcon } from '@mui/material';
import { Fragment, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IApiDto, ID } from '../../../../dto/api/ApiDto';
import { useMessage } from '../../../../hook/message/useMessage';
import { useMdTrans } from '../../../../hook/trans/useMdTrans';
import MdAvatar from '../../../../mui/component/avatar/MdAvatar';
import MdChip from '../../../../mui/component/chip/MdChip';
import MdListItemText from '../../../../mui/component/list/MdListItemText';
import Mdlist from '../../../../mui/component/list/Mdlist';
import MdlistItem from '../../../../mui/component/list/MdlistItem';
import CustomIcon from '../../icon/component/CustomIcon';
import CustomModaleConfirm from '../../modale/component/CustomModaleConfirm';

export interface ICustomListDto extends IApiDto {
  avatar?: string;
  icon?: string;
  chip?: string;
  secondary?: string;
  name: string;
  checked?: boolean;
}

export interface ICustomListProps {
  datas: ICustomListDto[];
  callback?: (data: IApiDto) => void;
  callbackCheckbox?: (id: ID, checked: boolean) => void;
  callbackDelete?: (id: ID) => void;
  callbackSettings?: (data: IApiDto) => void;
}

const CustomList: React.FC<ICustomListProps> = ({
  datas,
  callback,
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
    <Mdlist className='overflow'>
      {!datas || datas.length === 0 ? (
        <MdlistItem component='div' disablePadding>
          <MdlistItem>
            <MdListItemText color='flex justify-center' label={t('NO_RESULT')} />
          </MdlistItem>
        </MdlistItem>
      ) : (
        datas?.map((data) => (
          <Fragment key={data.id}>
            <MdlistItem component='div' disablePadding>
              <ListItem onClick={handleClick(data)}>
                {data.avatar && (
                  <ListItemAvatar>
                    <MdAvatar name={data.avatar} image={data.avatar} />
                  </ListItemAvatar>
                )}
                {data.icon && (
                  <ListItemIcon>
                    <CustomIcon icon={data.icon} color={getIconColor(data.checked)} disabled={true} />
                  </ListItemIcon>
                )}
                {callbackCheckbox && (
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={data.checked}
                      tabIndex={-1}
                      disableRipple
                      onClick={handleClickChecbox(data.id, !data.checked, callbackCheckbox)}
                      disabled={disabled}
                    />
                  </ListItemIcon>
                )}
                <MdListItemText
                  color={getTextColor(data.checked)}
                  label={data.name}
                  secondary={<>{data.secondary}</>}
                />
                {data.chip && <MdChip label={data.chip} />}
                {callbackSettings && (
                  <ListItemIcon>
                    <CustomIcon icon='settings' color='primary' callback={() => callbackSettings(data)} />
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
