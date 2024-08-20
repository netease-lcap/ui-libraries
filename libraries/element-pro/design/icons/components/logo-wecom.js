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
      "fill": "currentColor",
      "clipPath": "url(#clip0_8775_6833)"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "d": "M19.44 17.52l-.07-.01-.08-.01a3.91 3.91 0 01-2.16-1.2.3.3 0 00-.43 0 .3.3 0 00-.02.4l.02.03.04.03a3.85 3.85 0 011.2 2.32c.05.2.16.4.32.55.5.5 1.3.5 1.8 0a1.25 1.25 0 00-.62-2.1zM23.63 14.32a1.27 1.27 0 00-2.13.6l-.01.08-.01.08c-.14.74-.5 1.45-1.08 2.02l-.13.12a.3.3 0 000 .43.3.3 0 00.4.02l.03-.02a.4.4 0 00.03-.04l.09-.1a3.9 3.9 0 012.25-1.1 1.25 1.25 0 00.56-2.1zM18.27 10.77a1.25 1.25 0 00.61 2.11l.08.02h.07a3.9 3.9 0 012.17 1.2c.12.12.3.12.43 0a.3.3 0 00.02-.4l-.02-.02a3.85 3.85 0 01-1.24-2.35 1.27 1.27 0 00-2.11-.56zM16.84 15.4v-.07a3.86 3.86 0 011.21-2.15.3.3 0 000-.42.3.3 0 00-.43 0l-.03.04-.09.09a3.9 3.9 0 01-2.25 1.1 1.25 1.25 0 00-.56 2.1 1.27 1.27 0 002.15-.69z"
      }
    }, {
      "tag": "path",
      "attrs": {
        "d": "M11.46 3.62a7.86 7.86 0 017.58 5.73l1.92-.54a9.86 9.86 0 10-17.82 7.96l-1.9 4.57h10.51a9.85 9.85 0 004.03-1l-.87-1.8a7.81 7.81 0 01-3.2.8H4.23l1.17-2.82-.33-.45a7.86 7.86 0 016.38-12.46z"
      }
    }]
  }]
};
var LogoWecom = Vue.extend({
  name: "LogoWecomIcon",
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
      id: "logo-wecom",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default LogoWecom;
//logo-wecom.js.map
