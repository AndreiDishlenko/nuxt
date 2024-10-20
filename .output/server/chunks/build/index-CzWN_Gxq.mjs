import __nuxt_component_0 from './index-Ck27dIWH.mjs';
import { useSSRContext, defineComponent, useAttrs, ref, computed, mergeProps, unref } from 'vue';
import { ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { u as useHead } from './index-Ds4Yf0H0.mjs';
import { m as defu } from '../runtime.mjs';
import { i as encodeParam, b as useNuxtApp, h as hasProtocol, f as withLeadingSlash, j as joinURL, g as parseURL, c as useRuntimeConfig, k as encodePath } from './server.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import '@unhead/shared';
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
import 'vue-router';

async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return Number.parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = Number.parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (input && typeof input !== "string") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (!input || input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        const alias = ctx.options.alias[base];
        if (alias) {
          input = joinURL(alias, input.slice(base.length));
        }
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b, _c, _d, _e;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const sizes = parseSizes(opts.sizes);
  const densities = ((_c = opts.densities) == null ? void 0 : _c.trim()) ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = key ? getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx) : void 0;
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: (_d = opts.modifiers) == null ? void 0 : _d.width,
          _cHeight: (_e = opts.modifiers) == null ? void 0 : _e.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant == null ? void 0 : defaultVariant.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = Number.parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  var _a;
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = ((_a = sizeVariants[i + 1]) == null ? void 0 : _a.media) || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL) {
    baseURL = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$ZagsPhbuAC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage,
  supportsAlias,
  validateDomains
}, Symbol.toStringTag, { value: "Module" }));
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536
  },
  "presets": {},
  "provider": "ipx",
  "domains": [],
  "alias": {},
  "densities": [
    1,
    2
  ],
  "format": [
    "webp"
  ]
};
imageOptions.providers = {
  ["ipx"]: { provider: ipxRuntime$ZagsPhbuAC, defaults: {} }
};
const useImage = () => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    nuxt: {
      baseURL: config.app.baseURL
    },
    runtimeConfig: config
  }));
};
const baseImageProps = {
  // input source
  src: { type: String, required: false },
  // modifiers
  format: { type: String, required: false },
  quality: { type: [Number, String], required: false },
  background: { type: String, required: false },
  fit: { type: String, required: false },
  modifiers: { type: Object, required: false },
  // options
  preset: { type: String, required: false },
  provider: { type: String, required: false },
  sizes: { type: [Object, String], required: false },
  densities: { type: String, required: false },
  preload: {
    type: [Boolean, Object],
    required: false
  },
  // <img> attributes
  width: { type: [String, Number], required: false },
  height: { type: [String, Number], required: false },
  alt: { type: String, required: false },
  referrerpolicy: { type: String, required: false },
  usemap: { type: String, required: false },
  longdesc: { type: String, required: false },
  ismap: { type: Boolean, required: false },
  loading: {
    type: String,
    required: false,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    required: false,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    required: false,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], required: false }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], required: false },
  placeholderClass: { type: String, required: false }
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NuxtImg",
  __ssrInlineRender: true,
  props: imgProps,
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const attrs = useAttrs();
    const isServer = true;
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const imgEl = ref();
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const imgAttrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          },
          ...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        }]
      });
    }
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<img${ssrRenderAttrs(mergeProps({
        ref_key: "imgEl",
        ref: imgEl,
        class: props.placeholder && !placeholderLoaded.value ? props.placeholderClass : void 0
      }, {
        ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
        ...imgAttrs.value,
        ...unref(attrs)
      }, { src: src.value }, _attrs))}>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __default__$1 = {
  data: function() {
    return {
      language: "",
      langs: ["uk", "ru"]
    };
  },
  async mounted() {
    let result = localStorage.getItem("language");
    console.log(result);
    if (!result || !this.langs.includes(result))
      result = "uk";
    this.language = result;
  },
  methods: {
    setLang: function(lang) {
      if (!lang || !this.langs.includes(lang))
        return;
      this.language = lang;
      localStorage.setItem("language", lang);
    }
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign(__default__$1, {
  __name: "langselector",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "lang-selector dropdown" }, _attrs))}><button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`);
      if (_ctx.language == "uk") {
        _push(ssrRenderComponent(_component_Icon, { name: "emojione:flag-for-ukraine" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (_ctx.language == "ru") {
        _push(ssrRenderComponent(_component_Icon, { name: "emojione:flag-for-russia" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</button><div class="dropdown-menu text-2"><div class="dropdown-item">`);
      _push(ssrRenderComponent(_component_Icon, { name: "emojione:flag-for-ukraine" }, null, _parent));
      _push(`<span class="flex-grow-1">\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430</span></div><div class="dropdown-item">`);
      _push(ssrRenderComponent(_component_Icon, { name: "emojione:flag-for-russia" }, null, _parent));
      _push(`<span class="flex-grow-1">\u0420\u043E\u0441\u0456\u0439\u0441\u044C\u043A\u0430</span></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/langselector.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __default__ = {
  components: {
    LangSelector: _sfc_main$1
  },
  data: function() {
    return {
      language: "uk",
      langs: ["uk", "ru"],
      isMenuVisible: false
    };
  },
  mounted: function() {
    console.log("mounted");
    (void 0).addEventListener("scroll", this.handleScroll);
    this.getDefaultLanguage();
  },
  unmounted: function() {
    console.log("unmounted");
    (void 0).removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function() {
      this.isMenuVisible = (void 0).scrollY > 200;
    },
    getDefaultLanguage: function() {
      let result = localStorage.getItem("language");
      if (!result || !this.langs.includes(result))
        result = "uk";
      this.language = result;
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      htmlAttrs: {
        lang: "uk"
        // Указываем украинский язык для всего приложения
      },
      title: "Home",
      meta: [
        { name: "description", content: "\u042D\u0442\u043E \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043C\u043E\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430." },
        { name: "keywords", content: "\u0441\u0430\u0439\u0442, \u0433\u043B\u0430\u0432\u043D\u0430\u044F, nuxt 3" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0;
      const _component_NuxtImg = _sfc_main$2;
      _push(`<!--[--><div class="${ssrRenderClass(["popup-menu", "apple-shadow", _ctx.isMenuVisible ? "" : "collapsed"])}"><div class="top-line"><div class="d-flex justify-content-between container"><div class="flex-grow-1 bold-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ri:telegram-2-line",
        size: "1em",
        class: "me-1"
      }, null, _parent));
      _push(`\u041A\u0438\u0457\u0432 </div><div class="flex-grow-2 d-none d-lg-block text-center f-2">\u0411\u0456\u043B\u044C\u0448 \u043D\u0456\u0436 5 \u0440\u043E\u043A\u0456\u0432 \u043C\u0438 \u0432\u0438\u0440\u043E\u0431\u043B\u044F\u0454\u043C\u043E \u0442\u0456 \u0441\u0430\u043C\u0456 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u0457 \u0437 \u043C\u0435\u0442\u0430\u043B\u0443, \u044F\u043A\u0456 \u0432\u0441\u0456\u043C \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u0456</div><div class="flex-grow-1 bold-1 text-end flex-grow-1">+38(067) 777-77-77</div></div></div><div class="menu-line f-3"><div class="h-100 d-flex justify-content-between align-items-center container"><div class="w-25 d-none d-lg-block">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/logo_popupmenu.png",
        alt: "Steel Master \u043B\u043E\u0433\u043E\u0442\u0438\u043F"
      }, null, _parent));
      _push(`</div><div class="w-50 d-flex flex-grow-1 justify-content-between text-uppercase bold-1 text-black"><a href="#about">\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0457</a><a href="#services">\u041F\u043E\u0441\u043B\u0443\u0433\u0438</a><a href="#product">\u0412\u0438\u0440\u043E\u0431\u043D\u0438\u0446\u0442\u0432\u043E</a><a href="#project">\u041F\u0440\u043E\u0435\u043A\u0442\u0443\u0432\u0430\u043D\u043D\u044F</a></div><div class="w-25 d-none d-md-block text-end"><button class="text-uppercase f-4 bold-3">\u0417\u0430\u043B\u0438\u0448\u0438\u0442\u0438 \u0437\u0430\u044F\u0432\u043A\u0443</button></div></div></div></div><div class="wrapper"><div class="d-center vh-height bg-dark text-light"><div class="main-block container py-5"><div class="header p-0"><div class="logo">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/logo_header.png",
        alt: "Steel Master \u043B\u043E\u0433\u043E\u0442\u0438\u043F",
        height: "49px"
      }, null, _parent));
      _push(`</div><div class="items d-none d-lg-flex"><a href="#about" class="f-2">${ssrInterpolate(_ctx.$t("\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0457"))}</a><a href="#services" class="f-2">\u041F\u043E\u0441\u043B\u0443\u0433\u0438</a><a href="#product" class="f-2">\u0412\u0438\u0440\u043E\u0431\u043D\u0438\u0446\u0442\u0432\u043E</a><a href="#project" class="f-2">\u041F\u0440\u043E\u0435\u043A\u0442\u0443\u0432\u0430\u043D\u043D\u044F</a></div><div class="location d-flex align-items-center justify-content-end text-end flex-grow-1">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ri:telegram-2-line",
        size: "1rem",
        class: "pe-4",
        style: { "color": "yellow" }
      }, null, _parent));
      _push(`<div class="ps-2 me-3 bold-1">\u041A\u0438\u0457\u0432</div>`);
      _push(ssrRenderComponent(_sfc_main$1, { class: "pe-3" }, null, _parent));
      _push(ssrRenderComponent(_component_Icon, {
        name: "stash:burger-classic",
        class: "d-lg-none"
      }, null, _parent));
      _push(`</div></div><div class="benefits bigger w-100 w-lg-75 w-xl-50"><div class="f2 thin-1">\u0412\u0456\u0434 2 \u0442\u0438\u0436\u0434\u043D\u0456\u0432<div class="separator mt-2"></div></div><div class="f2 thin-1">\u0412\u0456\u0434 5000 \u0433\u0440\u043D<div class="separator mt-2"></div></div><div class="f2 thin-1">\u0413\u0430\u0440\u0430\u043D\u0442\u0456\u044F \u0432\u0456\u0434 5 \u0440\u043E\u043A\u0456\u0432<div class="separator mt-2"></div></div><div class="f2 thin-1">\u041F\u043E \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0443<div class="separator mt-2"></div></div></div><div class="slogan"><div class=""><h1>\u0412\u0418\u0413\u041E\u0422\u041E\u0412\u0418\u041C \u0411\u0423\u0414\u042C-\u042F\u041A\u0423 \u041A\u041E\u041D\u0421\u0422\u0420\u0423\u041A\u0426\u0406\u042E \u0417 \u041C\u0415\u0422\u0410\u041B\u0423</h1></div><div class="bigger">\u0414\u043B\u044F \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0438\u0445 \u0431\u0443\u0434\u0438\u043D\u043A\u0456\u0432, \u043A\u043E\u0442\u0435\u0434\u0436\u043D\u0438\u0445 \u043C\u0456\u0441\u0442\u0435\u0447\u043E\u043A, \u043A\u043E\u043C\u0435\u0440\u0446\u0456\u0439\u043D\u0438\u0445 \u043F\u0456\u0434\u043F\u0440\u0438\u0454\u043C\u0441\u0442\u0432</div></div><button class="action-button mb-5 bold-2">\u041E\u0422\u0420\u0418\u041C\u0410\u0422\u0418 \u0411\u0415\u0417\u041A\u041E\u0428\u0422\u041E\u0412\u041D\u0423 \u041A\u041E\u041D\u0421\u0423\u041B\u042C\u0422\u0410\u0426\u0406\u042E</button></div></div><div id="about" class="vh-height d-center v-center">\u0411\u043B\u043E\u043A \u043F\u0435\u0440\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B 2</div><div id="services" class="vh-height d-center v-center">\u0411\u043B\u043E\u043A \u043F\u0435\u0440\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B 3</div><div id="product" class="vh-height d-center v-center">\u0411\u043B\u043E\u043A \u043F\u0435\u0440\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B 4</div><div class="footer v-flex justify-content-between align-items-center vh-height-75 bg-dark text-light"><div id="project" class="d-center v-center bg-dark text-light flex-grow-1">\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0431\u043B\u043E\u043A</div><div class="d-flex align-items-center justify-content-between container text-white-75 border-bottom border-grey py-4"><div class="logo">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/logo_header.png",
        alt: "Steel Master \u043B\u043E\u0433\u043E\u0442\u0438\u043F",
        height: "30px"
      }, null, _parent));
      _push(`</div><div class="phone">380-67-777-77-77</div><div class="email">support@steelmetal.com.ua</div><div class="location">\u041A\u0438\u0457\u0432</div><div class=""><button class="text-uppercase f-4 bold-3">\u0417\u0410\u041B\u0418\u0428\u0418\u0422\u0418 \u0417\u0410\u042F\u0412\u041A\u0423</button></div>`);
      _push(ssrRenderComponent(_component_Icon, { name: "logos:telegram" }, null, _parent));
      _push(`</div><div class="text-center container py-4 text-white-50"> \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B \xA9 2016-2022 \u0422\u041E\u0412 &quot;\u0422\u0411\u041A-1&quot; - \u0432\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043C\u0442\u0435\u0430\u043B\u043E\u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u0439 \u043D\u0430 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0432 \u041A\u0438\u0454\u0432\u0456<br> \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0441\u0430\u0439\u0442\u0430 - Personal Solutions Ltd. </div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CzWN_Gxq.mjs.map
