import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const StyledTextField = withStyles(theme => ({
  root: {
    '& label.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
    width: '100%'
  }
}))(TextField);

export default StyledTextField;
