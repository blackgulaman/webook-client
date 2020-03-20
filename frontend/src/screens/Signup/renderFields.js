import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import SvgIcon from '@material-ui/core/SvgIcon';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

export const renderTextField = ({
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
      ) : asyncValidating && touched && !error && !custom.showloading ? (
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

export const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

export const renderSelectField = ({
  input,
  label,
  name,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error} fullWidth>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: name,
        id: name
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

export const renderMenuItems = () => {
  const businessTypes = [
    {
      value: 'sole_proprietorship',
      name: 'Sole Proprietorship'
    },
    {
      value: 'partnership',
      name: 'Partnership'
    },
    {
      value: 'limited_partnership',
      name: 'Limited Partnership'
    },
    {
      value: 'corporation',
      name: 'Corporation'
    },
    {
      value: 'llc',
      name: 'Limited Liability Company (LLC)'
    },
    {
      value: 'nonprofit_organization',
      name: 'Non-profit Organization'
    },
    {
      value: 'coop',
      name: 'Cooperative (Co-op)'
    },
    {
      value: 'others',
      name: 'others'
    }
  ];
  return businessTypes.map(b => (
    <MenuItem value={b.value} key={b.value}>
      {b.name}
    </MenuItem>
  ));
};
