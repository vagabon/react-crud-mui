import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface MDMenuItemProps {
  name: string;
  url: string;
  childrens: { title: string; link: string }[] | undefined;
}

const MDMenuItem: React.FC<MDMenuItemProps> = (props: MDMenuItemProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<Element>();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (!props.childrens) {
      navigate(props.url);
    }
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleCloseWithUrl = (url: string) => {
    setAnchorEl(undefined);
    navigate(url);
  };

  return (
    <Fragment>
      <Button
        sx={{ minWidth: '100px' }}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={props.childrens && <KeyboardArrowDownIcon />}>
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

export default MDMenuItem;
