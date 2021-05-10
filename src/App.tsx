import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import "./App.css";
import Home from "./features/home/Home";
import { useStyles } from "./common/useStyles";
import { selectAppIsThinking } from "./features/system/systemSlice";
import { useSelector } from "react-redux";

const App: React.FC<Record<any, any>> = () => {
  const classes = useStyles();
  const isAppThinking = useSelector(selectAppIsThinking);
  // const isAppThinking = false;

  return (
    <div className="App">
      <Home title="Stop Solver Demo" />
      <Backdrop className={classes.backdrop} open={isAppThinking}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default App;
