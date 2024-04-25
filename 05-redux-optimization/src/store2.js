import { createStore } from "./core/Store.js";

const initialState = {
  c: 100,
  d: 200,
};

export const store = createStore((state = initialState, action = {}) => {
  switch (action.type) {
    case "SET_C":
      return { ...state, c: action.payload };
    case "SET_D":
      return { ...state, d: action.payload };
    default:
      return state;
  }
});

export const SET_C = "SET_C";
export const SET_D = "SET_D";

export const setC = (payload) => ({ type: SET_C, payload });
export const setD = (payload) => ({ type: SET_D, payload });
