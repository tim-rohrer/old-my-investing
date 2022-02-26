/** CompanyProfile should be a presentational component */

// import { makeStyles } from "@mui/material";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
// import { useStyles } from "../../common/useStyles";
import { MyCompanyProfile } from "./useCompanyProfile";

type CompanyProfileProps = MyCompanyProfile;

export const CompanyProfile: React.FC<CompanyProfileProps> = ({
  symbol,
  name,
  sector,
  industry,
  exchange,
  description,
  ceo,
  website,
}) => {
  // const classes = useStyles();

  return (
    <div>
      <Paper elevation={3} /** className={classes.paper} */ >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1>{name}</h1>
          </Grid>
          <Grid item xs={6}>
            {sector}/{industry}/{exchange}
          </Grid>
          <Grid item>
            <Avatar>{symbol}</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth /** className={classes.companyDescription} */ >
            <Typography>{description}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

/**
 *         {companyProfileError !== undefined
          ? companyProfileError
          : companyProfile}
 */
