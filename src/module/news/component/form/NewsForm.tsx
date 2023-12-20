import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { ID, JSONObject } from '../../../../dto/api/ApiDto';
import { useCreateNews } from '../../../../module/news/hook/useCreateNews';
import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import MdForm, { HandleChangeType, IMdFormPropsReturnDto } from '../../../../mui/component/form/MdForm';
import MdFormFile from '../../../../mui/component/form/MdFormFile';
import MdFormSwitch from '../../../../mui/component/form/MdFormSwitch';
import MdInputText from '../../../../mui/component/form/MdInputText';
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
    (newsState: INewsDto, callback: HandleChangeType) => (event: ChangeEvent<JSONObject>) => {
      callback(event);
      setNewsForm({
        ...newsState,
        [event.target['name' as keyof JSONObject]]: event.target['value' as keyof JSONObject],
      });
    },
    [],
  );

  const handleChangeFile = useCallback(
    (id: ID, callback: HandleChangeType) => (name: string, file: File) => {
      uploadNewsImage(id, file).then((data) => {
        const event = { target: { name, value: data } };
        console.log('FILE UPLOAD : ', data, event);
        callback(event);
      });
    },
    [uploadNewsImage],
  );

  return (
    <MdContent id='news-form' className='markdown-form'>
      <MdCard title={news.id ? 'NEWS_UPDATE' : 'NEW_CREATE'}>
        <MdForm initialValues={news} validationSchema={NEWS_SCHEMA} onSubmit={createOrUpdateNews}>
          {(props: IMdFormPropsReturnDto) => (
            <>
              <MdInputText
                label='Titre'
                name='title'
                {...props}
                handleChange={handleChange(newsForm, props.handleChange)}
              />
              <MdInputText
                label='Description'
                name='description'
                textarea={10}
                {...props}
                handleChange={handleChange(newsForm, props.handleChange)}
              />
              <MdFormFile
                label='AVATAR'
                name='avatar'
                handleChangeFile={handleChangeFile(newsForm.id, props.handleChange)}
              />
              <MdFormFile
                label='IMAGE'
                name='image'
                handleChangeFile={handleChangeFile(newsForm.id, props.handleChange)}
              />
              <MdFormSwitch label='Actif' name='active' {...props} />;
            </>
          )}
        </MdForm>
      </MdCard>
      <NewsCard news={newsForm} />
    </MdContent>
  );
};

export default NewsForm;
