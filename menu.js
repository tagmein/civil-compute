registerComponent(
  "cc604d65619f4a6f840316f33fc7a3fc",
  async function menu(doc, load) {
    const buttonComponent = await load(
      doc,
      "/button.js",
      "347b16a9219f48cf825b4db1b4375121"
    );
    const groupComponent = await load(
      doc,
      "/group.js",
      "37cbb4b251074eb29adbeab79485743f"
    );
    const spaceComponent = await load(
      doc,
      "/space.js",
      "8f2a5bb93f0d47b1935a02c8b929ac0f"
    );
    const stackComponent = await load(
      doc,
      "/stack.js",
      "a7873bef93844efba4322d201c9d6648"
    );
    const trayComponent = await load(
      doc,
      "/tray.js",
      "778a25cdc3604e92b34a165c70a0a185"
    );
    return function (components) {
      components.button = buttonComponent({
        ...components,
      });
      components.group = groupComponent({
        ...components,
      });
      components.space = spaceComponent({
        ...components,
      });
      components.stack = stackComponent({
        ...components,
      });
      components.tray = trayComponent({
        ...components,
      });
      return function () {
        let activeTray;
        const element = doc.createElement("div");
        element.classList.add("menu");
        const group = components.group();
        element.appendChild(group.element);
        group.element.appendChild(
          components.space().element
        );
        function insert(position, config) {
          const tray = components.tray(
            components.stack(
              ...config.items.map(
                (x) =>
                  components.button(
                    x.title,
                    function () {
                      x.action();
                      toggleTray();
                    }
                  ).element
              )
            ).element
          );
          function toggleTray() {
            if (tray.element.parentElement) {
              tray.element.parentElement.removeChild(
                tray.element
              );
              menuButton.element.classList.remove(
                "active"
              );
              activeTray = undefined;
            } else {
              if (activeTray) {
                activeTray();
              }
              doc.body.appendChild(tray.element);
              menuButton.element.classList.add(
                "active"
              );
              tray.positionBelow(
                menuButton.element
              );
              activeTray = toggleTray;
            }
          }
          const menuButton = components.button(
            config.title,
            toggleTray
          );
          const count = group.childElementCount;
          if (count === 0 || position >= count) {
            group.appendChild(menuButton);
          } else {
            group.element.insertBefore(
              menuButton.element,
              group.element.children.item(
                position
              )
            );
          }
        }
        const m = {
          element,
          insert,
        };
        return m;
      };
    };
  }
);
