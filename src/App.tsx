import React from "react";
import "./App.css";
import Portfolio from "./features/portfolio/Portfolio";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log(setSearchTerm(event.target.value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Investing</h1>
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" onChange={handleChange} />
      </header>
      <Portfolio />
    </div>
  );
}

export default App;
