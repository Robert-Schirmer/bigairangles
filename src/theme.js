import { createMuiTheme } from '@material-ui/core/styles';
import ProximaLight from './fonts/Proxima-Nova-Light.woff2';
import ProximaBold from './fonts/Proxima-Nova-Bold.woff2';

//Setup fonts
const Proxima = [{
  fontFamily: 'Proxima',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Proxima'),
    local('Proxima-Light'),
    url(${ProximaLight}) format('woff2')
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
},
{
  fontFamily: 'Proxima',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 'bold',
  src: `
    local('Proxima'),
    local('Proxima-Bold'),
    url(${ProximaBold}) format('woff2')
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}];

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#47A8BD',
    },
    secondary: {
      main: '#05F140',
    },
    background: {
      default: '#0A090C',
    },
  },
  typography: {
    fontFamily: 'Proxima',
    button: {
      textTransform: "none",
    }
  },
  pages: [
    {
      text: 'Gallery',
      href: '/'
    },
    {
      text: 'Setup',
      href: '/setup'
    },
    {
      text: 'Contact',
      href: '/contact'
    }
  ],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        //Set global font type
        '@font-face': Proxima,
      },
    },
    MuiIconButton: {
      root: {
        padding: 5
      }
    },
  },
  props: {
    MuiButton: {
      // The default props to change
      disableRipple: true, // Ripple messes with other transitions ?? why
    },
  },
});

export default theme;
