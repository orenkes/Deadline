import { SEARCHWINDOW } from "../actions/searchWindowAction";

const searchWindowReducer = (state = false, action) => {
  switch (action.type) {
    case SEARCHWINDOW:
      return action.payload;
      break;
    default:
      return state;
  }
};

export default searchWindowReducer;
