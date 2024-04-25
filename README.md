### Javascript로 상태관리 시스템 만들기

Observer pattern은 객체의 상태 변화를 관찰하는 옵저버들의 목록을 객체에 등록해서 상태 변화가 발생할 때마다 메서드 등을 통해 객체가 직접 목록의 각 옵저버들에게 통지하도록 하는 디자인 패턴.

해당 패턴으로 상태 관리 시스템을 만들고, Object.defineProperty API를 사용할 것이다.

> Object.defineProperty()은 JavaScript에서 객체의 프로퍼티를 정의 또는 수정하는 메서드입니다. 이 메서드를 사용하면 객체에 새로운 프로퍼티를 추가하거나 기존 프로퍼티의 속성을 변경할 수 있습니다.

```javascript
export const observerable = (state) => {
  const stateKeys = Object.keys(state);

  for (const key of stateKeys) {
    let _value = state[key];

    // 중복 생성을 방지하기 위해 Set 사용 > 여러개의 observer 를 관리
    const observers = new Set();

    Object.defineProperty(state, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        if (_value === value) return;

        _value = value;
        // observerable의 값이 변경되면, 등록된 모든 observer를 모두 실행한다.
        observers.forEach((observer) => observer());
      },
    });
  }

  return state;
};
```

observable에 변화가 생기면, observe에 등록된 함수가 실행된다.

이 코드에서 핵심은, 함수가 실행될 때 currentObsever가 실행중인 함수를 참조하도록 만드는 것 이다.

- state의 property가 사용될 때(= get 메소드가 실행될 때, store.getState().a) currentObserver를 observers에 등록한다.
- state의 property가 변경될 때(=set 메소드가 실행될 때) observers에 등록된 모든 observer를 실행한다.

```javascript
export class Component {
  $el;
  constructor($el, props) {
    this.$el = $el;
    this.setup();
  }
  setup() {
    // observable 가 수정되면, observable에 등록된 observe가 모두 수행됨.
    // observerable 에 등록된 함수
    observe(() => {
      this.render();
      this.setEvent();
    });
  }
  template() {
    return "";
  }
  setEvent() {}
  render() {
    this.$el.innerHTML = this.template();
  }
}
```

이후 내가 observerable에 등록한 변수들이 변경될 때마다, observer 함수들이 실행된다.

```javascript
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
      if (!state[key]) continue;
      state[key] = value;
    }
  };

  return {
    dispatch,
    getState: () => frozenState,
  };
};
```

createStore 에는 state 등록, state 변경, state 조회 이렇게 3가지 기능이 수행이된다.

- state 등록(subscribe)은 reducer가 실행한 state를 observerable로 만들어야한다.
- state 변경(dispatch)는 state 값을 변경해야 한다.
- state 조회(getState)는 state를 직접 반환하면 좋겠지만, state에는 getter, setter가 모두 포함되고 있기 때문에 직접 참조하여 수정이 가능하므로 getter만 가능하도록 frozenState를 따로 만드는 것이다. 이건 다른 방식도 있긴한데, 블로그에서 따로 확인하면 될 것 같다.
  <br>
