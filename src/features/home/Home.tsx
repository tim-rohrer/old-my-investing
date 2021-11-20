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
  fetchFMPCompaniesSymbolsList,
  FMPCompanySymbol,
  selectCompaniesSymbols,
} from "../securities/securitiesSlice";
import {
  fetchFMPCompanyProfileBySymbol,
  FMPRequestObject,
} from "../companyAnalysis/companyProfilesSlice";
import { CompanyProfile } from "../companyAnalysis/CompanyProfile";
import useCompanyProfile from "../companyAnalysis/useCompanyProfile";

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

  const [companySymbol, setCompanySymbol] = React.useState<string>("DG");
  const isAppLoaded = useSelector(selectAppIsLoaded);
  const companiesSymbolsList = useSelector(selectCompaniesSymbols);
  const currentCompanyProfile = useCompanyProfile(companySymbol);

  React.useEffect(() => {
    if (!isAppLoaded) {
      dispatch(appIsThinking(true));
      dispatch(
        fetchFMPCompaniesSymbolsList({
          requestType: "companiesSymbolsList",
        })
      );
    }
  }, [isAppLoaded, dispatch]);

  // React.useEffect(() => {
  //   if (companySymbol) {
  //     useCompanyProfile(companySymbol);
  //   } else console.log("Beats me!");
  // }, [companySymbol]);

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
            {title}
          </Typography>
          <Autocomplete
            id="symbol-search"
            autoHighlight
            options={companiesSymbolsList}
            getOptionLabel={(option) => `${option.name} (${option.symbol})`}
            style={{ width: 400 }}
            value={companySymbol}
            onChange={(event: any, newValue: string) => {
              setCompanySymbol(newValue);
            }}
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
      {currentCompanyProfile !== undefined ? (
        <CompanyProfile {...currentCompanyProfile} />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Home;
