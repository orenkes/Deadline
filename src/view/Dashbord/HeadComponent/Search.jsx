import React from "react";
import styled from "styled-components";
import { flexbox } from "../../../style/mixins";
import * as c from "../../../style/colors";

// Packages //
import { useSelector, useDispatch } from "react-redux";

// Actions //
import { searchWindowAction } from "../../../state/actions/searchWindowAction";

// Add ons //
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const Search = () => {
  const searchIsOpen = useSelector(state => state.searchWindowReducer);

  const dispatch = useDispatch();
  return (
    <SearchBox>
      <SearchButton onClick={() => dispatch(searchWindowAction(!searchIsOpen))}>
        {searchIsOpen ? <MdClose /> : <FiSearch />}
      </SearchButton>
    </SearchBox>
  );
};

export default Search;

const SearchBox = styled.div`
  flex-basis: 15%;
  margin: 0 10px;
  ${flexbox({ jc: "flex-end" })};

  @media (min-width: 769px) {
    flex-basis: 5%;
  }
`;

const SearchButton = styled.div`
  ${flexbox()}
  text-align: center;
  font-size: 1.4rem;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${c.elmShyBlue};
  box-shadow: -2px -2px 6px 0 rgba(242, 248, 250, 0.9),
    2px 2px 6px 0 rgba(54, 73, 79, 0.5);
  border: 1px solid rgba(242, 248, 250, 0.6);

  :hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;
