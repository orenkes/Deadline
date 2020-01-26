import { FILTERINGARRAYS } from "../actions/filteredTasksAction";

const filteringArraysReducer = (state = [], action) => {
  switch (action.type) {
    case FILTERINGARRAYS:
      return [...action.payload];
      break;
    default:
      return state;
      break;
  }
};

export default filteringArraysReducer;
