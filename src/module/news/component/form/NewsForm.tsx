import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ID, JSONObject } from '../../../../dto/api/ApiDto';
import { useCreateNews } from '../../../../module/news/hook/useCreateNews';
import MDCard from '../../../../mui/component/card/MDCard';
import MDContent from '../../../../mui/component/content/MDContent';
import MDForm, { IMDFormPropsReturn, handleChangeType } from '../../../../mui/component/form/MDForm';
import MDFormFile from '../../../../mui/component/form/MDFormFile';
import MDFormSwitch from '../../../../mui/component/form/MDFormSwitch';
import MDInputText from '../../../../mui/component/form/MDInputText';
import { INewsDto } from '../../dto/NewsDto';
import NEWS_SCHEMA from '../../schema/news.schema.json';
import NewsCard from '../card/NewsCard';

const NewsForm: React.FC = () => {
  const { news, createOrUpdateNews, uploadNewsImage } = useCreateNews();
  const [newsForm, setNewsForm] = useState<INewsDto>(news);

  useEffect(() => {
    setNewsForm(news);
  }, [news]);

  const handleChange = useCallback(
    (newsState: INewsDto, callback: handleChangeType) => (event: ChangeEvent<JSONObject>) => {
      callback(event);
      setNewsForm({
        ...newsState,
        [event.target['name' as keyof JSONObject]]: event.target['value' as keyof JSONObject],
      });
    },
    [],
  );

  const handleChangeFile = useCallback(
    (id: ID, callback: handleChangeType) => (name: string, file: File) => {
      uploadNewsImage(id, file).then((data) => {
        const event = { target: { name, value: data } };
        console.log('FILE UPLOAD : ', data, event);
        callback(event);
      });
    },
    [uploadNewsImage],
  );

  return (
    <MDContent id='news-form' className='markdown-form'>
      <MDCard title={news.id ? 'NEWS_UPDATE' : 'NEW_CREATE'}>
        <MDForm initialValues={news} validationSchema={NEWS_SCHEMA} onSubmit={createOrUpdateNews}>
          {(props: IMDFormPropsReturn) => (
            <>
              <MDInputText
                label='Titre'
                name='title'
                {...props}
                handleChange={handleChange(newsForm, props.handleChange)}
              />
              <MDInputText
                label='Description'
                name='description'
                textarea={10}
                {...props}
                handleChange={handleChange(newsForm, props.handleChange)}
              />
              <MDFormFile
                label='AVATAR'
                name='avatar'
                handleChangeFile={handleChangeFile(newsForm.id, props.handleChange)}
              />
              <MDFormFile
                label='IMAGE'
                name='image'
                handleChangeFile={handleChangeFile(newsForm.id, props.handleChange)}
              />
              <MDFormSwitch label='Actif' name='active' {...props} />;
            </>
          )}
        </MDForm>
      </MDCard>
      <NewsCard news={newsForm} />
    </MDContent>
  );
};

export default NewsForm;
