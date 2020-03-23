import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import SvgIcon from '@material-ui/core/SvgIcon';

import EmailOutlined from '@material-ui/icons/EmailOutlined';
import StorefrontOutlined from '@material-ui/icons/StorefrontOutlined';
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlined from '@material-ui/icons/VisibilityOffOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import useStyles from './style';
import asyncValidate from './asyncValidate';
import validate from './validate';

const renderTextField = ({
  label,
  input,
  meta: { asyncValidating, touched, invalid, error },
  ...custom
}) => {
  return (
    <Grid container>
      <Grid
        item
        xs={
          asyncValidating || (touched && !error && !custom.showloading)
            ? 11
            : 12
        }
        sm={
          asyncValidating || (touched && !error && !custom.showloading)
            ? 11
            : 12
        }
      >
        <TextField
          label={label}
          error={touched && invalid}
          helperText={touched && error}
          {...input}
          {...custom}
        />
      </Grid>
      {asyncValidating && !custom.showloading ? (
        <Grid
          item
          xs={1}
          sm={1}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <CircularProgress size={20} />
        </Grid>
      ) : asyncValidate && touched && !error && !custom.showloading ? (
        <Grid
          item
          xs={1}
          sm={1}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <SvgIcon style={{ color: 'green' }}>
            <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
          </SvgIcon>
        </Grid>
      ) : (
        ''
      )}
    </Grid>
  );
};

const SignupSecondPage = props => {
  const classes = useStyles();
  const formValues = useSelector(state => state.form.signupForm.values);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.heading}>
          <Typography variant="h5">BUSINESS INFORMATION</Typography>
          <Typography variant="subtitle1">
            Fill out all the information about your business
          </Typography>
        </div>
        <form className={classes.form} onSubmit={props.handleSubmit}>
         
          <Grid item xs={12} sm={12} className={classes.bottomNavigation}>
            <Button
              onClick={props.previousPage}
              variant="contained"
              color="primary"
              startIcon={<NavigateBeforeIcon>send</NavigateBeforeIcon>}
            >
              Previous
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<NavigateNextIcon>send</NavigateNextIcon>}
            >
              Next
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default reduxForm({
  form: 'signupForm',
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  asyncValidate,
  asyncBlurFields: ['email', 'businessName']
})(SignupSecondPage);
