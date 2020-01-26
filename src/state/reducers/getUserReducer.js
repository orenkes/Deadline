import { GETUSER } from "../actions/getUserAction";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GETUSER:
      return action.payload;
      break;
    default:
      return state;
  }
};

export default userReducer;
