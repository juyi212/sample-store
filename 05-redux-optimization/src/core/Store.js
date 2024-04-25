import { observerable } from "./observer.js";

export const createStore = (reducer) => {
  const state = observerable(reducer());

  const frozenState = {};

  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key],
    });
  });

  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (!state[key]) return;
      state[key] = value;
    }
  };

  return {
    dispatch,
    getState: () => frozenState,
  };
};
