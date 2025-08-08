registerComponent(
  "5c59309fba7346a4b96588fc02ad550e",
  async function printer(doc, load) {
    const parseHtmlComponent = await load(
      doc,
      "/parseHtml.js",
      "28c484878691480092aaea9562e31fa6"
    );
    const tabsComponent = await load(
      doc,
      "/tabs.js",
      "51fa578280fa4286b15a32347e677d26"
    );
    return function (components) {
      components.parseHtml = parseHtmlComponent({
        ...components,
      });
      function printerComponent(element) {
        function html(template, ...params) {
          components.tabs = tabsComponent({
            ...components,
            printer: printerComponent,
          });
          const outerContainer = doc.createElement("article");
          const container = doc.createElement("section");
          const subTabs = doc.createElement("section");
          components.parseHtml(container, template, params);
          outerContainer.appendChild(container);
          outerContainer.appendChild(subTabs);
          element.appendChild(outerContainer);
          timestamp();
          const { tab } = components.tabs(subTabs, container);
          return { element: container, tab };
        }
        let lastTimestampText;
        function timestamp() {
          const ts = new Date();
          const timestampText = ts.toLocaleString();
          if (lastTimestampText === timestampText) {
            return;
          }
          lastTimestampText = timestampText;
          const timestampElement = doc.createElement("div");
          timestampElement.classList.add("timestamp");
          timestampElement.textContent = timestampText;
          timestampElement.setAttribute("title", ts.getTime());
          element.appendChild(timestampElement);
        }
        function text(textContent, style) {
          const textElement = doc.createElement("p");
          textElement.textContent = textContent;
          if (style) {
            Object.assign(textElement.style, style);
          }
          element.appendChild(textElement);
          timestamp();
        }
        const p = {
          html,
          text,
          timestamp,
        };
        return p;
      }
      return printerComponent;
    };
  }
);
