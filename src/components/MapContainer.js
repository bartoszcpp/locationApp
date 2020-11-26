import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = (props) => {
  const {
    userLocation,
    inputValueIp,
    handleChangeSearchesFlag,
    handleChangeLocationInfo,
  } = props;

  console.log(inputValueIp);

  // eslint-disable-next-line no-unused-vars
  const [map, setMap] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [firstVisit, setFirstVisit] = useState(false);
  const [nullSearch, setNullSearch] = useState(false);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (userLocation) {
      axios
        .get(
          `http://api.ipstack.com/check?access_key=e80b7c1a09d854f8472a3e8ed0cec739`
        )
        .then(function (response) {
          setLatitude(response.data.latitude);
          setLongitude(response.data.longitude);
          handleChangeLocationInfo(
            "userLocationInfo",
            response.data.ip,
            response.data.country_name,
            response.data.city,
            response.data.latitude,
            response.data.longitude
          );
        });
    } else {
      let data = sessionStorage.getItem("search");
      if (data === null) {
        setFirstVisit(true);
      } else {
        setFirstVisit(false);
        const length = JSON.parse(data).length;
        //console.log(JSON.parse(data)[length - 1][0].ip);
        let ip = null;
        if (inputValueIp === undefined) {
          ip = JSON.parse(data)[length - 1].ip;
        } else {
          ip = inputValueIp;
        }
        //console.log(JSON.parse(data)[length - 1]);
        console.log(JSON.parse(data));
        axios
          .get(
            `http://api.ipstack.com/${ip}?access_key=e80b7c1a09d854f8472a3e8ed0cec739`
          )
          .then(function (response) {
            console.log(response);
            if (response.data.type !== null) {
              setNullSearch(false);
              setLatitude(response.data.latitude);
              setLongitude(response.data.longitude);
              handleChangeLocationInfo(
                "lastLocationInfo",
                response.data.ip,
                response.data.country_name,
                response.data.city,
                response.data.latitude,
                response.data.longitude
              );
            } else {
              setNullSearch(true);
            }
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!userLocation) {
      let data = sessionStorage.getItem("search");
      console.log(data);
      //sessionStorage.clear();
      if (data === null && inputValueIp === undefined) {
        setFirstVisit(true);
      } else if (inputValueIp !== undefined) {
        setFirstVisit(false);
        axios
          .get(
            `http://api.ipstack.com/${inputValueIp}?access_key=e80b7c1a09d854f8472a3e8ed0cec739`
          )
          .then(function (response) {
            console.log(response);
            if (response.data.type !== null) {
              setNullSearch(false);
              setLatitude(response.data.latitude);
              setLongitude(response.data.longitude);
              handleChangeLocationInfo(
                "lastLocationInfo",
                response.data.ip,
                response.data.country_name,
                response.data.city,
                response.data.latitude,
                response.data.longitude
              );

              if (data === null) {
                const newObject = [
                  {
                    ip: response.data.ip,
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                  },
                ];

                sessionStorage.setItem("search", JSON.stringify(newObject));
                handleChangeSearchesFlag(inputValueIp);
              } else {
                const newObject = {
                  ip: response.data.ip,
                  latitude: response.data.latitude,
                  longitude: response.data.longitude,
                };

                const parseObject = JSON.parse(data);
                parseObject.push(newObject);
                console.log(parseObject);
                sessionStorage.setItem("search", JSON.stringify(parseObject));
                handleChangeSearchesFlag(inputValueIp);
              }
            } else {
              setNullSearch(true);
            }
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValueIp]);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  let center = {
    lat: 0,
    lng: 0,
  };
  if (latitude !== null && longitude !== null) {
    center = {
      lat: latitude,
      lng: longitude,
    };
  }

  return (
    <>
      {firstVisit && <p className="text-left">Start exploring...</p>}
      {nullSearch && (
        <p className="text-left">
          There is no such result, please enter something else!
        </p>
      )}
      <LoadScript googleMapsApiKey="AIzaSyCX1NxXhcsjNLDrTM5B1HkA1yXDiNn8XJ0">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={100}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} />
          <></>
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapContainer;
