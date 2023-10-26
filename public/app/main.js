(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@starryui/theme/index.js
  var require_theme = __commonJS({
    "node_modules/@starryui/theme/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.useThemeDimensions = exports.createRootCSSVariables = exports.applyThemeMultiple = exports.applyTheme = exports.attachThemeFacetStyle = exports.attachThemeFacet = exports.attachStyle = exports.compoundRuleText = exports.cssRuleText = exports.attachStyleText = exports.attachThemeVariables = exports.withTheme = void 0;
      function withTheme(theme) {
        return {
          theme,
          type: "theme"
        };
      }
      exports.withTheme = withTheme;
      var uniqueId = 0;
      function attachThemeVariables5(selector, variables) {
        if (typeof selector !== "string") {
          const uniqueClassName = `scope-${uniqueId++}`;
          selector.classList.add(uniqueClassName);
          selector = `.${uniqueClassName}`;
        }
        if (variables) {
          return attachStyleText(`${selector} {
${Object.entries(variables).map(function([name, value]) {
            return ` --${name}: ${value};`;
          }).join("\n")}
}`);
        }
      }
      exports.attachThemeVariables = attachThemeVariables5;
      function attachStyleText(text) {
        const styleElement = document.createElement("style");
        styleElement.textContent = text;
        document.head.appendChild(styleElement);
        return styleElement;
      }
      exports.attachStyleText = attachStyleText;
      function cssRuleText(selector, styles) {
        return `${selector} {
  ${Object.entries(styles).map(([property, value]) => {
          const cssProperty = property.replace(/[A-Z]/g, (x) => `-${x.toLowerCase()}`);
          return `${cssProperty}: ${value};`;
        }).join("\n")}
 }`;
      }
      exports.cssRuleText = cssRuleText;
      function compoundRuleText(theme, selector, styles) {
        return styles.map((style) => Object.entries(style).map(function([key, value]) {
          let postfix = "";
          let prefix = "";
          if (key.startsWith("@media")) {
            if (!key.includes("&")) {
              throw new Error(`selector should include '&': '${key}'`);
            }
            const selfPosition = key.indexOf("&");
            const media = key.substring(0, selfPosition);
            key = key.substring(selfPosition);
            prefix += `${media} {
`;
            postfix += "\n}";
          }
          const finalSelector = key === "" ? selector : key.replace(/&/g, selector).replace(/facet\(([^\)]*)\)/g, (_, a) => `.theme-${theme.name}-${a}`);
          if (Array.isArray(value)) {
            return prefix + compoundRuleText(theme, finalSelector, value) + postfix;
          } else {
            return prefix + cssRuleText(finalSelector, value) + postfix;
          }
        }).join("\n")).join("\n");
      }
      exports.compoundRuleText = compoundRuleText;
      function attachStyle3(theme, selector, styles) {
        if (Array.isArray(styles)) {
          return attachStyleText(compoundRuleText(theme, selector, styles));
        }
        return attachStyleText(cssRuleText(selector, styles));
      }
      exports.attachStyle = attachStyle3;
      var ThemeFacetMap = /* @__PURE__ */ new Map();
      function attachThemeFacet2(element, theme, facet) {
        const className = `theme-${theme.name}-${facet}`;
        if (!ThemeFacetMap.has(className)) {
          ThemeFacetMap.set(className, attachThemeFacetStyle(theme, facet));
        }
        element.classList.add(className);
      }
      exports.attachThemeFacet = attachThemeFacet2;
      function attachThemeFacetStyle(theme, facet) {
        if (facet in theme.facets) {
          return attachStyle3(theme, `.theme-${theme.name}-${facet}`, theme.facets[facet]);
        }
        console.warn(new Error(`theme '${theme.name}' does not contain facet: '${facet}'`));
      }
      exports.attachThemeFacetStyle = attachThemeFacetStyle;
      function applyTheme4(theme, component) {
        return component.add(withTheme(theme));
      }
      exports.applyTheme = applyTheme4;
      function applyThemeMultiple2(theme, components) {
        return components.map((component) => component.add(withTheme(theme)));
      }
      exports.applyThemeMultiple = applyThemeMultiple2;
      function createRootCSSVariables(source) {
        return `:root {
 ${Object.entries(source).map(function([name, value]) {
          return `--${name}: ${value};`;
        }).join("\n ")}
}`;
      }
      exports.createRootCSSVariables = createRootCSSVariables;
      exports.useThemeDimensions = {
        zero() {
          return attachStyleText(createRootCSSVariables({
            dimension0: "0",
            dimension1: "0",
            dimension2: "0",
            dimension3: "0",
            dimension4: "0"
          }));
        },
        tiny() {
          return attachStyleText(createRootCSSVariables({
            dimension0: "0",
            dimension1: "2px",
            dimension2: "7px",
            dimension3: "16px",
            dimension4: "32px"
          }));
        }
      };
    }
  });

  // node_modules/@starryui/traits/constants.js
  var require_constants = __commonJS({
    "node_modules/@starryui/traits/constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.S = exports.NORMAL_DELAY_MS = exports.MOBILE_BREAKPOINT_PX = void 0;
      exports.MOBILE_BREAKPOINT_PX = 900;
      exports.NORMAL_DELAY_MS = 250;
      exports.S = 1e3;
    }
  });

  // node_modules/@starryui/theme-midnight/index.js
  var require_theme_midnight = __commonJS({
    "node_modules/@starryui/theme-midnight/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.themeMidnight = void 0;
      var constants_js_1 = require_constants();
      exports.themeMidnight = {
        name: "midnight",
        variables: {
          theme0: "#000000",
          theme1: "#101010",
          theme2: "#202020",
          theme3: "#303030",
          theme4: "#404040",
          theme5: "#505050",
          theme6: "#606060",
          theme7: "#707070",
          theme8: "#808080",
          themee: "#e0e0e0",
          themef: "#ffffff"
        },
        facets: {
          body: [
            {
              "": {
                backgroundColor: "var(--theme0)",
                display: "flex",
                flexDirection: "column",
                height: "100dvh",
                margin: "var(--dimension0)",
                maxHeight: "100dvh",
                minHeight: "100dvh",
                overflow: "hidden",
                padding: "var(--dimension0)"
              },
              "&, input, textarea, select": {
                color: "var(--themef)",
                fontFamily: "sans-serif",
                fontSize: "15px",
                lineHeight: "1.65"
              },
              "*::selection": {
                backgroundColor: "var(--themef)",
                color: "var(--theme0)"
              },
              a: [
                {
                  "&": {
                    color: "inherit",
                    textDecoration: "none",
                    transition: `${constants_js_1.NORMAL_DELAY_MS / constants_js_1.S}s ease background-color`
                  },
                  "&:hover": {
                    backgroundColor: "var(--theme3)"
                  },
                  "&:active": {
                    backgroundColor: "var(--theme0)"
                  }
                }
              ],
              h1: {
                fontSize: "24px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              h2: {
                fontSize: "20px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              h3: {
                fontSize: "18px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              h4: {
                fontSize: "16px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              h5: {
                fontSize: "14px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              h6: {
                fontSize: "12px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              p: {
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              "*[data-starryui-reveal]": {
                opacity: "0",
                transform: "scaleY(0.975) translateY(-2.5%)",
                transformOrigin: "top left",
                transition: `${constants_js_1.NORMAL_DELAY_MS / constants_js_1.S}s ease-out opacity, ${constants_js_1.NORMAL_DELAY_MS / constants_js_1.S}s ease-out transform`
              },
              '*[data-starryui-reveal="reveal"]': {
                opacity: "1",
                transform: "scaleY(1) translateY(0)"
              }
            }
          ],
          button: [
            {
              "": {
                backgroundColor: "var(--theme0)",
                border: "1px solid var(--theme8)",
                boxSizing: "border-box",
                color: "var(--themef)",
                cursor: "pointer",
                display: "inline-flex",
                flexDirection: "row",
                flexShrink: "0",
                fontSize: "14px",
                height: "var(--dimension4)",
                lineHeight: "16px",
                maxHeight: "var(--dimension4)",
                minWidth: "var(--dimension4)",
                padding: "var(--dimension2)",
                whiteSpace: "nowrap"
              },
              "&:hover": {
                backgroundColor: "var(--theme3)"
              },
              "&:active": {
                backgroundColor: "var(--theme0)"
              },
              '& div[data-starryui-trait="buttonImage"]': {
                backgroundSize: "100%",
                height: "var(--dimension3)",
                imageRendering: "pixelated",
                marginRight: "var(--dimension2)",
                width: "var(--dimension3)"
              }
            }
          ],
          column: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            flexShrink: "1",
            overflowX: "hidden",
            overflowY: "auto",
            position: "relative",
            width: "100%"
          },
          document: [
            {
              "& a": {
                borderBottom: "var(--dimension1) solid var(--theme8)",
                paddingBottom: "var(--dimension1)",
                transition: `${constants_js_1.NORMAL_DELAY_MS / constants_js_1.S}s ease border-bottom`
              },
              "& a:hover": {
                borderBottom: "var(--dimension1) solid var(--themef)"
              },
              "& hr": {
                margin: "var(--dimension4) 0 var(--dimension2)",
                width: "100%"
              },
              "& code": {
                backgroundColor: "var(--theme2)",
                fontFamily: "'Source Code Pro', 'Liberation Mono', monospace",
                padding: "var(--dimension1) var(--dimension2)"
              },
              "& pre": {
                backgroundColor: "var(--theme2)",
                fontSize: "11px",
                lineHeight: "2",
                margin: "0",
                padding: "var(--dimension2)",
                whiteSpace: "break-spaces"
              },
              "& pre > code": {
                padding: "0"
              }
            }
          ],
          frame: {
            border: "1px solid var(--theme4)",
            borderRadius: "var(--dimension2)",
            boxSizing: "border-box",
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            position: "relative",
            width: "100%"
          },
          "link-frame": [
            {
              "& h1 span": {
                borderBottom: "var(--dimension1) solid transparent",
                paddingBottom: "var(--dimension1)",
                transition: `${constants_js_1.NORMAL_DELAY_MS / constants_js_1.S}s ease border-bottom`
              },
              "&:hover h1 span": {
                borderBottom: "var(--dimension1) solid var(--themef)"
              }
            }
          ],
          menu: [
            {
              "": {
                backgroundColor: "var(--theme0)",
                border: "1px solid var(--theme4)",
                borderRadius: "var(--dimension2)",
                boxShadow: "0 0 var(--dimension4) var(--theme8)",
                boxSizing: "border-box",
                fontSize: "14px",
                minHeight: "27px",
                minWidth: "27px",
                overflowX: "hidden",
                overflowY: "auto",
                position: "absolute",
                zIndex: "2"
              },
              "& > div": {
                cursor: "pointer",
                padding: "var(--dimension1) var(--dimension2)"
              },
              "& > div:hover": {
                backgroundColor: "var(--theme3)"
              }
            }
          ],
          opaque: {
            backgroundColor: "var(--theme0)",
            color: "var(--themef)"
          },
          "opaque-alt": {
            backgroundColor: "var(--theme2)"
          },
          row: [
            {
              "": {
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                flexGrow: "1",
                flexShrink: "0",
                overflowX: "auto",
                overflowY: "hidden",
                position: "relative"
              },
              "& > facet(column)": {
                minWidth: "256px"
              },
              [`@media screen and (max-width: ${constants_js_1.MOBILE_BREAKPOINT_PX}px) &[data-responsive="1"]`]: {
                flexDirection: "column"
              }
            }
          ],
          tray: [
            {
              "": {
                backgroundColor: "var(--theme1)",
                borderBottom: "1px solid var(--theme4)",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                flexShrink: "0",
                overflowX: "auto",
                overflowY: "hidden",
                minHeight: "var(--dimension4)",
                minWidth: "var(--dimension4)"
              },
              "& facet(button)": {
                backgroundColor: "var(--theme1)",
                borderBottom: "1px solid var(--theme4)",
                borderLeft: "none",
                borderRight: "1px solid var(--theme4)",
                borderTop: "none",
                marginBottom: "-1px"
              },
              "& > facet(button):last-child": {
                borderRight: "none"
              }
            }
          ],
          "tray-spacer": [
            {
              "": {
                flexGrow: "1",
                minWidth: "var(--dimension2)"
              },
              "& + facet(button)": {
                borderLeft: "1px solid var(--theme4)"
              }
            }
          ]
        }
      };
    }
  });

  // node_modules/@starryui/traits/index.js
  var require_traits = __commonJS({
    "node_modules/@starryui/traits/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mergeTraits = exports.starryComponent = exports.applyTraits = exports.withTextContent = exports.withClick = void 0;
      var theme_1 = require_theme();
      function withClick(handler) {
        return {
          type: "mouseEvent",
          mouseEvent: "click",
          handler
        };
      }
      exports.withClick = withClick;
      function withTextContent2(value) {
        return {
          type: "textContent",
          textContent: value
        };
      }
      exports.withTextContent = withTextContent2;
      function applyTraits(elem, traits, traitConfig) {
        if (traitConfig.content) {
          traitConfig.content(elem, traitConfig);
        }
        if (traitConfig.href) {
          elem.setAttribute("href", traitConfig.href);
        }
        if (traitConfig.style) {
          Object.assign(elem.style, traitConfig.style);
        }
        for (const trait of traits) {
          switch (trait.type) {
            case "mouseEvent":
              elem.addEventListener(trait.mouseEvent, trait.handler);
              break;
            case "buttonImage":
              const image = document.createElement("div");
              image.setAttribute("data-starryui-trait", "buttonImage");
              image.style.backgroundImage = `url(${JSON.stringify(trait.image)})`;
              elem.appendChild(image);
              break;
            case "textContent":
              elem.appendChild(document.createTextNode(trait.textContent));
              break;
            case "theme":
              if (!traitConfig.themeFacet) {
                console.warn(`Using theme '${trait.theme.name}' trait without themeFacet specified`);
                break;
              }
              (0, theme_1.attachThemeFacet)(elem, trait.theme, traitConfig.themeFacet);
              if (traitConfig.themeFacets) {
                for (const facet of traitConfig.themeFacets) {
                  (0, theme_1.attachThemeFacet)(elem, trait.theme, facet);
                }
              }
              break;
          }
        }
      }
      exports.applyTraits = applyTraits;
      function starryComponent(builder) {
        const wrap = function(...traits) {
          const component = builder(traits);
          component.add = (...addTraits) => wrap(...mergeTraits(traits, void 0, addTraits));
          component.remove = (...removeTraits) => wrap(...mergeTraits(traits, removeTraits));
          component.extend = (props) => wrap(...mergeTraits(traits, props.remove, props.add));
          return component;
        };
        return wrap();
      }
      exports.starryComponent = starryComponent;
      function mergeTraits(traits, remove, add) {
        if (remove) {
          traits = traits.filter((trait) => !remove.includes(trait));
        }
        if (add) {
          traits = traits.concat(add.filter((trait) => !traits.includes(trait)));
        }
        return traits;
      }
      exports.mergeTraits = mergeTraits;
    }
  });

  // node_modules/@starryui/button/index.js
  var require_button = __commonJS({
    "node_modules/@starryui/button/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.withButtonImage = exports.button = exports.defaultButtonConfig = void 0;
      var traits_1 = require_traits();
      exports.defaultButtonConfig = { themeFacet: "button" };
      exports.button = (0, traits_1.starryComponent)(function(traits) {
        return function(config) {
          const elem = document.createElement(config?.tagName ?? "button");
          (0, traits_1.applyTraits)(elem, traits, Object.assign({}, exports.defaultButtonConfig, config));
          return elem;
        };
      });
      function withButtonImage2(image) {
        return {
          type: "buttonImage",
          image
        };
      }
      exports.withButtonImage = withButtonImage2;
    }
  });

  // node_modules/@starryui/layout/index.js
  var require_layout = __commonJS({
    "node_modules/@starryui/layout/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.row = exports.defaultRowConfig = exports.column = exports.defaultColumnConfig = void 0;
      var traits_1 = require_traits();
      exports.defaultColumnConfig = { themeFacet: "column" };
      exports.column = (0, traits_1.starryComponent)(function(traits) {
        return function(config) {
          const elem = document.createElement(config?.tagName ?? "div");
          (0, traits_1.applyTraits)(elem, traits, Object.assign({}, exports.defaultColumnConfig, config));
          return elem;
        };
      });
      exports.defaultRowConfig = { themeFacet: "row" };
      exports.row = (0, traits_1.starryComponent)(function(traits) {
        return function(config) {
          const elem = document.createElement(config?.tagName ?? "div");
          (0, traits_1.applyTraits)(elem, traits, Object.assign({}, exports.defaultRowConfig, config));
          return elem;
        };
      });
    }
  });

  // node_modules/@starryui/menu/index.js
  var require_menu = __commonJS({
    "node_modules/@starryui/menu/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.withButtonImage = exports.attachMenu = exports.menu = exports.defaultMenuConfig = void 0;
      var traits_1 = require_traits();
      var constants_js_1 = require_constants();
      exports.defaultMenuConfig = {
        themeFacet: "menu"
      };
      exports.menu = (0, traits_1.starryComponent)(function(traits) {
        return function(config) {
          const elem = document.createElement(config?.tagName ?? "div");
          elem.setAttribute("data-starryui-reveal", "hidden");
          const finalTraitConfig = Object.assign({}, exports.defaultMenuConfig, config);
          (0, traits_1.applyTraits)(elem, traits, finalTraitConfig);
          const selectTrait = traits.find((x) => x.type === "onSelect");
          if (selectTrait?.type === "onSelect") {
            elem.addEventListener("click", (event) => {
              if (event.target.hasAttribute("data-value")) {
                close();
                selectTrait.onSelect(event.target.getAttribute("data-value") ?? void 0);
              }
            });
          }
          let openCloseTimeout;
          function close() {
            if (!instance.isOpen) {
              console.warn("No need to close menu, it is not open");
            }
            instance.isOpen = false;
            elem.setAttribute("data-starryui-reveal", "hidden");
            clearTimeout(openCloseTimeout);
            openCloseTimeout = setTimeout(() => {
              document.body.removeChild(elem);
            }, constants_js_1.NORMAL_DELAY_MS);
          }
          function open() {
            instance.isOpen = true;
            elem.innerHTML = "";
            render();
            document.body.appendChild(elem);
            clearTimeout(openCloseTimeout);
            openCloseTimeout = setTimeout(() => {
              elem.setAttribute("data-starryui-reveal", "reveal");
            }, 0);
          }
          function render() {
            config?.content?.(elem, finalTraitConfig);
          }
          const instance = {
            close,
            element: elem,
            isOpen: false,
            open,
            render
          };
          return instance;
        };
      });
      function attachMenu2(element, menu2) {
        element.addEventListener("click", function() {
          if (menu2.isOpen) {
            menu2.close();
            return;
          }
          menu2.open();
          const box = element.getBoundingClientRect();
          Object.assign(menu2.element.style, {
            left: `${Math.min(box.left, innerWidth - menu2.element.clientWidth)}px`,
            maxHeight: `${innerHeight - box.bottom - 20}px`,
            minWidth: `${Math.max(box.width, 27)}px`,
            top: `${box.bottom - 1}px`
          });
        });
      }
      exports.attachMenu = attachMenu2;
      function withButtonImage2(image) {
        return {
          type: "buttonImage",
          image
        };
      }
      exports.withButtonImage = withButtonImage2;
    }
  });

  // node_modules/@starryui/theme-sandstone/index.js
  var require_theme_sandstone = __commonJS({
    "node_modules/@starryui/theme-sandstone/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.themeSandstone = void 0;
      var constants_js_1 = require_constants();
      exports.themeSandstone = {
        name: "sandstone",
        variables: {
          "theme-4": "#000000",
          "theme-3": "#101000",
          "theme-2": "#202000",
          "theme-1": "#303000",
          theme0: "#404000",
          theme1: "#606000",
          theme2: "#707000",
          theme3: "#808000",
          theme4: "#909000",
          theme5: "#a0a000",
          theme6: "#b0b000",
          theme7: "#c0c000",
          theme8: "#d0d000",
          themee: "#e0e0e0",
          themef: "#ffff00"
        },
        facets: {
          body: [
            {
              "": {
                backgroundColor: "var(--theme0)",
                display: "flex",
                flexDirection: "column",
                height: "100dvh",
                margin: "var(--dimension0)",
                maxHeight: "100dvh",
                minHeight: "100dvh",
                overflow: "hidden",
                padding: "var(--dimension0)"
              },
              "&, input, textarea, select": {
                color: "var(--themef)",
                fontFamily: "sans-serif",
                fontSize: "15px",
                lineHeight: "1.65"
              },
              "*::selection": {
                backgroundColor: "var(--themef)",
                color: "var(--theme0)"
              },
              a: [
                {
                  "&": {
                    color: "inherit",
                    textDecoration: "none",
                    transition: `${constants_js_1.NORMAL_DELAY_MS / constants_js_1.S}s ease background-color`
                  },
                  "&:hover": {
                    backgroundColor: "var(--theme3)"
                  },
                  "&:active": {
                    backgroundColor: "var(--theme0)"
                  }
                }
              ],
              h1: {
                fontSize: "24px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              h2: {
                fontSize: "20px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              h3: {
                fontSize: "18px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              h4: {
                fontSize: "16px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              h5: {
                fontSize: "14px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              h6: {
                fontSize: "12px",
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              p: {
                margin: "var(--dimension3) 0 var(--dimension2)"
              },
              "*[data-starryui-reveal]": {
                opacity: "0",
                transform: "scaleY(0.975) translateY(-2.5%)",
                transformOrigin: "top left",
                transition: `${constants_js_1.NORMAL_DELAY_MS / constants_js_1.S}s ease-out opacity, ${constants_js_1.NORMAL_DELAY_MS / constants_js_1.S}s ease-out transform`
              },
              '*[data-starryui-reveal="reveal"]': {
                opacity: "1",
                transform: "scaleY(1) translateY(0)"
              }
            }
          ],
          button: [
            {
              "": {
                backgroundColor: "var(--theme0)",
                border: "1px solid var(--theme8)",
                boxSizing: "border-box",
                color: "var(--themef)",
                cursor: "pointer",
                display: "inline-flex",
                flexDirection: "row",
                flexShrink: "0",
                fontSize: "14px",
                height: "var(--dimension4)",
                lineHeight: "16px",
                maxHeight: "var(--dimension4)",
                minWidth: "var(--dimension4)",
                padding: "var(--dimension2)",
                whiteSpace: "nowrap"
              },
              "&:hover": {
                backgroundColor: "var(--theme3)"
              },
              "&:active": {
                backgroundColor: "var(--theme0)"
              },
              '& div[data-starryui-trait="buttonImage"]': {
                backgroundSize: "100%",
                height: "var(--dimension3)",
                imageRendering: "pixelated",
                marginRight: "var(--dimension2)",
                width: "var(--dimension3)"
              }
            }
          ],
          column: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            flexShrink: "1",
            overflowX: "hidden",
            overflowY: "auto",
            position: "relative",
            width: "100%"
          },
          document: [
            {
              "& a": {
                borderBottom: "var(--dimension1) solid var(--theme8)",
                paddingBottom: "var(--dimension1)",
                transition: `${constants_js_1.NORMAL_DELAY_MS / constants_js_1.S}s ease border-bottom`
              },
              "& a:hover": {
                borderBottom: "var(--dimension1) solid var(--themef)"
              },
              "& hr": {
                margin: "var(--dimension4) 0 var(--dimension2)",
                width: "100%"
              },
              "& code": {
                backgroundColor: "var(--theme-1)",
                fontFamily: "'Source Code Pro', 'Liberation Mono', monospace",
                padding: "var(--dimension1) var(--dimension2)"
              },
              "& pre": {
                backgroundColor: "var(--theme-1)",
                fontSize: "11px",
                lineHeight: "2",
                margin: "0",
                padding: "var(--dimension2)",
                whiteSpace: "break-spaces"
              },
              "& pre > code": {
                padding: "0"
              }
            }
          ],
          frame: {
            border: "1px solid var(--theme2)",
            borderRadius: "var(--dimension2)",
            boxSizing: "border-box",
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            position: "relative",
            width: "100%"
          },
          "link-frame": [
            {
              "& h1 span": {
                borderBottom: "var(--dimension1) solid transparent",
                paddingBottom: "var(--dimension1)",
                transition: `${constants_js_1.NORMAL_DELAY_MS / constants_js_1.S}s ease border-bottom`
              },
              "&:hover h1 span": {
                borderBottom: "var(--dimension1) solid var(--themef)"
              }
            }
          ],
          menu: [
            {
              "": {
                backgroundColor: "var(--theme0)",
                border: "1px solid var(--theme4)",
                borderRadius: "var(--dimension2)",
                boxShadow: "0 0 var(--dimension4) var(--theme8)",
                boxSizing: "border-box",
                fontSize: "14px",
                minHeight: "27px",
                minWidth: "27px",
                overflowX: "hidden",
                overflowY: "auto",
                position: "absolute",
                zIndex: "2"
              },
              "& > div": {
                cursor: "pointer",
                padding: "var(--dimension1) var(--dimension2)"
              },
              "& > div:hover": {
                backgroundColor: "var(--theme3)"
              }
            }
          ],
          opaque: {
            backgroundColor: "var(--theme0)",
            color: "var(--themef)"
          },
          "opaque-alt": {
            backgroundColor: "var(--theme-2)"
          },
          row: [
            {
              "": {
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                flexGrow: "1",
                flexShrink: "0",
                overflowX: "auto",
                overflowY: "hidden",
                position: "relative"
              },
              "& > facet(column)": {
                minWidth: "256px"
              },
              [`@media screen and (max-width: ${constants_js_1.MOBILE_BREAKPOINT_PX}px) &[data-responsive="1"]`]: {
                flexDirection: "column"
              }
            }
          ],
          tray: [
            {
              "": {
                backgroundColor: "var(--theme1)",
                borderBottom: "1px solid var(--theme4)",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                flexShrink: "0",
                overflowX: "auto",
                overflowY: "hidden",
                minHeight: "var(--dimension4)",
                minWidth: "var(--dimension4)"
              },
              "& facet(button)": {
                backgroundColor: "var(--theme1)",
                borderBottom: "1px solid var(--theme4)",
                borderLeft: "none",
                borderRight: "1px solid var(--theme4)",
                borderTop: "none",
                marginBottom: "-1px"
              },
              "& > facet(button):last-child": {
                borderRight: "none"
              }
            }
          ],
          "tray-spacer": [
            {
              "": {
                flexGrow: "1",
                minWidth: "var(--dimension2)"
              },
              "& + facet(button)": {
                borderLeft: "1px solid var(--theme4)"
              }
            }
          ]
        }
      };
    }
  });

  // node_modules/@starryui/tray/index.js
  var require_tray = __commonJS({
    "node_modules/@starryui/tray/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.traySpacer = exports.tray = exports.defaultTrayConfig = void 0;
      var theme_1 = require_theme();
      var traits_1 = require_traits();
      exports.defaultTrayConfig = { themeFacet: "tray" };
      exports.tray = (0, traits_1.starryComponent)(function(traits) {
        return function(config) {
          const elem = document.createElement("div");
          (0, traits_1.applyTraits)(elem, traits, Object.assign({}, exports.defaultTrayConfig, config));
          return elem;
        };
      });
      function traySpacer2(theme) {
        const elem = document.createElement("div");
        (0, theme_1.attachThemeFacet)(elem, theme, "tray-spacer");
        return elem;
      }
      exports.traySpacer = traySpacer2;
    }
  });

  // node_modules/@starryui/page/index.js
  var require_page = __commonJS({
    "node_modules/@starryui/page/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.page = exports.defaultPageConfig = void 0;
      var traits_1 = require_traits();
      exports.defaultPageConfig = { themeFacet: "column" };
      exports.page = (0, traits_1.starryComponent)(function(traits) {
        return function(config) {
          const elem = document.createElement("div");
          const startUpTasks = {
            initial: [],
            final: []
          };
          const cleanUpTasks = {
            initial: [],
            final: []
          };
          (0, traits_1.applyTraits)(elem, traits, Object.assign({ startUpTasks, cleanUpTasks }, exports.defaultPageConfig, config));
          async function onLoad(final) {
            if (final) {
              for (const task of startUpTasks.final) {
                await task();
              }
            } else {
              for (const task of startUpTasks.initial) {
                await task();
              }
            }
          }
          async function onUnload(final) {
            if (final) {
              for (const task of cleanUpTasks.final) {
                await task();
              }
            } else {
              for (const task of cleanUpTasks.initial) {
                await task();
              }
            }
          }
          return {
            cleanUpTasks,
            element: elem,
            onLoad,
            onUnload,
            startUpTasks,
            title: config?.title ?? "page"
          };
        };
      });
    }
  });

  // node_modules/highlight.js/lib/core.js
  var require_core = __commonJS({
    "node_modules/highlight.js/lib/core.js"(exports, module) {
      function deepFreeze(obj) {
        if (obj instanceof Map) {
          obj.clear = obj.delete = obj.set = function() {
            throw new Error("map is read-only");
          };
        } else if (obj instanceof Set) {
          obj.add = obj.clear = obj.delete = function() {
            throw new Error("set is read-only");
          };
        }
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((name) => {
          const prop = obj[name];
          const type = typeof prop;
          if ((type === "object" || type === "function") && !Object.isFrozen(prop)) {
            deepFreeze(prop);
          }
        });
        return obj;
      }
      var Response = class {
        /**
         * @param {CompiledMode} mode
         */
        constructor(mode) {
          if (mode.data === void 0)
            mode.data = {};
          this.data = mode.data;
          this.isMatchIgnored = false;
        }
        ignoreMatch() {
          this.isMatchIgnored = true;
        }
      };
      function escapeHTML(value) {
        return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
      }
      function inherit$1(original, ...objects) {
        const result = /* @__PURE__ */ Object.create(null);
        for (const key in original) {
          result[key] = original[key];
        }
        objects.forEach(function(obj) {
          for (const key in obj) {
            result[key] = obj[key];
          }
        });
        return (
          /** @type {T} */
          result
        );
      }
      var SPAN_CLOSE = "</span>";
      var emitsWrappingTags = (node) => {
        return !!node.scope;
      };
      var scopeToCSSClass = (name, { prefix }) => {
        if (name.startsWith("language:")) {
          return name.replace("language:", "language-");
        }
        if (name.includes(".")) {
          const pieces = name.split(".");
          return [
            `${prefix}${pieces.shift()}`,
            ...pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`)
          ].join(" ");
        }
        return `${prefix}${name}`;
      };
      var HTMLRenderer = class {
        /**
         * Creates a new HTMLRenderer
         *
         * @param {Tree} parseTree - the parse tree (must support `walk` API)
         * @param {{classPrefix: string}} options
         */
        constructor(parseTree, options) {
          this.buffer = "";
          this.classPrefix = options.classPrefix;
          parseTree.walk(this);
        }
        /**
         * Adds texts to the output stream
         *
         * @param {string} text */
        addText(text) {
          this.buffer += escapeHTML(text);
        }
        /**
         * Adds a node open to the output stream (if needed)
         *
         * @param {Node} node */
        openNode(node) {
          if (!emitsWrappingTags(node))
            return;
          const className = scopeToCSSClass(
            node.scope,
            { prefix: this.classPrefix }
          );
          this.span(className);
        }
        /**
         * Adds a node close to the output stream (if needed)
         *
         * @param {Node} node */
        closeNode(node) {
          if (!emitsWrappingTags(node))
            return;
          this.buffer += SPAN_CLOSE;
        }
        /**
         * returns the accumulated buffer
        */
        value() {
          return this.buffer;
        }
        // helpers
        /**
         * Builds a span element
         *
         * @param {string} className */
        span(className) {
          this.buffer += `<span class="${className}">`;
        }
      };
      var newNode = (opts = {}) => {
        const result = { children: [] };
        Object.assign(result, opts);
        return result;
      };
      var TokenTree = class _TokenTree {
        constructor() {
          this.rootNode = newNode();
          this.stack = [this.rootNode];
        }
        get top() {
          return this.stack[this.stack.length - 1];
        }
        get root() {
          return this.rootNode;
        }
        /** @param {Node} node */
        add(node) {
          this.top.children.push(node);
        }
        /** @param {string} scope */
        openNode(scope) {
          const node = newNode({ scope });
          this.add(node);
          this.stack.push(node);
        }
        closeNode() {
          if (this.stack.length > 1) {
            return this.stack.pop();
          }
          return void 0;
        }
        closeAllNodes() {
          while (this.closeNode())
            ;
        }
        toJSON() {
          return JSON.stringify(this.rootNode, null, 4);
        }
        /**
         * @typedef { import("./html_renderer").Renderer } Renderer
         * @param {Renderer} builder
         */
        walk(builder) {
          return this.constructor._walk(builder, this.rootNode);
        }
        /**
         * @param {Renderer} builder
         * @param {Node} node
         */
        static _walk(builder, node) {
          if (typeof node === "string") {
            builder.addText(node);
          } else if (node.children) {
            builder.openNode(node);
            node.children.forEach((child) => this._walk(builder, child));
            builder.closeNode(node);
          }
          return builder;
        }
        /**
         * @param {Node} node
         */
        static _collapse(node) {
          if (typeof node === "string")
            return;
          if (!node.children)
            return;
          if (node.children.every((el) => typeof el === "string")) {
            node.children = [node.children.join("")];
          } else {
            node.children.forEach((child) => {
              _TokenTree._collapse(child);
            });
          }
        }
      };
      var TokenTreeEmitter = class extends TokenTree {
        /**
         * @param {*} options
         */
        constructor(options) {
          super();
          this.options = options;
        }
        /**
         * @param {string} text
         */
        addText(text) {
          if (text === "") {
            return;
          }
          this.add(text);
        }
        /** @param {string} scope */
        startScope(scope) {
          this.openNode(scope);
        }
        endScope() {
          this.closeNode();
        }
        /**
         * @param {Emitter & {root: DataNode}} emitter
         * @param {string} name
         */
        __addSublanguage(emitter, name) {
          const node = emitter.root;
          if (name)
            node.scope = `language:${name}`;
          this.add(node);
        }
        toHTML() {
          const renderer = new HTMLRenderer(this, this.options);
          return renderer.value();
        }
        finalize() {
          this.closeAllNodes();
          return true;
        }
      };
      function source(re) {
        if (!re)
          return null;
        if (typeof re === "string")
          return re;
        return re.source;
      }
      function lookahead(re) {
        return concat("(?=", re, ")");
      }
      function anyNumberOfTimes(re) {
        return concat("(?:", re, ")*");
      }
      function optional(re) {
        return concat("(?:", re, ")?");
      }
      function concat(...args) {
        const joined = args.map((x) => source(x)).join("");
        return joined;
      }
      function stripOptionsFromArgs(args) {
        const opts = args[args.length - 1];
        if (typeof opts === "object" && opts.constructor === Object) {
          args.splice(args.length - 1, 1);
          return opts;
        } else {
          return {};
        }
      }
      function either(...args) {
        const opts = stripOptionsFromArgs(args);
        const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source(x)).join("|") + ")";
        return joined;
      }
      function countMatchGroups(re) {
        return new RegExp(re.toString() + "|").exec("").length - 1;
      }
      function startsWith(re, lexeme) {
        const match = re && re.exec(lexeme);
        return match && match.index === 0;
      }
      var BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
      function _rewriteBackreferences(regexps, { joinWith }) {
        let numCaptures = 0;
        return regexps.map((regex) => {
          numCaptures += 1;
          const offset = numCaptures;
          let re = source(regex);
          let out = "";
          while (re.length > 0) {
            const match = BACKREF_RE.exec(re);
            if (!match) {
              out += re;
              break;
            }
            out += re.substring(0, match.index);
            re = re.substring(match.index + match[0].length);
            if (match[0][0] === "\\" && match[1]) {
              out += "\\" + String(Number(match[1]) + offset);
            } else {
              out += match[0];
              if (match[0] === "(") {
                numCaptures++;
              }
            }
          }
          return out;
        }).map((re) => `(${re})`).join(joinWith);
      }
      var MATCH_NOTHING_RE = /\b\B/;
      var IDENT_RE2 = "[a-zA-Z]\\w*";
      var UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
      var NUMBER_RE = "\\b\\d+(\\.\\d+)?";
      var C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
      var BINARY_NUMBER_RE = "\\b(0b[01]+)";
      var RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
      var SHEBANG = (opts = {}) => {
        const beginShebang = /^#![ ]*\//;
        if (opts.binary) {
          opts.begin = concat(
            beginShebang,
            /.*\b/,
            opts.binary,
            /\b.*/
          );
        }
        return inherit$1({
          scope: "meta",
          begin: beginShebang,
          end: /$/,
          relevance: 0,
          /** @type {ModeCallback} */
          "on:begin": (m, resp) => {
            if (m.index !== 0)
              resp.ignoreMatch();
          }
        }, opts);
      };
      var BACKSLASH_ESCAPE = {
        begin: "\\\\[\\s\\S]",
        relevance: 0
      };
      var APOS_STRING_MODE = {
        scope: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [BACKSLASH_ESCAPE]
      };
      var QUOTE_STRING_MODE = {
        scope: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [BACKSLASH_ESCAPE]
      };
      var PHRASAL_WORDS_MODE = {
        begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
      };
      var COMMENT = function(begin, end, modeOptions = {}) {
        const mode = inherit$1(
          {
            scope: "comment",
            begin,
            end,
            contains: []
          },
          modeOptions
        );
        mode.contains.push({
          scope: "doctag",
          // hack to avoid the space from being included. the space is necessary to
          // match here to prevent the plain text rule below from gobbling up doctags
          begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
          end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
          excludeBegin: true,
          relevance: 0
        });
        const ENGLISH_WORD = either(
          // list of common 1 and 2 letter words in English
          "I",
          "a",
          "is",
          "so",
          "us",
          "to",
          "at",
          "if",
          "in",
          "it",
          "on",
          // note: this is not an exhaustive list of contractions, just popular ones
          /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
          // contractions - can't we'd they're let's, etc
          /[A-Za-z]+[-][a-z]+/,
          // `no-way`, etc.
          /[A-Za-z][a-z]{2,}/
          // allow capitalized words at beginning of sentences
        );
        mode.contains.push(
          {
            // TODO: how to include ", (, ) without breaking grammars that use these for
            // comment delimiters?
            // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
            // ---
            // this tries to find sequences of 3 english words in a row (without any
            // "programming" type syntax) this gives us a strong signal that we've
            // TRULY found a comment - vs perhaps scanning with the wrong language.
            // It's possible to find something that LOOKS like the start of the
            // comment - but then if there is no readable text - good chance it is a
            // false match and not a comment.
            //
            // for a visual example please see:
            // https://github.com/highlightjs/highlight.js/issues/2827
            begin: concat(
              /[ ]+/,
              // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
              "(",
              ENGLISH_WORD,
              /[.]?[:]?([.][ ]|[ ])/,
              "){3}"
            )
            // look for 3 words in a row
          }
        );
        return mode;
      };
      var C_LINE_COMMENT_MODE = COMMENT("//", "$");
      var C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
      var HASH_COMMENT_MODE = COMMENT("#", "$");
      var NUMBER_MODE = {
        scope: "number",
        begin: NUMBER_RE,
        relevance: 0
      };
      var C_NUMBER_MODE = {
        scope: "number",
        begin: C_NUMBER_RE,
        relevance: 0
      };
      var BINARY_NUMBER_MODE = {
        scope: "number",
        begin: BINARY_NUMBER_RE,
        relevance: 0
      };
      var REGEXP_MODE = {
        scope: "regexp",
        begin: /\/(?=[^/\n]*\/)/,
        end: /\/[gimuy]*/,
        contains: [
          BACKSLASH_ESCAPE,
          {
            begin: /\[/,
            end: /\]/,
            relevance: 0,
            contains: [BACKSLASH_ESCAPE]
          }
        ]
      };
      var TITLE_MODE = {
        scope: "title",
        begin: IDENT_RE2,
        relevance: 0
      };
      var UNDERSCORE_TITLE_MODE = {
        scope: "title",
        begin: UNDERSCORE_IDENT_RE,
        relevance: 0
      };
      var METHOD_GUARD = {
        // excludes method names from keyword processing
        begin: "\\.\\s*" + UNDERSCORE_IDENT_RE,
        relevance: 0
      };
      var END_SAME_AS_BEGIN = function(mode) {
        return Object.assign(
          mode,
          {
            /** @type {ModeCallback} */
            "on:begin": (m, resp) => {
              resp.data._beginMatch = m[1];
            },
            /** @type {ModeCallback} */
            "on:end": (m, resp) => {
              if (resp.data._beginMatch !== m[1])
                resp.ignoreMatch();
            }
          }
        );
      };
      var MODES = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        APOS_STRING_MODE,
        BACKSLASH_ESCAPE,
        BINARY_NUMBER_MODE,
        BINARY_NUMBER_RE,
        COMMENT,
        C_BLOCK_COMMENT_MODE,
        C_LINE_COMMENT_MODE,
        C_NUMBER_MODE,
        C_NUMBER_RE,
        END_SAME_AS_BEGIN,
        HASH_COMMENT_MODE,
        IDENT_RE: IDENT_RE2,
        MATCH_NOTHING_RE,
        METHOD_GUARD,
        NUMBER_MODE,
        NUMBER_RE,
        PHRASAL_WORDS_MODE,
        QUOTE_STRING_MODE,
        REGEXP_MODE,
        RE_STARTERS_RE,
        SHEBANG,
        TITLE_MODE,
        UNDERSCORE_IDENT_RE,
        UNDERSCORE_TITLE_MODE
      });
      function skipIfHasPrecedingDot(match, response) {
        const before = match.input[match.index - 1];
        if (before === ".") {
          response.ignoreMatch();
        }
      }
      function scopeClassName(mode, _parent) {
        if (mode.className !== void 0) {
          mode.scope = mode.className;
          delete mode.className;
        }
      }
      function beginKeywords(mode, parent) {
        if (!parent)
          return;
        if (!mode.beginKeywords)
          return;
        mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
        mode.__beforeBegin = skipIfHasPrecedingDot;
        mode.keywords = mode.keywords || mode.beginKeywords;
        delete mode.beginKeywords;
        if (mode.relevance === void 0)
          mode.relevance = 0;
      }
      function compileIllegal(mode, _parent) {
        if (!Array.isArray(mode.illegal))
          return;
        mode.illegal = either(...mode.illegal);
      }
      function compileMatch(mode, _parent) {
        if (!mode.match)
          return;
        if (mode.begin || mode.end)
          throw new Error("begin & end are not supported with match");
        mode.begin = mode.match;
        delete mode.match;
      }
      function compileRelevance(mode, _parent) {
        if (mode.relevance === void 0)
          mode.relevance = 1;
      }
      var beforeMatchExt = (mode, parent) => {
        if (!mode.beforeMatch)
          return;
        if (mode.starts)
          throw new Error("beforeMatch cannot be used with starts");
        const originalMode = Object.assign({}, mode);
        Object.keys(mode).forEach((key) => {
          delete mode[key];
        });
        mode.keywords = originalMode.keywords;
        mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
        mode.starts = {
          relevance: 0,
          contains: [
            Object.assign(originalMode, { endsParent: true })
          ]
        };
        mode.relevance = 0;
        delete originalMode.beforeMatch;
      };
      var COMMON_KEYWORDS = [
        "of",
        "and",
        "for",
        "in",
        "not",
        "or",
        "if",
        "then",
        "parent",
        // common variable name
        "list",
        // common variable name
        "value"
        // common variable name
      ];
      var DEFAULT_KEYWORD_SCOPE = "keyword";
      function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
        const compiledKeywords = /* @__PURE__ */ Object.create(null);
        if (typeof rawKeywords === "string") {
          compileList(scopeName, rawKeywords.split(" "));
        } else if (Array.isArray(rawKeywords)) {
          compileList(scopeName, rawKeywords);
        } else {
          Object.keys(rawKeywords).forEach(function(scopeName2) {
            Object.assign(
              compiledKeywords,
              compileKeywords(rawKeywords[scopeName2], caseInsensitive, scopeName2)
            );
          });
        }
        return compiledKeywords;
        function compileList(scopeName2, keywordList) {
          if (caseInsensitive) {
            keywordList = keywordList.map((x) => x.toLowerCase());
          }
          keywordList.forEach(function(keyword) {
            const pair = keyword.split("|");
            compiledKeywords[pair[0]] = [scopeName2, scoreForKeyword(pair[0], pair[1])];
          });
        }
      }
      function scoreForKeyword(keyword, providedScore) {
        if (providedScore) {
          return Number(providedScore);
        }
        return commonKeyword(keyword) ? 0 : 1;
      }
      function commonKeyword(keyword) {
        return COMMON_KEYWORDS.includes(keyword.toLowerCase());
      }
      var seenDeprecations = {};
      var error = (message) => {
        console.error(message);
      };
      var warn = (message, ...args) => {
        console.log(`WARN: ${message}`, ...args);
      };
      var deprecated = (version2, message) => {
        if (seenDeprecations[`${version2}/${message}`])
          return;
        console.log(`Deprecated as of ${version2}. ${message}`);
        seenDeprecations[`${version2}/${message}`] = true;
      };
      var MultiClassError = new Error();
      function remapScopeNames(mode, regexes, { key }) {
        let offset = 0;
        const scopeNames = mode[key];
        const emit = {};
        const positions = {};
        for (let i = 1; i <= regexes.length; i++) {
          positions[i + offset] = scopeNames[i];
          emit[i + offset] = true;
          offset += countMatchGroups(regexes[i - 1]);
        }
        mode[key] = positions;
        mode[key]._emit = emit;
        mode[key]._multi = true;
      }
      function beginMultiClass(mode) {
        if (!Array.isArray(mode.begin))
          return;
        if (mode.skip || mode.excludeBegin || mode.returnBegin) {
          error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
          throw MultiClassError;
        }
        if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
          error("beginScope must be object");
          throw MultiClassError;
        }
        remapScopeNames(mode, mode.begin, { key: "beginScope" });
        mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
      }
      function endMultiClass(mode) {
        if (!Array.isArray(mode.end))
          return;
        if (mode.skip || mode.excludeEnd || mode.returnEnd) {
          error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
          throw MultiClassError;
        }
        if (typeof mode.endScope !== "object" || mode.endScope === null) {
          error("endScope must be object");
          throw MultiClassError;
        }
        remapScopeNames(mode, mode.end, { key: "endScope" });
        mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
      }
      function scopeSugar(mode) {
        if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
          mode.beginScope = mode.scope;
          delete mode.scope;
        }
      }
      function MultiClass(mode) {
        scopeSugar(mode);
        if (typeof mode.beginScope === "string") {
          mode.beginScope = { _wrap: mode.beginScope };
        }
        if (typeof mode.endScope === "string") {
          mode.endScope = { _wrap: mode.endScope };
        }
        beginMultiClass(mode);
        endMultiClass(mode);
      }
      function compileLanguage(language) {
        function langRe(value, global) {
          return new RegExp(
            source(value),
            "m" + (language.case_insensitive ? "i" : "") + (language.unicodeRegex ? "u" : "") + (global ? "g" : "")
          );
        }
        class MultiRegex {
          constructor() {
            this.matchIndexes = {};
            this.regexes = [];
            this.matchAt = 1;
            this.position = 0;
          }
          // @ts-ignore
          addRule(re, opts) {
            opts.position = this.position++;
            this.matchIndexes[this.matchAt] = opts;
            this.regexes.push([opts, re]);
            this.matchAt += countMatchGroups(re) + 1;
          }
          compile() {
            if (this.regexes.length === 0) {
              this.exec = () => null;
            }
            const terminators = this.regexes.map((el) => el[1]);
            this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: "|" }), true);
            this.lastIndex = 0;
          }
          /** @param {string} s */
          exec(s) {
            this.matcherRe.lastIndex = this.lastIndex;
            const match = this.matcherRe.exec(s);
            if (!match) {
              return null;
            }
            const i = match.findIndex((el, i2) => i2 > 0 && el !== void 0);
            const matchData = this.matchIndexes[i];
            match.splice(0, i);
            return Object.assign(match, matchData);
          }
        }
        class ResumableMultiRegex {
          constructor() {
            this.rules = [];
            this.multiRegexes = [];
            this.count = 0;
            this.lastIndex = 0;
            this.regexIndex = 0;
          }
          // @ts-ignore
          getMatcher(index) {
            if (this.multiRegexes[index])
              return this.multiRegexes[index];
            const matcher = new MultiRegex();
            this.rules.slice(index).forEach(([re, opts]) => matcher.addRule(re, opts));
            matcher.compile();
            this.multiRegexes[index] = matcher;
            return matcher;
          }
          resumingScanAtSamePosition() {
            return this.regexIndex !== 0;
          }
          considerAll() {
            this.regexIndex = 0;
          }
          // @ts-ignore
          addRule(re, opts) {
            this.rules.push([re, opts]);
            if (opts.type === "begin")
              this.count++;
          }
          /** @param {string} s */
          exec(s) {
            const m = this.getMatcher(this.regexIndex);
            m.lastIndex = this.lastIndex;
            let result = m.exec(s);
            if (this.resumingScanAtSamePosition()) {
              if (result && result.index === this.lastIndex)
                ;
              else {
                const m2 = this.getMatcher(0);
                m2.lastIndex = this.lastIndex + 1;
                result = m2.exec(s);
              }
            }
            if (result) {
              this.regexIndex += result.position + 1;
              if (this.regexIndex === this.count) {
                this.considerAll();
              }
            }
            return result;
          }
        }
        function buildModeRegex(mode) {
          const mm = new ResumableMultiRegex();
          mode.contains.forEach((term) => mm.addRule(term.begin, { rule: term, type: "begin" }));
          if (mode.terminatorEnd) {
            mm.addRule(mode.terminatorEnd, { type: "end" });
          }
          if (mode.illegal) {
            mm.addRule(mode.illegal, { type: "illegal" });
          }
          return mm;
        }
        function compileMode(mode, parent) {
          const cmode = (
            /** @type CompiledMode */
            mode
          );
          if (mode.isCompiled)
            return cmode;
          [
            scopeClassName,
            // do this early so compiler extensions generally don't have to worry about
            // the distinction between match/begin
            compileMatch,
            MultiClass,
            beforeMatchExt
          ].forEach((ext) => ext(mode, parent));
          language.compilerExtensions.forEach((ext) => ext(mode, parent));
          mode.__beforeBegin = null;
          [
            beginKeywords,
            // do this later so compiler extensions that come earlier have access to the
            // raw array if they wanted to perhaps manipulate it, etc.
            compileIllegal,
            // default to 1 relevance if not specified
            compileRelevance
          ].forEach((ext) => ext(mode, parent));
          mode.isCompiled = true;
          let keywordPattern = null;
          if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
            mode.keywords = Object.assign({}, mode.keywords);
            keywordPattern = mode.keywords.$pattern;
            delete mode.keywords.$pattern;
          }
          keywordPattern = keywordPattern || /\w+/;
          if (mode.keywords) {
            mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
          }
          cmode.keywordPatternRe = langRe(keywordPattern, true);
          if (parent) {
            if (!mode.begin)
              mode.begin = /\B|\b/;
            cmode.beginRe = langRe(cmode.begin);
            if (!mode.end && !mode.endsWithParent)
              mode.end = /\B|\b/;
            if (mode.end)
              cmode.endRe = langRe(cmode.end);
            cmode.terminatorEnd = source(cmode.end) || "";
            if (mode.endsWithParent && parent.terminatorEnd) {
              cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
            }
          }
          if (mode.illegal)
            cmode.illegalRe = langRe(
              /** @type {RegExp | string} */
              mode.illegal
            );
          if (!mode.contains)
            mode.contains = [];
          mode.contains = [].concat(...mode.contains.map(function(c) {
            return expandOrCloneMode(c === "self" ? mode : c);
          }));
          mode.contains.forEach(function(c) {
            compileMode(
              /** @type Mode */
              c,
              cmode
            );
          });
          if (mode.starts) {
            compileMode(mode.starts, parent);
          }
          cmode.matcher = buildModeRegex(cmode);
          return cmode;
        }
        if (!language.compilerExtensions)
          language.compilerExtensions = [];
        if (language.contains && language.contains.includes("self")) {
          throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
        }
        language.classNameAliases = inherit$1(language.classNameAliases || {});
        return compileMode(
          /** @type Mode */
          language
        );
      }
      function dependencyOnParent(mode) {
        if (!mode)
          return false;
        return mode.endsWithParent || dependencyOnParent(mode.starts);
      }
      function expandOrCloneMode(mode) {
        if (mode.variants && !mode.cachedVariants) {
          mode.cachedVariants = mode.variants.map(function(variant) {
            return inherit$1(mode, { variants: null }, variant);
          });
        }
        if (mode.cachedVariants) {
          return mode.cachedVariants;
        }
        if (dependencyOnParent(mode)) {
          return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
        }
        if (Object.isFrozen(mode)) {
          return inherit$1(mode);
        }
        return mode;
      }
      var version = "11.9.0";
      var HTMLInjectionError = class extends Error {
        constructor(reason, html) {
          super(reason);
          this.name = "HTMLInjectionError";
          this.html = html;
        }
      };
      var escape2 = escapeHTML;
      var inherit = inherit$1;
      var NO_MATCH = Symbol("nomatch");
      var MAX_KEYWORD_HITS = 7;
      var HLJS = function(hljs) {
        const languages = /* @__PURE__ */ Object.create(null);
        const aliases = /* @__PURE__ */ Object.create(null);
        const plugins = [];
        let SAFE_MODE = true;
        const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
        const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: "Plain text", contains: [] };
        let options = {
          ignoreUnescapedHTML: false,
          throwUnescapedHTML: false,
          noHighlightRe: /^(no-?highlight)$/i,
          languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
          classPrefix: "hljs-",
          cssSelector: "pre code",
          languages: null,
          // beta configuration options, subject to change, welcome to discuss
          // https://github.com/highlightjs/highlight.js/issues/1086
          __emitter: TokenTreeEmitter
        };
        function shouldNotHighlight(languageName) {
          return options.noHighlightRe.test(languageName);
        }
        function blockLanguage(block) {
          let classes = block.className + " ";
          classes += block.parentNode ? block.parentNode.className : "";
          const match = options.languageDetectRe.exec(classes);
          if (match) {
            const language = getLanguage(match[1]);
            if (!language) {
              warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
              warn("Falling back to no-highlight mode for this block.", block);
            }
            return language ? match[1] : "no-highlight";
          }
          return classes.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
        }
        function highlight2(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
          let code = "";
          let languageName = "";
          if (typeof optionsOrCode === "object") {
            code = codeOrLanguageName;
            ignoreIllegals = optionsOrCode.ignoreIllegals;
            languageName = optionsOrCode.language;
          } else {
            deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
            deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
            languageName = codeOrLanguageName;
            code = optionsOrCode;
          }
          if (ignoreIllegals === void 0) {
            ignoreIllegals = true;
          }
          const context = {
            code,
            language: languageName
          };
          fire("before:highlight", context);
          const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
          result.code = context.code;
          fire("after:highlight", result);
          return result;
        }
        function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
          const keywordHits = /* @__PURE__ */ Object.create(null);
          function keywordData(mode, matchText) {
            return mode.keywords[matchText];
          }
          function processKeywords() {
            if (!top.keywords) {
              emitter.addText(modeBuffer);
              return;
            }
            let lastIndex = 0;
            top.keywordPatternRe.lastIndex = 0;
            let match = top.keywordPatternRe.exec(modeBuffer);
            let buf = "";
            while (match) {
              buf += modeBuffer.substring(lastIndex, match.index);
              const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
              const data = keywordData(top, word);
              if (data) {
                const [kind, keywordRelevance] = data;
                emitter.addText(buf);
                buf = "";
                keywordHits[word] = (keywordHits[word] || 0) + 1;
                if (keywordHits[word] <= MAX_KEYWORD_HITS)
                  relevance += keywordRelevance;
                if (kind.startsWith("_")) {
                  buf += match[0];
                } else {
                  const cssClass = language.classNameAliases[kind] || kind;
                  emitKeyword(match[0], cssClass);
                }
              } else {
                buf += match[0];
              }
              lastIndex = top.keywordPatternRe.lastIndex;
              match = top.keywordPatternRe.exec(modeBuffer);
            }
            buf += modeBuffer.substring(lastIndex);
            emitter.addText(buf);
          }
          function processSubLanguage() {
            if (modeBuffer === "")
              return;
            let result2 = null;
            if (typeof top.subLanguage === "string") {
              if (!languages[top.subLanguage]) {
                emitter.addText(modeBuffer);
                return;
              }
              result2 = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
              continuations[top.subLanguage] = /** @type {CompiledMode} */
              result2._top;
            } else {
              result2 = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
            }
            if (top.relevance > 0) {
              relevance += result2.relevance;
            }
            emitter.__addSublanguage(result2._emitter, result2.language);
          }
          function processBuffer() {
            if (top.subLanguage != null) {
              processSubLanguage();
            } else {
              processKeywords();
            }
            modeBuffer = "";
          }
          function emitKeyword(keyword, scope) {
            if (keyword === "")
              return;
            emitter.startScope(scope);
            emitter.addText(keyword);
            emitter.endScope();
          }
          function emitMultiClass(scope, match) {
            let i = 1;
            const max = match.length - 1;
            while (i <= max) {
              if (!scope._emit[i]) {
                i++;
                continue;
              }
              const klass = language.classNameAliases[scope[i]] || scope[i];
              const text = match[i];
              if (klass) {
                emitKeyword(text, klass);
              } else {
                modeBuffer = text;
                processKeywords();
                modeBuffer = "";
              }
              i++;
            }
          }
          function startNewMode(mode, match) {
            if (mode.scope && typeof mode.scope === "string") {
              emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
            }
            if (mode.beginScope) {
              if (mode.beginScope._wrap) {
                emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
                modeBuffer = "";
              } else if (mode.beginScope._multi) {
                emitMultiClass(mode.beginScope, match);
                modeBuffer = "";
              }
            }
            top = Object.create(mode, { parent: { value: top } });
            return top;
          }
          function endOfMode(mode, match, matchPlusRemainder) {
            let matched = startsWith(mode.endRe, matchPlusRemainder);
            if (matched) {
              if (mode["on:end"]) {
                const resp = new Response(mode);
                mode["on:end"](match, resp);
                if (resp.isMatchIgnored)
                  matched = false;
              }
              if (matched) {
                while (mode.endsParent && mode.parent) {
                  mode = mode.parent;
                }
                return mode;
              }
            }
            if (mode.endsWithParent) {
              return endOfMode(mode.parent, match, matchPlusRemainder);
            }
          }
          function doIgnore(lexeme) {
            if (top.matcher.regexIndex === 0) {
              modeBuffer += lexeme[0];
              return 1;
            } else {
              resumeScanAtSamePosition = true;
              return 0;
            }
          }
          function doBeginMatch(match) {
            const lexeme = match[0];
            const newMode = match.rule;
            const resp = new Response(newMode);
            const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
            for (const cb of beforeCallbacks) {
              if (!cb)
                continue;
              cb(match, resp);
              if (resp.isMatchIgnored)
                return doIgnore(lexeme);
            }
            if (newMode.skip) {
              modeBuffer += lexeme;
            } else {
              if (newMode.excludeBegin) {
                modeBuffer += lexeme;
              }
              processBuffer();
              if (!newMode.returnBegin && !newMode.excludeBegin) {
                modeBuffer = lexeme;
              }
            }
            startNewMode(newMode, match);
            return newMode.returnBegin ? 0 : lexeme.length;
          }
          function doEndMatch(match) {
            const lexeme = match[0];
            const matchPlusRemainder = codeToHighlight.substring(match.index);
            const endMode = endOfMode(top, match, matchPlusRemainder);
            if (!endMode) {
              return NO_MATCH;
            }
            const origin = top;
            if (top.endScope && top.endScope._wrap) {
              processBuffer();
              emitKeyword(lexeme, top.endScope._wrap);
            } else if (top.endScope && top.endScope._multi) {
              processBuffer();
              emitMultiClass(top.endScope, match);
            } else if (origin.skip) {
              modeBuffer += lexeme;
            } else {
              if (!(origin.returnEnd || origin.excludeEnd)) {
                modeBuffer += lexeme;
              }
              processBuffer();
              if (origin.excludeEnd) {
                modeBuffer = lexeme;
              }
            }
            do {
              if (top.scope) {
                emitter.closeNode();
              }
              if (!top.skip && !top.subLanguage) {
                relevance += top.relevance;
              }
              top = top.parent;
            } while (top !== endMode.parent);
            if (endMode.starts) {
              startNewMode(endMode.starts, match);
            }
            return origin.returnEnd ? 0 : lexeme.length;
          }
          function processContinuations() {
            const list = [];
            for (let current = top; current !== language; current = current.parent) {
              if (current.scope) {
                list.unshift(current.scope);
              }
            }
            list.forEach((item) => emitter.openNode(item));
          }
          let lastMatch = {};
          function processLexeme(textBeforeMatch, match) {
            const lexeme = match && match[0];
            modeBuffer += textBeforeMatch;
            if (lexeme == null) {
              processBuffer();
              return 0;
            }
            if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
              modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
              if (!SAFE_MODE) {
                const err = new Error(`0 width match regex (${languageName})`);
                err.languageName = languageName;
                err.badRule = lastMatch.rule;
                throw err;
              }
              return 1;
            }
            lastMatch = match;
            if (match.type === "begin") {
              return doBeginMatch(match);
            } else if (match.type === "illegal" && !ignoreIllegals) {
              const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || "<unnamed>") + '"');
              err.mode = top;
              throw err;
            } else if (match.type === "end") {
              const processed = doEndMatch(match);
              if (processed !== NO_MATCH) {
                return processed;
              }
            }
            if (match.type === "illegal" && lexeme === "") {
              return 1;
            }
            if (iterations > 1e5 && iterations > match.index * 3) {
              const err = new Error("potential infinite loop, way more iterations than matches");
              throw err;
            }
            modeBuffer += lexeme;
            return lexeme.length;
          }
          const language = getLanguage(languageName);
          if (!language) {
            error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
            throw new Error('Unknown language: "' + languageName + '"');
          }
          const md = compileLanguage(language);
          let result = "";
          let top = continuation || md;
          const continuations = {};
          const emitter = new options.__emitter(options);
          processContinuations();
          let modeBuffer = "";
          let relevance = 0;
          let index = 0;
          let iterations = 0;
          let resumeScanAtSamePosition = false;
          try {
            if (!language.__emitTokens) {
              top.matcher.considerAll();
              for (; ; ) {
                iterations++;
                if (resumeScanAtSamePosition) {
                  resumeScanAtSamePosition = false;
                } else {
                  top.matcher.considerAll();
                }
                top.matcher.lastIndex = index;
                const match = top.matcher.exec(codeToHighlight);
                if (!match)
                  break;
                const beforeMatch = codeToHighlight.substring(index, match.index);
                const processedCount = processLexeme(beforeMatch, match);
                index = match.index + processedCount;
              }
              processLexeme(codeToHighlight.substring(index));
            } else {
              language.__emitTokens(codeToHighlight, emitter);
            }
            emitter.finalize();
            result = emitter.toHTML();
            return {
              language: languageName,
              value: result,
              relevance,
              illegal: false,
              _emitter: emitter,
              _top: top
            };
          } catch (err) {
            if (err.message && err.message.includes("Illegal")) {
              return {
                language: languageName,
                value: escape2(codeToHighlight),
                illegal: true,
                relevance: 0,
                _illegalBy: {
                  message: err.message,
                  index,
                  context: codeToHighlight.slice(index - 100, index + 100),
                  mode: err.mode,
                  resultSoFar: result
                },
                _emitter: emitter
              };
            } else if (SAFE_MODE) {
              return {
                language: languageName,
                value: escape2(codeToHighlight),
                illegal: false,
                relevance: 0,
                errorRaised: err,
                _emitter: emitter,
                _top: top
              };
            } else {
              throw err;
            }
          }
        }
        function justTextHighlightResult(code) {
          const result = {
            value: escape2(code),
            illegal: false,
            relevance: 0,
            _top: PLAINTEXT_LANGUAGE,
            _emitter: new options.__emitter(options)
          };
          result._emitter.addText(code);
          return result;
        }
        function highlightAuto(code, languageSubset) {
          languageSubset = languageSubset || options.languages || Object.keys(languages);
          const plaintext = justTextHighlightResult(code);
          const results = languageSubset.filter(getLanguage).filter(autoDetection).map(
            (name) => _highlight(name, code, false)
          );
          results.unshift(plaintext);
          const sorted = results.sort((a, b) => {
            if (a.relevance !== b.relevance)
              return b.relevance - a.relevance;
            if (a.language && b.language) {
              if (getLanguage(a.language).supersetOf === b.language) {
                return 1;
              } else if (getLanguage(b.language).supersetOf === a.language) {
                return -1;
              }
            }
            return 0;
          });
          const [best, secondBest] = sorted;
          const result = best;
          result.secondBest = secondBest;
          return result;
        }
        function updateClassName(element, currentLang, resultLang) {
          const language = currentLang && aliases[currentLang] || resultLang;
          element.classList.add("hljs");
          element.classList.add(`language-${language}`);
        }
        function highlightElement(element) {
          let node = null;
          const language = blockLanguage(element);
          if (shouldNotHighlight(language))
            return;
          fire(
            "before:highlightElement",
            { el: element, language }
          );
          if (element.dataset.highlighted) {
            console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
            return;
          }
          if (element.children.length > 0) {
            if (!options.ignoreUnescapedHTML) {
              console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
              console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
              console.warn("The element with unescaped HTML:");
              console.warn(element);
            }
            if (options.throwUnescapedHTML) {
              const err = new HTMLInjectionError(
                "One of your code blocks includes unescaped HTML.",
                element.innerHTML
              );
              throw err;
            }
          }
          node = element;
          const text = node.textContent;
          const result = language ? highlight2(text, { language, ignoreIllegals: true }) : highlightAuto(text);
          element.innerHTML = result.value;
          element.dataset.highlighted = "yes";
          updateClassName(element, language, result.language);
          element.result = {
            language: result.language,
            // TODO: remove with version 11.0
            re: result.relevance,
            relevance: result.relevance
          };
          if (result.secondBest) {
            element.secondBest = {
              language: result.secondBest.language,
              relevance: result.secondBest.relevance
            };
          }
          fire("after:highlightElement", { el: element, result, text });
        }
        function configure(userOptions) {
          options = inherit(options, userOptions);
        }
        const initHighlighting = () => {
          highlightAll();
          deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
        };
        function initHighlightingOnLoad() {
          highlightAll();
          deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
        }
        let wantsHighlight = false;
        function highlightAll() {
          if (document.readyState === "loading") {
            wantsHighlight = true;
            return;
          }
          const blocks = document.querySelectorAll(options.cssSelector);
          blocks.forEach(highlightElement);
        }
        function boot() {
          if (wantsHighlight)
            highlightAll();
        }
        if (typeof window !== "undefined" && window.addEventListener) {
          window.addEventListener("DOMContentLoaded", boot, false);
        }
        function registerLanguage(languageName, languageDefinition) {
          let lang = null;
          try {
            lang = languageDefinition(hljs);
          } catch (error$1) {
            error("Language definition for '{}' could not be registered.".replace("{}", languageName));
            if (!SAFE_MODE) {
              throw error$1;
            } else {
              error(error$1);
            }
            lang = PLAINTEXT_LANGUAGE;
          }
          if (!lang.name)
            lang.name = languageName;
          languages[languageName] = lang;
          lang.rawDefinition = languageDefinition.bind(null, hljs);
          if (lang.aliases) {
            registerAliases(lang.aliases, { languageName });
          }
        }
        function unregisterLanguage(languageName) {
          delete languages[languageName];
          for (const alias of Object.keys(aliases)) {
            if (aliases[alias] === languageName) {
              delete aliases[alias];
            }
          }
        }
        function listLanguages() {
          return Object.keys(languages);
        }
        function getLanguage(name) {
          name = (name || "").toLowerCase();
          return languages[name] || languages[aliases[name]];
        }
        function registerAliases(aliasList, { languageName }) {
          if (typeof aliasList === "string") {
            aliasList = [aliasList];
          }
          aliasList.forEach((alias) => {
            aliases[alias.toLowerCase()] = languageName;
          });
        }
        function autoDetection(name) {
          const lang = getLanguage(name);
          return lang && !lang.disableAutodetect;
        }
        function upgradePluginAPI(plugin) {
          if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
            plugin["before:highlightElement"] = (data) => {
              plugin["before:highlightBlock"](
                Object.assign({ block: data.el }, data)
              );
            };
          }
          if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
            plugin["after:highlightElement"] = (data) => {
              plugin["after:highlightBlock"](
                Object.assign({ block: data.el }, data)
              );
            };
          }
        }
        function addPlugin(plugin) {
          upgradePluginAPI(plugin);
          plugins.push(plugin);
        }
        function removePlugin(plugin) {
          const index = plugins.indexOf(plugin);
          if (index !== -1) {
            plugins.splice(index, 1);
          }
        }
        function fire(event, args) {
          const cb = event;
          plugins.forEach(function(plugin) {
            if (plugin[cb]) {
              plugin[cb](args);
            }
          });
        }
        function deprecateHighlightBlock(el) {
          deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
          deprecated("10.7.0", "Please use highlightElement now.");
          return highlightElement(el);
        }
        Object.assign(hljs, {
          highlight: highlight2,
          highlightAuto,
          highlightAll,
          highlightElement,
          // TODO: Remove with v12 API
          highlightBlock: deprecateHighlightBlock,
          configure,
          initHighlighting,
          initHighlightingOnLoad,
          registerLanguage,
          unregisterLanguage,
          listLanguages,
          getLanguage,
          registerAliases,
          autoDetection,
          inherit,
          addPlugin,
          removePlugin
        });
        hljs.debugMode = function() {
          SAFE_MODE = false;
        };
        hljs.safeMode = function() {
          SAFE_MODE = true;
        };
        hljs.versionString = version;
        hljs.regex = {
          concat,
          lookahead,
          either,
          optional,
          anyNumberOfTimes
        };
        for (const key in MODES) {
          if (typeof MODES[key] === "object") {
            deepFreeze(MODES[key]);
          }
        }
        Object.assign(hljs, MODES);
        return hljs;
      };
      var highlight = HLJS({});
      highlight.newInstance = () => HLJS({});
      module.exports = highlight;
      highlight.HighlightJS = highlight;
      highlight.default = highlight;
    }
  });

  // node_modules/@starryui/frame/index.js
  var require_frame = __commonJS({
    "node_modules/@starryui/frame/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.frame = exports.defaultFrameConfig = void 0;
      var traits_1 = require_traits();
      exports.defaultFrameConfig = { themeFacet: "frame" };
      exports.frame = (0, traits_1.starryComponent)(function(traits) {
        return function(config) {
          const elem = document.createElement(config?.tagName ?? "div");
          (0, traits_1.applyTraits)(elem, traits, Object.assign({}, exports.defaultFrameConfig, config));
          return elem;
        };
      });
    }
  });

  // src/index.ts
  var import_theme4 = __toESM(require_theme());
  var import_theme_midnight2 = __toESM(require_theme_midnight());

  // src/main-tray.ts
  var import_button = __toESM(require_button());
  var import_layout = __toESM(require_layout());
  var import_menu = __toESM(require_menu());
  var import_theme = __toESM(require_theme());
  var import_theme_midnight = __toESM(require_theme_midnight());
  var import_theme_sandstone = __toESM(require_theme_sandstone());
  var import_traits = __toESM(require_traits());
  var import_tray = __toESM(require_tray());
  (0, import_theme.attachThemeVariables)(
    "body",
    import_theme_midnight.themeMidnight.variables
  );
  (0, import_theme.attachStyle)(
    import_theme_midnight.themeMidnight,
    "body",
    import_theme_midnight.themeMidnight.facets.body
  );
  import_theme.useThemeDimensions.tiny();
  function mainTray(route2, theme) {
    const themedButton = (0, import_theme.applyTheme)(
      theme,
      import_button.button
    );
    const themedMenu = (0, import_theme.applyTheme)(
      theme,
      import_menu.menu
    );
    const themedRow = (0, import_theme.applyTheme)(
      theme,
      import_layout.row
    );
    const themedTray = (0, import_theme.applyTheme)(
      theme,
      import_tray.tray
    );
    const container = themedTray({
      style: {
        zIndex: "1"
      }
    });
    (0, import_theme.attachThemeVariables)(
      container,
      import_theme_midnight.themeMidnight.variables
    );
    document.body.appendChild(container);
    container.appendChild(
      themedButton.add(
        (0, import_button.withButtonImage)("/civil-logo.png"),
        (0, import_traits.withTextContent)("Civil Compute")
      )({ href: "/#", tagName: "a" })
    );
    const breadcrumbs = themedRow();
    container.appendChild(breadcrumbs);
    container.appendChild(
      (0, import_tray.traySpacer)(import_theme_midnight.themeMidnight)
    );
    const themeNameStorageKey = "theme";
    const storedThemeName = localStorage.getItem(
      themeNameStorageKey
    );
    let allThemes = [
      import_theme_midnight.themeMidnight,
      import_theme_sandstone.themeSandstone
    ];
    let activeTheme = allThemes.find(
      (x) => x.name === storedThemeName
    ) ?? import_theme_midnight.themeMidnight;
    const themeSwitcher = document.createElement("div");
    (0, import_theme.attachThemeFacet)(
      themeSwitcher,
      import_theme_midnight.themeMidnight,
      "button"
    );
    themeSwitcher.textContent = activeTheme.name;
    (0, import_menu.attachMenu)(
      themeSwitcher,
      themedMenu.add({
        type: "onSelect",
        onSelect(selectedThemeName) {
          const selectedTheme = allThemes.find(
            (x) => x.name === selectedThemeName
          );
          if (selectedTheme) {
            activeTheme = selectedTheme;
            themeSwitcher.textContent = activeTheme.name;
            localStorage.setItem(
              themeNameStorageKey,
              activeTheme.name
            );
            route2();
          }
        }
      })({
        content(container2) {
          for (const theme2 of allThemes) {
            const pickTheme = document.createElement("div");
            pickTheme.textContent = theme2.name;
            pickTheme.setAttribute(
              "data-value",
              theme2.name
            );
            container2.appendChild(pickTheme);
          }
        }
      })
    );
    container.appendChild(themeSwitcher);
    function withBreadcrumb(path, page3, prefixBreadcrumbs = []) {
      for (const prefixBreadcrumb of prefixBreadcrumbs) {
        const crumb2 = themedButton.add(
          (0, import_traits.withTextContent)(
            prefixBreadcrumb.title
          )
        )({
          href: prefixBreadcrumb.url,
          tagName: "a"
        });
        page3.startUpTasks.initial.push(
          function() {
            crumb2.setAttribute(
              "data-starryui-reveal",
              "hidden"
            );
            breadcrumbs.appendChild(crumb2);
          }
        );
        page3.startUpTasks.final.push(
          function() {
            crumb2.setAttribute(
              "data-starryui-reveal",
              "reveal"
            );
          }
        );
        page3.cleanUpTasks.initial.push(
          function() {
            crumb2.setAttribute(
              "data-starryui-reveal",
              "hidden"
            );
          }
        );
        page3.cleanUpTasks.final.push(
          function() {
            breadcrumbs.removeChild(crumb2);
          }
        );
      }
      const crumb = themedButton.add(
        (0, import_traits.withTextContent)(page3.title)
      )({
        href: path,
        tagName: "a"
      });
      page3.startUpTasks.initial.push(
        function() {
          crumb.setAttribute(
            "data-starryui-reveal",
            "hidden"
          );
          breadcrumbs.appendChild(crumb);
        }
      );
      page3.startUpTasks.final.push(
        function() {
          crumb.setAttribute(
            "data-starryui-reveal",
            "reveal"
          );
        }
      );
      page3.cleanUpTasks.initial.push(
        function() {
          crumb.setAttribute(
            "data-starryui-reveal",
            "hidden"
          );
        }
      );
      page3.cleanUpTasks.final.push(
        function() {
          breadcrumbs.removeChild(crumb);
        }
      );
      return page3;
    }
    return {
      container,
      get activeTheme() {
        return activeTheme;
      },
      withBreadcrumb
    };
  }

  // src/router.ts
  var import_constants = __toESM(require_constants());

  // src/pages/about.ts
  var import_layout2 = __toESM(require_layout());
  var import_page = __toESM(require_page());
  var import_theme2 = __toESM(require_theme());

  // node_modules/@ts-stack/markdown/fesm2022/ts-stack-markdown.mjs
  var ExtendRegexp = class {
    source;
    flags;
    constructor(regex, flags = "") {
      this.source = regex.source;
      this.flags = flags;
    }
    /**
     * Extend regular expression.
     *
     * @param groupName Regular expression for search a group name.
     * @param groupRegexp Regular expression of named group.
     */
    setGroup(groupName, groupRegexp) {
      let newRegexp = typeof groupRegexp == "string" ? groupRegexp : groupRegexp.source;
      newRegexp = newRegexp.replace(/(^|[^\[])\^/g, "$1");
      this.source = this.source.replace(groupName, newRegexp);
      return this;
    }
    /**
     * Returns a result of extending a regular expression.
     */
    getRegexp() {
      return new RegExp(this.source, this.flags);
    }
  };
  var escapeTest = /[&<>"']/;
  var escapeReplace = /[&<>"']/g;
  var replacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    // tslint:disable-next-line:quotemark
    "'": "&#39;"
  };
  var escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
  var escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
  function escape(html, encode) {
    if (encode) {
      if (escapeTest.test(html)) {
        return html.replace(escapeReplace, (ch) => replacements[ch]);
      }
    } else {
      if (escapeTestNoEncode.test(html)) {
        return html.replace(escapeReplaceNoEncode, (ch) => replacements[ch]);
      }
    }
    return html;
  }
  function unescape(html) {
    return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi, function(_, n) {
      n = n.toLowerCase();
      if (n === "colon") {
        return ":";
      }
      if (n.charAt(0) === "#") {
        return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }
      return "";
    });
  }
  var TokenType;
  (function(TokenType2) {
    TokenType2[TokenType2["space"] = 1] = "space";
    TokenType2[TokenType2["text"] = 2] = "text";
    TokenType2[TokenType2["paragraph"] = 3] = "paragraph";
    TokenType2[TokenType2["heading"] = 4] = "heading";
    TokenType2[TokenType2["listStart"] = 5] = "listStart";
    TokenType2[TokenType2["listEnd"] = 6] = "listEnd";
    TokenType2[TokenType2["looseItemStart"] = 7] = "looseItemStart";
    TokenType2[TokenType2["looseItemEnd"] = 8] = "looseItemEnd";
    TokenType2[TokenType2["listItemStart"] = 9] = "listItemStart";
    TokenType2[TokenType2["listItemEnd"] = 10] = "listItemEnd";
    TokenType2[TokenType2["blockquoteStart"] = 11] = "blockquoteStart";
    TokenType2[TokenType2["blockquoteEnd"] = 12] = "blockquoteEnd";
    TokenType2[TokenType2["code"] = 13] = "code";
    TokenType2[TokenType2["table"] = 14] = "table";
    TokenType2[TokenType2["html"] = 15] = "html";
    TokenType2[TokenType2["hr"] = 16] = "hr";
  })(TokenType || (TokenType = {}));
  var MarkedOptions = class {
    gfm = true;
    tables = true;
    breaks = false;
    pedantic = false;
    sanitize = false;
    sanitizer;
    mangle = true;
    smartLists = false;
    silent = false;
    /**
     * @param code The section of code to pass to the highlighter.
     * @param lang The programming language specified in the code block.
     */
    highlight;
    langPrefix = "lang-";
    smartypants = false;
    headerPrefix = "";
    /**
     * An object containing functions to render tokens to HTML. Default: `new Renderer()`
     */
    renderer;
    /**
     * Self-close the tags for void elements (&lt;br/&gt;, &lt;img/&gt;, etc.)
     * with a "/" as required by XHTML.
     */
    xhtml = false;
    /**
     * The function that will be using to escape HTML entities.
     * By default using inner helper.
     */
    escape = escape;
    /**
     * The function that will be using to unescape HTML entities.
     * By default using inner helper.
     */
    unescape = unescape;
    /**
     * If set to `true`, an inline text will not be taken in paragraph.
     *
     * ```ts
     * // isNoP == false
     * Marked.parse('some text'); // returns '<p>some text</p>'
     *
     * Marked.setOptions({isNoP: true});
     *
     * Marked.parse('some text'); // returns 'some text'
     * ```
     */
    isNoP;
  };
  var Renderer = class {
    options;
    constructor(options) {
      this.options = options || Marked.options;
    }
    code(code, lang, escaped, meta) {
      if (this.options.highlight) {
        const out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      }
      const escapedCode = escaped ? code : this.options.escape(code, true);
      if (!lang) {
        return `
<pre><code>${escapedCode}
</code></pre>
`;
      }
      const className = this.options.langPrefix + this.options.escape(lang, true);
      return `
<pre><code class="${className}">${escapedCode}
</code></pre>
`;
    }
    blockquote(quote) {
      return `<blockquote>
${quote}</blockquote>
`;
    }
    html(html) {
      return html;
    }
    heading(text, level, raw) {
      const id = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, "-");
      return `<h${level} id="${id}">${text}</h${level}>
`;
    }
    hr() {
      return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
    }
    list(body, ordered) {
      const type = ordered ? "ol" : "ul";
      return `
<${type}>
${body}</${type}>
`;
    }
    listitem(text) {
      return "<li>" + text + "</li>\n";
    }
    paragraph(text) {
      return "<p>" + text + "</p>\n";
    }
    table(header, body) {
      return `
<table>
<thead>
${header}</thead>
<tbody>
${body}</tbody>
</table>
`;
    }
    tablerow(content) {
      return "<tr>\n" + content + "</tr>\n";
    }
    tablecell(content, flags) {
      const type = flags.header ? "th" : "td";
      const tag = flags.align ? "<" + type + ' style="text-align:' + flags.align + '">' : "<" + type + ">";
      return tag + content + "</" + type + ">\n";
    }
    // *** Inline level renderer methods. ***
    strong(text) {
      return "<strong>" + text + "</strong>";
    }
    em(text) {
      return "<em>" + text + "</em>";
    }
    codespan(text) {
      return "<code>" + text + "</code>";
    }
    br() {
      return this.options.xhtml ? "<br/>" : "<br>";
    }
    del(text) {
      return "<del>" + text + "</del>";
    }
    link(href, title, text) {
      if (this.options.sanitize) {
        let prot;
        try {
          prot = decodeURIComponent(this.options.unescape(href)).replace(/[^\w:]/g, "").toLowerCase();
        } catch (e) {
          return text;
        }
        if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
          return text;
        }
      }
      let out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += ">" + text + "</a>";
      return out;
    }
    image(href, title, text) {
      let out = '<img src="' + href + '" alt="' + text + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += this.options.xhtml ? "/>" : ">";
      return out;
    }
    text(text) {
      return text;
    }
  };
  var InlineLexer = class {
    staticThis;
    links;
    options;
    static rulesBase = null;
    /**
     * Pedantic Inline Grammar.
     */
    static rulesPedantic = null;
    /**
     * GFM Inline Grammar
     */
    static rulesGfm = null;
    /**
     * GFM + Line Breaks Inline Grammar.
     */
    static rulesBreaks = null;
    rules;
    renderer;
    inLink;
    hasRulesGfm;
    ruleCallbacks;
    constructor(staticThis, links, options = Marked.options, renderer) {
      this.staticThis = staticThis;
      this.links = links;
      this.options = options;
      this.renderer = renderer || this.options.renderer || new Renderer(this.options);
      if (!this.links) {
        throw new Error("InlineLexer requires 'links' parameter.");
      }
      this.setRules();
    }
    /**
     * Static Lexing/Compiling Method.
     */
    static output(src, links, options) {
      const inlineLexer = new this(this, links, options);
      return inlineLexer.output(src);
    }
    static getRulesBase() {
      if (this.rulesBase) {
        return this.rulesBase;
      }
      const base = {
        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
        autolink: /^<([^ <>]+(@|:\/)[^ <>]+)>/,
        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^<'">])*?>/,
        link: /^!?\[(inside)\]\(href\)/,
        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
        em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
        code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
        br: /^ {2,}\n(?!\s*$)/,
        text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/,
        _inside: /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,
        _href: /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/
      };
      base.link = new ExtendRegexp(base.link).setGroup("inside", base._inside).setGroup("href", base._href).getRegexp();
      base.reflink = new ExtendRegexp(base.reflink).setGroup("inside", base._inside).getRegexp();
      return this.rulesBase = base;
    }
    static getRulesPedantic() {
      if (this.rulesPedantic) {
        return this.rulesPedantic;
      }
      return this.rulesPedantic = {
        ...this.getRulesBase(),
        ...{
          strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
          em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
        }
      };
    }
    static getRulesGfm() {
      if (this.rulesGfm) {
        return this.rulesGfm;
      }
      const base = this.getRulesBase();
      const escape2 = new ExtendRegexp(base.escape).setGroup("])", "~|])").getRegexp();
      const text = new ExtendRegexp(base.text).setGroup("]|", "~]|").setGroup("|", "|https?://|").getRegexp();
      return this.rulesGfm = {
        ...base,
        ...{
          escape: escape2,
          url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
          del: /^~~(?=\S)([\s\S]*?\S)~~/,
          text
        }
      };
    }
    static getRulesBreaks() {
      if (this.rulesBreaks) {
        return this.rulesBreaks;
      }
      const inline = this.getRulesGfm();
      const gfm = this.getRulesGfm();
      return this.rulesBreaks = {
        ...gfm,
        ...{
          br: new ExtendRegexp(inline.br).setGroup("{2,}", "*").getRegexp(),
          text: new ExtendRegexp(gfm.text).setGroup("{2,}", "*").getRegexp()
        }
      };
    }
    setRules() {
      if (this.options.gfm) {
        if (this.options.breaks) {
          this.rules = this.staticThis.getRulesBreaks();
        } else {
          this.rules = this.staticThis.getRulesGfm();
        }
      } else if (this.options.pedantic) {
        this.rules = this.staticThis.getRulesPedantic();
      } else {
        this.rules = this.staticThis.getRulesBase();
      }
      this.hasRulesGfm = this.rules.url !== void 0;
    }
    /**
     * Lexing/Compiling.
     */
    output(nextPart) {
      let execArr;
      let out = "";
      while (nextPart) {
        if (execArr = this.rules.escape.exec(nextPart)) {
          nextPart = nextPart.substring(execArr[0].length);
          out += execArr[1];
          continue;
        }
        if (execArr = this.rules.autolink.exec(nextPart)) {
          let text;
          let href;
          nextPart = nextPart.substring(execArr[0].length);
          if (execArr[2] === "@") {
            text = this.options.escape(execArr[1].charAt(6) === ":" ? this.mangle(execArr[1].substring(7)) : this.mangle(execArr[1]));
            href = this.mangle("mailto:") + text;
          } else {
            text = this.options.escape(execArr[1]);
            href = text;
          }
          out += this.renderer.link(href, null, text);
          continue;
        }
        if (!this.inLink && this.hasRulesGfm && (execArr = this.rules.url.exec(nextPart))) {
          nextPart = nextPart.substring(execArr[0].length);
          const text = this.options.escape(execArr[1]);
          const href = text;
          out += this.renderer.link(href, null, text);
          continue;
        }
        if (execArr = this.rules.tag.exec(nextPart)) {
          if (!this.inLink && /^<a /i.test(execArr[0])) {
            this.inLink = true;
          } else if (this.inLink && /^<\/a>/i.test(execArr[0])) {
            this.inLink = false;
          }
          nextPart = nextPart.substring(execArr[0].length);
          out += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(execArr[0]) : this.options.escape(execArr[0]) : execArr[0];
          continue;
        }
        if (execArr = this.rules.link.exec(nextPart)) {
          nextPart = nextPart.substring(execArr[0].length);
          this.inLink = true;
          out += this.outputLink(execArr, {
            href: execArr[2],
            title: execArr[3]
          });
          this.inLink = false;
          continue;
        }
        if ((execArr = this.rules.reflink.exec(nextPart)) || (execArr = this.rules.nolink.exec(nextPart))) {
          nextPart = nextPart.substring(execArr[0].length);
          const keyLink = (execArr[2] || execArr[1]).replace(/\s+/g, " ");
          const link = this.links[keyLink.toLowerCase()];
          if (!link || !link.href) {
            out += execArr[0].charAt(0);
            nextPart = execArr[0].substring(1) + nextPart;
            continue;
          }
          this.inLink = true;
          out += this.outputLink(execArr, link);
          this.inLink = false;
          continue;
        }
        if (execArr = this.rules.strong.exec(nextPart)) {
          nextPart = nextPart.substring(execArr[0].length);
          out += this.renderer.strong(this.output(execArr[2] || execArr[1]));
          continue;
        }
        if (execArr = this.rules.em.exec(nextPart)) {
          nextPart = nextPart.substring(execArr[0].length);
          out += this.renderer.em(this.output(execArr[2] || execArr[1]));
          continue;
        }
        if (execArr = this.rules.code.exec(nextPart)) {
          nextPart = nextPart.substring(execArr[0].length);
          out += this.renderer.codespan(this.options.escape(execArr[2].trim(), true));
          continue;
        }
        if (execArr = this.rules.br.exec(nextPart)) {
          nextPart = nextPart.substring(execArr[0].length);
          out += this.renderer.br();
          continue;
        }
        if (this.hasRulesGfm && (execArr = this.rules.del.exec(nextPart))) {
          nextPart = nextPart.substring(execArr[0].length);
          out += this.renderer.del(this.output(execArr[1]));
          continue;
        }
        if (execArr = this.rules.text.exec(nextPart)) {
          nextPart = nextPart.substring(execArr[0].length);
          out += this.renderer.text(this.options.escape(this.smartypants(execArr[0])));
          continue;
        }
        if (nextPart) {
          throw new Error("Infinite loop on byte: " + nextPart.charCodeAt(0));
        }
      }
      return out;
    }
    /**
     * Compile Link.
     */
    outputLink(execArr, link) {
      const href = this.options.escape(link.href);
      const title = link.title ? this.options.escape(link.title) : null;
      return execArr[0].charAt(0) !== "!" ? this.renderer.link(href, title, this.output(execArr[1])) : this.renderer.image(href, title, this.options.escape(execArr[1]));
    }
    /**
     * Smartypants Transformations.
     */
    smartypants(text) {
      if (!this.options.smartypants) {
        return text;
      }
      return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/([{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/([{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
    }
    /**
     * Mangle Links.
     */
    mangle(text) {
      if (!this.options.mangle) {
        return text;
      }
      let out = "";
      const length = text.length;
      for (let i = 0; i < length; i++) {
        let str;
        if (Math.random() > 0.5) {
          str = "x" + text.charCodeAt(i).toString(16);
        }
        out += "&#" + str + ";";
      }
      return out;
    }
  };
  var Parser = class {
    simpleRenderers = [];
    tokens;
    token;
    inlineLexer;
    options;
    renderer;
    line = 0;
    constructor(options) {
      this.tokens = [];
      this.token = null;
      this.options = options || Marked.options;
      this.renderer = this.options.renderer || new Renderer(this.options);
    }
    static parse(tokens, links, options) {
      const parser = new this(options);
      return parser.parse(links, tokens);
    }
    parse(links, tokens) {
      this.inlineLexer = new InlineLexer(InlineLexer, links, this.options, this.renderer);
      this.tokens = tokens.reverse();
      let out = "";
      while (this.next()) {
        out += this.tok();
      }
      return out;
    }
    debug(links, tokens) {
      this.inlineLexer = new InlineLexer(InlineLexer, links, this.options, this.renderer);
      this.tokens = tokens.reverse();
      let out = "";
      while (this.next()) {
        const outToken = this.tok();
        this.token.line = this.line += outToken.split("\n").length - 1;
        out += outToken;
      }
      return out;
    }
    next() {
      return this.token = this.tokens.pop();
    }
    getNextElement() {
      return this.tokens[this.tokens.length - 1];
    }
    parseText() {
      let body = this.token.text;
      let nextElement;
      while ((nextElement = this.getNextElement()) && nextElement.type == TokenType.text) {
        body += "\n" + this.next().text;
      }
      return this.inlineLexer.output(body);
    }
    tok() {
      switch (this.token.type) {
        case TokenType.space: {
          return "";
        }
        case TokenType.paragraph: {
          return this.renderer.paragraph(this.inlineLexer.output(this.token.text));
        }
        case TokenType.text: {
          if (this.options.isNoP) {
            return this.parseText();
          } else {
            return this.renderer.paragraph(this.parseText());
          }
        }
        case TokenType.heading: {
          return this.renderer.heading(this.inlineLexer.output(this.token.text), this.token.depth, this.token.text);
        }
        case TokenType.listStart: {
          let body = "";
          const ordered = this.token.ordered;
          while (this.next().type != TokenType.listEnd) {
            body += this.tok();
          }
          return this.renderer.list(body, ordered);
        }
        case TokenType.listItemStart: {
          let body = "";
          while (this.next().type != TokenType.listItemEnd) {
            body += this.token.type == TokenType.text ? this.parseText() : this.tok();
          }
          return this.renderer.listitem(body);
        }
        case TokenType.looseItemStart: {
          let body = "";
          while (this.next().type != TokenType.listItemEnd) {
            body += this.tok();
          }
          return this.renderer.listitem(body);
        }
        case TokenType.code: {
          return this.renderer.code(this.token.text, this.token.lang, this.token.escaped, this.token.meta);
        }
        case TokenType.table: {
          let header = "";
          let body = "";
          let cell;
          cell = "";
          for (let i = 0; i < this.token.header.length; i++) {
            const flags = { header: true, align: this.token.align[i] };
            const out = this.inlineLexer.output(this.token.header[i]);
            cell += this.renderer.tablecell(out, flags);
          }
          header += this.renderer.tablerow(cell);
          for (const row3 of this.token.cells) {
            cell = "";
            for (let j = 0; j < row3.length; j++) {
              cell += this.renderer.tablecell(this.inlineLexer.output(row3[j]), {
                header: false,
                align: this.token.align[j]
              });
            }
            body += this.renderer.tablerow(cell);
          }
          return this.renderer.table(header, body);
        }
        case TokenType.blockquoteStart: {
          let body = "";
          while (this.next().type != TokenType.blockquoteEnd) {
            body += this.tok();
          }
          return this.renderer.blockquote(body);
        }
        case TokenType.hr: {
          return this.renderer.hr();
        }
        case TokenType.html: {
          const html = !this.token.pre && !this.options.pedantic ? this.inlineLexer.output(this.token.text) : this.token.text;
          return this.renderer.html(html);
        }
        default: {
          if (this.simpleRenderers.length) {
            for (let i = 0; i < this.simpleRenderers.length; i++) {
              if (this.token.type == "simpleRule" + (i + 1)) {
                return this.simpleRenderers[i].call(this.renderer, this.token.execArr);
              }
            }
          }
          const errMsg = `Token with "${this.token.type}" type was not found.`;
          if (this.options.silent) {
            console.log(errMsg);
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
  };
  var Marked = class {
    static options = new MarkedOptions();
    static simpleRenderers = [];
    /**
     * Merges the default options with options that will be set.
     *
     * @param options Hash of options.
     */
    static setOptions(options) {
      Object.assign(this.options, options);
      return this;
    }
    /**
     * Setting simple block rule.
     */
    static setBlockRule(regexp, renderer = () => "") {
      BlockLexer.simpleRules.push(regexp);
      this.simpleRenderers.push(renderer);
      return this;
    }
    /**
     * Accepts Markdown text and returns text in HTML format.
     *
     * @param src String of markdown source to be compiled.
     * @param options Hash of options. They replace, but do not merge with the default options.
     * If you want the merging, you can to do this via `Marked.setOptions()`.
     */
    static parse(src, options) {
      try {
        options = { ...this.options, ...options };
        const { tokens, links } = this.callBlockLexer(src, options);
        return this.callParser(tokens, links, options);
      } catch (e) {
        return this.callMe(e);
      }
    }
    /**
     * Accepts Markdown text and returns object with text in HTML format,
     * tokens and links from `BlockLexer.parser()`.
     *
     * @param src String of markdown source to be compiled.
     * @param options Hash of options. They replace, but do not merge with the default options.
     * If you want the merging, you can to do this via `Marked.setOptions()`.
     */
    static debug(src, options = this.options) {
      const { tokens, links } = this.callBlockLexer(src, options);
      let origin = tokens.slice();
      const parser = new Parser(options);
      parser.simpleRenderers = this.simpleRenderers;
      const result = parser.debug(links, tokens);
      origin = origin.map((token) => {
        token.type = TokenType[token.type] || token.type;
        const line = token.line;
        delete token.line;
        if (line) {
          return { ...{ line }, ...token };
        } else {
          return token;
        }
      });
      return { tokens: origin, links, result };
    }
    static callBlockLexer(src = "", options) {
      if (typeof src != "string") {
        throw new Error(`Expected that the 'src' parameter would have a 'string' type, got '${typeof src}'`);
      }
      src = src.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n").replace(/^ +$/gm, "");
      return BlockLexer.lex(src, options, true);
    }
    static callParser(tokens, links, options) {
      if (this.simpleRenderers.length) {
        const parser = new Parser(options);
        parser.simpleRenderers = this.simpleRenderers;
        return parser.parse(links, tokens);
      } else {
        return Parser.parse(tokens, links, options);
      }
    }
    static callMe(err) {
      err.message += "\nPlease report this to https://github.com/ts-stack/markdown";
      if (this.options.silent) {
        return "<p>An error occured:</p><pre>" + this.options.escape(err.message + "", true) + "</pre>";
      }
      throw err;
    }
  };
  var BlockLexer = class {
    staticThis;
    static simpleRules = [];
    static rulesBase = null;
    /**
     * GFM Block Grammar.
     */
    static rulesGfm = null;
    /**
     * GFM + Tables Block Grammar.
     */
    static rulesTables = null;
    rules;
    options;
    links = {};
    tokens = [];
    hasRulesGfm;
    hasRulesTables;
    constructor(staticThis, options) {
      this.staticThis = staticThis;
      this.options = options || Marked.options;
      this.setRules();
    }
    /**
     * Accepts Markdown text and returns object with tokens and links.
     *
     * @param src String of markdown source to be compiled.
     * @param options Hash of options.
     */
    static lex(src, options, top, isBlockQuote) {
      const lexer = new this(this, options);
      return lexer.getTokens(src, top, isBlockQuote);
    }
    static getRulesBase() {
      if (this.rulesBase) {
        return this.rulesBase;
      }
      const base = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
        blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
        text: /^[^\n]+/,
        bullet: /(?:[*+-]|\d+\.)/,
        item: /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/
      };
      base.item = new ExtendRegexp(base.item, "gm").setGroup(/bull/g, base.bullet).getRegexp();
      base.list = new ExtendRegexp(base.list).setGroup(/bull/g, base.bullet).setGroup("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))").setGroup("def", "\\n+(?=" + base.def.source + ")").getRegexp();
      const tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";
      base.html = new ExtendRegexp(base.html).setGroup("comment", /<!--[\s\S]*?-->/).setGroup("closed", /<(tag)[\s\S]+?<\/\1>/).setGroup("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/).setGroup(/tag/g, tag).getRegexp();
      base.paragraph = new ExtendRegexp(base.paragraph).setGroup("hr", base.hr).setGroup("heading", base.heading).setGroup("lheading", base.lheading).setGroup("blockquote", base.blockquote).setGroup("tag", "<" + tag).setGroup("def", base.def).getRegexp();
      return this.rulesBase = base;
    }
    static getRulesGfm() {
      if (this.rulesGfm) {
        return this.rulesGfm;
      }
      const base = this.getRulesBase();
      const gfm = {
        ...base,
        ...{
          fences: /^ *(`{3,}|~{3,})[ \.]*((\S+)? *[^\n]*)\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
          paragraph: /^/,
          heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
        }
      };
      const group1 = gfm.fences.source.replace("\\1", "\\2");
      const group2 = base.list.source.replace("\\1", "\\3");
      gfm.paragraph = new ExtendRegexp(base.paragraph).setGroup("(?!", `(?!${group1}|${group2}|`).getRegexp();
      return this.rulesGfm = gfm;
    }
    static getRulesTable() {
      if (this.rulesTables) {
        return this.rulesTables;
      }
      return this.rulesTables = {
        ...this.getRulesGfm(),
        ...{
          nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
          table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
        }
      };
    }
    setRules() {
      if (this.options.gfm) {
        if (this.options.tables) {
          this.rules = this.staticThis.getRulesTable();
        } else {
          this.rules = this.staticThis.getRulesGfm();
        }
      } else {
        this.rules = this.staticThis.getRulesBase();
      }
      this.hasRulesGfm = this.rules.fences !== void 0;
      this.hasRulesTables = this.rules.table !== void 0;
    }
    /**
     * Lexing.
     */
    getTokens(src, top, isBlockQuote) {
      let nextPart = src;
      let execArr;
      mainLoop:
        while (nextPart) {
          if (execArr = this.rules.newline.exec(nextPart)) {
            nextPart = nextPart.substring(execArr[0].length);
            if (execArr[0].length > 1) {
              this.tokens.push({ type: TokenType.space });
            }
          }
          if (execArr = this.rules.code.exec(nextPart)) {
            nextPart = nextPart.substring(execArr[0].length);
            const code = execArr[0].replace(/^ {4}/gm, "");
            this.tokens.push({
              type: TokenType.code,
              text: !this.options.pedantic ? code.replace(/\n+$/, "") : code
            });
            continue;
          }
          if (this.hasRulesGfm && (execArr = this.rules.fences.exec(nextPart))) {
            nextPart = nextPart.substring(execArr[0].length);
            this.tokens.push({
              type: TokenType.code,
              meta: execArr[2],
              lang: execArr[3],
              text: execArr[4] || ""
            });
            continue;
          }
          if (execArr = this.rules.heading.exec(nextPart)) {
            nextPart = nextPart.substring(execArr[0].length);
            this.tokens.push({
              type: TokenType.heading,
              depth: execArr[1].length,
              text: execArr[2]
            });
            continue;
          }
          if (top && this.hasRulesTables && (execArr = this.rules.nptable.exec(nextPart))) {
            nextPart = nextPart.substring(execArr[0].length);
            const item = {
              type: TokenType.table,
              header: execArr[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
              align: execArr[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
              cells: []
            };
            for (let i = 0; i < item.align.length; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = "right";
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = "center";
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = "left";
              } else {
                item.align[i] = null;
              }
            }
            const td = execArr[3].replace(/\n$/, "").split("\n");
            for (let i = 0; i < td.length; i++) {
              item.cells[i] = td[i].split(/ *\| */);
            }
            this.tokens.push(item);
            continue;
          }
          if (execArr = this.rules.lheading.exec(nextPart)) {
            nextPart = nextPart.substring(execArr[0].length);
            this.tokens.push({
              type: TokenType.heading,
              depth: execArr[2] === "=" ? 1 : 2,
              text: execArr[1]
            });
            continue;
          }
          if (execArr = this.rules.hr.exec(nextPart)) {
            nextPart = nextPart.substring(execArr[0].length);
            this.tokens.push({ type: TokenType.hr });
            continue;
          }
          if (execArr = this.rules.blockquote.exec(nextPart)) {
            nextPart = nextPart.substring(execArr[0].length);
            this.tokens.push({ type: TokenType.blockquoteStart });
            const str = execArr[0].replace(/^ *> ?/gm, "");
            this.getTokens(str);
            this.tokens.push({ type: TokenType.blockquoteEnd });
            continue;
          }
          if (execArr = this.rules.list.exec(nextPart)) {
            nextPart = nextPart.substring(execArr[0].length);
            const bull = execArr[2];
            this.tokens.push({ type: TokenType.listStart, ordered: bull.length > 1 });
            const str = execArr[0].match(this.rules.item);
            const length = str.length;
            let next = false;
            let space;
            let blockBullet;
            let loose;
            for (let i = 0; i < length; i++) {
              let item = str[i];
              space = item.length;
              item = item.replace(/^ *([*+-]|\d+\.) +/, "");
              if (item.indexOf("\n ") !== -1) {
                space -= item.length;
                item = !this.options.pedantic ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "") : item.replace(/^ {1,4}/gm, "");
              }
              if (this.options.smartLists && i !== length - 1) {
                blockBullet = this.staticThis.getRulesBase().bullet.exec(str[i + 1])[0];
                if (bull !== blockBullet && !(bull.length > 1 && blockBullet.length > 1)) {
                  nextPart = str.slice(i + 1).join("\n") + nextPart;
                  i = length - 1;
                }
              }
              loose = next || /\n\n(?!\s*$)/.test(item);
              if (i !== length - 1) {
                next = item.charAt(item.length - 1) === "\n";
                if (!loose) {
                  loose = next;
                }
              }
              this.tokens.push({ type: loose ? TokenType.looseItemStart : TokenType.listItemStart });
              this.getTokens(item, false, isBlockQuote);
              this.tokens.push({ type: TokenType.listItemEnd });
            }
            this.tokens.push({ type: TokenType.listEnd });
            continue;
          }
          if (execArr = this.rules.html.exec(nextPart)) {
            nextPart = nextPart.substring(execArr[0].length);
            const attr = execArr[1];
            const isPre = attr === "pre" || attr === "script" || attr === "style";
            this.tokens.push({
              type: this.options.sanitize ? TokenType.paragraph : TokenType.html,
              pre: !this.options.sanitizer && isPre,
              text: execArr[0]
            });
            continue;
          }
          if (top && (execArr = this.rules.def.exec(nextPart))) {
            nextPart = nextPart.substring(execArr[0].length);
            this.links[execArr[1].toLowerCase()] = {
              href: execArr[2],
              title: execArr[3]
            };
            continue;
          }
          if (top && this.hasRulesTables && (execArr = this.rules.table.exec(nextPart))) {
            nextPart = nextPart.substring(execArr[0].length);
            const item = {
              type: TokenType.table,
              header: execArr[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
              align: execArr[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
              cells: []
            };
            for (let i = 0; i < item.align.length; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = "right";
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = "center";
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = "left";
              } else {
                item.align[i] = null;
              }
            }
            const td = execArr[3].replace(/(?: *\| *)?\n$/, "").split("\n");
            for (let i = 0; i < td.length; i++) {
              item.cells[i] = td[i].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
            }
            this.tokens.push(item);
            continue;
          }
          if (this.staticThis.simpleRules.length) {
            const simpleRules = this.staticThis.simpleRules;
            for (let i = 0; i < simpleRules.length; i++) {
              if (execArr = simpleRules[i].exec(nextPart)) {
                nextPart = nextPart.substring(execArr[0].length);
                const type = "simpleRule" + (i + 1);
                this.tokens.push({ type, execArr });
                continue mainLoop;
              }
            }
          }
          if (top && (execArr = this.rules.paragraph.exec(nextPart))) {
            nextPart = nextPart.substring(execArr[0].length);
            if (execArr[1].slice(-1) === "\n") {
              this.tokens.push({
                type: TokenType.paragraph,
                text: execArr[1].slice(0, -1)
              });
            } else {
              this.tokens.push({
                type: this.tokens.length > 0 ? TokenType.paragraph : TokenType.text,
                text: execArr[1]
              });
            }
            continue;
          }
          if (execArr = this.rules.text.exec(nextPart)) {
            nextPart = nextPart.substring(execArr[0].length);
            this.tokens.push({ type: TokenType.text, text: execArr[0] });
            continue;
          }
          if (nextPart) {
            throw new Error("Infinite loop on byte: " + nextPart.charCodeAt(0) + `, near text '${nextPart.slice(0, 30)}...'`);
          }
        }
      return { tokens: this.tokens, links: this.links };
    }
  };

  // node_modules/highlight.js/es/core.js
  var import_core = __toESM(require_core(), 1);
  var core_default = import_core.default;

  // node_modules/highlight.js/es/languages/shell.js
  function shell(hljs) {
    return {
      name: "Shell Session",
      aliases: [
        "console",
        "shellsession"
      ],
      contains: [
        {
          className: "meta.prompt",
          // We cannot add \s (spaces) in the regular expression otherwise it will be too broad and produce unexpected result.
          // For instance, in the following example, it would match "echo /path/to/home >" as a prompt:
          // echo /path/to/home > t.exe
          begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
          starts: {
            end: /[^\\](?=\s*$)/,
            subLanguage: "bash"
          }
        }
      ]
    };
  }

  // node_modules/highlight.js/es/languages/typescript.js
  var IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
  var KEYWORDS = [
    "as",
    // for exports
    "in",
    "of",
    "if",
    "for",
    "while",
    "finally",
    "var",
    "new",
    "function",
    "do",
    "return",
    "void",
    "else",
    "break",
    "catch",
    "instanceof",
    "with",
    "throw",
    "case",
    "default",
    "try",
    "switch",
    "continue",
    "typeof",
    "delete",
    "let",
    "yield",
    "const",
    "class",
    // JS handles these with a special rule
    // "get",
    // "set",
    "debugger",
    "async",
    "await",
    "static",
    "import",
    "from",
    "export",
    "extends"
  ];
  var LITERALS = [
    "true",
    "false",
    "null",
    "undefined",
    "NaN",
    "Infinity"
  ];
  var TYPES = [
    // Fundamental objects
    "Object",
    "Function",
    "Boolean",
    "Symbol",
    // numbers and dates
    "Math",
    "Date",
    "Number",
    "BigInt",
    // text
    "String",
    "RegExp",
    // Indexed collections
    "Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Int32Array",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array",
    // Keyed collections
    "Set",
    "Map",
    "WeakSet",
    "WeakMap",
    // Structured data
    "ArrayBuffer",
    "SharedArrayBuffer",
    "Atomics",
    "DataView",
    "JSON",
    // Control abstraction objects
    "Promise",
    "Generator",
    "GeneratorFunction",
    "AsyncFunction",
    // Reflection
    "Reflect",
    "Proxy",
    // Internationalization
    "Intl",
    // WebAssembly
    "WebAssembly"
  ];
  var ERROR_TYPES = [
    "Error",
    "EvalError",
    "InternalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
  ];
  var BUILT_IN_GLOBALS = [
    "setInterval",
    "setTimeout",
    "clearInterval",
    "clearTimeout",
    "require",
    "exports",
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "unescape"
  ];
  var BUILT_IN_VARIABLES = [
    "arguments",
    "this",
    "super",
    "console",
    "window",
    "document",
    "localStorage",
    "sessionStorage",
    "module",
    "global"
    // Node.js
  ];
  var BUILT_INS = [].concat(
    BUILT_IN_GLOBALS,
    TYPES,
    ERROR_TYPES
  );
  function javascript(hljs) {
    const regex = hljs.regex;
    const hasClosingTag = (match, { after }) => {
      const tag = "</" + match[0].slice(1);
      const pos = match.input.indexOf(tag, after);
      return pos !== -1;
    };
    const IDENT_RE$1 = IDENT_RE;
    const FRAGMENT = {
      begin: "<>",
      end: "</>"
    };
    const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
    const XML_TAG = {
      begin: /<[A-Za-z0-9\\._:-]+/,
      end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
      /**
       * @param {RegExpMatchArray} match
       * @param {CallbackResponse} response
       */
      isTrulyOpeningTag: (match, response) => {
        const afterMatchIndex = match[0].length + match.index;
        const nextChar = match.input[afterMatchIndex];
        if (
          // HTML should not include another raw `<` inside a tag
          // nested type?
          // `<Array<Array<number>>`, etc.
          nextChar === "<" || // the , gives away that this is not HTML
          // `<T, A extends keyof T, V>`
          nextChar === ","
        ) {
          response.ignoreMatch();
          return;
        }
        if (nextChar === ">") {
          if (!hasClosingTag(match, { after: afterMatchIndex })) {
            response.ignoreMatch();
          }
        }
        let m;
        const afterMatch = match.input.substring(afterMatchIndex);
        if (m = afterMatch.match(/^\s*=/)) {
          response.ignoreMatch();
          return;
        }
        if (m = afterMatch.match(/^\s+extends\s+/)) {
          if (m.index === 0) {
            response.ignoreMatch();
            return;
          }
        }
      }
    };
    const KEYWORDS$1 = {
      $pattern: IDENT_RE,
      keyword: KEYWORDS,
      literal: LITERALS,
      built_in: BUILT_INS,
      "variable.language": BUILT_IN_VARIABLES
    };
    const decimalDigits = "[0-9](_?[0-9])*";
    const frac = `\\.(${decimalDigits})`;
    const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
    const NUMBER = {
      className: "number",
      variants: [
        // DecimalLiteral
        { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b` },
        { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },
        // DecimalBigIntegerLiteral
        { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
        // NonDecimalIntegerLiteral
        { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
        { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
        { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
        // LegacyOctalIntegerLiteral (does not include underscore separators)
        // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
        { begin: "\\b0[0-7]+n?\\b" }
      ],
      relevance: 0
    };
    const SUBST = {
      className: "subst",
      begin: "\\$\\{",
      end: "\\}",
      keywords: KEYWORDS$1,
      contains: []
      // defined later
    };
    const HTML_TEMPLATE = {
      begin: "html`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST
        ],
        subLanguage: "xml"
      }
    };
    const CSS_TEMPLATE = {
      begin: "css`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST
        ],
        subLanguage: "css"
      }
    };
    const GRAPHQL_TEMPLATE = {
      begin: "gql`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST
        ],
        subLanguage: "graphql"
      }
    };
    const TEMPLATE_STRING = {
      className: "string",
      begin: "`",
      end: "`",
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ]
    };
    const JSDOC_COMMENT = hljs.COMMENT(
      /\/\*\*(?!\/)/,
      "\\*/",
      {
        relevance: 0,
        contains: [
          {
            begin: "(?=@[A-Za-z]+)",
            relevance: 0,
            contains: [
              {
                className: "doctag",
                begin: "@[A-Za-z]+"
              },
              {
                className: "type",
                begin: "\\{",
                end: "\\}",
                excludeEnd: true,
                excludeBegin: true,
                relevance: 0
              },
              {
                className: "variable",
                begin: IDENT_RE$1 + "(?=\\s*(-)|$)",
                endsParent: true,
                relevance: 0
              },
              // eat spaces (not newlines) so we can find
              // types or variables
              {
                begin: /(?=[^\n])\s/,
                relevance: 0
              }
            ]
          }
        ]
      }
    );
    const COMMENT = {
      className: "comment",
      variants: [
        JSDOC_COMMENT,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_LINE_COMMENT_MODE
      ]
    };
    const SUBST_INTERNALS = [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER
      // This is intentional:
      // See https://github.com/highlightjs/highlight.js/issues/3288
      // hljs.REGEXP_MODE
    ];
    SUBST.contains = SUBST_INTERNALS.concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: KEYWORDS$1,
      contains: [
        "self"
      ].concat(SUBST_INTERNALS)
    });
    const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
    const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
      // eat recursive parens in sub expressions
      {
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS$1,
        contains: ["self"].concat(SUBST_AND_COMMENTS)
      }
    ]);
    const PARAMS = {
      className: "params",
      begin: /\(/,
      end: /\)/,
      excludeBegin: true,
      excludeEnd: true,
      keywords: KEYWORDS$1,
      contains: PARAMS_CONTAINS
    };
    const CLASS_OR_EXTENDS = {
      variants: [
        // class Car extends vehicle
        {
          match: [
            /class/,
            /\s+/,
            IDENT_RE$1,
            /\s+/,
            /extends/,
            /\s+/,
            regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
          ],
          scope: {
            1: "keyword",
            3: "title.class",
            5: "keyword",
            7: "title.class.inherited"
          }
        },
        // class Car
        {
          match: [
            /class/,
            /\s+/,
            IDENT_RE$1
          ],
          scope: {
            1: "keyword",
            3: "title.class"
          }
        }
      ]
    };
    const CLASS_REFERENCE = {
      relevance: 0,
      match: regex.either(
        // Hard coded exceptions
        /\bJSON/,
        // Float32Array, OutT
        /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
        // CSSFactory, CSSFactoryT
        /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
        // FPs, FPsT
        /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
        // P
        // single letters are not highlighted
        // BLAH
        // this will be flagged as a UPPER_CASE_CONSTANT instead
      ),
      className: "title.class",
      keywords: {
        _: [
          // se we still get relevance credit for JS library classes
          ...TYPES,
          ...ERROR_TYPES
        ]
      }
    };
    const USE_STRICT = {
      label: "use_strict",
      className: "meta",
      relevance: 10,
      begin: /^\s*['"]use (strict|asm)['"]/
    };
    const FUNCTION_DEFINITION = {
      variants: [
        {
          match: [
            /function/,
            /\s+/,
            IDENT_RE$1,
            /(?=\s*\()/
          ]
        },
        // anonymous function
        {
          match: [
            /function/,
            /\s*(?=\()/
          ]
        }
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      label: "func.def",
      contains: [PARAMS],
      illegal: /%/
    };
    const UPPER_CASE_CONSTANT = {
      relevance: 0,
      match: /\b[A-Z][A-Z_0-9]+\b/,
      className: "variable.constant"
    };
    function noneOf(list) {
      return regex.concat("(?!", list.join("|"), ")");
    }
    const FUNCTION_CALL = {
      match: regex.concat(
        /\b/,
        noneOf([
          ...BUILT_IN_GLOBALS,
          "super",
          "import"
        ]),
        IDENT_RE$1,
        regex.lookahead(/\(/)
      ),
      className: "title.function",
      relevance: 0
    };
    const PROPERTY_ACCESS = {
      begin: regex.concat(/\./, regex.lookahead(
        regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
      )),
      end: IDENT_RE$1,
      excludeBegin: true,
      keywords: "prototype",
      className: "property",
      relevance: 0
    };
    const GETTER_OR_SETTER = {
      match: [
        /get|set/,
        /\s+/,
        IDENT_RE$1,
        /(?=\()/
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        {
          // eat to avoid empty params
          begin: /\(\)/
        },
        PARAMS
      ]
    };
    const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
    const FUNCTION_VARIABLE = {
      match: [
        /const|var|let/,
        /\s+/,
        IDENT_RE$1,
        /\s*/,
        /=\s*/,
        /(async\s*)?/,
        // async is optional
        regex.lookahead(FUNC_LEAD_IN_RE)
      ],
      keywords: "async",
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        PARAMS
      ]
    };
    return {
      name: "JavaScript",
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: KEYWORDS$1,
      // this will be extended by TypeScript
      exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
      illegal: /#(?![$_A-z])/,
      contains: [
        hljs.SHEBANG({
          label: "shebang",
          binary: "node",
          relevance: 5
        }),
        USE_STRICT,
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        HTML_TEMPLATE,
        CSS_TEMPLATE,
        GRAPHQL_TEMPLATE,
        TEMPLATE_STRING,
        COMMENT,
        // Skip numbers when they are part of a variable name
        { match: /\$\d+/ },
        NUMBER,
        CLASS_REFERENCE,
        {
          className: "attr",
          begin: IDENT_RE$1 + regex.lookahead(":"),
          relevance: 0
        },
        FUNCTION_VARIABLE,
        {
          // "value" container
          begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
          keywords: "return throw case",
          relevance: 0,
          contains: [
            COMMENT,
            hljs.REGEXP_MODE,
            {
              className: "function",
              // we have to count the parens to make sure we actually have the
              // correct bounding ( ) before the =>.  There could be any number of
              // sub-expressions inside also surrounded by parens.
              begin: FUNC_LEAD_IN_RE,
              returnBegin: true,
              end: "\\s*=>",
              contains: [
                {
                  className: "params",
                  variants: [
                    {
                      begin: hljs.UNDERSCORE_IDENT_RE,
                      relevance: 0
                    },
                    {
                      className: null,
                      begin: /\(\s*\)/,
                      skip: true
                    },
                    {
                      begin: /\(/,
                      end: /\)/,
                      excludeBegin: true,
                      excludeEnd: true,
                      keywords: KEYWORDS$1,
                      contains: PARAMS_CONTAINS
                    }
                  ]
                }
              ]
            },
            {
              // could be a comma delimited list of params to a function call
              begin: /,/,
              relevance: 0
            },
            {
              match: /\s+/,
              relevance: 0
            },
            {
              // JSX
              variants: [
                { begin: FRAGMENT.begin, end: FRAGMENT.end },
                { match: XML_SELF_CLOSING },
                {
                  begin: XML_TAG.begin,
                  // we carefully check the opening tag to see if it truly
                  // is a tag and not a false positive
                  "on:begin": XML_TAG.isTrulyOpeningTag,
                  end: XML_TAG.end
                }
              ],
              subLanguage: "xml",
              contains: [
                {
                  begin: XML_TAG.begin,
                  end: XML_TAG.end,
                  skip: true,
                  contains: ["self"]
                }
              ]
            }
          ]
        },
        FUNCTION_DEFINITION,
        {
          // prevent this from getting swallowed up by function
          // since they appear "function like"
          beginKeywords: "while if switch catch for"
        },
        {
          // we have to count the parens to make sure we actually have the correct
          // bounding ( ).  There could be any number of sub-expressions inside
          // also surrounded by parens.
          begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
          // end parens
          returnBegin: true,
          label: "func.def",
          contains: [
            PARAMS,
            hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
          ]
        },
        // catch ... so it won't trigger the property rule below
        {
          match: /\.\.\./,
          relevance: 0
        },
        PROPERTY_ACCESS,
        // hack: prevents detection of keywords in some circumstances
        // .keyword()
        // $keyword = x
        {
          match: "\\$" + IDENT_RE$1,
          relevance: 0
        },
        {
          match: [/\bconstructor(?=\s*\()/],
          className: { 1: "title.function" },
          contains: [PARAMS]
        },
        FUNCTION_CALL,
        UPPER_CASE_CONSTANT,
        CLASS_OR_EXTENDS,
        GETTER_OR_SETTER,
        {
          match: /\$[(.]/
          // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
        }
      ]
    };
  }
  function typescript(hljs) {
    const tsLanguage = javascript(hljs);
    const IDENT_RE$1 = IDENT_RE;
    const TYPES2 = [
      "any",
      "void",
      "number",
      "boolean",
      "string",
      "object",
      "never",
      "symbol",
      "bigint",
      "unknown"
    ];
    const NAMESPACE = {
      beginKeywords: "namespace",
      end: /\{/,
      excludeEnd: true,
      contains: [tsLanguage.exports.CLASS_REFERENCE]
    };
    const INTERFACE = {
      beginKeywords: "interface",
      end: /\{/,
      excludeEnd: true,
      keywords: {
        keyword: "interface extends",
        built_in: TYPES2
      },
      contains: [tsLanguage.exports.CLASS_REFERENCE]
    };
    const USE_STRICT = {
      className: "meta",
      relevance: 10,
      begin: /^\s*['"]use strict['"]/
    };
    const TS_SPECIFIC_KEYWORDS = [
      "type",
      "namespace",
      "interface",
      "public",
      "private",
      "protected",
      "implements",
      "declare",
      "abstract",
      "readonly",
      "enum",
      "override"
    ];
    const KEYWORDS$1 = {
      $pattern: IDENT_RE,
      keyword: KEYWORDS.concat(TS_SPECIFIC_KEYWORDS),
      literal: LITERALS,
      built_in: BUILT_INS.concat(TYPES2),
      "variable.language": BUILT_IN_VARIABLES
    };
    const DECORATOR = {
      className: "meta",
      begin: "@" + IDENT_RE$1
    };
    const swapMode = (mode, label, replacement) => {
      const indx = mode.contains.findIndex((m) => m.label === label);
      if (indx === -1) {
        throw new Error("can not find mode to replace");
      }
      mode.contains.splice(indx, 1, replacement);
    };
    Object.assign(tsLanguage.keywords, KEYWORDS$1);
    tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
    tsLanguage.contains = tsLanguage.contains.concat([
      DECORATOR,
      NAMESPACE,
      INTERFACE
    ]);
    swapMode(tsLanguage, "shebang", hljs.SHEBANG());
    swapMode(tsLanguage, "use_strict", USE_STRICT);
    const functionDeclaration = tsLanguage.contains.find((m) => m.label === "func.def");
    functionDeclaration.relevance = 0;
    Object.assign(tsLanguage, {
      name: "TypeScript",
      aliases: [
        "ts",
        "tsx",
        "mts",
        "cts"
      ]
    });
    return tsLanguage;
  }

  // src/markdown.ts
  core_default.registerLanguage(
    "shell",
    shell
  );
  core_default.registerLanguage(
    "typescript",
    typescript
  );
  Marked.setOptions({
    highlight(code, language = "typescript") {
      return core_default.highlight(code, {
        language
      }).value;
    }
  });
  async function renderMarkdownFromPath(path) {
    const response = await fetch(path);
    const source = await response.text();
    return Marked.parse(source);
  }

  // src/pages/about.ts
  function about(theme) {
    const themedPage = (0, import_theme2.applyTheme)(
      theme,
      import_page.page
    );
    return themedPage({
      title: "About",
      content(container, config) {
        const themedColumn = (0, import_theme2.applyTheme)(
          theme,
          import_layout2.column
        );
        const mainArea = themedColumn({
          style: {
            padding: "var(--dimension3) var(--dimension4)"
          },
          themeFacets: ["document", "opaque"]
        });
        container.appendChild(mainArea);
        const themeVariablesStyle = (0, import_theme2.attachThemeVariables)(
          mainArea,
          theme.variables
        );
        mainArea.textContent = "loading...";
        async function load() {
          mainArea.innerHTML = await renderMarkdownFromPath(
            "/pages/about/content.md"
          );
        }
        load().catch((e) => console.warn(e));
        config?.startUpTasks?.initial?.push?.(
          function() {
            if (themeVariablesStyle) {
              document.head.appendChild(
                themeVariablesStyle
              );
            }
          }
        );
        config?.cleanUpTasks?.final?.push(
          function() {
            if (themeVariablesStyle) {
              document.head.removeChild(
                themeVariablesStyle
              );
            }
          }
        );
      }
    });
  }

  // src/pages/home/index.ts
  var import_frame = __toESM(require_frame());
  var import_layout3 = __toESM(require_layout());
  var import_page2 = __toESM(require_page());
  var import_theme3 = __toESM(require_theme());
  function home(theme) {
    const themedPage = (0, import_theme3.applyTheme)(
      theme,
      import_page2.page
    );
    return themedPage({
      title: "Home",
      content(container, config) {
        const themeVariablesStyle = (0, import_theme3.attachThemeVariables)(
          container,
          theme.variables
        );
        const [themedRow] = (0, import_theme3.applyThemeMultiple)(theme, [
          import_layout3.row,
          import_layout3.column,
          import_frame.frame
        ]);
        const topArea = themedRow({
          style: {
            alignItems: "center",
            borderBottom: "1px solid var(--theme2)",
            flexGrow: "0",
            gap: "20px",
            minHeight: "128px",
            justifyContent: "space-evenly",
            padding: "0 var(--dimension4) var(--dimension3) "
          },
          themeFacets: ["document", "opaque"]
        });
        topArea.setAttribute(
          "data-responsive",
          "1"
        );
        const header = document.createElement("h2");
        header.style.minWidth = "150px";
        header.textContent = "Build and host web apps";
        const para0 = document.createElement("p");
        para0.textContent = "Civil Compute is a hosting platform that combines storage and compute with concepts from Literate Programming for runtime introspection of programs.";
        const para1 = document.createElement("p");
        para1.innerHTML = 'Find the source code on <a href="https://github.com/tagmein/civil-compute" target="_blank">GitHub</a>.';
        topArea.appendChild(header);
        topArea.appendChild(para0);
        topArea.appendChild(para1);
        container.appendChild(topArea);
        const mainArea = themedRow({
          style: {
            gap: "10px",
            padding: "10px"
          },
          themeFacets: ["opaque"]
        });
        container.appendChild(mainArea);
        config?.startUpTasks?.initial?.push?.(
          function() {
            if (themeVariablesStyle) {
              document.head.appendChild(
                themeVariablesStyle
              );
            }
          }
        );
        config?.cleanUpTasks?.final?.push(
          function() {
            if (themeVariablesStyle) {
              document.head.removeChild(
                themeVariablesStyle
              );
            }
          }
        );
      }
    });
  }

  // src/router.ts
  function router(topTray2) {
    let activePage;
    const pageCache = /* @__PURE__ */ new Map();
    function loadPage(path, id, theme, param) {
      switch (id) {
        case "about":
          return topTray2.withBreadcrumb(
            path,
            about(theme)
          );
        case "home":
          return home(theme);
        default:
          throw new Error(
            `Page '${id}' not found`
          );
      }
    }
    function getPage(path, id, theme, param) {
      const cacheId = `<theme:${theme.name}><page:${id}><${param}>`;
      if (pageCache.has(cacheId)) {
        return pageCache.get(cacheId);
      }
      const page3 = loadPage(
        path,
        id,
        theme,
        param
      );
      pageCache.set(cacheId, page3);
      return page3;
    }
    async function route2() {
      if (activePage) {
        activePage.element.setAttribute(
          "data-starryui-reveal",
          "hidden"
        );
        await activePage.onUnload?.(false);
        await new Promise(
          (r) => setTimeout(r, import_constants.NORMAL_DELAY_MS)
        );
        document.body.removeChild(
          activePage.element
        );
        await activePage.onUnload?.(true);
        activePage = void 0;
      }
      if (location.hash.match(
        /#\/components\/[^\/+]/
      )) {
        activePage = getPage(
          location.hash,
          "component",
          topTray2.activeTheme,
          location.hash.substring(13)
        );
      } else {
        switch (location.hash) {
          case "":
          case "#":
            activePage = getPage(
              location.hash,
              "home",
              topTray2.activeTheme,
              ""
            );
            break;
          case "#/about":
          case "#/tutorials/2023/09/23/esbuild-supabase":
            activePage = getPage(
              location.hash,
              location.hash.substring(2),
              topTray2.activeTheme,
              ""
            );
            break;
        }
      }
      if (activePage) {
        await activePage.onLoad?.(false);
        activePage.element.setAttribute(
          "data-starryui-reveal",
          "hidden"
        );
        document.body.appendChild(
          activePage.element
        );
        await new Promise(
          (r) => setTimeout(r, import_constants.NORMAL_DELAY_MS)
        );
        activePage.element.setAttribute(
          "data-starryui-reveal",
          "reveal"
        );
        await activePage.onLoad?.(true);
      } else {
        console.warn(
          `Path ${location.hash} did not have an associated page`
        );
      }
    }
    return route2;
  }

  // src/index.ts
  var topTray = mainTray(
    () => route(),
    import_theme_midnight2.themeMidnight
  );
  var route = router(topTray);
  (0, import_theme4.attachThemeVariables)(
    "body",
    import_theme_midnight2.themeMidnight.variables
  );
  (0, import_theme4.attachStyle)(
    import_theme_midnight2.themeMidnight,
    "body",
    import_theme_midnight2.themeMidnight.facets.body
  );
  import_theme4.useThemeDimensions.tiny();
  route();
  addEventListener("hashchange", route);
})();
/*! Bundled license information:

@ts-stack/markdown/fesm2022/ts-stack-markdown.mjs:
  (*
   * @license
   *
   * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
   * https://github.com/chjj/marked
   *
   * Copyright (c) 2018-2021, Костя Третяк. (MIT Licensed)
   * https://github.com/ts-stack/markdown
   *)
  (**
   * @license
   *
   * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
   * https://github.com/chjj/marked
   *
   * Copyright (c) 2018-2021, Костя Третяк. (MIT Licensed)
   * https://github.com/ts-stack/markdown
   *)
  (**
   * @license
   *
   * Copyright (c) 2018-2021, Костя Третяк. (MIT Licensed)
   * https://github.com/ts-stack/markdown
   *)
*/
