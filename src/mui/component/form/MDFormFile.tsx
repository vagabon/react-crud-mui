import { Box } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import { Trans } from 'react-i18next';
import { useId } from '../../hook/useId';

interface IMDFormFileProps {
  name: string;
  label: string;
  handleChangeFile: (name: string, file: File) => void;
}

const MDFormFile: React.FC<IMDFormFileProps> = (props: IMDFormFileProps) => {
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
      <input accept='image/*' id={id} onChange={handleCapture(props.handleChangeFile)} type='file' />
    </Box>
  );
};

export default MDFormFile;
