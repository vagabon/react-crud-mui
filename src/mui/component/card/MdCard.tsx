import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ID } from '../../../dto/api/ApiDto';
import CustomIcon from '../../../module/custom/icon/component/CustomIcon';
import { DateUtils } from '../../../utils/date/DateUtils';
import { ObjectUtils } from '../../../utils/object/OjectUtils';
import { WindowUtils } from '../../../utils/window/WindowUtils';
import { useId } from '../../hook/useId';

export interface IMdCardProps {
  id?: ID;
  title?: string;
  date?: string;
  url?: string;
  urlUpdate?: string;
  avatar?: string;
  image?: string;
  className?: string;
  children?: ReactNode;
  buttonchildren?: ReactNode;
}

const API_URL: string = WindowUtils.getEnv('API_URL');

const MdCard: React.FC<IMdCardProps> = ({ title, url, urlUpdate, avatar, image, date, ...rest }: IMdCardProps) => {
  const navigate = useNavigate();
  const { id } = useId(rest.id as string);

  const handleClick = useCallback(
    (customUrl?: string) => () => {
      customUrl && navigate(customUrl);
    },
    [navigate],
  );

  return (
    <Card {...rest} id={id}>
      {title && (
        <CardHeader
          onClick={handleClick(url)}
          avatar={
            avatar && (
              <img alt={'Image : ' + title} src={API_URL + '/download?fileName=' + avatar} width='40px' height='40px' />
            )
          }
          action={urlUpdate && <CustomIcon color='primary' icon='settings' callback={handleClick(urlUpdate)} />}
          title={
            <Typography variant='h4' color='secondary'>
              {ObjectUtils.capitalize(title)}
            </Typography>
          }
          subheader={date ? DateUtils.format(date, 'Le DD MMM YYYY à hhhmm') : ''}
        />
      )}
      {image && (
        <CardMedia>
          <img alt={'Image : ' + title} src={API_URL + '/download?fileName=' + image} width='100%' height='150px' />
        </CardMedia>
      )}
      <CardContent>{rest.children}</CardContent>
      {rest.buttonchildren && <CardActions className='justify-end'>{rest.buttonchildren}</CardActions>}
    </Card>
  );
};

export default MdCard;
