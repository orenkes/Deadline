import { TOGGLEDEADLINE, TOGGLEURGENCY } from "../actions/toggleSortAction";

const toggleSortReducer = (state = true, action) => {
  switch (action.type) {
    case TOGGLEDEADLINE:
      return true;
      break;
    case TOGGLEURGENCY:
      return false;
      break;
    default:
      return state;
  }
};

export default toggleSortReducer;
