import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-MSZGUEKK.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/Header.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/Header.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/Header.tsx"
  );
  import.meta.hot.lastModified = "1710979110296.962";
}
function Header() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "m-auto w-[95%] sm:max-w-[1024px] rounded shadow-md bg-white p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "flex", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { target: "_blank", href: "https://remix.run/tutorials/blog", rel: "noreferrer", children: "Questo \xE8 il sito di Alfredo campioneeeaa" }, void 0, false, {
      fileName: "app/components/Header.tsx",
      lineNumber: 26,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/components/Header.tsx",
      lineNumber: 25,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { target: "_blank", href: "https://remix.run/tutorials/jokes", rel: "noreferrer", children: "Deep Dive Jokes App Tutorial" }, void 0, false, {
      fileName: "app/components/Header.tsx",
      lineNumber: 31,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/components/Header.tsx",
      lineNumber: 30,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { target: "_blank", href: "https://remix.run/docs", rel: "noreferrer", children: "Remix Docs" }, void 0, false, {
      fileName: "app/components/Header.tsx",
      lineNumber: 36,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/components/Header.tsx",
      lineNumber: 35,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Header.tsx",
    lineNumber: 24,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/components/Header.tsx",
    lineNumber: 23,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/Header.tsx",
    lineNumber: 22,
    columnNumber: 10
  }, this);
}
_c = Header;
var _c;
$RefreshReg$(_c, "Header");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  Header
};
//# sourceMappingURL=/build/_shared/chunk-TEZ5VDZY.js.map
