import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';

const GroupCode = ({ codeIdx, code }) => {
  const handleClick = () => {
    setOpen(!open);
  };
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={code} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        asd
        {/* <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List> */}
      </Collapse>
    </Box>
  );
};

export default GroupCode;
