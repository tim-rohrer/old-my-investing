import React, { FC } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { appIsThinking, selectAppIsLoaded } from "../system/systemSlice";
import {
  fetchFMPCompaniesSymbolsList,
  selectCompanies,
} from "../securities/securitiesSlice";
import { CompanyProfile } from "../companyAnalysis/CompanyProfile";
import useCompanyProfile from "../companyAnalysis/useCompanyProfile";
import { extractParentheticalText } from "../../common/helperFunctions";

type HomeProps = {
  title: string;
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

/**
 * @description The home or main container for My Investing prototype.
 * This level is where top level data coordination occurs.
 */
const Home: FC<HomeProps> = ({ title }: HomeProps) => {
  // const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  const [open, setOpen] = React.useState<boolean>(false)
  const [companySymbol, setCompanySymbol] = React.useState<string | null>(null)
  const isAppLoaded = useSelector(selectAppIsLoaded)
  const companiesList = useSelector(selectCompanies) || null
  const currentCompanyProfile = useCompanyProfile(companySymbol)
  const [inputValue, setInputValue] = React.useState("")
  

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

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" noWrap sx={{ flexGrow: 1 }} >
            {title}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {/* <StyledInputBase> */}
              <Autocomplete
                id="symbol-search"
                open={open}
                inputValue={inputValue}
                onInputChange={(event, newInputValue, reason) => {
                  if (reason === "input") {
                    setInputValue(newInputValue);
                    if (newInputValue.length > 2) {
                      setOpen(true);
                    } else setOpen(false);
                  }
                }}
                autoHighlight={false}
                // options={companiesList.map((option) => option.symbol)}
                options={companiesList.map((option) => `${option.name} (${option.symbol})`)}
                // getOptionLabel={(option) => `${option.name} (${option.symbol})`}
                style={{ width: 400 }}
                // value={companySymbol}
                onChange={(event: unknown, newValue: string | null) => {
                  if (newValue !== null) {
                    setCompanySymbol(extractParentheticalText(newValue))
                    setOpen(false)
                    setInputValue("")
                  }
                }}
                noOptionsText="No securities found"
                renderInput={(params) => {
                  const { InputLabelProps, InputProps, ...rest } = params;
                  return (
                    <StyledInputBase
                      {...params.InputProps}
                      {...rest}
                      placeholder="Symbol or Name"
                    />
                  );
                }}
              />
            {/* </StyledInputBase> */}
          </Search>
        </Toolbar>
      </AppBar>
      {currentCompanyProfile !== undefined ? (
        <CompanyProfile {...currentCompanyProfile} />
      ) : (
        "Loading..."
      )}
    </Box>
  );
};

export default Home;
