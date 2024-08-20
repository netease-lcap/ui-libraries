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
      "d": "M11.17 1.44L12 .2l.83 1.24v.01l.03.03a12.89 12.89 0 00.43.6c.3.4.72.96 1.25 1.57a16.71 16.71 0 003.96 3.48c.46.27.95.37 1.5.37h1v2h-1c-.33 0-.66-.02-1-.09V17h2v2h-1v3h-2v-3h-5v3h-2v-3H6v3H4v-3H3v-2h2V9.41c-.34.07-.68.09-1 .09H3v-2h1c.54 0 1.03-.1 1.5-.37a16.71 16.71 0 003.96-3.48 27.59 27.59 0 001.68-2.17l.02-.03zM7 9v8h2v-2.2a3 3 0 016 0V17h2V9H7zm8-2a24.3 24.3 0 01-3-3.3A29.66 29.66 0 019 7h6zm-2 10v-2.2a1 1 0 10-2 0V17h2z"
    }
  }]
};
var Attic1 = Vue.extend({
  name: "Attic1Icon",
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
      id: "attic-1",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Attic1;
//attic-1.js.map
