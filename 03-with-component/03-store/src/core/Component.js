import { observerable, observe } from "./observer.js";

export class Component {
  state;
  props;
  $el;

  constructor($el, props) {
    this.$el = $el;
    this.props = props;
    this.setup();
  }

  setup() {
    // store initial 값에 아래 옵저버를 구독
    // a,b 값에 따라서 아래 함수가 실행됨.
    observe(() => {
      this.render();
      this.setEvent();
    });
  }

  template() {
    return "";
  }
  render() {
    this.$el.innerHTML = this.template();
  }
  setEvent() {}
}
