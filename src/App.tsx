import React from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Backdrop, CircularProgress } from "@mui/material";
import Home from "./features/home/Home";
import theme from "./common/theme";
import { selectAppIsThinking } from "./features/system/systemSlice";
import { useSelector } from "react-redux";


// declare module "@mui/styles/defaultTheme" {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }

const App: React.FC<Record<any, any>> = () => {
  // const classes = useStyles();
  const isAppThinking = useSelector(selectAppIsThinking);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Home title="My App (Prototype)"/>
          <Backdrop 
            // eslint-disable-next-line @typescript-eslint/no-shadow
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isAppThinking}>
            <CircularProgress color="inherit" />
          </Backdrop>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
