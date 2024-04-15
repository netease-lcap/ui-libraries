'use strict';
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
  __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: !0 });
  },
  __copyProps = (to, from, except, desc) => {
    if ((from && typeof from == 'object') || typeof from == 'function')
      for (let key of __getOwnPropNames(from))
        !__hasOwnProp.call(to, key) &&
          key !== except &&
          __defProp(to, key, {
            get: () => from[key],
            enumerable:
              !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
    return to;
  };
var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
      isNodeMode || !mod || !mod.__esModule
        ? __defProp(target, 'default', { value: mod, enumerable: !0 })
        : target,
      mod,
    )
  ),
  __toCommonJS = (mod) =>
    __copyProps(__defProp({}, '__esModule', { value: !0 }), mod);
var preset_exports = {};
__export(preset_exports, { core: () => core, viteFinal: () => viteFinal });
module.exports = __toCommonJS(preset_exports);
var import_path = require('path'),
  import_vite2 = require('vite');
var import_vue_docgen_api = require('vue-docgen-api'),
  import_vite = require('vite'),
  import_magic_string = __toESM(require('magic-string'));
function vueDocgen() {
  let filter = (0, import_vite.createFilter)(/\.(vue)$/);
  return {
    name: 'storybook:vue2-docgen-plugin',
    async transform(src, id) {
      if (!filter(id)) return;
      let metaData = await (0, import_vue_docgen_api.parse)(id),
        metaSource = JSON.stringify(metaData),
        s = new import_magic_string.default(src);
      return (
        s.append(`;__component__.exports.__docgenInfo = ${metaSource}`),
        { code: s.toString(), map: s.generateMap({ hires: !0, source: id }) }
      );
    },
  };
}
var getAbsolutePath = (input) =>
    (0, import_path.dirname)(
      require.resolve((0, import_path.join)(input, 'package.json')),
    ),
  core = async (config, options) => {
    let framework = await options.presets.apply('framework');
    return {
      ...config,
      builder: {
        name: getAbsolutePath('@storybook/builder-vite'),
        options:
          typeof framework == 'string'
            ? {}
            : (framework == null ? void 0 : framework.options.builder) || {},
      },
      renderer: getAbsolutePath('@storybook/vue'),
    };
  },
  viteFinal = async (config, { presets }) =>
    (0, import_vite2.mergeConfig)(config, {
      plugins: [vueDocgen()],
      resolve: { alias: { vue: 'vue/dist/vue.esm.js' } },
    });
0 && (module.exports = { core, viteFinal });
