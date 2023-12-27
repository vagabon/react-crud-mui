import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Fragment, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ApiService from '../../../../api/service/ApiService';
import { IApiDto, ID } from '../../../../dto/api/ApiDto';
import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import MdForm, { HandleChangeType, IMdFormPropsReturnDto } from '../../../../mui/component/form/MdForm';
import MdFormFile from '../../../../mui/component/form/MdFormFile';
import MdFormSwitch from '../../../../mui/component/form/MdFormSwitch';
import MdInputDatepicker from '../../../../mui/component/form/MdInputDatepicker';
import MdInputText, { FormInputType } from '../../../../mui/component/form/MdInputText';
import HasRole from '../../../../mui/component/role/HasRole';
import { useAppDispatch } from '../../../../store/Store';
import { IYupValidators } from '../../../../utils/yup/YupUtils';
import { IAdminTabConfDto, IAdminTabDto, IFormDto } from '../../dto/AdminConfDto';
import { useAdminConf } from '../../hook/useAdminConf';
import { useAdminState } from '../../hook/useAdminState';
import { AdminAction } from '../../reducer/AdminReducer';
import AdminService from '../../service/AdminService';

export interface IAdminShowPageProps {
  conf: IAdminTabConfDto;
}

const AdminShowPage: React.FC<IAdminShowPageProps> = ({ conf }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { page = '', id = '-1' } = useParams();
  const { pageConf, formConf } = useAdminConf(page, conf);

  const { state } = useAdminState(page, pageConf as IAdminTabDto);

  useEffect(() => {
    if (id !== '-1') {
      AdminService.findById<IApiDto>(page, id).then((data) => {
        dispatch(AdminAction.setData({ activePage: page, data: data }));
      });
    } else {
      const data: IApiDto = { id: '' };
      dispatch(AdminAction.setData({ activePage: page, data }));
    }
  }, [dispatch, page, id]);

  const handleUpdate = useCallback(
    (data: IApiDto) => {
      if (data.id !== null && data.id !== undefined && data.id !== '' && Number(data.id) > 0) {
        AdminService.update(page, data)(dispatch);
      } else {
        AdminService.create(
          page,
          data,
        )(dispatch).then((dataNew: IApiDto) => {
          data.id = dataNew.id;
          dispatch(AdminAction.setData({ activePage: page, data: data }));
        });
      }
    },
    [dispatch, page],
  );

  const getTitle = useCallback(() => {
    let title = t('COMMON:FORM:CREATE');
    if (id !== '-1') {
      title = t('COMMON:FORM:UPDATE');
    }
    if (pageConf) {
      title += t(pageConf.label);
    }
    return title;
  }, [id, t, pageConf]);

  const uploadNewsImage = useCallback(
    (id: ID, file: File | undefined): Promise<string> => {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      return ApiService.post('/' + page + '/upload?id=' + id, formData, {
        'Content-Type': 'multipart/form-data',
      });
    },
    [page],
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MdContent>
        <HasRole roles={['ADMIN']}>
          <MdCard title={getTitle()}>
            {state && (
              <MdForm
                className='flex-row flex-wrap form'
                initialValues={state.data}
                validationSchema={pageConf?.form as IYupValidators}
                onSubmit={handleUpdate}>
                {(props: IMdFormPropsReturnDto) => (
                  <>
                    {formConf?.map(([key, form]: [string, IFormDto]) => (
                      <Fragment key={key}>
                        {(form.type === 'text' ||
                          form.type === 'textarea' ||
                          form.type === 'date' ||
                          form.type === 'password') && (
                          <MdInputText
                            label={form.label}
                            className={form.className ?? 'width100'}
                            name={key}
                            textarea={form.type === 'textarea' ? 10 : undefined}
                            {...props}
                            type={form.type as FormInputType}
                          />
                        )}
                        {form.type === 'datetime' && (
                          <MdInputDatepicker
                            label={form.label}
                            className={form.className}
                            name={key}
                            {...props}
                            disabled={form.disabled}
                          />
                        )}
                        {form.type === 'upload' && (
                          <MdFormFile
                            label={form.label}
                            name={key}
                            values={props.values}
                            handleChangeFile={handleChangeFile(state.data.id, props.handleChange)}
                          />
                        )}
                        {form.type === 'switch' && (
                          <MdFormSwitch className={form.className} label={form.label} name={key} {...props} />
                        )}
                      </Fragment>
                    ))}
                  </>
                )}
              </MdForm>
            )}
          </MdCard>
        </HasRole>
      </MdContent>
    </LocalizationProvider>
  );
};

export default AdminShowPage;
