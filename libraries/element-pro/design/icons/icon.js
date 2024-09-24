import { _ as _defineProperty } from './_chunks/dep-a77ab85e.js';
import { _ as _objectWithoutProperties, r as renderFn } from './_chunks/dep-0acb3ad3.js';
import Vue from 'vue';
import classNames from 'classnames';

var _excluded = ["icon", "id"],
  _excluded2 = ["staticClass", "style", "icon", "id", "onClick"],
  _excluded3 = ["class", "staticClass", "style", "staticStyle", "attrs"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function hump2Underline(s) {
  return s.replace(/([A-Z])/g, "-$1").toLowerCase().replace("view-box", "viewBox");
}
function jsonToUnderline(obj) {
  if (obj instanceof Array) {
    obj.forEach(function (v) {
      jsonToUnderline(v);
    });
  } else if (obj instanceof Object) {
    Object.keys(obj).forEach(function (key) {
      var newKey = hump2Underline(key);
      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
      jsonToUnderline(obj[newKey]);
    });
  }
}
var IconBase = Vue.extend({
  functional: true,
  props: {
    icon: {
      type: Object
    },
    id: {
      type: String,
      "default": ""
    }
  },
  render: function render(createElement, context) {
    var _context$props = context.props,
      icon = _context$props.icon,
      id = _context$props.id,
      userProps = _objectWithoutProperties(_context$props, _excluded);
    var _context$data$props = context.data.props,
      staticClass = _context$data$props.staticClass,
      style = _context$data$props.style,
      _ = _context$data$props.icon,
      __ = _context$data$props.id,
      onClick = _context$data$props.onClick,
      otherProps = _objectWithoutProperties(_context$data$props, _excluded2);
    var _context$data = context.data,
      customClassName = _context$data["class"],
      customStaticClassName = _context$data.staticClass,
      customStyle = _context$data.style,
      customStaticStyle = _context$data.staticStyle,
      attrs = _context$data.attrs,
      otherBinds = _objectWithoutProperties(_context$data, _excluded3);
    var domProps = otherBinds.domProps,
      on = otherBinds.on,
      nativeOn = otherBinds.nativeOn,
      directives = otherBinds.directives,
      scopedSlots = otherBinds.scopedSlots,
      slot = otherBinds.slot,
      key = otherBinds.key,
      ref = otherBinds.ref,
      refInFor = otherBinds.refInFor;
    var finalCls = classNames("el-p-icon", "el-p-icon-".concat(id), staticClass, customClassName, customStaticClassName);
    var finalStyle = _objectSpread(_objectSpread(_objectSpread({}, style), customStyle), customStaticStyle);
    jsonToUnderline(icon);
    var _click = onClick || (on === null || on === void 0 ? void 0 : on.click);
    return renderFn(createElement, icon, {
      "class": void 0,
      staticClass: finalCls,
      props: _objectSpread(_objectSpread({}, userProps), otherProps),
      attrs: attrs,
      style: finalStyle,
      on: _objectSpread(_objectSpread({}, on), {}, {
        click: function click(e) {
          return _click === null || _click === void 0 ? void 0 : _click({
            e: e
          });
        }
      }, nativeOn),
      directives: directives,
      scopedSlots: scopedSlots,
      slot: slot,
      key: key,
      ref: ref,
      refInFor: refInFor,
      domProps: domProps
    });
  }
});

export default IconBase;
//icon.js.map
