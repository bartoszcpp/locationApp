import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = forwardRef((props, ref) => {
  const { userLocation, inputValueIp, handleChangeSearchesFlag } = props;

  console.log(inputValueIp);

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
            } else {
              setNullSearch(true);
            }
          });
      }
    }
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
  }, [inputValueIp]);

  const containerStyle = {
    width: "400px",
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
      {firstVisit && <p>Zacznij szukać!</p>}
      {nullSearch && <p>Nie ma takiego wyniku, wpisz coś innego!</p>}
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
});

export default MapContainer;
