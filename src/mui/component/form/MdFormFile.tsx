import { Box } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import { Trans } from 'react-i18next';
import { JSONObject } from '../../../dto/api/ApiDto';
import { useId } from '../../hook/useId';

interface IMdFormFileProps {
  name: string;
  label: string;
  values?: JSONObject;
  handleChangeFile: (name: string, file: File) => void;
}

const MdFormFile: React.FC<IMdFormFileProps> = (props: IMdFormFileProps) => {
  const { id } = useId();

  const handleCapture = useCallback(
    (callback: (name: string, file: File) => void) =>
      ({ target }: ChangeEvent<HTMLInputElement & { files: FileList }>) => {
        callback(props.name, target.files[0]);
      },
    [props.name],
  );

  return (
    <Box
      sx={{ width: '100%', margin: '5px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <label htmlFor={id} style={{ flex: '1' }}>
        <Trans i18nKey={props.label} />
      </label>
      <div className='' style={{ maxWidth: '18%', margin: '0px 5px' }}>
        <p
          style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
          title={props.values?.[props.name as keyof JSONObject]}>
          {props.values?.[props.name as keyof JSONObject]}
        </p>
      </div>
      <input accept='image/*' id={id} onChange={handleCapture(props.handleChangeFile)} type='file' />
    </Box>
  );
};

export default MdFormFile;
