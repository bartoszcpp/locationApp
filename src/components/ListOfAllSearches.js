import React, { useState, useEffect } from "react";

const ListOfAllSearches = (props) => {
  const { searchesFlag } = props;
  const [localData, setLocalData] = useState();

  useEffect(() => {
    let data = sessionStorage.getItem("search");
    if (data !== undefined) {
      setLocalData(JSON.parse(data));
    } else {
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
