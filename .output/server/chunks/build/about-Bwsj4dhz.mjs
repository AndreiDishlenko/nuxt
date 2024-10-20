import { u as useHead } from './index-pdc_nDWr.mjs';
import { useSSRContext } from 'vue';
import './server.mjs';
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
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@iconify/vue';

const __default__ = {};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "About",
      meta: [
        { name: "description", content: "\u042D\u0442\u043E \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043C\u043E\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430." },
        { name: "keywords", content: "\u0441\u0430\u0439\u0442, \u0433\u043B\u0430\u0432\u043D\u0430\u044F, nuxt 3" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class=""> \u042D\u0442\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 About3 </div><div class=""><a href="/">\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E</a></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-Bwsj4dhz.mjs.map
