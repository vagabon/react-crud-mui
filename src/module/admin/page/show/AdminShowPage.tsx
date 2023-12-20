import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Fragment, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IApiDto } from '../../../../dto/api/ApiDto';
import MdCard from '../../../../mui/component/card/MdCard';
import MdContent from '../../../../mui/component/content/MdContent';
import MdForm, { IMdFormPropsReturnDto } from '../../../../mui/component/form/MdForm';
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MdContent>
        <HasRole roles={['ADMIN']}>
          <MdCard>
            {state && (
              <MdForm
                initialValues={state.data}
                validationSchema={pageConf?.form as IYupValidators}
                onSubmit={handleUpdate}>
                {(props: IMdFormPropsReturnDto) => (
                  <>
                    {formConf?.map(([key, form]: [string, IFormDto]) => (
                      <Fragment key={key}>
                        {(form.type === 'text' || form.type === 'date' || form.type === 'password') && (
                          <MdInputText label={form.label} name={key} {...props} type={form.type as FormInputType} />
                        )}
                        {form.type === 'datetime' && (
                          <MdInputDatepicker label={form.label} name={key} {...props} disabled={form.disabled} />
                        )}
                        {form.type === 'switch' && <MdFormSwitch label={form.label} name={key} {...props} />}
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
