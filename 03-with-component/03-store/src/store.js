import { observerable } from "./core/observer.js";

export const store = {
  state: observerable({
    a: 20,
    b: 10,
  }),

  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};
