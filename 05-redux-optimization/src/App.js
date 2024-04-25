import { Component } from "./core/Component.js";
import { store, setA, setB } from "./store.js";

export class App extends Component {
  template() {
    return `
      <input id="stateA" value="${store.getState().a}" size="5" />
      <input id="stateB" value="${store.getState().b}" size="5" />
      <p>a + b =${store.getState().a + store.getState().b}</p>
    `;
  }

  setEvent() {
    const { $el } = this;

    $el.querySelector("#stateA").addEventListener("change", ({ target }) => {
      store.dispatch(setA(Number(target.value)));
    });
    $el.querySelector("#stateB").addEventListener("change", ({ target }) => {
      store.dispatch(setB(Number(target.value)));
    });
  }
}
