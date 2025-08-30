registerComponent(
  "396b163bb03a485db2b4d9fe42ac8f44",
  async function frame(doc, load) {
    const menuComponent = await load(
      doc,
      "/menu.js",
      "cc604d65619f4a6f840316f33fc7a3fc"
    );
    const selectComponent = await load(
      doc,
      "/select.js",
      "ade53932bf8f4855ac7d1860f7381f42"
    );
    const stackComponent = await load(
      doc,
      "/stack.js",
      "a7873bef93844efba4322d201c9d6648"
    );
    return function (components) {
      components.menu = menuComponent({
        ...components,
      });
      components.select = selectComponent({
        ...components,
      });
      components.stack = stackComponent({
        ...components,
      });
      let updateInternal;
      const menu = components.menu();
      const connection = components.select({
        textContent: "Connection",
        options: [
          {
            textContent: "Disk",
            value: "disk",
          },
          {
            textContent: "Local Storage",
            value: "localStorage",
          },
          {
            textContent: "Session Storage",
            value: "sessionStorage",
          },
        ],
        storageKey: "connection",
        async action(selectedConnection) {
          activeConnection = globalThis[selectedConnection];
          console.log(
            `connected to ${selectedConnection}: ${typeof activeConnection} activeConnection ${activeConnection}`
          );
          await updateInternal?.();
        },
      });
      const contentElement = doc.createElement("div");
      contentElement.classList.add("content");
      const container = components.stack(
        connection.element,
        menu.element,
        contentElement
      );
      const element = document.createElement("div");
      element.classList.add("frame");
      element.appendChild(container.element);
      async function home() {
        const appManager = components.app(components);
        const exploreApp = await appManager.load("explore");
        updateInternal = async function () {
          contentElement.textContent = "";
          const exploreAppInstance = await exploreApp(activeConnection);
          contentElement.appendChild(exploreAppInstance.element);
        };
        await updateInternal();
      }
      menu.insert(0, {
        title: "Go",
        items: [
          {
            title: "Explore",
            action: home,
          },
        ],
      });
      menu.insert(0, {
        title: "Frame",
        items: [
          {
            title: "Clear",
            async action() {
              contentElement.textContent = "";
            },
          },
          {
            title: "Fullscreen",
            async action() {
              contentElement.requestFullscreen();
            },
          },
        ],
      });
      const f = {
        get activeConnection() {
          return activeConnection;
        },
        contentElement,
        element,
        home,
        menu,
        get update() {
          return updateInternal;
        },
        set update(value) {
          updateInternal = value;
        },
      };
      return f;
    };
  }
);
