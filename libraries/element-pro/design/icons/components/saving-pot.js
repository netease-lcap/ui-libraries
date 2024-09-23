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
      "clipPath": "url(#clip0_8780_6716)"
    },
    "children": [{
      "tag": "path",
      "attrs": {
        "fill": "currentColor",
        "d": "M5.2 22.5h5.6l.45-2h2.5l.45 2h5.6l.63-2.84a10 10 0 001.49-13.77A5.02 5.02 0 0017 0a5 5 0 00-4 2.02c-1.35.08-2.7.4-4.01.95l-.92.4.78 1.83.92-.39c.76-.32 1.53-.54 2.3-.67A5.03 5.03 0 0017 10c1.61 0 3.05-.76 3.96-1.95a8 8 0 01-2.04 10.26l-.28.22-.44 1.97h-2.4l-.44-2H9.64l-.44 2H6.8l-.67-3-.5-.2A13.03 13.03 0 012 15.07V10.5h1.07L5.1 7.09l-.67-1.67c.81.1 1.74.5 2.6 1.45l.68.74L9.2 6.27l-.67-.74a5.92 5.92 0 00-5.76-2l-1.13.26 1.25 3.12-.96 1.59H0v7.42l.3.29a14.72 14.72 0 004.11 2.75l.79 3.54zm.3-11h2v-2h-2v2zM17 8a3 3 0 110-6 3 3 0 010 6z"
      }
    }]
  }]
};
var SavingPot = Vue.extend({
  name: "SavingPotIcon",
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
      id: "saving-pot",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default SavingPot;
//saving-pot.js.map
