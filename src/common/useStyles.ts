import { createStyles, fade, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 10,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: { display: "block" },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    appBarGrid: {
      alignSelf: "flex-end",
      // alignContent: "center",
    },
    paper: {
      padding: theme.spacing(2),
      margin: 5,
      textAlign: "left",
      color: theme.palette.text.secondary,
    },
    companyDescription: {
      margin: 5,
      maxHeight: "100px",
      overflow: "scroll",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    slider: {
      paddingTop: theme.spacing(5),
      trackColor: "yellow",
      selectionColor: "red",
      textColor: "white",
    },
    margin: {
      height: 0,
    },
    wandersLogo: {
      opacity: 0.5,
      height: 150,
      width: "100%",
    },
  })
);
