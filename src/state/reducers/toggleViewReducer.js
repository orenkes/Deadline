import { TOGGLEDESKTOP, TOGGLEMOBILE } from "../actions/toggleViewAction";

const toggleViewReducer = (state = true, action) => {
  switch (action.type) {
    case TOGGLEDESKTOP:
      return true;
      break;
    case TOGGLEMOBILE:
      return false;
      break;
    default:
      return state;
  }
};

export default toggleViewReducer;
