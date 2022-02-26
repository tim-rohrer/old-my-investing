import {
  createTheme,
  // responsiveFontSizes,
} from "@mui/material/styles"

// import red from "@mui/material/colors/red"
// import orange from "@mui/material/colors/orange"
// import yellow from "@mui/material/colors/yellow"
// import green from "@mui/material/colors/green"
// import lightBlue from "@mui/material/colors/lightBlue"
// import grey from "@mui/material/colors/grey"

// const theme = (mode) =>
//   createTheme({
//     palette: {
//       mode: {mode},
//       primary: {
//         main: orange[500]
//       },
//       secondary: {
//         light: red[500],
//         main: red[700],
//         dark: red[900],
//         contrastText: grey[50]
//       },
//       error: {
//         light: red[400],
//         main: red[500],
//         dark: red[300],
//         contrastText: grey[800]
//       },
//       success: {
//         main: green[500]
//       },
//       warning: {
//         main: yellow[500],
//         contrastText: grey[800]
//       },
//       info: {
//         main: lightBlue[500]
//       },
//       text: {
//         primary: grey[900],
//         secondary: grey[700],
//         disabled: grey[500]
//       },
//       action: {
//         active: red[200],
//         // activeOpacity: 1,
//         disabled: grey[700],
//         disabledBackground: grey[200],
//         hover: red[100],
//         hoverOpacity: 0.7,
//         focus: red[600],
//         focusOpacity: 1,
//         selected: red[300],
//         selectedOpacity: 1
//       },
//       background: {
//         default: orange[300],
//         paper: grey[200]
//       },
//       common: {
//         black: grey[900],
//         white: grey[200]
//       },
//       tonalOffset: 0.2
//     }
//   });

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      main: "#fff",
      dark: "#009688",
    },
  },
  //   // components: {
  //   //   searchIcon: {
  //   //     padding: theme.spacing(0, 2),
  //   //     height: "100%",
  //   //     position: "absolute",
  //   //     pointerEvents: "none",
  //   //     display: "flex",
  //   //     alignItems: "center",
  //   //     justifyContent: "center",
  //   //   },
  //   // },
})

export default theme

// export const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//       margin: 10,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//       display: "none",
//       [theme.breakpoints.up("sm")]: { display: "block" },
//     },
//     search: {
//       position: "relative",
//       borderRadius: theme.shape.borderRadius,
//       backgroundColor: alpha(theme.palette.common.white, 0.15),
//       "&:hover": {
//         backgroundColor: alpha(theme.palette.common.white, 0.25),
//       },
//       marginLeft: 0,
//       width: "100%",
//       [theme.breakpoints.up("sm")]: {
//         marginLeft: theme.spacing(1),
//         width: "auto",
//       },
//     },
//     searchIcon: {
//       padding: theme.spacing(0, 2),
//       height: "100%",
//       position: "absolute",
//       pointerEvents: "none",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     inputRoot: {
//       color: "inherit",
//     },
//     inputInput: {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//       transition: theme.transitions.create("width"),
//       width: "100%",
//       [theme.breakpoints.up("sm")]: {
//         width: "12ch",
//         "&:focus": {
//           width: "20ch",
//         },
//       },
//     },
//     appBarGrid: {
//       alignSelf: "flex-end",
//       // alignContent: "center",
//     },
//     paper: {
//       padding: theme.spacing(2),
//       margin: 5,
//       textAlign: "left",
//       color: theme.palette.text.secondary,
//     },
//     companyDescription: {
//       margin: 5,
//       maxHeight: "100px",
//       overflow: "scroll",
//     },
//     backdrop: {
//       zIndex: theme.zIndex.drawer + 1,
//       color: "#fff",
//     },
//     slider: {
//       paddingTop: theme.spacing(5),
//       trackColor: "yellow",
//       selectionColor: "red",
//       textColor: "white",
//     },
//     margin: {
//       height: 0,
//     },
//     wandersLogo: {
//       opacity: 0.5,
//       height: 150,
//       width: "100%",
//     },
//   }),
// )
