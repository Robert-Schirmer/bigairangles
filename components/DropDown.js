import React from 'react';
import { FormControl, Select, makeStyles, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // '& div::after': {
    //   borderBottom: '2px solid ' + theme.palette.secondary.main //Applied to underline
    // },
  },
  selectroot: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
  selecticon: { //Applied to dropdown icon
    color: theme.palette.secondary.main
  },
  selectMenu: {
  },
  input: {
    padding: 0
  }
}));

export default function DropDown(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.onChange(event.target.value);
  }

  return (
    <FormControl className={`${classes.formControl} ${props.className}`} style={props.style}>
      <Select
        value={props.value}
        disableUnderline={true}
        onChange={handleChange}
        classes={{
          root: classes.selectroot,
          icon: classes.selecticon,
          select: classes.input
        }}
      >
        {
          props.options.map((option, index) => {
            return (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
  );
}