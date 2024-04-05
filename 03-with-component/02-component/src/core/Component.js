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
    this.state = observerable(this.initState());
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  initState() {
    return {};
  }
  template() {
    return "";
  }
  render() {
    this.$el.innerHTML = this.template();
  }
  setEvent() {}
  mounted() {}
}
