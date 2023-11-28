import MDCard from 'mui/card/MDCard';
import MDForm, { IMDFormPropsReturn } from 'mui/form/MDForm';
import MDInputText from 'mui/form/MDInputText';
import { useCallback, useState } from 'react';

import { JSONObject } from 'dto/api/ApiDto';
import { useCreateNews } from 'module/news/hook/useCreateNews';
import MDFormFile from 'mui/form/MDFormFile';
import NEWS_SCHEMA from '../../schema/news.schema.json';

const API_URL: string = window['ENV' as any]['API_URL' as any] as unknown as string;

const NewsForm: React.FC = () => {
  const [file, setFile] = useState<File>();
  const { news, createOrUpdateNews } = useCreateNews();

  const handleChangeFile = useCallback((file: File) => {
    setFile(file);
  }, []);

  return (
    <MDCard title='Créer une news'>
      <MDForm initialValues={news} validationSchema={NEWS_SCHEMA} onSubmit={createOrUpdateNews(file)}>
        {(props: IMDFormPropsReturn) => (
          <>
            {props.values['image' as keyof JSONObject] && (
              <img
                alt={'Image : ' + props.values['title' as keyof JSONObject]}
                src={API_URL + '/news/download?fileName=' + props.values['image' as keyof JSONObject]}
                width='100%'
                height='150px'
              />
            )}
            <MDInputText label='Titre' name='title' {...props} />
            <MDInputText label='Description' name='description' textarea={true} {...props} />
            <MDFormFile handleChangeFile={handleChangeFile} />
          </>
        )}
      </MDForm>
    </MDCard>
  );
};

export default NewsForm;
