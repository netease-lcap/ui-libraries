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
      "clipPath": "url(#clip0_8726_7256)"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "fill": "currentColor",
        "d": "M12 2a6.2 6.2 0 00-5.57 8.92c.16.39.4.91.7 1.54l.45.97c.37.81.78 1.71 1.11 2.57h6.63c.34-.85.74-1.75 1.11-2.56l.4-.85c.3-.68.57-1.25.74-1.66A6.21 6.21 0 0012 2zM3.8 8.2a8.2 8.2 0 0116.4 0c0 1.26-.26 2.23-.78 3.49-.19.45-.48 1.08-.8 1.78l-.37.8a48.74 48.74 0 00-1.3 3.08l-.25.65H7.29l-.24-.67c-.34-.95-.82-2.04-1.29-3.06l-.42-.91c-.3-.65-.58-1.24-.75-1.67A8.4 8.4 0 013.8 8.2zM7.5 19h9v2h-9v-2zm2 3h5v2h-5v-2z"
      }
    }]
  }]
};
var Lightbulb = Vue.extend({
  name: "LightbulbIcon",
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
      id: "lightbulb",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Lightbulb;
//lightbulb.js.map
