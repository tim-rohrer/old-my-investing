import React, { FC } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   selectChosenMappingService,
//   selectMappingResources,
//   selectAppIsLoaded,
//   appIsLoaded,
//   appIsThinking,
// } from '../system/systemSlice';
// import { AppDispatch } from "../../app/store";
import {
  AppBar,
  // Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../../common/useStyles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { CompanyProfile } from "../companyAnalysis/CompanyProfile";

type HomeProps = {
  title: string;
};

/**
 * @description The home or main container for My Investing prototype.
 * This level is where top level data coordination occurs.
 */
const Home: FC<HomeProps> = ({ title }: HomeProps) => {
  const classes = useStyles();

  // const dispatch: AppDispatch = useDispatch();

  // Additional selectors for tracking important state changes
  // const isAppLoaded = useSelector(selectAppIsLoaded);
  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            My Investing (Prototype)
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Symbol…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <CompanyProfile />
    </div>
  );
};

export default Home;
