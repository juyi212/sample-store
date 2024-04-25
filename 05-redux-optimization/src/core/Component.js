import { observe } from "./observer.js";

export class Component {
  $el;
  constructor($el, props) {
    this.$el = $el;
    this.setup();
  }
  setup() {
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
