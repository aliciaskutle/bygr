import React from "react";
import { getApartments } from "./getApartments";
import styled from "styled-components";

const DropdownMenu = styled.select`
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 0.5rem;
  padding-right: 6rem;
  margin: 1rem;
  margin-bottom: 0;
`;

function Dropdown(props) {
  return (
    <div>
      <DropdownMenu
        onChange={(e) => props.setLayoutType(e.currentTarget.value)}
      >
        <option>Filter on type</option>
        {getApartments().map((apartment) => {
          return <option>{apartment.layoutType}</option>;
        })}
      </DropdownMenu>
    </div>
  );
}

export default Dropdown;
