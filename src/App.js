import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import MapContainer from "./components/MapContainer";
import SearchContainer from "./components/SearchContainer";
import ListOfAllSearches from "./components/ListOfAllSearches";

function App() {
  const [value, setValue] = useState();
  const [inputValueIp, setInputValueIp] = useState();
  const [searchesFlag, setSearchesFlag] = useState();

  const handleChangeValue = (newValue) => {
    setValue(newValue);
  };

  const handleChangeInputValueIp = (newValue) => {
    setInputValueIp(newValue);
    // childRef.current.handleChangeStorage();
  };

  const handleChangeSearchesFlag = (newValue) => {
    setSearchesFlag(newValue);
  };

  console.log(inputValueIp);

  return (
    <div className="App">
      <main>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="list-of-all-searches-component">
                <ListOfAllSearches searchesFlag={searchesFlag} />
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-8">
                  <div className="map-user-location">
                    <MapContainer userLocation={true} />
                  </div>
                </div>
                <div className="col-md-4">information about user location</div>
              </div>
              <div className="search-container">
                <SearchContainer
                  value={value}
                  handleChangeValue={handleChangeValue}
                  handleChangeInputValueIp={handleChangeInputValueIp}
                />
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="map-user-location">
                    <MapContainer
                      userLocation={false}
                      inputValueIp={inputValueIp}
                      handleChangeSearchesFlag={handleChangeSearchesFlag}
                    />
                  </div>
                </div>
                <div className="col-md-4">information about last location</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
