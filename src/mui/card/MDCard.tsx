import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { ID } from 'dto/api/ApiDto';
import { ReactNode } from 'react';
import { Trans } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export interface MDCardProps {
  id?: ID;
  title?: string;
  url?: string;
  image?: string;
  sx?: any;
  className?: string;
  children?: ReactNode;
  buttonchildren?: ReactNode;
}

const API_URL: string = window['ENV' as any]['API_URL' as any] as unknown as string;

const MDCard: React.FC<MDCardProps> = ({ id, title, url, ...rest }: MDCardProps) => {
  const navigate = useNavigate();

  const doClick = (): void => {
    if (url) {
      navigate(url + id);
    }
  };

  return (
    <Card {...rest} style={{ margin: '10px 0px' }} onClick={doClick}>
      {/*<CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red[500]' }} aria-label='recipe'>
            R
          </Avatar>
        }
        action={<IconButton aria-label='settings'></IconButton>}
        title='Shrimp and Chorizo Paella'
        subheader='September 14, 2016'
      />*/}

      {rest.image && <img alt={'Image : ' + title} src={API_URL + '/news/download?fileName=' + rest.image} width='100%' height='150px' />}
      <CardContent>
        {title && (
          <Typography gutterBottom variant='h5' component='div'>
            <Trans i18nKey={title} />
          </Typography>
        )}
        {rest.children}
      </CardContent>
      {rest.buttonchildren && <CardActions className='justify-end'>{rest.buttonchildren}</CardActions>}
    </Card>
  );
};

export default MDCard;
