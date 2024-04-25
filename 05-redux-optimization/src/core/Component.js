import { observe } from "./observer.js";

import { store } from "../store.js";

export class Component {
  $el;
  constructor($el, props) {
    this.$el = $el;
    this.setup();
  }
  setup() {
    // observable 가 수정되면, observable에 등록된 observe가 모두 수행됨
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
