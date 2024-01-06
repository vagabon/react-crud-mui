import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { IApiDto, JSONObject } from '../../../../dto/api/ApiDto';
import HasRole from '../../../../hook/role/HasRole';
import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import { useAppDispatch } from '../../../../store/Store';
import { IYupValidators } from '../../../../utils/yup/YupUtils';
import CustomForm from '../../../custom/form/component/CustomForm';
import { IAdminTabConfDto, IAdminTabDto } from '../../dto/AdminConfDto';
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
    if (id !== '-1' && pageConf?.name === page) {
      AdminService.findById<IApiDto>(page, id).then((data) => {
        let newData = data;
        formConf.forEach(([key, form]) => {
          const value = newData[key as keyof JSONObject];
          if (!form.array && !form.listId && (!value || value === null)) {
            newData = { ...newData, [key as keyof JSONObject]: '' };
          }
        });
        dispatch(AdminAction.setData({ activePage: page, data: newData }));
      });
    } else {
      const data: IApiDto = { id: '' };
      dispatch(AdminAction.setData({ activePage: page, data }));
    }
  }, [dispatch, page, id, pageConf, formConf]);

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MdContent>
        <HasRole roles={['ADMIN']}>
          <MdCard title={getTitle()}>
            {state && (
              <CustomForm
                endPoint={page}
                urlGoBack={'/admin/tab/' + page}
                conf={formConf}
                values={state.data}
                schema={pageConf?.form as IYupValidators}
                handleUpdate={handleUpdate}
              />
            )}
          </MdCard>
        </HasRole>
      </MdContent>
    </LocalizationProvider>
  );
};

export default AdminShowPage;
