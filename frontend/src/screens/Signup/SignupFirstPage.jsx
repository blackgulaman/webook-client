import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';

import EmailOutlined from '@material-ui/icons/EmailOutlined';
import StorefrontOutlined from '@material-ui/icons/StorefrontOutlined';
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined';
import VpnKeyOutlined from '@material-ui/icons/VpnKeyOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlined from '@material-ui/icons/VisibilityOffOutlined';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import useStyles from './style';
import asyncValidate from './asyncValidate';
import validate from './validate';
import { authAction } from '../../actions';
import {
  renderSelectField,
  renderTextField,
  renderMenuItems
} from './renderFields';

const Signup = props => {
  console.log(props);
  const classes = useStyles();
  const formValues = useSelector(state => state.form.signupForm.values);
  const dispatch = useDispatch();
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

  // const onButtonClick = () => {
  //   console.log('test', formValues);
  //   dispatch(authAction.signUp(formValues));
  // };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.heading}>
          <Typography variant="h5">WELCOME TO WEBOOK</Typography>
          <Typography variant="subtitle1">
            Build your own online booking for your business now.
          </Typography>
        </div>
        <form className={classes.form} onSubmit={props.handleSubmit}>
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
            <Grid item xs={12} sm={12}>
              <Field
                component={renderSelectField}
                name="businessType"
                label="Buisness Type"
                placeholder="What is the name of your business?"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentityOutlined />
                    </InputAdornment>
                  )
                }}
              >
                {renderMenuItems()}
              </Field>
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<NavigateNextIcon>send</NavigateNextIcon>}
              >
                Next
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
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  asyncValidate,
  asyncBlurFields: ['email', 'businessName']
})(Signup);
