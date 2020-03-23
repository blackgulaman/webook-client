import React from 'react';

import BottomNavigation from '../../components/BottomNavigation/BottomNavigation.component';
import CustomButton from '../../components/CircleButton/CircleButton.component';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import { withStyles } from '@material-ui/core/styles';
import useStyles from './Home.styles';

const HomePage = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={6}>
          <Grid item xs={12} align="right">
            <CustomButton />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" style={{ fontWeight: '700' }}>
              Whip Wash
            </Typography>
          </Grid>
          <Grid container item>
            <Grid item xs={12}>
              <Typography variant="button">Today</Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Typography variant="h5">₱1000</Typography>
              <Typography variant="body2" color="textSecondary">
                Sales
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Typography variant="h5">15</Typography>
              <Typography variant="body2" color="textSecondary">
                Appointments
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Typography variant="h5">12</Typography>
              <Typography variant="body2" color="textSecondary">
                Finished
              </Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <ListAltRoundedIcon className={classes.appointmentsIcon} />
                <Typography variant="subtitle2">Appointments</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <GroupRoundedIcon className={classes.customersIcon} />
                <Typography variant="subtitle2">Customers</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <BuildRoundedIcon className={classes.servicesIcon} />
                <Typography variant="subtitle2">Services</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <StoreRoundedIcon className={classes.businessProfileIcon} />
                <Typography variant="subtitle2">Business Profile</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <BottomNavigation />
    </div>
  );
};

export default withStyles(useStyles)(HomePage);
