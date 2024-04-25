import { observerable } from "./observer.js";

// 사실 redux는 불변성 이라는 개념을 사용하고 있기 때문에 observable과 observe를 이용하는 것이 부자연스러울 수 있다.
// 앱의 상태를 보관하는 저장소를 만듭니다.
// API로는 { subscribe, dispatch, getState }가 있습니다.

export const createStore = (reducer) => {
  const state = observerable(reducer());

  // frozenState를 반환하는 이유 ? observable이 반환한 결과인 state는 getter와 setter가 모두 등록된 객체이다.
  // 이를 getter만 할 수 있는 함수로 반환하는 것임.
  const frozenState = {};
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key],
    });
  });

  // dispatch로만 state 값을 변경
  const dispatch = (action) => {
    const newState = reducer(state, action);

    for (const [key, value] of Object.entries(newState)) {
      if (!state[key]) continue;
      state[key] = value;
    }
  };

  const getState = () => frozenState;

  return {
    dispatch,
    getState,
  };
};
