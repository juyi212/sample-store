let currentObserver = null;

// 구독자 : 값들을 바라보고있을 함수
export const observe = (fn) => {
  currentObserver = fn;
  fn();
};

export const observerable = (state) => {
  const stateKeys = Object.keys(state);

  for (const key of stateKeys) {
    let _value = state[key];
    const observers = new Set();
    Object.defineProperty(state, key, {
      get() {
        //state의 값이 사용될 때 (get), currentObserver를 observers에 등록한다.
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        // state의 값이 변경될 때 (set), observers에 등록된 모든 observer를 실행한다.
        if (_value === value) return;
        if (JSON.stringify(_value) === JSON.stringify(value)) return;

        _value = value;
        observers.forEach((observer) => observer());
      },
    });
  }
  return state;
};
