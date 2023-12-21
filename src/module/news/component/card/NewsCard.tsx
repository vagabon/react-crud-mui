import { useCallback, useState } from 'react';
import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import MdMarkdown from '../../../../mui/component/markdown/MdMarkdown';
import { useRole } from '../../../../mui/component/role/useRole';
import { useId } from '../../../../mui/hook/useId';
import { INewsDto } from '../../dto/NewsDto';

export interface INewsCardProps {
  news: INewsDto;
}

const NewsCard: React.FC<INewsCardProps> = (props: INewsCardProps) => {
  const { id } = useId('title');
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
    <MdContent id={id} className='mardown-with-summary'>
      <MdCard
        title={props.news.title}
        avatar={props.news.avatar}
        image={props.news.image}
        date={props.news.updatedDate}
        urlUpdate={hasUserRole(['ADMIN']) ? '/news/update/' + props.news.id : undefined}>
        <MdMarkdown content={props.news.description} summaryCallback={summaryCallback(props.news.title)}></MdMarkdown>
      </MdCard>
      <MdCard className='md-summary'>
        <MdMarkdown content={summary}></MdMarkdown>
      </MdCard>
    </MdContent>
  );
};

export default NewsCard;
