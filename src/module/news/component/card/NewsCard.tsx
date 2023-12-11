import { INewsDto } from 'module/news/dto/NewsDto';
import { MuiMarkdown } from 'mui-markdown';
import { Highlight, themes } from 'prism-react-renderer';
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
      <p>
        <MuiMarkdown Highlight={Highlight} themes={themes} prismTheme={themes.github}>
          {props.news.description}
        </MuiMarkdown>
      </p>
    </MDCard>
  );
};

NewsCard.defaultProps = {
  link: true,
};

export default NewsCard;
