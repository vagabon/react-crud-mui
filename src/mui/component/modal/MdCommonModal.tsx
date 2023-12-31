import { Box, Modal } from '@mui/material';
import { MouseEvent, ReactNode, useCallback } from 'react';
import { IApiDto } from '../../../dto/api/ApiDto';

interface CommonModalProps {
  className?: string;
  open?: boolean;
  children?: ReactNode;
  handleClose: (data: IApiDto | undefined) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const MdCommonModal: React.FC<CommonModalProps> = (props) => {
  const handleClose = useCallback(
    (callback: (data: IApiDto | undefined) => void) => (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      callback(undefined);
    },
    [],
  );

  return (
    <Modal className={props.className + ' modale'} open={props.open ?? false} onClose={handleClose(props.handleClose)}>
      <Box sx={{ ...style, width: 250 }}>{props.children}</Box>
    </Modal>
  );
};

MdCommonModal.defaultProps = {
  open: false,
};

export default MdCommonModal;
