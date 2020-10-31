import React from "react";
import "./App.css";
import { CompanyProfile } from "./features/companyAnalysis/CompanyProfile";
import Portfolio from "./features/portfolio/Portfolio";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Investing</h1>
      </header>
      <Portfolio />
      <CompanyProfile />
    </div>
  );
}

export default App;
