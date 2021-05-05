import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { InputWithLabel } from "../../common/InputWithLabel";
import {
  fetchFMPCompanyProfileBySymbol,
  FMPRequestObject,
  selectCompanyProfileError,
} from "./companyProfilesSlice";

export const CompanyProfile = () => {
  const [ticker, setTicker] = React.useState("");

  const dispatch: AppDispatch = useDispatch();

  const companyProfileError = useSelector(selectCompanyProfileError);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setTicker(ticker.toUpperCase());
    const requestObject: FMPRequestObject = {
      requestType: "companyProfile",
      securitySymbol: ticker,
    };
    dispatch(fetchFMPCompanyProfileBySymbol(requestObject));
  };

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTicker(event.target.value);
  };

  return (
    <div className="CompanyProfile">
      <header className="CompanyProfile-header">
        <h1>Company Profile</h1>
        <form onSubmit={handleSubmit}>
          <InputWithLabel
            id="tickerInput"
            value={ticker}
            isFocused
            onInputChange={handleChange}
          >
            <strong>Ticker: </strong>
          </InputWithLabel>
        </form>
        {companyProfileError !== undefined ? companyProfileError : null}
      </header>
    </div>
  );
};
