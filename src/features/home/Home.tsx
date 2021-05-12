import React, { FC } from "react";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../../common/useStyles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { appIsThinking, selectAppIsLoaded } from "../system/systemSlice";
import {
  fetchFMPTradableSymbolsList,
  // selectTradableSymbols,
} from "../securities/securitiesSlice";

type HomeProps = {
  title: string;
};

/**
 * @description The home or main container for My Investing prototype.
 * This level is where top level data coordination occurs.
 */
const Home: FC<HomeProps> = ({ title }: HomeProps) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const isAppLoaded = useSelector(selectAppIsLoaded);
  // const tradableSymbols = useSelector(selectTradableSymbols);
  // const companiesSymbolsList = useSelector(selectCompaniesSymbols);
  const companiesSymbolsList = [
    {
      name: "Dick's Sporting Goods, Inc",
      symbol: "DKS",
    },
    {
      name: "Simon Property Group",
      symbol: "SPG",
    },
  ];

  React.useEffect(() => {
    if (!isAppLoaded) {
      dispatch(appIsThinking(true));
      dispatch(
        fetchFMPTradableSymbolsList({
          requestType: "tradableSymbolsList",
        })
      );
    }
  }, [isAppLoaded, dispatch]);

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
          <Autocomplete
            id="symbol-search"
            autoHighlight
            options={companiesSymbolsList}
            getOptionLabel={(option) => `${option.name} (${option.symbol})`}
            style={{ width: 400 }}
            noOptionsText="No securities found"
            renderInput={(params) => {
              const { InputLabelProps, InputProps, ...rest } = params;
              return (
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    {...params.InputProps}
                    {...rest}
                    placeholder="Symbol or Name"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
              );
            }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Home;
