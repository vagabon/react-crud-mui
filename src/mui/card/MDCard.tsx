import SettingsIcon from '@mui/icons-material/Settings';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import { MouseEvent, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ID } from '../../dto/api/ApiDto';
import { DateUtils } from '../../utils/date/DateUtils';
import { useId } from '../hook/useId';

export interface MDCardProps {
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

const API_URL: string = window['ENV' as keyof Window]['API_URL' as keyof Window] as unknown as string;

const MDCard: React.FC<MDCardProps> = ({ title, url, urlUpdate, avatar, image, date, ...rest }: MDCardProps) => {
  const navigate = useNavigate();
  const { id } = useId(rest.id as string);

  const handleClick = useCallback(
    (customUrl?: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
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
              <img
                alt={'Image : ' + title}
                src={API_URL + '/news/download?fileName=' + avatar}
                width='40px'
                height='40px'
              />
            )
          }
          action={
            urlUpdate && (
              <IconButton aria-label='delete' onClick={handleClick(urlUpdate)}>
                <SettingsIcon />
              </IconButton>
            )
          }
          title={title}
          subheader={date ? DateUtils.format(date, 'Le DD MMM YYYY à hhhmm') : ''}
        />
      )}
      {image && (
        <CardMedia>
          <img
            alt={'Image : ' + title}
            src={API_URL + '/news/download?fileName=' + image}
            width='100%'
            height='150px'
          />
        </CardMedia>
      )}
      <CardContent>{rest.children}</CardContent>
      {rest.buttonchildren && <CardActions className='justify-end'>{rest.buttonchildren}</CardActions>}
    </Card>
  );
};

export default MDCard;
