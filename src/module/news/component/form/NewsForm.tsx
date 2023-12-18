import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import MDForm, { IMDFormPropsReturn, handleChangeType } from '../../../../mui/form/MDForm';
import MDInputText from '../../../../mui/form/MDInputText';

import { useCreateNews } from '../../../../module/news/hook/useCreateNews';
import MDFormFile from '../../../../mui/form/MDFormFile';

import { ID, JSONObject } from '../../../../dto/api/ApiDto';
import { INewsDto } from '../../dto/NewsDto';
import MDCard from '../../../../mui/card/MDCard';
import MDContent from '../../../../mui/content/MDContent';
import MDFormSwitch from '../../../../mui/form/MDFormSwitch';
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
        console.log('FILE UPLOAD : ', data);
        const event = { target: { name, value: data } };
        console.log(event);
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
                name='avatar'
                label='AVATAR'
                handleChangeFile={handleChangeFile(newsForm.id, props.handleChange)}
              />
              <MDFormFile
                name='image'
                label='IMAGE'
                handleChangeFile={handleChangeFile(newsForm.id, props.handleChange)}
              />
              <MDFormSwitch name='active' label='Actif' {...props} />;
            </>
          )}
        </MDForm>
      </MDCard>
      <NewsCard news={newsForm} />
    </MDContent>
  );
};

export default NewsForm;
