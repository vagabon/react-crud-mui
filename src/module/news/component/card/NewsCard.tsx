import { INewsDto } from 'module/news/dto/NewsDto';
import MdButton from 'mui/button/MdButton';
import MDCard from 'mui/card/MDCard';

export interface INewsCardProps {
  news: INewsDto;
  link?: boolean;
}

const NewsCard: React.FC<INewsCardProps> = (props: INewsCardProps) => {
  return (
    <MDCard
      title={props.news.title}
      image={props.news.image}
      buttonchildren={<>{props.link && <MdButton label='Go to' variant='outlined' url={'/news/update/' + props.news.id} show={true} />}</>}>
      <p>{props.news.description}</p>
    </MDCard>
  );
};

NewsCard.defaultProps = {
  link: true,
};

export default NewsCard;
