import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IApiDto } from '../../../../dto/api/ApiDto';
import MDCard from '../../../../mui/card/MDCard';
import MDContent from '../../../../mui/content/MDContent';
import MDForm, { IMDFormPropsReturn } from '../../../../mui/form/MDForm';
import MDFormSwitch from '../../../../mui/form/MDFormSwitch';
import MDInputText, { FormInputType } from '../../../../mui/form/MDInputText';
import HasRole from '../../../../mui/role/HasRole';
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

  console.log(page, pageConf, id);

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

  const handleUpdate = (data: IApiDto) => {
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
  };

  return (
    <MDContent>
      <HasRole roles={['ADMIN']}>
        <MDCard>
          {state && (
            <MDForm
              initialValues={state.data}
              validationSchema={pageConf?.form as IYupValidators}
              onSubmit={handleUpdate}>
              {(props: IMDFormPropsReturn) => (
                <>
                  {formConf?.map(([key, form]: [string, IFormDto]) => (
                    <Fragment key={key}>
                      {(form.type === 'text' || form.type === 'date' || form.type === 'password') && (
                        <MDInputText label={form.label} name={key} {...props} type={form.type as FormInputType} />
                      )}
                      {form.type === 'switch' && <MDFormSwitch label={form.label} name={key} {...props} />}
                    </Fragment>
                  ))}
                </>
              )}
            </MDForm>
          )}
        </MDCard>
      </HasRole>
    </MDContent>
  );
};

export default AdminShowPage;
