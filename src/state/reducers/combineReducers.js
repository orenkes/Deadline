import { combineReducers } from "redux";

import userReducer from "./getUserReducer";
import isLoggedReducer from "./isLoggedReducer";
import updateArraysReducer from "./updateArraysReducer";
import markTabReducer from "./markTabReducer";
import filteringArraysReducer from "./filteredTasksReducer";
import searchWindowReducer from "./searchWindowReducer";
import toggleViewReducer from "./toggleViewReducer";
import toggleSortReducer from "./toggleSortReducer";

const allReducers = combineReducers({
  userReducer,
  isLoggedReducer,
  updateArraysReducer,
  markTabReducer,
  filteringArraysReducer,
  searchWindowReducer,
  toggleViewReducer,
  toggleSortReducer
});

export default allReducers;
