import React, { useState, useEffect } from "react";

const ListOfAllSearches = (props) => {
  const { searchesFlag } = props;
  const [localData, setLocalData] = useState();

  useEffect(() => {
    // console.log(inputValueIp);
    let data = sessionStorage.getItem("search");
    if (data !== undefined) {
      console.log("weszło");
      console.log(data);
      setLocalData(JSON.parse(data));
    } else {
      console.log("nie weszło");
      setLocalData(null);
    }
  }, [searchesFlag]);

  if (localData !== undefined && localData !== null) {
    var listOfAllData = localData.map((data, index) => (
      <p key={index} className="text-left">
        {data.ip}
      </p>
    ));
  }

  console.log(listOfAllData);
  return (
    <>
      {listOfAllData !== undefined ? (
        listOfAllData
      ) : (
        <p className="text-left">No result, start searching.</p>
      )}
    </>
  );
};

export default ListOfAllSearches;
