import SettingsIcon from '@mui/icons-material/Settings';
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material';
import { ID } from 'dto/api/ApiDto';
import { MouseEvent, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateUtils } from 'utils/date/DateUtils';

export interface MDCardProps {
  id?: ID;
  title?: string;
  date?: string;
  url?: string;
  urlUpdate?: string;
  avatar?: string;
  image?: string;
  sx?: any;
  className?: string;
  children?: ReactNode;
  buttonchildren?: ReactNode;
}

const API_URL: string = window['ENV' as any]['API_URL' as any] as unknown as string;

const MDCard: React.FC<MDCardProps> = ({ id, title, url, urlUpdate, avatar, image, date, ...rest }: MDCardProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (customUrl?: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      customUrl && navigate(customUrl);
    },
    [navigate],
  );

  return (
    <Card {...rest} style={{ margin: '10px', padding: '10px' }}>
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
