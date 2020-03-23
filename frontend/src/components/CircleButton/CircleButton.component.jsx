import React from 'react';

import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import useStyles from './CircleButton.styles';


const CustomButtonComponent = () => {
  const classes = useStyles();

  return (
    <Fab size="small" className={classes.root}>
      <Badge badgeContent={4} color="error">
        <NotificationsNoneIcon />
      </Badge>
    </Fab>
  );
};

export default CustomButtonComponent;
