import React from "react";
import { selectPortfolioLoadedStatus } from "./portfolioSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../common/Button";
import { fetchQuickenData } from "../quickenConnection/quickenConnectorSlice";
import { AppDispatch } from "../../app/store";

function Portfolio() {
  const callAlert = () => {
    dispatch(fetchQuickenData());
  };

  let isPortfolioLoaded = useSelector(selectPortfolioLoadedStatus);

  const dispatch: AppDispatch = useDispatch();

  return (
    <div>
      <h2>Hello!</h2>
      <span>
        The portfolio
        {isPortfolioLoaded ? <p> is loaded.</p> : <p>is not yet loaded.</p>}
      </span>
      <Button onClick={() => callAlert()}>Load Quicken Data</Button>
    </div>
  );
}

export default Portfolio;
