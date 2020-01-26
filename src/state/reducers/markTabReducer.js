import { MARKTODO, MARKPROGRESS, MARKDONE } from "../actions/markTabAction";

const markTabReducer = (state = "currentTabTodo", action) => {
  switch (action.type) {
    case MARKTODO:
      return "currentTabTodo";
    case MARKPROGRESS:
      return "currentTabProgress";
    case MARKDONE:
      return "currentTabDone";
    default:
      return state;
  }
};

export default markTabReducer;
