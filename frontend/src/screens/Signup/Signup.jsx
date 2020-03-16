import React, { useState } from 'react';
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
import VpnKeyOutlined from '@material-ui/icons/VpnKeyOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlined from '@material-ui/icons/VisibilityOffOutlined';

import useStyles from './style';
import asyncValidate from './asyncValidate';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'businessName',
    'password'
  ];
  for (const field of requiredFields) {
    if (!values[field]) {
      errors[field] = 'This field is required.';
    }
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

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
          asyncValidating || (touched && !error && !custom.showloading) ? 11 : 12
        }
        sm={
          asyncValidating || (touched && !error && !custom.showloading) ? 11 : 12
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

const Signup = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.heading}>
          <Typography variant="h5">Start your free trial now</Typography>
          <Typography variant="subtitle1">
            Build your own online booking system for just a minute.
          </Typography>
        </div>
        <form className={classes.form}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Field
                component={renderTextField}
                name="businessName"
                label="Buisness Name"
                autoComplete="businessname"
                placeholder="What is the name of your business?"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StorefrontOutlined />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Field
                component={renderTextField}
                name="firstName"
                label="First Name"
                autoComplete="fname"
                placeholder="What is your first name?"
                fullWidth
                showloading="false"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlined />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Field
                component={renderTextField}
                name="lastName"
                label="Last Name"
                autoComplete="lname"
                placeholder="What is your last name?"
                fullWidth
                showloading="false"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlined />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Field
                component={renderTextField}
                name="email"
                label="E-mail"
                autoComplete="email"
                placeholder="What is your E-mail address?"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Field
                component={renderTextField}
                name="password"
                label="Password"
                autoComplete="password"
                placeholder="Enter your password?"
                showloading="false"
                type={values.showPassword ? 'text' : 'password'}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="contained" color="primary" fullWidth>
                Create WeBook Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default reduxForm({
  form: 'signupForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['email', 'businessName']
})(Signup);
