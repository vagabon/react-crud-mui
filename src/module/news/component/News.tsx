import InfiniteScrollPage from 'mui/page/InfiniteScrollPage';
import { useEffect } from 'react';
import { INewsDto } from '../dto/NewsDto';
import { useFetchNews } from '../hook/useFetchNews';
import NewsCard from './card/NewsCard';

const News: React.FC = () => {
  const { news, search, page, doSearch, doChangePage } = useFetchNews();

  useEffect(() => {
    doSearch('');
  }, [doSearch]);

  return (
    <InfiniteScrollPage search={search} doChangePage={doChangePage(page)} doSearch={doSearch} urlAdd='/news/add' urlAddRole={['ADMIN']}>
      <>
        {news.map((oneNews: INewsDto) => (
          <NewsCard key={oneNews.id} news={oneNews} />
        ))}
      </>
    </InfiniteScrollPage>
  );
};

export default News;
