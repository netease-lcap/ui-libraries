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
      "d": "M6 4a2 2 0 100 4 2 2 0 000-4zM2 6a4 4 0 017.87-1h8.21l.08.01c.63.1 1.54.41 2.32 1a3.68 3.68 0 010 5.97c-.78.6-1.69.9-2.32 1l-.08.02H6c-.24 0-.77.15-1.25.53C4.3 13.9 4 14.37 4 15s.3 1.11.75 1.47c.48.38 1.01.53 1.25.53h11v-2.5l4.67 3.5L17 21.5V19H6c-.76 0-1.73-.35-2.5-.97A3.84 3.84 0 012 15c0-1.37.7-2.39 1.5-3.03A4.28 4.28 0 016 11h11.91c.37-.07.92-.27 1.36-.6a1.69 1.69 0 000-2.8A3.48 3.48 0 0017.9 7H9.87A4 4 0 012 6z"
    }
  }]
};
var MapConnection = Vue.extend({
  name: "MapConnectionIcon",
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
      id: "map-connection",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default MapConnection;
//map-connection.js.map
