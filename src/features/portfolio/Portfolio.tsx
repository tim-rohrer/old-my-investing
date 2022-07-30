import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { AppDispatch } from "../../app/store"
import Button from "../../common/Button"
import { fetchQuickenData } from "../investments/investmentsSlice"
import { selectPortfolioLoadedStatus } from "./portfolioSlice"

function Portfolio() {
  const callAlert = () => {
    dispatch(fetchQuickenData());
  };

  const isPortfolioLoaded = useSelector(selectPortfolioLoadedStatus);

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
