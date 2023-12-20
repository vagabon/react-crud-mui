import { useCallback, useState } from 'react';
import MDCard from '../../../../mui/component/card/MDCard';
import MDContent from '../../../../mui/component/content/MDContent';
import MdMarkdown from '../../../../mui/component/markdown/MdMarkdown';
import { useRole } from '../../../../mui/component/role/useRole';
import { useId } from '../../../../mui/hook/useId';
import { INewsDto } from '../../dto/NewsDto';

export interface INewsCardProps {
  news: INewsDto;
}

const NewsCard: React.FC<INewsCardProps> = (props: INewsCardProps) => {
  const { id } = useId();
  const [summary, setSummary] = useState<string>('');
  const { hasUserRole } = useRole();

  const summaryCallback = useCallback(
    (title?: string) => (newSummary: string) => {
      let completeSummary = '[' + title + '](#' + id + ')\n\n';
      completeSummary += newSummary;
      setSummary(completeSummary);
    },
    [id],
  );

  return (
    <MDContent id={id} className='mardown-with-summary'>
      <MDCard
        title={props.news.title}
        avatar={props.news.avatar}
        image={props.news.image}
        date={props.news.updatedDate}
        urlUpdate={hasUserRole(['ADMIN']) ? '/news/update/' + props.news.id : undefined}>
        <MdMarkdown content={props.news.description} summaryCallback={summaryCallback(props.news.title)}></MdMarkdown>
      </MDCard>
      <MDCard>
        <MdMarkdown content={summary}></MdMarkdown>
      </MDCard>
    </MDContent>
  );
};

export default NewsCard;
