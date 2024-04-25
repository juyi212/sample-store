import { Component } from "./core/Component.js";
import { observe } from "./core/observer.js";
import { store, setA, setB } from "./store.js";
import { store as store2, setC, setD } from "./store2.js";

export class App extends Component {
  template() {
    return `
      <input id="stateA" value="${store.getState().a}" size="5" />
      <input id="stateB" value="${store.getState().b}" size="5" />
      <p>a + b =${store.getState().a + store.getState().b}</p>
      <br/>
      <input id="stateC" value="${store2.getState().c}" size="5" />
      <input id="stateD" value="${store2.getState().d}" size="5" />
      <p>a + b =${store2.getState().c + store2.getState().d}</p>
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

    $el.querySelector("#stateC").addEventListener("change", ({ target }) => {
      store2.dispatch(setC(Number(target.value)));
    });
    $el.querySelector("#stateD").addEventListener("change", ({ target }) => {
      store2.dispatch(setD(Number(target.value)));
    });
  }
}
