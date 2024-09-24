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
      "d": "M9.5 1.59l2.53 2.53 2.7-2.53 1.37 1.46-1.02.95c.79.04 1.57.3 2.2.6.66.3 1.27.68 1.65 1.02 1.5 1.15 2.98 3.7 3.07 6.62.09 3.04-1.33 6.4-5.5 9.04a4.88 4.88 0 01-3.29.64c-.44-.1-.69-.2-.84-.26l-.07-.03a.22.22 0 00-.05-.02h-.5l-.05.02c-.03 0-.05.02-.07.03-.15.05-.4.15-.84.26a4.88 4.88 0 01-3.3-.64c-4.16-2.64-5.58-6-5.49-9.04.1-2.91 1.56-5.47 3.07-6.62.38-.34.99-.73 1.65-1.03.67-.3 1.52-.58 2.36-.59l-1-1L9.5 1.59zM7.55 6.4a4.7 4.7 0 00-1.15.7l-.04.04-.05.04c-1 .74-2.24 2.73-2.3 5.1-.08 2.28.93 5 4.56 7.3a2.88 2.88 0 001.76.38c.3-.07.43-.12.56-.18.04 0 .07-.02.1-.04.3-.1.56-.15 1.01-.15.45 0 .7.04 1 .15l.1.04a2.07 2.07 0 001.4.15c.36-.07.7-.2.93-.36 3.63-2.29 4.64-5 4.57-7.28-.07-2.38-1.31-4.37-2.31-5.11l-.05-.04-.04-.04a4.7 4.7 0 00-1.15-.7A4.03 4.03 0 0014.9 6c-.86 0-1.5.17-1.85.3-.26.1-.63.21-1.04.21-.41 0-.78-.1-1.04-.21-.34-.13-1-.3-1.85-.3-.45 0-1.01.16-1.56.41zM8 8h2v2H8V8zm-2 3h2v2H6v-2zm2 3h2v2H8v-2z"
    }
  }]
};
var Tangerinr = Vue.extend({
  name: "TangerinrIcon",
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
      id: "tangerinr",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Tangerinr;
//tangerinr.js.map
