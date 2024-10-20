import { _ as _export_sfc, t as __nuxt_component_0 } from './server.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
import 'ipx';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtPage = __nuxt_component_0;
  _push(`<!--[--><div class=""><b>\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0448\u0430\u0431\u043B\u043E\u043D1</b></div><header>\u042D\u0442\u043E \u0448\u0430\u043F\u043A\u0430 \u0441\u0430\u0439\u0442\u0430</header>`);
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(`<footer>\u042D\u0442\u043E \u043F\u043E\u0434\u0432\u0430\u043B \u0441\u0430\u0439\u0442\u04301</footer><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-Bu91EyGG.mjs.map
