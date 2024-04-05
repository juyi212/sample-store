import { Component } from "./core/Component.js";
import { store } from "./store.js";

export class App extends Component {
  template() {
    return `
      <input id="stateA" value="${store.state.a}" size="5" />
      <input id="stateB" value="${store.state.b}" size="5" />
      <p>a + b = ${store.state.a + store.state.b}</p>
    `;
  }

  setEvent() {
    const { $el } = this;

    $el.querySelector("#stateA").addEventListener("change", ({ target }) => {
      store.setState({ a: Number(target.value) });
    });

    $el.querySelector("#stateB").addEventListener("change", ({ target }) => {
      store.setState({ b: Number(target.value) });
    });
  }
}
