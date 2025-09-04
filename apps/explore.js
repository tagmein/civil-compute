registerComponent(
  "6c89403b99c6448896ca159099fcab88",
  async function explore(doc, load) {
    const tableComponent = await load(
      doc,
      "/table.js",
      "63de6cee3a4642d8a04c810bbdf69654"
    );
    const css = doc.createElement("link");
    css.setAttribute("href", "/apps/explore.css");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    let currentPath = "";
    doc.head.appendChild(css);
    return function (components) {
      const table = tableComponent({ ...components });
      return async function (activeConnection) {
        function toHtml(text) {
          return text.replace(/\"/g, "&dquo;");
        }
        async function openItem(name) {
          openSet = [...openSet, name];
          async function onTabClose() {
            openSet = openSet.filter((x) => x !== name);
            await saveLastSet();
          }
          await saveLastSet();
          const fullValue = await activeConnection.getItem(name);
          async function onTabClick() {
            const element = itemTools.element.parentElement;
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            element.style.boxShadow = "inset 0 0 4px 4px #ff0";
            await new Promise((r) => setTimeout(r, 140));
            element.style.boxShadow = "inset 0 0 4px 4px #fe0";
            await new Promise((r) => setTimeout(r, 130));
            element.style.boxShadow = "inset 0 0 4px 4px #fd0";
            await new Promise((r) => setTimeout(r, 120));
            element.style.boxShadow = "inset 0 0 4px 4px #fc0";
            await new Promise((r) => setTimeout(r, 110));
            element.style.boxShadow = "inset 0 0 4px 4px #fb0";
            await new Promise((r) => setTimeout(r, 100));
            element.style.boxShadow = "inset 0 0 4px 4px #fa0";
            await new Promise((r) => setTimeout(r, 1000));
            element.style.boxShadow = "";
          }
          const itemTools = toolbarRef.tab(
            JSON.stringify(name),
            onTabClose,
            onTabClick
          ).printer.html`
                <h3>View item</h3>
                <h4>${toHtml(JSON.stringify(name))}</h4>
                <section style="word-wrap: anywhere; white-space: preserve;">${fullValue}</section>
              `;
          const rawLink = document.createElement("a");
          rawLink.setAttribute("target", "_blank");
          rawLink.classList.add("raw");
          rawLink.textContent = "raw";
          const externalFlag = document.createElement("span");
          externalFlag.classList.add("external");
          externalFlag.textContent = "▜";
          rawLink.appendChild(externalFlag);
          rawLink.setAttribute("href", name);
          itemTools.element.firstElementChild.appendChild(rawLink);
          await components.notes(
            activeConnection,
            "!explore.notes",
            name,
            itemTools.tab("Notes").element
          );
        }
        let showSystemEntries = false;
        let openSet = [];
        let openLastSet =
          (await activeConnection.getItem("!explore.openLastSet")) === "open";
        async function saveLastSet() {
          if (openLastSet) {
            await activeConnection.setItem(
              "!explore.lastSet",
              JSON.stringify(openSet)
            );
          } else {
            await activeConnection.removeItem("!explore.lastSet");
          }
        }
        function itemFilter(item) {
          if (!showSystemEntries) {
            return !item.name.startsWith("!explore.");
          }
          return true;
        }
        let lastItemTableElement;
        let activeKeys =
          "keys" in activeConnection &&
          typeof activeConnection.keys === "function"
            ? await activeConnection.keys()
            : Object.keys(activeConnection);
        const element = doc.createElement("section");
        element.classList.add("app-explore");
        const printer = components.printer(element);
        //printer.text(
        //  `This is explore app, connected to ${activeConnection}. There ${((
        //    l
        //  ) => `${l === 1 ? "is" : "are"} ${l} item${l === 1 ? "" : "s"}`)(
        //    activeKeys.length
        //  )}.`
        //);
        const toolbarRef = printer.html`
          <p style="margin-bottom: 16px;">
            <a onclick=${() => createFile()}>+ file</a>
            <a onclick=${() => createFolder()}>+ folder</a>
          </p>
        `;
        toolbarRef.element.appendChild(
          components.select({
            async action(what) {
              showSystemEntries = what === "show";
              await reloadView();
            },
            options: [
              { value: "show", textContent: "Show system entries" },
              { value: "hide", textContent: "Do not show system entries" },
            ],
            selectedOption: showSystemEntries ? "show" : "hide",
          }).element
        );
        toolbarRef.element.appendChild(
          components.select({
            async action(what) {
              openLastSet = what === "open";
              await activeConnection.setItem("!explore.openLastSet", what);
              await saveLastSet();
            },
            options: [
              {
                value: "open",
                textContent: "Open last opened entries on startup",
              },
              { value: "none", textContent: "No entries open on startup" },
            ],
            selectedOption: openLastSet ? "open" : "none",
          }).element
        );
        const actions = [
          "",
          "open in new tab",
          "view",
          "edit",
          "copy",
          "delete",
        ];
        const columns = [
          "!table:star",
          "name",
          "size",
          "type",
          "value",
          "!table:action",
          "!table:pin",
        ];
        async function onAction(item, e) {
          const value = e.target.value;
          console.log("ACTION", value);
          switch (value) {
            case "":
              return;
            case "open in new tab":
              open(item.name, "_blank");
              break;
            case "view":
              openItem(item.name);
              break;
            case "edit":
              async function submitEdit(e) {
                e.preventDefault();
                for (const inputElement of element.querySelectorAll("input")) {
                  inputElement.setAttribute("disabled", "disabled");
                }
                try {
                  const draftValue = e.target.elements.item(0).value;
                  await activeConnection.setItem(item.name, draftValue);
                  item.value = draftValue;
                  handleChange();
                  await reloadView();
                } catch (e) {
                  console.error(e);
                  for (const inputElement of element.querySelectorAll(
                    "input"
                  )) {
                    inputElement.removeAttribute("disabled");
                  }
                }
              }
              function handleChange() {
                const draftValue = element
                  .querySelector("form")
                  .elements.item(0).value;
                const saveButton = element.querySelector(
                  'input[type="submit"]'
                );
                if (draftValue === item.value) {
                  saveButton.disabled = true;
                  saveButton.disabled = false;
                  saveButton.disabled = true;
                  saveButton.setAttribute("disabled", "disabled");
                  saveButton.disabled = true;
                } else {
                  saveButton.removeAttribute("disabled");
                }
              }
              const editTab = toolbarRef.tab("Edit item");
              editTab.printer.text(
                `Edit item ${toHtml(JSON.stringify(item.name))}`
              );
              const { element } = editTab.printer.html`
                <form onsubmit=${submitEdit}>
                  <textarea name="value" value=${item.value} onkeyup=${handleChange} onchange=${handleChange} />
                  <input type="submit" value="Save" />
                </form>
              `;
              handleChange();
              break;
            case "copy":
              prompt(item.name, item.value);
              break;
            case "delete":
              if (confirm(`Really delete ${JSON.stringify(item.name)}?`)) {
                await activeConnection.removeItem(item.name);
              }
              await reloadView();
              break;
          }
          e.target.value = "";
        }
        async function itemIsPinned(item, pinType) {
          return activeConnection.getItem(
            `!explore.${pinType === "pin" ? "pinned" : "pin:" + pinType}:${
              item.name
            }`
          );
        }
        async function itemSetPinned(item, pinned, pinType) {
          const key = `!explore.${
            pinType === "pin" ? "pinned" : "pin:" + pinType
          }:${item.name}`;
          if (pinned) {
            return activeConnection.setItem(key, "1");
          } else {
            return activeConnection.removeItem(key);
          }
        }
        async function reloadView() {
          activeKeys =
            "keys" in activeConnection &&
            typeof activeConnection.keys === "function"
              ? await activeConnection.keys()
              : Object.keys(activeConnection);
          const itemTable = await table(
            activeConnection,
            activeKeys,
            actions,
            columns,
            onAction,
            itemIsPinned,
            itemSetPinned,
            itemFilter
          );
          if (lastItemTableElement) {
            element.removeChild(lastItemTableElement);
          }
          lastItemTableElement = itemTable.element;
          element.appendChild(itemTable.element);
        }
        const { createFile, createFolder } = await components.manageFolder(
          activeConnection,
          currentPath,
          (title) => toolbarRef.tab(title),
          reloadView
        );
        if (openLastSet) {
          const lastSet = JSON.parse(
            (await activeConnection.getItem("!explore.lastSet")) ?? "[]"
          );
          for (const item of lastSet) {
            await openItem(item);
          }
        }
        await reloadView();
        const e = {
          element,
        };
        return e;
      };
    };
  }
);
