import { useEffect } from 'react';
import { useFetchNews } from '../hook/useFetchNews';
import { INewsDto } from '../dto/NewsDto';
import NewsCard from './card/NewsCard';
import { InfiniteScrollPage } from 'index';

const News: React.FC = () => {
  const { news, search, page, doSearch, doChangePage } = useFetchNews();

  useEffect(() => {
    if (news.length === 0) {
      doSearch('');
    }
  }, [doSearch, news.length]);

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
