import { Box, Modal } from '@mui/material';
import { ReactNode } from 'react';
import { IApiDto } from '../../dto/api/ApiDto';

interface CommonModalProps {
  className?: string;
  open: boolean;
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

const CommonModal: React.FC<CommonModalProps> = (props: CommonModalProps) => {
  const handleClose = () => {
    props.handleClose(undefined);
  };

  return (
    <>
      <Modal className={props.className + ' modale'} open={props.open} onClose={handleClose}>
        <Box sx={{ ...style, width: 250 }}>{props.children}</Box>
      </Modal>
    </>
  );
};

CommonModal.defaultProps = {
  open: false,
};

export default CommonModal;
