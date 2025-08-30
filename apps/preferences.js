registerComponent(
  "fc0956d382dc4ea3b236502ad8470c0d",
  async function preferences(doc, load) {
    const css = doc.createElement("link");
    css.setAttribute("href", "/apps/preferences.css");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    doc.head.appendChild(css);
    return function (components) {
      return async function (activeConnection) {
        const element = doc.createElement("section");
        element.classList.add("app-preferences");
        const printer = components.printer(element);
        printer.text(
          `This is preferences app, connected to ${activeConnection}. There ${((
            l
          ) => `${l === 1 ? "is" : "are"} ${l} item${l === 1 ? "" : "s"}`)(
            "keys" in activeConnection &&
              typeof activeConnection.keys === "function"
              ? await activeConnection.keys().length
              : Object.keys(activeConnection).length
          )}.`
        );
        const g = {
          element,
        };
        return g;
      };
    };
  }
);
