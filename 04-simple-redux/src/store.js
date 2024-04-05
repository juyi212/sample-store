import { observerable } from "./core/observer.js";

export const store = (reducer) => {
  const state = observerable(reducer());

  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (!state[key]) continue;
      state[key] = value;
    }
  };

  return {
    dispatch,
  };
};
