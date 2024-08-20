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
    "tag": "g",
    "attrs": {
      "clipPath": "url(#clip0_8726_9882)"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "fill": "currentColor",
        "d": "M8.3 6.49c-1.21 1.1-2.38 2.93-3.35 5.83l-.26.81c-.25.79-.53 1.69-.87 2.47A5.6 5.6 0 012 18.04V19h6v-5a4 4 0 018 0v5h6v-.96a5.6 5.6 0 01-1.82-2.44c-.34-.78-.62-1.68-.87-2.47l-.26-.81c-.97-2.9-2.14-4.73-3.35-5.83a5.34 5.34 0 00-7.4 0zM6.95 5.01a7.34 7.34 0 0110.1 0c1.54 1.4 2.87 3.57 3.9 6.67l.3.97c.24.75.47 1.47.76 2.15.43.97.88 1.52 1.37 1.72l.62.26V21H14v-7a2 2 0 10-4 0v7H0v-4.22l.62-.26c.49-.2.94-.75 1.37-1.72.3-.68.52-1.4.75-2.15l.31-.97c1.03-3.1 2.36-5.27 3.9-6.67z"
      }
    }]
  }]
};
var Bridge2 = Vue.extend({
  name: "Bridge2Icon",
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
      id: "bridge-2",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Bridge2;
//bridge-2.js.map
