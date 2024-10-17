import { _ as _defineProperty } from '../_chunks/dep-a77ab85e.js';
import { _ as _objectWithoutProperties } from '../_chunks/dep-0acb3ad3.js';
import Vue from 'vue';
import IconBase from '../icon.js';
import useSizeProps from '../utils/use-size-props.js';
import 'classnames';
import '../utils/use-common-classname.js';
import '../utils/config-context.js';

var _excluded = ["size"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var element = {
  "tag": "svg",
  "attrs": {
    "fill": "none",
    "viewBox": "0 0 24 24",
    "width": "1em",
    "height": "1em"
  },
  "children": [{
    "tag": "path",
    "attrs": {
      "fill": "currentColor",
      "d": "M4 2v18h18v2H2V2h2zm16.3 5.27l1.79.9-.46.9-.89-.45.9.45-.02.02-.02.05a13.9 13.9 0 01-.47.82c-.3.52-.75 1.2-1.29 1.88a8.72 8.72 0 01-1.91 1.84c-.73.48-1.68.85-2.7.54-1.7-.5-2.25-1.84-2.62-2.75l-.03-.08c-.4-.96-.63-1.43-1.38-1.64-.23-.07-.57-.03-1.06.3-.48.32-.98.83-1.45 1.42a15.65 15.65 0 00-1.55 2.38l-.02.04v.01l-.45.9-1.79-.91.46-.9.89.46-.9-.46h.01v-.02l.03-.05a13.21 13.21 0 01.47-.82c.3-.51.75-1.2 1.28-1.87a8.73 8.73 0 011.92-1.85 3.26 3.26 0 012.71-.56c1.74.5 2.29 1.85 2.66 2.76l.02.06c.4.97.63 1.45 1.36 1.67.23.06.55.02 1.04-.3.48-.31.98-.83 1.45-1.42a15.77 15.77 0 001.55-2.38l.02-.04.46-.9z"
    }
  }]
};
var ChartLineData1 = Vue.extend({
  name: "ChartLineData1Icon",
  functional: true,
  props: {
    size: {
      type: String
    },
    onClick: {
      type: Function
    }
  },
  render: function render(createElement, context) {
    var props = context.props,
      data = context.data;
    var size = props.size,
      otherProps = _objectWithoutProperties(props, _excluded);
    var _useSizeProps = useSizeProps(size),
      className = _useSizeProps.className,
      style = _useSizeProps.style;
    var fullProps = _objectSpread(_objectSpread({}, otherProps || {}), {}, {
      id: "chart-line-data-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default ChartLineData1;
//chart-line-data-1.js.map
