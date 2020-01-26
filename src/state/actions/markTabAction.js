export const MARKTODO = "MARKTODO";
export const MARKPROGRESS = "MARKPROGRESS";
export const MARKDONE = "MARKDONE";

export const markTodo = () => ({ type: MARKTODO });
export const markProgress = () => ({ type: MARKPROGRESS });
export const markDone = () => ({ type: MARKDONE });

// export const markTodo = payload => ({ type: MARKTODO, payload });
// export const markProgress = payload => ({ type: MARKPROGRESS, payload });
// export const markDone = payload => ({ type: MARKDONE, payload });
