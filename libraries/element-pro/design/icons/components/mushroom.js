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
      "d": "M12.3 3.1A4.6 4.6 0 0016.5 6c1.16 0 2.2-.4 2.98-1.1a5.02 5.02 0 00-.19-.2c-1.62-1.62-4.38-2.15-6.98-1.6zm8.24 3.53a6.52 6.52 0 01-10.14-2.9c-.84.37-1.59.87-2.2 1.48a1.9 1.9 0 00-.6 1.03c-.04.32 0 .74.3 1.31.1.2.33.52.73.96.38.41.84.87 1.31 1.3l.01.02 4.22 4.22h.02l.22.24a6.56 6.56 0 016.69-4.26 8.46 8.46 0 00-.56-3.4zm.3 5.38L20.5 12a4.59 4.59 0 00-4.45 3.85c.16.12.28.2.4.26h.02c.56.29.98.34 1.29.29.31-.06.65-.23 1.03-.6A8 8 0 0020.83 12zm-8.77 2.76l-2.84-2.84-.7.62c-.84.72-1.94 1.62-2.99 2.3h-.03l-.1.07c-.55.33-1.34.8-1.73 1.47-.18.31-.26.64-.17 1.05.1.44.4 1.05 1.2 1.85.8.8 1.41 1.1 1.85 1.2.4.09.74.01 1.05-.17.67-.39 1.14-1.18 1.47-1.73l.06-.1.01-.02v-.01a28.32 28.32 0 012.92-3.7zM7.8 10.53l-.65-.68a6.84 6.84 0 01-1.04-1.4 4.14 4.14 0 01-.48-2.52c.13-.84.57-1.54 1.16-2.14a9.85 9.85 0 013.97-2.34C14.08.38 18.2.78 20.71 3.29c.35.35.65.73.92 1.14a10.18 10.18 0 011.36 6.91 10.28 10.28 0 01-2.78 5.87 3.9 3.9 0 01-2.13 1.16 4.09 4.09 0 01-2.5-.47h-.03a5.48 5.48 0 01-1.22-.89c-.26-.23-.56-.52-.86-.81l-.51.58c-.7.8-1.52 1.82-2.11 2.75l-.06.1a6.6 6.6 0 01-2.18 2.42c-.68.4-1.51.6-2.47.4a5.9 5.9 0 01-2.85-1.74 5.9 5.9 0 01-1.74-2.85c-.2-.96 0-1.8.4-2.47.67-1.16 1.91-1.88 2.42-2.18l.1-.06a26.48 26.48 0 003.33-2.62z"
    }
  }]
};
var Mushroom = Vue.extend({
  name: "MushroomIcon",
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
      id: "mushroom",
      icon: element,
      staticClass: className,
      style: style
    });
    data.props = fullProps;
    return createElement(IconBase, data);
  }
});

export default Mushroom;
//mushroom.js.map
