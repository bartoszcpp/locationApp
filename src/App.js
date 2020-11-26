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
  const [userLocationInfo, setUserLocationInfo] = useState({
    ip: "",
    country_name: "",
    city: "",
    latitude: "",
    longitude: "",
  });

  const [lastLocationInfo, setLastLocationInfo] = useState({
    ip: "",
    country_name: "",
    city: "",
    latitude: "",
    longitude: "",
  });

  const handleChangeLocationInfo = (
    type,
    ip,
    country_name,
    city,
    latitude,
    longitude
  ) => {
    if (type === "userLocationInfo") {
      setUserLocationInfo({
        ip,
        country_name,
        city,
        latitude,
        longitude,
      });
    } else if (type === "lastLocationInfo") {
      setLastLocationInfo({
        ip,
        country_name,
        city,
        latitude,
        longitude,
      });
    }
  };

  const handleChangeValue = (newValue) => {
    setValue(newValue);
  };

  const handleChangeInputValueIp = (newValue) => {
    setInputValueIp(newValue);
  };

  const handleChangeSearchesFlag = (newValue) => {
    setSearchesFlag(newValue);
  };

  console.log(inputValueIp);
  console.log(userLocationInfo);

  return (
    <div className="App">
      <header>
        <div className="header">
          <div className="container">
            <h1>Welcome to Location App!</h1>
            <h2>Try enter the IP address or URL address:</h2>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 order-lg-2">
              <div className="row map-container">
                <div className="col-md-8">
                  <div className="map-user-location">
                    <p className="text-left">Your current location:</p>
                    <div className="map">
                      <MapContainer
                        userLocation={true}
                        handleChangeLocationInfo={handleChangeLocationInfo}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <p className="text-left">Information about your location:</p>
                  <div className="text-left">
                    <span>
                      IP: <b>{userLocationInfo.ip}</b>
                    </span>{" "}
                    <br />
                    <span>
                      Country: <b>{userLocationInfo.country_name}</b>
                    </span>{" "}
                    <br />
                    <span>
                      City: <b>{userLocationInfo.city}</b>
                    </span>{" "}
                    <br />
                    <span>
                      Latitude: <b>{userLocationInfo.latitude}</b>
                    </span>{" "}
                    <br />
                    <span>
                      Longitude: <b>{userLocationInfo.longitude}</b>
                    </span>{" "}
                    <br />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="search-container">
                    <p className="text-left">
                      <b>Search location by IP or URL:</b>
                    </p>
                    <div className="mr-auto search">
                      <SearchContainer
                        value={value}
                        handleChangeValue={handleChangeValue}
                        handleChangeInputValueIp={handleChangeInputValueIp}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row map-container">
                <div className="col-md-8">
                  <div className="map-user-location">
                    <div className="map">
                      <MapContainer
                        userLocation={false}
                        inputValueIp={inputValueIp}
                        handleChangeSearchesFlag={handleChangeSearchesFlag}
                        handleChangeLocationInfo={handleChangeLocationInfo}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <p className="text-left">Information about last location</p>
                  <div className="text-left">
                    <span>
                      IP: <b>{lastLocationInfo.ip}</b>
                    </span>{" "}
                    <br />
                    <span>
                      Country: <b>{lastLocationInfo.country_name}</b>
                    </span>{" "}
                    <br />
                    <span>
                      City: <b>{lastLocationInfo.city}</b>
                    </span>{" "}
                    <br />
                    <span>
                      Latitude: <b>{lastLocationInfo.latitude}</b>
                    </span>{" "}
                    <br />
                    <span>
                      Longitude: <b>{lastLocationInfo.longitude}</b>
                    </span>{" "}
                    <br />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 order-lg-1">
              <div className="list-of-all-searches-container">
                <p className="t-1em5 text-left">List of all searches:</p>
                <div className="list-of-all-searches-component">
                  <ListOfAllSearches searchesFlag={searchesFlag} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="footer">Bartosz Ciąpała - 2020</div>
      </footer>
    </div>
  );
}

export default App;
