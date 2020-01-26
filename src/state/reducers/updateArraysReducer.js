import { UPDATEARRAYS } from "../actions/updateArraysAction";

const updateArraysReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATEARRAYS:
      return { ...state, ...action.payload };
      break;

    default:
      return state;
      break;
  }
};

export default updateArraysReducer;
