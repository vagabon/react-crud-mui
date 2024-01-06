import { Box, Modal } from '@mui/material';
import { MouseEvent, ReactNode, useCallback } from 'react';
import CustomIcon from '../../../module/custom/icon/component/CustomIcon';

export interface ICommonModalProps {
  className?: string;
  open?: boolean;
  children?: ReactNode;
  handleClose: () => void;
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

const MdCommonModal: React.FC<ICommonModalProps> = (props) => {
  const handleClose = useCallback(
    (callback: () => void) => (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      callback();
    },
    [],
  );
  const handleClick = useCallback((event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  }, []);

  return (
    <Modal
      className={props.className + ' modal'}
      open={props.open ?? false}
      onClick={handleClick}
      onClose={handleClose(props.handleClose)}>
      <Box sx={{ ...style, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '11px', right: '23px' }}>
          <CustomIcon icon='close' callback={props.handleClose} />
        </div>
        {props.children}
      </Box>
    </Modal>
  );
};

MdCommonModal.defaultProps = {
  open: false,
};

export default MdCommonModal;
