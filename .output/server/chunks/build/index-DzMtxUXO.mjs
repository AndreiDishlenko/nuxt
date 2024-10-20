import { useSSRContext, defineComponent, useAttrs, ref, computed, mergeProps, unref, resolveComponent, withCtx, createVNode, openBlock, createBlock, Fragment, renderList } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { u as useHead } from './index-pdc_nDWr.mjs';
import { m as defu } from '../runtime.mjs';
import { l as useLocaleHead, i as encodeParam, b as useNuxtApp, _ as _export_sfc, h as hasProtocol, f as withLeadingSlash, j as joinURL, g as parseURL, c as useRuntimeConfig, k as encodePath } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import __nuxt_component_1 from './index-CYN3rzpR.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import '@unhead/shared';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
import 'ipx';
import 'unhead';
import 'vue-router';
import '@iconify/vue';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import '@iconify/utils/lib/css/icon';

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
const _sfc_main$a = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = {
  props: {
    content: {
      type: Object,
      required: false,
      default: {}
    }
  },
  data: function() {
    return {
      isMenuVisible: false
    };
  },
  mounted: function() {
    (void 0).addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  unmounted: function() {
    (void 0).removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll: function() {
      this.isMenuVisible = (void 0).scrollY > 200;
    }
  }
};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Icon = __nuxt_component_1;
  const _component_NuxtImg = _sfc_main$a;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["popup-menu", "apple-shadow", _ctx.isMenuVisible ? "" : "collapsed"]
  }, _attrs))}><div class="top-line"><div class="d-flex justify-content-between container"><div class="flex-grow-1 bold-1">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ri:telegram-2-line",
    size: "1em",
    class: "me-1"
  }, null, _parent));
  _push(`\u041A\u0438\u0457\u0432 </div><div class="flex-grow-2 d-none d-lg-block text-center f-2">\u0411\u0456\u043B\u044C\u0448 \u043D\u0456\u0436 5 \u0440\u043E\u043A\u0456\u0432 \u043C\u0438 \u0432\u0438\u0440\u043E\u0431\u043B\u044F\u0454\u043C\u043E \u0442\u0456 \u0441\u0430\u043C\u0456 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u0457 \u0437 \u043C\u0435\u0442\u0430\u043B\u0443, \u044F\u043A\u0456 \u0432\u0441\u0456\u043C \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u0456</div><div class="flex-grow-1 bold-1 text-end flex-grow-1">+38(067) 777-77-77</div></div></div><div class="menu-line f-3"><div class="h-100 d-flex justify-content-between align-items-center container"><div class="w-25 d-none d-lg-block">`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    src: "/img/logo_sm1_lightmode.png",
    alt: "Steel Master \u043B\u043E\u0433\u043E\u0442\u0438\u043F"
  }, null, _parent));
  _push(`</div><div class="w-50 d-flex flex-grow-1 justify-content-between text-uppercase bold-1 text-black"><!--[-->`);
  ssrRenderList($props.content, (item) => {
    _push(`<a${ssrRenderAttr("href", item.href)}>${ssrInterpolate(_ctx.$t(item.text))}</a>`);
  });
  _push(`<!--]--></div><div class="w-25 d-none d-md-block text-end"><button class="text-uppercase f-4 bold-3">\u0417\u0430\u043B\u0438\u0448\u0438\u0442\u0438 \u0437\u0430\u044F\u0432\u043A\u0443</button></div></div></div></div>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/popupmenu.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const PopupMenu = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$8 = {
  props: {
    content: {
      type: Object,
      required: false,
      default: {}
      // validator(value) {
      // 	return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
      // }
    }
  },
  data: function() {
    return {
      isOpened: false,
      isMenuClick: false
    };
  },
  mounted: function() {
    (void 0).addEventListener("click", this.handleClickOutside, true);
  },
  onBeforeUnmount: function() {
    (void 0).removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside: function(event) {
      if (!this.$refs.menu.contains(event.target))
        this.close();
    },
    switch: function() {
      this.isOpened = !this.isOpened;
    },
    close: function() {
      this.isOpened = false;
    }
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Icon = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    ref: "menu",
    class: [
      "side-menu",
      "p-5",
      _ctx.isOpened ? "isOpened" : ""
    ]
  }, _attrs))}><div class="close-button">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "material-symbols-light:close-small",
    onClick: ($event) => this.close()
  }, null, _parent));
  _push(`</div><div class="menu-container v-flex text-white"><!--[-->`);
  ssrRenderList($props.content, (item) => {
    _push(`<div class="p-3"><a class="dark"${ssrRenderAttr("href", item.href)}>${ssrInterpolate(_ctx.$t(item.text))}</a></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sidemenu.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const SideMenu = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$7 = {
  data: function() {
    return {
      locales: this.$i18n.locales,
      locale: this.$i18n.locale
    };
  },
  async mounted() {
    let result = localStorage.getItem("locale");
    if (!result || !Object.values(this.locales).map((item) => item.code).includes(result))
      ;
    this.$i18n.setLocale(result);
  },
  methods: {
    getDefaultLanguage: function() {
      let result = localStorage.getItem("locale");
      if (!result || !this.locales.includes(result))
        result = "uk";
      this.locale = result;
    },
    setLang: function(selected_locale) {
      if (!selected_locale || !Object.values(this.locales).map((item) => item.code).includes(selected_locale))
        return;
      localStorage.setItem("locale", selected_locale);
      this.$i18n.setLocale(selected_locale);
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Icon = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "lang-selector dropdown" }, _attrs))}><button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`);
  if (_ctx.locale == "uk") {
    _push(ssrRenderComponent(_component_Icon, { name: "emojione:flag-for-ukraine" }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if (_ctx.locale == "ru") {
    _push(ssrRenderComponent(_component_Icon, { name: "emojione:flag-for-russia" }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</button><div class="dropdown-menu text-2"><!--[-->`);
  ssrRenderList(_ctx.locales, (item) => {
    _push(`<div class="d-flex align-items-center dropdown-item">`);
    _push(ssrRenderComponent(_component_Icon, {
      name: item.icon,
      class: "me-2"
    }, null, _parent));
    _push(`<span class="flex-grow-1">${ssrInterpolate(item.name)}</span></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/langselector.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const LangSelector = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$6 = {
  components: {
    LangSelector
  },
  props: {
    header: {
      type: Object,
      required: false,
      default: {}
    }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtImg = _sfc_main$a;
  const _component_Icon = __nuxt_component_1;
  const _component_LangSelector = resolveComponent("LangSelector");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-block container py-5" }, _attrs))}><div class="header p-0"><div class="d-flex w-75"><div class="logo">`);
  _push(ssrRenderComponent(_component_NuxtImg, {
    src: "/img/logo_sm1_darkmode.png",
    alt: "Steel Master \u043B\u043E\u0433\u043E\u0442\u0438\u043F"
  }, null, _parent));
  _push(`</div><div class="items d-none d-lg-flex justify-content-around w-100"><!--[-->`);
  ssrRenderList($props.header, (item) => {
    _push(`<a${ssrRenderAttr("href", item.href)} class="f-2">${ssrInterpolate(_ctx.$t(item.text))}</a>`);
  });
  _push(`<!--]--></div></div><div class="location d-flex align-items-center justify-content-end text-end flex-grow-1">`);
  _push(ssrRenderComponent(_component_Icon, {
    name: "ri:telegram-2-line",
    size: "1rem",
    class: "pe-4",
    style: { "color": "yellow" }
  }, null, _parent));
  _push(`<div class="ps-2 me-3 bold-1">\u041A\u0438\u0457\u0432</div>`);
  _push(ssrRenderComponent(_component_LangSelector, { class: "pe-3" }, null, _parent));
  _push(ssrRenderComponent(_component_Icon, {
    name: "stash:burger-classic",
    class: "burger-button d-lg-none",
    onClick: ($event) => _ctx.$refs.sidemenu.switch()
  }, null, _parent));
  _push(`</div></div><div class="v-flex d-sm-flex benefits f1 w-100 w-lg-75 w-xl-50"><div class="thin-1">\u0412\u0456\u0434 2 \u0442\u0438\u0436\u0434\u043D\u0456\u0432<div class="separator mt-2"></div></div><div class="thin-1">\u0412\u0456\u0434 5000 \u0433\u0440\u043D<div class="separator mt-2"></div></div><div class="thin-1">\u0413\u0430\u0440\u0430\u043D\u0442\u0456\u044F \u0432\u0456\u0434 5 \u0440\u043E\u043A\u0456\u0432<div class="separator mt-2"></div></div><div class="thin-1">\u041F\u043E \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0443<div class="separator mt-2"></div></div></div><div class="slogan"><div class=""><h1>\u0412\u0418\u0413\u041E\u0422\u041E\u0412\u0418\u041C \u0411\u0423\u0414\u042C-\u042F\u041A\u0423 \u041A\u041E\u041D\u0421\u0422\u0420\u0423\u041A\u0426\u0406\u042E \u0417 \u041C\u0415\u0422\u0410\u041B\u0423</h1></div><div class="f1">\u0414\u043B\u044F \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0438\u0445 \u0431\u0443\u0434\u0438\u043D\u043A\u0456\u0432, \u043A\u043E\u0442\u0435\u0434\u0436\u043D\u0438\u0445 \u043C\u0456\u0441\u0442\u0435\u0447\u043E\u043A, \u043A\u043E\u043C\u0435\u0440\u0446\u0456\u0439\u043D\u0438\u0445 \u043F\u0456\u0434\u043F\u0440\u0438\u0454\u043C\u0441\u0442\u0432</div></div><button class="action-button big-button mb-4 bold-2">\u041E\u0422\u0420\u0418\u041C\u0410\u0422\u0418 \u0411\u0415\u0417\u041A\u041E\u0428\u0422\u041E\u0412\u041D\u0423 \u041A\u041E\u041D\u0421\u0423\u041B\u042C\u0422\u0410\u0426\u0406\u042E</button></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("blocks/main.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const MainBlock = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$5]]);
const _imports_0 = publicAssetsURL("/img/ourworks/sample_1.png");
const _imports_1 = publicAssetsURL("/img/ourworks/sample_2.png");
const _imports_2 = publicAssetsURL("/img/ourworks/sample_3.png");
const _imports_3 = publicAssetsURL("/img/ourworks/sample_4.png");
const _imports_4 = publicAssetsURL("/img/ourworks/sample_5.jpg");
const _sfc_main$5 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "collage v-flex" }, _attrs))}><div class="divider"></div><div class="photos collage-container w-100"><div class="text-2xl flex flex-col gap-y-4 items-center justify-center h-full w-100 pb-8"><p class="text-gray-400"> \u041C\u0438 \u043F\u0438\u0448\u0430\u0454\u043C\u043E\u0441\u044F \u043A\u043E\u0436\u043D\u0438\u043C \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u0438\u043C \u043F\u0440\u043E\u0454\u043A\u0442\u043E\u043C \u0456 \u0437\u0430\u0432\u0436\u0434\u0438 \u043E\u0440\u0456\u0454\u043D\u0442\u0443\u0454\u043C\u043E\u0441\u044C \u043D\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442, \u044F\u043A\u0438\u0439 \u043F\u0435\u0440\u0435\u0432\u0435\u0440\u0448\u0443\u0454 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F \u043D\u0430\u0448\u0438\u0445 \u043A\u043B\u0456\u0454\u043D\u0442\u0456\u0432. <br><br> \u041A\u043E\u0436\u043D\u0430 \u0434\u0435\u0442\u0430\u043B\u044C, \u043A\u043E\u0436\u043D\u0438\u0439 \u0430\u0441\u043F\u0435\u043A\u0442 \u0440\u043E\u0431\u043E\u0442\u0438 \u2013 \u0446\u0435 \u0441\u0432\u0456\u0434\u0447\u0435\u043D\u043D\u044F \u043D\u0430\u0448\u043E\u0433\u043E \u043F\u0440\u0430\u0433\u043D\u0435\u043D\u043D\u044F \u0434\u043E \u0434\u043E\u0441\u043A\u043E\u043D\u0430\u043B\u043E\u0441\u0442\u0456. </p></div><ul class="grid grid-cols-1 gap-3 lg:block"><li class="position-relative group collage-item"><img width="527" height="430"${ssrRenderAttr("src", _imports_0)} class="h-auto max-h-[430px] rounded-md transition-all duration-200 border-image brightness-80 hover:brightness-100 will-change-[filter] object-cover"></li><li class="position-relative group collage-item"><img width="527" height="430"${ssrRenderAttr("src", _imports_1)} class="h-auto max-h-[430px] rounded-md transition-all duration-200 border-image brightness-80 hover:brightness-100 will-change-[filter] object-cover"></li><li class="position-relative group collage-item"><img width="527" height="430"${ssrRenderAttr("src", _imports_2)} class="h-auto max-h-[430px] rounded-md transition-all duration-200 border-image brightness-80 hover:brightness-100 will-change-[filter] object-cover"></li><li class="position-relative group collage-item"><img width="527" height="430"${ssrRenderAttr("src", _imports_3)} class="h-auto max-h-[430px] rounded-md transition-all duration-200 border-image brightness-80 hover:brightness-100 will-change-[filter] object-cover"></li><li class="position-relative group collage-item"><img width="527" height="430"${ssrRenderAttr("src", _imports_4)} class="h-auto max-h-[430px] rounded-md transition-all duration-200 border-image brightness-80 hover:brightness-100 will-change-[filter] object-cover"></li></ul></div><div class="divider"></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/collage.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Collage = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$4 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="v-flex d-md-flex mb-4"><div class="v-flex w-100 w-md-50 pe-md-4 pe-lg-5 pb-4"><div class="background-image p-3" style="${ssrRenderStyle({ "background-image": "url('/img/technologies/technology_1.png')" })}"><h3>\u0417\u0432\u0430\u0440\u044E\u0432\u0430\u043B\u044C\u043D\u0456 \u0440\u043E\u0431\u043E\u0442\u0438</h3></div><div class="p-3"><b>\u0411\u0443\u0434\u044C-\u044F\u043A\u0456 \u0432\u0438\u0434\u0438 \u0437\u0432\u0430\u0440\u044E\u0432\u0430\u043D\u043D\u044F</b><br> \u0432\u0456\u0434 \u0434\u0440\u0456\u0431\u043D\u0438\u0445 \u0440\u0435\u043C\u043E\u043D\u0442\u043D\u0438\u0445 \u0437\u0430\u0432\u0434\u0430\u043D\u044C \u0434\u043E \u0432\u0435\u043B\u0438\u043A\u0438\u0445 \u0431\u0443\u0434\u0456\u0432\u0435\u043B\u044C\u043D\u0438\u0445 \u043E\u0431&#39;\u0454\u043A\u0442\u0456\u0432.<br><b>\u0421\u0443\u0447\u0430\u0441\u043D\u0435 \u043E\u0431\u043B\u0430\u0434\u043D\u0430\u043D\u043D\u044F</b><br> \u0442\u043E\u0447\u043D\u0456\u0441\u0442\u044C \u0456 \u0431\u0435\u0437\u043F\u0435\u043A\u0430 \u043D\u0430 \u043A\u043E\u0436\u043D\u043E\u043C\u0443 \u0435\u0442\u0430\u043F\u0456.<br><b>\u0414\u043E\u0441\u0432\u0456\u0434\u0447\u0435\u043D\u0456 \u043C\u0430\u0439\u0441\u0442\u0440\u0438</b><br> \u043F\u043E\u043D\u0430\u0434 10 \u0440\u043E\u043A\u0456\u0432 \u0434\u043E\u0441\u0432\u0456\u0434\u0443 \u0440\u043E\u0431\u043E\u0442\u0438 \u0437 \u0440\u0456\u0437\u043D\u0438\u043C\u0438 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0430\u043C\u0438.<br></div></div><div class="v-flex w-100 w-md-50 ps-md-4 pe-lg-5 pb-4"><div class="background-image p-3" style="${ssrRenderStyle({ "background-image": "url('/img/technologies/technology_2.png')" })}"><h3>\u041F\u043E\u0440\u043E\u0448\u043A\u043E\u0432\u0435 \u0444\u0430\u0440\u0431\u0443\u0432\u0430\u043D\u043D\u044F</h3></div><div class="p-3"><b>\u0406\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0440\u0456\u0432\u043D\u0435 \u043F\u043E\u043A\u0440\u0438\u0442\u0442\u044F</b><br> \u0431\u0435\u0437 \u043F\u0456\u0434\u0442\u0435\u043A\u0430\u043D\u044C \u0442\u0430 \u0434\u0435\u0444\u0435\u043A\u0442\u0456\u0432.<br><b>\u0417\u0430\u0445\u0438\u0441\u0442 \u0432\u0456\u0434 \u043A\u043E\u0440\u043E\u0437\u0456\u0457</b><br> \u0432\u0430\u0448 \u043C\u0435\u0442\u0430\u043B \u0441\u043B\u0443\u0436\u0438\u0442\u0438\u043C\u0435 \u0434\u043E\u0432\u0433\u0456 \u0440\u043E\u043A\u0438.<br><b>\u042F\u0441\u043A\u0440\u0430\u0432\u0456 \u0442\u0430 \u0441\u0442\u0456\u0439\u043A\u0456 \u043A\u043E\u043B\u044C\u043E\u0440\u0438</b><br> \u0432\u0438\u0431\u0456\u0440 \u0432\u0456\u0434\u0442\u0456\u043D\u043A\u0456\u0432 \u0434\u043B\u044F \u0431\u0443\u0434\u044C-\u044F\u043A\u043E\u0433\u043E \u0441\u0442\u0438\u043B\u044E.<br><b>\u0412\u0438\u0441\u043E\u043A\u0430 \u0441\u0442\u0456\u0439\u043A\u0456\u0441\u0442\u044C</b><br> \u0434\u043E \u0443\u0434\u0430\u0440\u0456\u0432, \u043F\u043E\u0434\u0440\u044F\u043F\u0438\u043D \u0456 \u0445\u0456\u043C\u0456\u0447\u043D\u0438\u0445 \u0432\u043F\u043B\u0438\u0432\u0456\u0432.<br></div></div></div><div class="v-flex d-md-flex mb-4"><div class="v-flex w-100 w-md-50 pe-md-4 pb-4"><div class="background-image p-3" style="${ssrRenderStyle({ "background-image": "url('/img/technologies/technology_3.png')" })}"><h3>\u0413\u0430\u0440\u044F\u0447\u0435 \u0446\u0438\u043D\u043A\u0443\u0432\u0430\u043D\u043D\u044F</h3></div><div class="p-3"><b>\u0414\u043E\u0432\u0433\u043E\u0432\u0456\u0447\u043D\u0438\u0439 \u0437\u0430\u0445\u0438\u0441\u0442 \u0432\u0456\u0434 \u043A\u043E\u0440\u043E\u0437\u0456\u0457</b><br> \u0442\u0435\u0440\u043C\u0456\u043D \u0441\u043B\u0443\u0436\u0431\u0438 \u043E\u0446\u0438\u043D\u043A\u043E\u0432\u0430\u043D\u043E\u0433\u043E \u043C\u0435\u0442\u0430\u043B\u0443 \u0434\u043E 50 \u0440\u043E\u043A\u0456\u0432.<br><b>\u041D\u0430\u0434\u0456\u0439\u043D\u0456\u0441\u0442\u044C \u0443 \u0431\u0443\u0434\u044C-\u044F\u043A\u0438\u0445 \u0443\u043C\u043E\u0432\u0430\u0445</b><br> \u0441\u0442\u0456\u0439\u043A\u0456\u0441\u0442\u044C \u0434\u043E \u0432\u043E\u043B\u043E\u0433\u0438, \u0445\u0456\u043C\u0456\u0447\u043D\u0438\u0445 \u0432\u043F\u043B\u0438\u0432\u0456\u0432 \u0456 \u043F\u0435\u0440\u0435\u043F\u0430\u0434\u0456\u0432 \u0442\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440. <br><b>\u0415\u043A\u043E\u043D\u043E\u043C\u0456\u044F \u043D\u0430 \u0440\u0435\u043C\u043E\u043D\u0442\u0430\u0445</b><br> \u0446\u0438\u043D\u043A\u043E\u0432\u0435 \u043F\u043E\u043A\u0440\u0438\u0442\u0442\u044F \u0437\u043D\u0438\u0436\u0443\u0454 \u0432\u0438\u0442\u0440\u0430\u0442\u0438 \u043D\u0430 \u043E\u0431\u0441\u043B\u0443\u0433\u043E\u0432\u0443\u0432\u0430\u043D\u043D\u044F.<br></div></div><div class="v-flex w-100 w-md-50 ps-md-4 pb-4"><div class="background-image p-3" style="${ssrRenderStyle({ "background-image": "url('/img/technologies/technology_4.png')" })}"><h3>\u0417\u0433\u0438\u043D\u0430\u043D\u043D\u044F \u043C\u0435\u0442\u0430\u043B\u0443</h3></div><div class="p-3"><b>\u0412\u0438\u0441\u043E\u043A\u0430 \u0442\u043E\u0447\u043D\u0456\u0441\u0442\u044C</b><br> \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u0430 \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0456\u044F \u043D\u0430\u0432\u0456\u0442\u044C \u0434\u043B\u044F \u043D\u0430\u0439\u0441\u043A\u043B\u0430\u0434\u043D\u0456\u0448\u0438\u0445 \u0434\u0435\u0442\u0430\u043B\u0435\u0439.<br><b>\u0411\u0443\u0434\u044C-\u044F\u043A\u0456 \u0432\u0438\u0434\u0438 \u043C\u0435\u0442\u0430\u043B\u0443</b><br> \u043F\u0440\u0430\u0446\u044E\u0454\u043C\u043E \u0437 \u043D\u0435\u0440\u0436\u0430\u0432\u0456\u0439\u043A\u043E\u044E, \u0430\u043B\u044E\u043C\u0456\u043D\u0456\u0454\u043C, \u0441\u0442\u0430\u043B\u043B\u044E \u0442\u0430 \u0456\u043D\u0448\u0438\u043C\u0438 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0430\u043C\u0438.<br><b>\u0421\u0443\u0447\u0430\u0441\u043D\u0435 \u043E\u0431\u043B\u0430\u0434\u043D\u0430\u043D\u043D\u044F</b><br> \u0432\u0438\u0441\u043E\u043A\u043E\u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0456\u0447\u043D\u0456 \u0432\u0435\u0440\u0441\u0442\u0430\u0442\u0438 \u0434\u043B\u044F \u0448\u0432\u0438\u0434\u043A\u043E\u0433\u043E \u0442\u0430 \u044F\u043A\u0456\u0441\u043D\u043E\u0433\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443.<br></div></div></div><div class="text-center"><button class="action-button">\u041E\u0431\u0440\u0430\u0442\u0438 \u043F\u043E\u0441\u043B\u0443\u0433\u0443</button></div><!--]-->`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("blocks/main_technologies.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Technologies = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$3 = {
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Navigation]
    };
  },
  data: function() {
    return {
      slides: [
        "/img/clients/f_kvartal.png",
        "/img/clients/slavutich.png",
        "/img/clients/slavutich2.png",
        "/img/clients/start.png",
        "/img/clients/zarechniy.png"
      ],
      isMenuVisible: false
    };
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_swiper = resolveComponent("swiper");
  const _component_SwiperSlide = resolveComponent("SwiperSlide");
  const _component_NuxtImg = _sfc_main$a;
  _push(ssrRenderComponent(_component_swiper, mergeProps({
    navigation: true,
    modules: $setup.modules,
    class: "px-4",
    loop: true,
    slidesPerView: 3,
    height: 300
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<!--[-->`);
        ssrRenderList(_ctx.slides, (slide) => {
          _push2(ssrRenderComponent(_component_SwiperSlide, null, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_NuxtImg, { src: slide }, null, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(_component_NuxtImg, { src: slide }, null, 8, ["src"])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
        });
        _push2(`<!--]-->`);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.slides, (slide) => {
            return openBlock(), createBlock(_component_SwiperSlide, null, {
              default: withCtx(() => [
                createVNode(_component_NuxtImg, { src: slide }, null, 8, ["src"])
              ]),
              _: 2
            }, 1024);
          }), 256))
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/carousel.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="workorder mb-5"><div class="workorder-item pb-4 ps-8"> 1 \u0435\u0442\u0430\u043F <h3>\u0417\u0410\u042F\u0412\u041A\u0410</h3> \u0412\u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u0437\u0430\u043B\u0438\u0448\u0438\u0442\u0438 \u0437\u0430\u044F\u0432\u043A\u0443 \u0447\u0435\u0440\u0435\u0437 \u0441\u0430\u0439\u0442, \u0430\u0431\u043E \u0437\u0430\u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443\u0432\u0430\u0442\u0438 \u0437\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u043E\u043C, \u0432\u043A\u0430\u0437\u0430\u043D\u0438\u043C \u0443 \u0440\u043E\u0437\u0434\u0456\u043B\u0456 \xAB\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438\xBB. </div><div class="workorder-item pb-4 ps-8"> 2 \u0435\u0442\u0430\u043F <h3>\u041F\u041E\u041F\u0415\u0420\u0415\u0414\u041D\u0406\u0419 \u0420\u041E\u0417\u0420\u0410\u0425\u0423\u041D\u041E\u041A</h3> \u041D\u0430\u0448\u0456 \u0435\u043A\u0441\u043F\u0435\u0440\u0442\u0438 \u043F\u0440\u043E\u0432\u0435\u0434\u0443\u0442\u044C \u0430\u043D\u0430\u043B\u0456\u0437 \u043F\u043E\u0434\u0430\u043D\u043E\u0457 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u0457 \u0442\u0430 \u043D\u0430\u0434\u0430\u0434\u0443\u0442\u044C \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044E \u043E\u0446\u0456\u043D\u043A\u0443 \u0432\u0430\u0440\u0442\u043E\u0441\u0442\u0456 \u0442\u0430 \u0442\u0435\u0440\u043C\u0456\u043D\u0456\u0432 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0440\u043E\u0431\u0456\u0442. \u0417\u0432\u0435\u0440\u0442\u0430\u0439\u0442\u0435\u0441\u044C \u0434\u043E \u043D\u0430\u0441 \u0434\u043B\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u043E\u0433\u043E \u0439 \u0448\u0432\u0438\u0434\u043A\u043E\u0433\u043E \u0440\u043E\u0437\u0440\u0430\u0445\u0443\u043D\u043A\u0443. </div><div class="workorder-item pb-4 ps-8"> 3 \u0435\u0442\u0430\u043F <h3>\u0417\u0410\u041C\u0406\u0420\u0418</h3> \u041C\u0438 \u043F\u0440\u043E\u0432\u0435\u0434\u0435\u043C\u043E \u0432\u0441\u0456 \u043D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u0456 \u0432\u0438\u043C\u0456\u0440\u044E\u0432\u0430\u043D\u043D\u044F \u043D\u0430 \u043C\u0456\u0441\u0446\u0456 \u0442\u0430 \u043D\u0430\u0434\u0430\u043C\u043E \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u0438\u0439 \u0437\u0432\u0456\u0442. \u0417\u0432\u0435\u0440\u043D\u0456\u0442\u044C\u0441\u044F \u0434\u043E \u043D\u0430\u0441 \u0434\u043B\u044F \u0442\u043E\u0447\u043D\u0438\u0445 \u0456 \u043D\u0430\u0434\u0456\u0439\u043D\u0438\u0445 \u0437\u0430\u043C\u0456\u0440\u0456\u0432, \u044F\u043A\u0456 \u0441\u0442\u0430\u043D\u0443\u0442\u044C \u043E\u0441\u043D\u043E\u0432\u043E\u044E \u0432\u0430\u0448\u043E\u0433\u043E \u0443\u0441\u043F\u0456\u0448\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0454\u043A\u0442\u0443. </div><div class="workorder-item pb-4 ps-8"> 4 \u0435\u0442\u0430\u043F <h3>\u041F\u0420\u041E\u0415\u041A\u0422\u0423\u0412\u0410\u041D\u041D\u042F</h3> \u0417\u0430 \u043D\u0435\u043E\u0431\u0445\u044B\u0434\u043D\u0456\u0441\u0442\u044C \u0432\u0438\u043A\u043E\u043D\u0430\u0454\u043C\u043E \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0434\u043B\u044F \u0431\u0456\u043B\u044C\u0448 \u0441\u043A\u043B\u0430\u0434\u043D\u0438\u0445 \u043C\u0435\u0442\u0430\u043B\u043E\u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u0439. \u041D\u0430\u0448\u0456 \u0444\u0430\u0445\u0456\u0432\u0446\u0456 \u043F\u0440\u0430\u0446\u044E\u044E\u0442\u044C \u043D\u0430\u0434 \u043A\u043E\u0436\u043D\u0438\u043C \u043F\u0440\u043E\u0454\u043A\u0442\u043E\u043C \u0437 \u0443\u0432\u0430\u0436\u043D\u0456\u0441\u0442\u044E \u0434\u043E \u0434\u0435\u0442\u0430\u043B\u0435\u0439 \u0456 \u0432\u0440\u0430\u0445\u0443\u0432\u0430\u043D\u043D\u044F\u043C \u0432\u0441\u0456\u0445 \u0432\u0430\u0448\u0438\u0445 \u043F\u043E\u0431\u0430\u0436\u0430\u043D\u044C. \u0417\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u0454\u043C\u043E \u044F\u043A\u0456\u0441\u043D\u0456 \u0456\u043D\u0436\u0435\u043D\u0435\u0440\u043D\u0456 \u0440\u0456\u0448\u0435\u043D\u043D\u044F, \u0449\u043E \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u044E\u0442\u044C \u0441\u0443\u0447\u0430\u0441\u043D\u0438\u043C \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0430\u043C. </div><div class="workorder-item pb-4 ps-8"> 5 \u0435\u0442\u0430\u043F <h3>\u041F\u041E\u0413\u041E\u0414\u0416\u0415\u041D\u041D\u042F</h3> \u041C\u0438 \u043F\u043B\u0456\u0434\u043D\u043E \u0441\u043F\u0456\u0432\u043F\u0440\u0430\u0446\u044E\u0454\u043C\u043E \u0437 \u0437\u0430\u043C\u043E\u0432\u043D\u0438\u043A\u043E\u043C \u0434\u043B\u044F \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0435\u043D\u043D\u044F \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u043D\u043E\u0441\u0442\u0456 \u0432\u0441\u0456\u0445 \u0434\u0435\u0442\u0430\u043B\u0435\u0439 \u043F\u0440\u043E\u0454\u043A\u0442\u0443 \u0432\u0430\u0448\u0438\u043C \u0432\u0438\u043C\u043E\u0433\u0430\u043C. \u041F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u044C\u0441\u044F \u0440\u0435\u0442\u0435\u043B\u044C\u043D\u0438\u0439 \u0430\u043D\u0430\u043B\u0456\u0437 \u0456 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u0430 \u043A\u043E\u0436\u043D\u043E\u0433\u043E \u0435\u0442\u0430\u043F\u0443, \u043E\u0431\u0433\u043E\u0432\u043E\u0440\u044E\u044E\u0442\u044C\u0441\u044F \u043C\u043E\u0436\u043B\u0438\u0432\u0456 \u043A\u043E\u0440\u0435\u043A\u0442\u0438\u0432\u0438 \u0442\u0430 \u043F\u0440\u043E\u043F\u043E\u0437\u0438\u0446\u0456\u0457 \u0434\u043B\u044F \u043E\u043F\u0442\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0443. \u0422\u0456\u043B\u044C\u043A\u0438 \u043F\u0456\u0441\u043B\u044F \u0432\u0430\u0448\u043E\u0433\u043E \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F \u043C\u0438 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u043C\u043E \u0434\u043E \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u0438\u0445 \u0435\u0442\u0430\u043F\u0456\u0432 \u0440\u0435\u0430\u043B\u0456\u0437\u0430\u0446\u0456\u0457, \u0433\u0430\u0440\u0430\u043D\u0442\u0443\u0432\u0430\u0432\u0448\u0438 \u043F\u043E\u0432\u043D\u0443 \u043F\u0440\u043E\u0437\u043E\u0440\u0456\u0441\u0442\u044C \u0442\u0430 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u043D\u0456\u0441\u0442\u044C \u0432\u0441\u0456\u0445 \u0440\u043E\u0431\u0456\u0442 \u0432\u0430\u0448\u0438\u043C \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F\u043C. </div><div class="workorder-item pb-4 ps-8"> 6 \u0435\u0442\u0430\u043F <h3>\u0412\u0418\u041A\u041E\u041D\u0410\u041D\u041D\u042F</h3> \u041D\u0430 \u0435\u0442\u0430\u043F\u0456 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u0440\u043E\u0431\u0456\u0442 \u043D\u0430\u0448\u0456 \u043C\u0430\u0439\u0441\u0442\u0440\u0438 \u0440\u0435\u0430\u043B\u0456\u0437\u0443\u044E\u0442\u044C \u0443\u0437\u0433\u043E\u0434\u0436\u0435\u043D\u0438\u0439 \u043F\u0440\u043E\u0435\u043A\u0442 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u043D\u043E \u0434\u043E \u0437\u0430\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043E\u0433\u043E \u043F\u043B\u0430\u043D\u0443. \u0423\u0441\u0456 \u0440\u043E\u0431\u043E\u0442\u0438 \u0432\u0438\u043A\u043E\u043D\u0443\u044E\u0442\u044C\u0441\u044F \u0437 \u0434\u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F\u043C \u0432\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0445 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0456\u0432 \u044F\u043A\u043E\u0441\u0442\u0456 \u0442\u0430 \u0431\u0435\u0437\u043F\u0435\u043A\u0438. \u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0438\u0439 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C \u0442\u0430 \u043A\u043E\u0440\u0435\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0456\u0432 \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u044E\u0442\u044C \u043D\u0430\u0439\u043A\u0440\u0430\u0449\u0438\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442. \u041C\u0438 \u0456\u043D\u0444\u043E\u0440\u043C\u0443\u0454\u043C\u043E \u0432\u0430\u0441 \u043F\u0440\u043E \u0445\u0456\u0434 \u0440\u043E\u0431\u0456\u0442 \u043D\u0430 \u043A\u043E\u0436\u043D\u043E\u043C\u0443 \u0435\u0442\u0430\u043F\u0456, \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u044E\u0447\u0438 \u043F\u043E\u0432\u043D\u0443 \u043F\u0440\u043E\u0437\u043E\u0440\u0456\u0441\u0442\u044C \u0442\u0430 \u0441\u0432\u043E\u0454\u0447\u0430\u0441\u043D\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044F \u0432\u0430\u0448\u043E\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0443. </div></div><div class="text-center"><button class="action-button bold-2">\u0420\u043E\u0437\u0440\u0430\u0445\u0443\u0432\u0430\u0442\u0438</button></div><!--]-->`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("blocks/main_workorder.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const WorkOrderBlock = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "squeeze w-75 d-flex bg-light" }, _attrs))}><div class="w-50 leftpart"></div><div class="w-50 rightpart v-flex justify-content-between p-5"><h3 class="mb-4">\u0423\u0422\u041E\u0427\u041D\u0418\u041C\u041E \u0414\u0415\u0422\u0410\u041B\u0406 \u041F\u0420\u041E\u0404\u041A\u0422\u0423?</h3><p class="h-100">\u0414\u0430\u0439\u0442\u0435 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u044C \u043D\u0430 \u043A\u0456\u043B\u044C\u043A\u0430 \u0437\u0430\u043F\u0438\u0442\u0430\u043D\u044C, \u0456 \u043E\u0442\u0440\u0438\u043C\u0430\u0439\u0442\u0435 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0456\u044E \u0442\u0430 \u0440\u043E\u0437\u0440\u0430\u0445\u0443\u043D\u043E\u043A \u0432\u0430\u0440\u0442\u043E\u0441\u0442\u0456 \u0442\u043E\u0433\u043E \u0436 \u0434\u043D\u044F.</p><div class=""><button class="w-50" style="${ssrRenderStyle({ "float": "right" })}">\u0414\u0430\u043B\u0456..</button></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("blocks/main_squeeze.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SqueezeBlock = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const __default__ = {
  components: {
    MainBlock,
    PopupMenu,
    SideMenu,
    Collage,
    Technologies,
    Carousel,
    WorkOrderBlock,
    SqueezeBlock
  },
  data: function() {
    return {
      mainMenu: [
        { text: "\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0457", href: "#about" },
        { text: "\u041F\u043E\u0441\u043B\u0443\u0433\u0438", href: "#services" },
        { text: "\u0412\u0438\u0440\u043E\u0431\u043D\u0438\u0446\u0442\u0432\u043E", href: "#product" },
        { text: "\u041F\u0440\u043E\u0435\u043A\u0442\u0443\u0432\u0430\u043D\u043D\u044F", href: "#project" }
      ],
      isMenuVisible: false
    };
  },
  mounted: function() {
    console.log("mounted");
  },
  unmounted: function() {
  },
  methods: {}
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const i18nHead = useLocaleHead({
      addSeoAttributes: {
        // canonicalQueries: ['foo']
      }
    });
    useHead({
      title: "Home",
      htmlAttrs: {
        lang: i18nHead.value.htmlAttrs.lang
      },
      link: [...i18nHead.value.link || []],
      meta: [...i18nHead.value.meta || []]
      //     meta: [
      //         { name: 'description', content: 'Это описание главной страницы моего сайта.' },
      //         { name: 'keywords', content: 'сайт, главная, nuxt 3' },
      //     ],
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$a;
      const _component_Icon = __nuxt_component_1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(PopupMenu, { content: _ctx.mainMenu }, null, _parent));
      _push(ssrRenderComponent(SideMenu, {
        ref: "sidemenu",
        content: _ctx.mainMenu
      }, null, _parent));
      _push(`<div class="wrapper"><div class="d-center vh-height bg-dark text-light">`);
      _push(ssrRenderComponent(MainBlock, { header: _ctx.mainMenu }, null, _parent));
      _push(`</div><div id="about" class="vh-height d-center v-center v-flex container p-5 my-5"><div class="d-flex mb-5"><div class="v-flex pe-3 w-100 w-md-50"><div class=""><h2>${ssrInterpolate(_ctx.$t("\u041E \u043A\u043E\u043C\u043F\u0430\u043D\u0456\u0457"))}</h2></div><div class=""><p>\u041A\u043E\u043C\u043F\u0430\u043D\u0456\u044F \u201C\u0422\u0411\u041A-1\u201D \u0431\u0443\u043B\u0430 \u0437\u0430\u0441\u043D\u043E\u0432\u0430\u043D\u0430 \u0432 2003 \u0440.</p><p>\u0412\u0438\u043A\u043E\u043D\u0443\u0454\u043C\u043E \u0440\u043E\u0431\u043E\u0442\u0438 \u0431\u0443\u0434\u044C-\u044F\u043A\u043E\u0457 \u0441\u043A\u043B\u0430\u0434\u043D\u043E\u0441\u0442\u0456, \u043F\u043E\u0432\u2019\u044F\u0437\u0430\u043D\u0456 \u0437 \u043C\u0435\u0442\u0430\u043B\u043E\u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u044F\u043C\u0438 \u0434\u043B\u044F \u043E\u0431\u2019\u0454\u043A\u0442\u0456\u0432 \u0436\u0438\u0442\u043B\u043E\u0432\u043E\u0433\u043E \u0431\u0443\u0434\u0456\u0432\u043D\u0438\u0446\u0442\u0432\u0430, \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u043E\u0433\u043E \u0441\u0435\u043A\u0442\u043E\u0440\u0443, \u043A\u043E\u0442\u0435\u0434\u0436\u043D\u0438\u0445 \u043C\u0456\u0441\u0442\u0435\u0447\u043E\u043A, \u0431\u0456\u0437\u043D\u0435\u0441\u0443 \u0442\u0430 \u0432\u0438\u0440\u043E\u0431\u043D\u0438\u0447\u0438\u0445 \u043F\u0456\u0434\u043F\u0440\u0438\u0454\u043C\u0441\u0442\u0432.</p><p>\u041F\u0440\u043E\u0435\u043A\u0442\u0443\u0454\u043C, \u0432\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u044F\u0454\u043C, \u043F\u0440\u0438\u0432\u043E\u0437\u0438\u043C, \u043C\u043E\u043D\u0442\u0443\u0454\u043C.</p><p>\u0421\u043F\u0456\u0432\u043F\u0440\u0430\u0446\u044E\u0454\u043C \u0437 \u0431\u0443\u0434\u0456\u0432\u0435\u043B\u044C\u043D\u0438\u043C\u0438 \u043A\u043E\u043F\u0430\u043D\u0456\u044F\u043C\u0438, \u043F\u0456\u0434\u0440\u044F\u0434\u043D\u0438\u043C\u0438 \u043E\u0440\u0433\u0430\u043D\u0456\u0437\u0430\u0446\u0456\u044F\u043C\u0438 \u0442\u0430 \u043A\u0456\u043D\u0446\u0435\u0432\u0438\u043C \u0441\u043F\u043E\u0436\u0438\u0432\u0430\u0447\u0435\u043C.</p></div><div class=""><button>${ssrInterpolate(_ctx.$t("\u0417\u0410\u041C\u041E\u0412\u0418\u0422\u0418 \u0414\u0417\u0412\u0406\u041D\u041E\u041A"))}</button></div></div><div class="ps-3 w-50 d-none d-md-block">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/mainpage_collage.png",
        alt: "About Steel Master Image",
        class: "w-100"
      }, null, _parent));
      _push(`</div></div><div class="v-flex py-5"><div class="d-block d-md-flex pb-5"><div class="w-md-50 pe-md-4"><h4>${ssrInterpolate(_ctx.$t("\u041C\u0410\u0422\u0415\u0420\u0406\u0410\u041B\u0418"))}</h4><p>\u0423 \u0440\u043E\u0431\u043E\u0442\u0456 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454\u043C\u043E \u0442\u0456\u043B\u044C\u043A\u0438 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043D\u0456 \u0456 \u044F\u043A\u0456\u0441\u043D\u0456 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438. \u041F\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043D\u0456 \u0440\u043E\u043A\u0430\u043C\u0438 \u043F\u043E\u0441\u0442\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A\u0438 \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u044E\u0442\u044C \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E \u0448\u0432\u0438\u0434\u043A\u0435 \u043F\u043E\u0441\u0442\u0430\u0447\u0430\u043D\u043D\u044F.</p></div><div class="w-md-50 ps-md-4"><h4>${ssrInterpolate(_ctx.$t("\u041F\u0420\u041E\u0426\u0415\u0421"))}</h4><p>\u041C\u0430\u0454\u043C\u043E \u0432\u043B\u0430\u0441\u043D\u0435 \u0432\u0438\u0440\u043E\u0431\u043D\u0438\u0446\u0442\u0432\u043E: \u0432\u0456\u0434 \u0440\u0456\u0437\u0430\u043D\u043D\u044F \u0456 \u0441\u043A\u043B\u0430\u0434\u0430\u043D\u043D\u044F, \u0434\u043E \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 \u0442\u0430 \u043C\u043E\u043D\u0442\u0430\u0436\u0443. \u041C\u0438 \u043F\u043E\u0432\u043D\u0456\u0441\u0442\u044E \u043A\u0435\u0440\u0443\u0454\u043C\u043E \u0432\u0441\u0456\u043C\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0430\u043C\u0438, \u0434\u0430\u0454\u043C\u043E \u0433\u0430\u0440\u0430\u043D\u0442\u0456\u044E \u0456 \u043E\u0441\u043E\u0431\u0438\u0441\u0442\u043E \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454\u043C\u043E \u0437\u0430 \u044F\u043A\u0456\u0441\u0442\u044C \u0441\u0432\u043E\u0457\u0445 \u0440\u043E\u0431\u0456\u0442.</p></div></div><div class="d-block d-md-flex"><div class="w-md-50 pe-md-4"><h4>${ssrInterpolate(_ctx.$t("23 \u0420\u041E\u041A\u0418 \u041D\u0410 \u0420\u0418\u041D\u041A\u0423"))}</h4><p>\u041C\u0438 \u0441\u0442\u0432\u043E\u0440\u044E\u0454\u043C\u043E \u043C\u0435\u0442\u0430\u043B\u043E\u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u0457 \u0437 2001 \u0440. \u0417\u0430 \u0446\u0435\u0439 \u0447\u0430\u0441 \u043C\u0438 \u043D\u0430\u043C\u0430\u0433\u0430\u043B\u0438\u0441\u044F \u0437\u0430\u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0432\u0430\u043B\u0438 \u0441\u0435\u0431\u0435 \u0442\u0456\u043B\u044C\u043A\u0438 \u0437 \u0445\u043E\u0440\u043E\u0448\u043E\u0433\u043E \u0431\u043E\u043A\u0443 \u0456 \u0437\u0430\u0432\u0436\u0434\u0438 \u0437\u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0438 \u043F\u0456\u0434\u0445\u0456\u0434 \u0434\u043E \u043A\u043B\u0456\u0454\u043D\u0442\u0430.</p></div><div class="w-md-50 ps-md-4"><h4>${ssrInterpolate(_ctx.$t("500+ \u041E\u0411'\u0404\u041A\u0422\u0406\u0412"))}</h4><p>\u041D\u0430\u0448\u0456 \u0432\u0438\u0440\u043E\u0431\u0438 \u0437 \u043C\u0435\u0442\u0430\u043B\u0443 \u0440\u0430\u0434\u0443\u044E\u0442\u044C \u043E\u043A\u043E \u043D\u0435 \u0442\u0456\u043B\u044C\u043A\u0438 \u0432 \u043F\u0440\u0438\u0432\u0430\u0442\u043D\u0438\u0445 \u0431\u0443\u0434\u0438\u043D\u043A\u0430\u0445, \u0430 \u0439 \u043D\u0430 \u043B\u0456\u0442\u043D\u0456\u0445 \u043C\u0430\u0439\u0434\u0430\u043D\u0447\u0438\u043A\u0438, \u043A\u043E\u043C\u0435\u0440\u0446\u0456\u0439\u043D\u0438\u0445 \u043F\u0456\u0434\u043F\u0440\u0438\u0454\u043C\u0441\u0442\u0432\u0430\u0445, \u0432\u0438\u0440\u043E\u0431\u043D\u0438\u0447\u0438\u0445 \u043F\u0440\u0438\u043C\u0456\u0449\u0435\u043D\u043D\u044F\u0445 \u0442\u0430 \u0431\u0430\u0433\u0430\u0442\u043E\u043A\u0432\u0430\u0440\u0442\u0438\u0440\u043D\u0438\u0445 \u0431\u0443\u0434\u0438\u043D\u043A\u0430\u0445.</p></div></div></div></div><div id="ourworks" class="v-flex container p-5 my-5"><h2 class="">${ssrInterpolate(_ctx.$t("\u041D\u0430\u0448\u0456 \u0440\u043E\u0431\u043E\u0442\u0438"))}</h2>`);
      _push(ssrRenderComponent(Collage, null, null, _parent));
      _push(`</div><div id="services" class="vh-height d-center v-center p-5 my-5"><div class="v-flex container"><div class="p-4"><h2>\u0429\u043E \u043C\u0438 \u0440\u043E\u0431\u0438\u043C\u043E?</h2></div><div class="v-flex"><div class="v-flex d-lg-flex"><div class="w-100 w-lg-50 p-4 d-flex"><div class="pe-4">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/services/facades.png",
        layout: "intrinsic"
      }, null, _parent));
      _push(`</div><div class=""><h3>\u0421\u043A\u043B\u044F\u043D\u0456, \u0432\u0435\u043D\u0442\u0438\u043B\u044C\u043E\u0432\u0430\u043D\u0456 \u0444\u0430\u0441\u0430\u0434\u0438</h3> \u0421\u0443\u0447\u0430\u0441\u043D\u0456 \u0444\u0430\u0441\u0430\u0434\u0438, \u0432\u0434\u043E\u0441\u043A\u043E\u043D\u0430\u043B\u044E\u044E\u0442\u044C \u0435\u0441\u0442\u0435\u0442\u0438\u0447\u043D\u0438\u0439 \u0432\u0438\u0433\u043B\u044F\u0434 \u0456 \u0444\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B\u044C\u043D\u0456\u0441\u0442\u044C \u0431\u0443\u0434\u044C-\u044F\u043A\u043E\u0457 \u0431\u0443\u0434\u0456\u0432\u043B\u0456. \u041D\u0430\u0448\u0456 \u0444\u0430\u0445\u0456\u0432\u0446\u0456 \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u044E\u0442\u044C \u0442\u043E\u0447\u043D\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0443\u0432\u0430\u043D\u043D\u044F, \u0432\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0442\u0430 \u043C\u043E\u043D\u0442\u0430\u0436 \u0444\u0430\u0441\u0430\u0434\u0456\u0432, \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u044E\u0447\u0438 \u0432\u0438\u0441\u043E\u043A\u043E\u044F\u043A\u0456\u0441\u043D\u0456 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438 \u0442\u0430 \u043F\u0435\u0440\u0435\u0434\u043E\u0432\u0456 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0456\u0457. \u0421\u043A\u043B\u044F\u043D\u0456 \u0444\u0430\u0441\u0430\u0434\u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0443\u044E\u0442\u044C \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0435 \u043F\u0440\u0438\u0440\u043E\u0434\u043D\u0435 \u043E\u0441\u0432\u0456\u0442\u043B\u0435\u043D\u043D\u044F \u0442\u0430 \u0441\u0442\u0432\u043E\u0440\u044E\u044E\u0442\u044C \u0437\u0430\u0442\u0438\u0448\u043D\u0435 \u0441\u0435\u0440\u0435\u0434\u043E\u0432\u0438\u0449\u0435 \u0432\u0441\u0435\u0440\u0435\u0434\u0438\u043D\u0456 \u043F\u0440\u0438\u043C\u0456\u0449\u0435\u043D\u044C, \u0430 \u0432\u0435\u043D\u0442\u0438\u043B\u044C\u043E\u0432\u0430\u043D\u0456 \u0444\u0430\u0441\u0430\u0434\u0438 \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u044E\u0442\u044C \u0435\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u0443 \u0442\u0435\u0440\u043C\u043E- \u0442\u0430 \u0437\u0432\u0443\u043A\u043E\u0456\u0437\u043E\u043B\u044F\u0446\u0456\u044E, \u0430 \u0442\u0430\u043A\u043E\u0436 \u0434\u043E\u0432\u0433\u043E\u0432\u0456\u0447\u043D\u0438\u0439 \u0437\u0430\u0445\u0438\u0441\u0442 \u0432\u0456\u0434 \u0437\u043E\u0432\u043D\u0456\u0448\u043D\u0456\u0445 \u0432\u043F\u043B\u0438\u0432\u0456\u0432. \u0417\u0432\u0435\u0440\u0442\u0430\u0439\u0442\u0435\u0441\u044C \u0434\u043E \u043D\u0430\u0441 \u0434\u043B\u044F \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u043D\u0430\u0434\u0456\u0439\u043D\u0438\u0445 \u0442\u0430 \u043F\u0440\u0438\u0432\u0430\u0431\u043B\u0438\u0432\u0438\u0445 \u0444\u0430\u0441\u0430\u0434\u0456\u0432, \u044F\u043A\u0456 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u044E\u0442\u044C \u0432\u0430\u0448\u0438\u043C \u043D\u0430\u0439\u0432\u0438\u0449\u0438\u043C \u0432\u0438\u043C\u043E\u0433\u0430\u043C. </div></div><div class="w-100 w-lg-50 p-4 d-flex"><div class="pe-4">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/services/autotents.png",
        layout: "intrinsic"
      }, null, _parent));
      _push(`</div><div class=""><h3>\u0410\u0432\u0442\u043E\u043C\u043E\u0431\u0456\u043B\u044C\u043D\u0456 \u043D\u0430\u0432\u0456\u0441\u0438</h3> \u0410\u0432\u0442\u043E\u043C\u043E\u0431\u0456\u043B\u044C\u043D\u0456 \u043D\u0430\u0432\u0456\u0441\u0438 \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u044E\u0442\u044C \u043D\u0430\u0434\u0456\u0439\u043D\u0438\u0439 \u0437\u0430\u0445\u0438\u0441\u0442 \u0432\u0456\u0434 \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u043D\u0438\u0445 \u0432\u043F\u043B\u0438\u0432\u0456\u0432 \u0456 \u0443\u043B\u044C\u0442\u0440\u0430\u0444\u0456\u043E\u043B\u0435\u0442\u043E\u0432\u043E\u0433\u043E \u0432\u0438\u043F\u0440\u043E\u043C\u0456\u043D\u044E\u0432\u0430\u043D\u043D\u044F, \u0437\u0431\u0435\u0440\u0456\u0433\u0430\u044E\u0447\u0438 \u0432\u0430\u0448 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u043D\u0438\u0439 \u0437\u0430\u0441\u0456\u0431 \u0443 \u043D\u0430\u043B\u0435\u0436\u043D\u043E\u043C\u0443 \u0441\u0442\u0430\u043D\u0456 \u043D\u0435\u0437\u0430\u043B\u0435\u0436\u043D\u043E \u0432\u0456\u0434 \u043F\u043E\u0433\u043E\u0434\u043D\u0438\u0445 \u0443\u043C\u043E\u0432. \u0417\u0432\u0435\u0440\u0442\u0430\u0439\u0442\u0435\u0441\u044F \u0434\u043E \u043D\u0430\u0441 \u0434\u043B\u044F \u0432\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0442\u0430 \u0432\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0456\u043B\u044C\u043D\u0438\u0445 \u043D\u0430\u0432\u0456\u0441\u0456\u0432, \u044F\u043A\u0456 \u0432\u0456\u0434\u0437\u043D\u0430\u0447\u0430\u044E\u0442\u044C\u0441\u044F \u0434\u043E\u0432\u0433\u043E\u0432\u0456\u0447\u043D\u0456\u0441\u0442\u044E, \u0435\u0441\u0442\u0435\u0442\u0438\u0447\u043D\u0438\u043C \u0432\u0438\u0433\u043B\u044F\u0434\u043E\u043C \u0442\u0430 \u0444\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B\u044C\u043D\u0456\u0441\u0442\u044E. </div></div></div><div class="v-flex d-lg-flex"><div class="w-100 w-lg-50 p-4 d-flex"><div class="pe-4">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/services/parkan.png",
        layout: "intrinsic"
      }, null, _parent));
      _push(`</div><div class=""><h3>\u041F\u0430\u0440\u043A\u0430\u043D\u0438, \u043E\u0433\u043E\u0440\u043E\u0436\u0456</h3> \u041D\u0430\u0448\u0456 \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u0456\u0441\u0442\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0443\u044E\u0442\u044C \u0456 \u0432\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u044E\u044E\u0442\u044C \u043F\u0430\u0440\u043A\u0430\u043D\u0438 \u0440\u0456\u0437\u043D\u0438\u0445 \u0432\u0438\u0434\u0456\u0432, \u044F\u043A\u0456 \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u044E\u0442\u044C \u043D\u0430\u0434\u0456\u0439\u043D\u0438\u0439 \u0437\u0430\u0445\u0438\u0441\u0442 \u0432\u0430\u0448\u043E\u0433\u043E \u043C\u0430\u0439\u043D\u0430. \u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454\u043C\u043E \u0442\u0456\u043B\u044C\u043A\u0438 \u0432\u0438\u0441\u043E\u043A\u043E\u044F\u043A\u0456\u0441\u043D\u0456 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438, \u0449\u043E \u0433\u0430\u0440\u0430\u043D\u0442\u0443\u0454 \u0434\u043E\u0432\u0433\u043E\u0432\u0456\u0447\u043D\u0456\u0441\u0442\u044C \u0456 \u0435\u0441\u0442\u0435\u0442\u0438\u0447\u043D\u0456\u0441\u0442\u044C \u043E\u0433\u043E\u0440\u043E\u0436. \u0417\u0432\u0435\u0440\u0442\u0430\u0439\u0442\u0435\u0441\u044C \u0434\u043E \u043D\u0430\u0441 \u0434\u043B\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u043D\u0430\u0434\u0456\u0439\u043D\u043E\u0433\u043E \u0440\u0456\u0448\u0435\u043D\u043D\u044F, \u044F\u043A\u0435 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438\u043C\u0435 \u0432\u0430\u0448\u0438\u043C \u043F\u043E\u0442\u0440\u0435\u0431\u0430\u043C \u0456 \u0432\u043F\u043E\u0434\u043E\u0431\u0430\u043D\u043D\u044F\u043C. </div></div><div class="w-100 w-lg-50 p-4 d-flex"><div class="pe-4">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/services/stairs.png",
        layout: "intrinsic"
      }, null, _parent));
      _push(`</div><div class=""><h3>\u0421\u0445\u043E\u0434\u0438</h3> \u041C\u0438 \u043D\u0430\u0434\u0430\u0454\u043C\u043E \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0456 \u043F\u043E\u0441\u043B\u0443\u0433\u0438 \u0437\u0456 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0441\u0445\u043E\u0434\u0456\u0432 \u0434\u043B\u044F \u0431\u0443\u0434\u044C-\u044F\u043A\u0438\u0445 \u043F\u0440\u0438\u043C\u0456\u0449\u0435\u043D\u044C. \u041D\u0430\u0448\u0456 \u0444\u0430\u0445\u0456\u0432\u0446\u0456 \u0440\u0435\u0442\u0435\u043B\u044C\u043D\u043E \u0440\u043E\u0437\u0440\u043E\u0431\u043B\u044F\u044E\u0442\u044C \u043F\u0440\u043E\u0454\u043A\u0442, \u0432\u0440\u0430\u0445\u043E\u0432\u0443\u044E\u0447\u0438 \u0432\u0441\u0456 \u0432\u0438\u043C\u043E\u0433\u0438 \u0437\u0430\u043C\u043E\u0432\u043D\u0438\u043A\u0430 \u0442\u0430 \u043E\u0441\u043E\u0431\u043B\u0438\u0432\u043E\u0441\u0442\u0456 \u0456\u043D\u0442\u0435\u0440&#39;\u0454\u0440\u0443. \u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454\u043C\u043E \u044F\u043A\u0456\u0441\u043D\u0456 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438 \u0442\u0430 \u043D\u043E\u0432\u0456\u0442\u043D\u0456 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0456\u0457, \u0449\u043E\u0431 \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0438\u0442\u0438 \u0434\u043E\u0432\u0433\u043E\u0432\u0456\u0447\u043D\u0456\u0441\u0442\u044C, \u043D\u0430\u0434\u0456\u0439\u043D\u0456\u0441\u0442\u044C \u0442\u0430 \u0435\u0441\u0442\u0435\u0442\u0438\u0447\u043D\u0438\u0439 \u0432\u0438\u0433\u043B\u044F\u0434 \u0441\u0445\u043E\u0434\u0456\u0432. \u0417\u0432\u0435\u0440\u0442\u0430\u0439\u0442\u0435\u0441\u044C \u0434\u043E \u043D\u0430\u0441 \u0434\u043B\u044F \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0441\u0442\u0438\u043B\u044C\u043D\u0438\u0445 \u0442\u0430 \u0444\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B\u044C\u043D\u0438\u0445 \u0441\u0445\u043E\u0434\u0456\u0432, \u0449\u043E \u0441\u0442\u0430\u043D\u0443\u0442\u044C \u043F\u0440\u0438\u043A\u0440\u0430\u0441\u043E\u044E \u0432\u0430\u0448\u043E\u0433\u043E \u0431\u0443\u0434\u0438\u043D\u043A\u0443 \u0447\u0438 \u043E\u0444\u0456\u0441\u0443. </div></div></div><div class="v-flex d-lg-flex"><div class="w-100 w-lg-50 p-4 d-flex"><div class="pe-4">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/services/vorota.png",
        layout: "intrinsic"
      }, null, _parent));
      _push(`</div><div class=""><h3>\u0420\u043E\u0437\u0441\u0443\u0432\u043D\u0456 \u0432\u043E\u0440\u043E\u0442\u0430</h3> \u041D\u0430\u0448\u0456 \u0444\u0430\u0445\u0456\u0432\u0446\u0456 \u043F\u0440\u043E\u0435\u043A\u0442\u0443\u044E\u0442\u044C \u0456 \u0432\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u044E\u044E\u0442\u044C \u0440\u043E\u0437\u0441\u0443\u0432\u043D\u0456 \u0432\u043E\u0440\u043E\u0442\u0430, \u0449\u043E \u043F\u043E\u0454\u0434\u043D\u0443\u044E\u0442\u044C \u0441\u0443\u0447\u0430\u0441\u043D\u0438\u0439 \u0434\u0438\u0437\u0430\u0439\u043D \u0456 \u0432\u0438\u0441\u043E\u043A\u0443 \u0444\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B\u044C\u043D\u0456\u0441\u0442\u044C. \u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454\u043C\u043E \u0442\u0456\u043B\u044C\u043A\u0438 \u044F\u043A\u0456\u0441\u043D\u0456 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438, \u0449\u043E \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u0454 \u043D\u0430\u0434\u0456\u0439\u043D\u0443 \u0440\u043E\u0431\u043E\u0442\u0443 \u0432\u043E\u0440\u0456\u0442 \u043F\u0440\u043E\u0442\u044F\u0433\u043E\u043C \u0442\u0440\u0438\u0432\u0430\u043B\u043E\u0433\u043E \u0447\u0430\u0441\u0443. \u0420\u043E\u0437\u0441\u0443\u0432\u043D\u0456 \u0432\u043E\u0440\u043E\u0442\u0430 \u2013 \u0446\u0435 \u0456\u0434\u0435\u0430\u043B\u044C\u043D\u0435 \u0440\u0456\u0448\u0435\u043D\u043D\u044F \u0434\u043B\u044F \u043E\u043F\u0442\u0438\u043C\u0456\u0437\u0430\u0446\u0456\u0457 \u043F\u0440\u043E\u0441\u0442\u043E\u0440\u0443 \u0442\u0430 \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0435\u043D\u043D\u044F \u0437\u0440\u0443\u0447\u043D\u043E\u0433\u043E \u0434\u043E\u0441\u0442\u0443\u043F\u0443 \u0434\u043E \u0432\u0430\u0448\u043E\u0457 \u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0457. \u0417\u0432\u0435\u0440\u0442\u0430\u0439\u0442\u0435\u0441\u044C \u0434\u043E \u043D\u0430\u0441 \u0434\u043B\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0440\u0456\u0448\u0435\u043D\u043D\u044F, \u044F\u043A\u0435 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438\u043C\u0435 \u0432\u0430\u0448\u0438\u043C \u043F\u043E\u0442\u0440\u0435\u0431\u0430\u043C. </div></div><div class="w-100 w-lg-50 p-4 d-flex"><div class="pe-4">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/services/doors.png",
        layout: "intrinsic"
      }, null, _parent));
      _push(`</div><div class=""><h3>\u0414\u0432\u0435\u0440\u0456, \u0445\u0432\u0456\u0440\u0442\u043A\u0438</h3> \u041C\u0438 \u043F\u0440\u043E\u043F\u043E\u043D\u0443\u0454\u043C\u043E \u043F\u043E\u0441\u043B\u0443\u0433\u0438 \u0437\u0456 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0432\u0445\u0456\u0434\u043D\u0438\u0445 \u0434\u0432\u0435\u0440\u0435\u0439 \u0442\u0430 \u0445\u0432\u0456\u0440\u0442\u043E\u043A \u0434\u043B\u044F \u0432\u0430\u0448\u043E\u0457 \u0431\u0435\u0437\u043F\u0435\u043A\u0438 \u0456 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u0443. \u041D\u0430\u0448\u0456 \u0444\u0430\u0445\u0456\u0432\u0446\u0456 \u0440\u043E\u0437\u0440\u043E\u0431\u043B\u044F\u044E\u0442\u044C \u0442\u0430 \u0432\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u044E\u044E\u0442\u044C \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0432\u0435\u0440\u0456 \u0439 \u0445\u0432\u0456\u0440\u0442\u043A\u0438, \u0449\u043E \u043F\u043E\u0454\u0434\u043D\u0443\u044E\u0442\u044C \u0435\u0441\u0442\u0435\u0442\u0438\u043A\u0443, \u043C\u0456\u0446\u043D\u0456\u0441\u0442\u044C \u0456 \u043D\u0430\u0434\u0456\u0439\u043D\u0456\u0441\u0442\u044C. \u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454\u043C\u043E \u043B\u0438\u0448\u0435 \u0432\u0438\u0441\u043E\u043A\u043E\u044F\u043A\u0456\u0441\u043D\u0456 \u043C\u0430\u0442\u0435\u0440\u0456\u0430\u043B\u0438, \u044F\u043A\u0456 \u0437\u0430\u0431\u0435\u0437\u043F\u0435\u0447\u0443\u044E\u0442\u044C \u0434\u043E\u0432\u0433\u043E\u0432\u0456\u0447\u043D\u0456\u0441\u0442\u044C \u0456 \u0437\u0430\u0445\u0438\u0441\u0442 \u0432\u0430\u0448\u043E\u0433\u043E \u0431\u0443\u0434\u0438\u043D\u043A\u0443 \u0430\u0431\u043E \u0442\u0435\u0440\u0438\u0442\u043E\u0440\u0456\u0457. \u0417\u0432\u0435\u0440\u043D\u0456\u0442\u044C\u0441\u044F \u0434\u043E \u043D\u0430\u0441 \u0434\u043B\u044F \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0456\u043D\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0440\u0456\u0448\u0435\u043D\u043D\u044F, \u0449\u043E \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438\u043C\u0435 \u0432\u0441\u0456\u043C \u0432\u0430\u0448\u0438\u043C \u043F\u043E\u0442\u0440\u0435\u0431\u0430\u043C \u0456 \u0432\u043F\u043E\u0434\u043E\u0431\u0430\u043D\u043D\u044F\u043C. </div></div></div></div></div></div><div class="projecting-block vh-height-50"><div class="container py-5 my-5 px-0 px-md-5 w-75"><h2>\u0421\u043F\u0440\u043E\u0435\u043A\u0442\u0443\u0432\u0430\u0442\u0438 \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u0443 \u043C\u0435\u0442\u0430\u043B\u0435\u0432\u0443 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u044E</h2><p class="">* \u041D\u0430\u0434\u0430\u0439\u0442\u0435 \u0448\u0432\u0438\u0434\u043A\u0438\u0439 \u043E\u043F\u0438\u0441 \u043D\u0435\u043E\u0431\u0445\u0456\u0434\u043D\u043E\u0457 \u043C\u0435\u0442\u0430\u043B\u0435\u0432\u043E\u0457 \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u0457</p><textarea id="big-text" name="big-text" rows="5" cols="50" class="w-100 mb-3"></textarea><br><button class="action-button bold-2">\u0420\u043E\u0437\u0440\u0430\u0445\u0443\u0432\u0430\u0442\u0438</button></div></div><div id="product" class="technologies-block vh-height d-center v-center container p-5 my-5"><div class="v-flex"><h2>\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0456\u0457</h2>`);
      _push(ssrRenderComponent(Technologies, null, null, _parent));
      _push(`</div></div><div id="clients" class="my-5 p-5 bg-white"><div class="container py-5 px-0 px-md-5"><h2>\u041D\u0430\u043C \u0434\u043E\u0432\u0456\u0440\u044F\u044E\u0442\u044C</h2>`);
      _push(ssrRenderComponent(Carousel, null, null, _parent));
      _push(`</div></div><div class="workorder container px-5 my-5 py-4"><h2>\u0421\u041F\u0406\u0412\u041F\u0420\u0410\u0426\u042F</h2>`);
      _push(ssrRenderComponent(WorkOrderBlock, null, null, _parent));
      _push(`</div><div class="footer v-flex justify-content-between align-items-center vh-height-75 bg-dark"><div id="project" class="container d-center my-5">`);
      _push(ssrRenderComponent(SqueezeBlock, null, null, _parent));
      _push(`</div><div class="v-flex d-md-flex align-items-center justify-content-between container text-white-75 border-bottom border-grey py-4 text-light"><div class="logo py-2">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/logo_sm1_darkmode.png",
        alt: "Steel Master \u043B\u043E\u0433\u043E\u0442\u0438\u043F",
        height: "15px"
      }, null, _parent));
      _push(`</div><div class="phone py-2">380-67-777-77-77</div><div class="email py-2">support@steelmetal.com.ua</div><div class="py-2"><button class="text-uppercase f-4 bold-3">\u0417\u0410\u041B\u0418\u0428\u0418\u0422\u0418 \u0417\u0410\u042F\u0412\u041A\u0423</button></div>`);
      _push(ssrRenderComponent(_component_Icon, {
        class: "d-none d-md-block py-2",
        name: "logos:telegram"
      }, null, _parent));
      _push(`</div><div class="f-1 text-center container py-4 text-white-50 text-light"> \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B \xA9 2016-2022 \u0422\u041E\u0412 &quot;\u0422\u0411\u041A-1&quot; - \u0432\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u043C\u0442\u0435\u0430\u043B\u043E\u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u0439 \u043D\u0430 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0432 \u041A\u0438\u0454\u0432\u0456<br> \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0441\u0430\u0439\u0442\u0430 - Personal Solutions Ltd. </div></div></div><!--]-->`);
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
//# sourceMappingURL=index-DzMtxUXO.mjs.map
