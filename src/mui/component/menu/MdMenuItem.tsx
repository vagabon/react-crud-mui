import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Fragment, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IMdMenuItemProps {
  name: string;
  url: string;
  childrens: { title: string; link: string }[] | undefined;
}

const MdMenuItem: React.FC<IMdMenuItemProps> = (props: IMdMenuItemProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<Element>();
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      !props.childrens && navigate(props.url);
    },
    [navigate, props.childrens, props.url],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(undefined);
  }, []);

  const handleCloseWithUrl = useCallback(
    (url: string) => {
      setAnchorEl(undefined);
      navigate(url);
    },
    [navigate],
  );

  return (
    <Fragment>
      <Button
        sx={{ minWidth: '100px' }}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={props.childrens && <KeyboardArrowDownIcon />}
        color='secondary'>
        {props.name}
      </Button>
      {props.childrens && (
        <Menu id='fade-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
          {props.childrens?.map((child: { title: string; link: string }) => (
            <MenuItem key={child.title} onClick={() => handleCloseWithUrl(child.link)} sx={{ width: '100px' }}>
              {child.title}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Fragment>
  );
};

export default MdMenuItem;
