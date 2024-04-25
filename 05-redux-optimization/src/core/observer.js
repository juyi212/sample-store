// 앞서 작성한 코드를 다시 단순하게 observable과 observe라는 관계로 만들어보자.
// observable은 observe 에서 사용된다. observable에 변화가 생기면, observe에 등록된 함수가 실행된다.

//이 코드에서 핵심은, 함수가 실행될 때 currentObsever가 실행중인 함수를 참조하도록 만드는 것 이다.
let currentObserver = null;

const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback); // 현재 등록된 callback이 있을 경우 취소한다.
    currentCallback = requestAnimationFrame(callback); // 1프레임 뒤에 실행
  };
};

/** setTimeout 을 쓰지 않는 이유는 setTimeout에 있던 함수가 실행되고 콜 스택에서 
  pop 될때까지의 지연시간이 대략 4ms임으로 정확하게 측정되지 않는다. 
  또한, 브라우저에서 일어나는 일을 고려하지 않는다.  */

export const observe = (action) => {
  // currentObserver = debounceFrame(() => console.log(1));
  // currentObserver = debounceFrame(() => console.log(2));
  // currentObserver = debounceFrame(() => console.log(3));
  // currentObserver = debounceFrame(() => console.log(5));
  // currentObserver = debounceFrame(() => console.log(6));
  currentObserver = debounceFrame(action);

  action();
  currentObserver = null;
};

export const observerable = (state) => {
  const stateKeys = Object.keys(state);

  for (const key of stateKeys) {
    let _value = state[key];

    const observers = new Set();

    Object.defineProperty(state, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);

        return _value;
      },
      set(value) {
        console.log("observers :", observers);
        if (_value === value) return;

        _value = value;
        observers.forEach((observer) => observer());
      },
    });
  }

  return state;
};
