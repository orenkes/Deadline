import { ISLOGGED } from "../actions/isLoggedAction";

const isLoggedReducer = (state = false, action) => {
  switch (action.type) {
    case ISLOGGED:
      if (action.payload.length > 0) return true;
      else return false;
      break;
    default:
      return state;
  }
};

export default isLoggedReducer;
