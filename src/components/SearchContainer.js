import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchContainer = (props) => {
  const { value, handleChangeValue, handleChangeInputValueIp } = props;

  const [invalidSearch, setInvalidSearch] = useState(false);

  const ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // eslint-disable-next-line no-useless-escape
  const urlFormat = /^(http:\/\/www\.|https:\/\/www\.|www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/;

  const handleSearch = () => {
    if (value !== undefined) {
      if (value.match(ipFormat)) {
        setInvalidSearch(false);
        handleChangeInputValueIp(value);
      } else if (value.match(urlFormat)) {
        setInvalidSearch(false);
        handleChangeInputValueIp(value);
      } else {
        setInvalidSearch(true);
        handleChangeValue("");
      }
    }
  };

  return (
    <>
      <input
        type="text"
        className="input-name"
        placeholder="134.201.250.155"
        value={value}
        onChange={(e) => handleChangeValue(e.target.value)}
      />
      <button
        // hidden={!search}
        className="search-button"
        onClick={() => handleSearch()}
      >
        <FontAwesomeIcon className="socialIcon" icon={faSearch} />
      </button>
      {invalidSearch && <p>Incorrectly IP or URL address, please try again!</p>}
    </>
  );
};

export default SearchContainer;
