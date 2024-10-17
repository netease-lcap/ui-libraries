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
      "d": "M12 .92l6.3 2.52-.74 1.86-.56-.22V10h2v2h-1.9c.16 1.9.51 3.94.88 5.67a71.32 71.32 0 00.96 3.98l.02.06v.01l.37 1.28h-6.11l-1-4h-.44l-1 4h-6.1l.36-1.27v-.02l.02-.06a36.56 36.56 0 00.28-1.07c.19-.72.43-1.74.68-2.91.37-1.73.72-3.76.89-5.67H5v-2h2V5.08l-.56.22-.74-1.86L12 .92zM9 4.28V10h6V4.28l-3-1.2-3 1.2zM15.09 12H8.9a50.07 50.07 0 01-.93 6.08A73.35 73.35 0 017.3 21h1.92l1-4h3.56l1 4h1.92c-.19-.74-.43-1.75-.68-2.92-.38-1.8-.77-4-.93-6.08zM11 6h2v2h-2V6z"
    }
  }]
};
var Lighthouse1 = Vue.extend({
  name: "Lighthouse1Icon",
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
      id: "lighthouse-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Lighthouse1;
//lighthouse-1.js.map
