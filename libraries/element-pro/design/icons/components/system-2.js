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
      "d": "M10 4.37V13H8V4.05l.04-.14c.13-.41.45-1.11 1.06-1.73A4 4 0 0112 1a4 4 0 012.9 1.18c.6.62.93 1.32 1.06 1.73l.04.14v2.39h-2V4.37c-.08-.19-.24-.5-.52-.77A2 2 0 0012 3a2 2 0 00-1.48.6c-.28.27-.44.58-.52.77zM4.05 8h2.39v2H4.37c-.19.08-.5.24-.77.52A2 2 0 003 12a2 2 0 00.6 1.48c.27.28.58.44.77.52H13v2H4.05l-.14-.04a4.35 4.35 0 01-1.73-1.06A4 4 0 011 12a4 4 0 011.18-2.9 4.35 4.35 0 011.73-1.06L4.05 8zM11 8h8.95l.14.04c.41.13 1.11.45 1.73 1.06A4 4 0 0123 12a4 4 0 01-1.18 2.9c-.62.6-1.32.93-1.73 1.06l-.14.04h-2.39v-2h2.07c.19-.08.5-.24.77-.52A2 2 0 0021 12a2 2 0 00-.6-1.48 2.49 2.49 0 00-.77-.52H11V8zm5 3v8.95l-.04.14a4.35 4.35 0 01-1.06 1.73A4 4 0 0112 23a4 4 0 01-2.9-1.18 4.35 4.35 0 01-1.06-1.73L8 19.95v-2.39h2v2.07c.08.19.24.5.52.77A2 2 0 0012 21a2 2 0 001.48-.6c.28-.27.44-.58.52-.77V11h2z"
    }
  }]
};
var System2 = Vue.extend({
  name: "System2Icon",
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
      id: "system-2",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default System2;
//system-2.js.map
