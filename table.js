registerComponent(
  "63de6cee3a4642d8a04c810bbdf69654",
  async function table(doc, load) {
    return function (components) {
      components.attachStyleSheet("/table.css");
      return async function (
        connection,
        keys,
        actions,
        columns,
        onAction,
        itemIsPinned,
        itemSetPinned,
        itemFilter
      ) {
        const table = doc.createElement("table");
        const thead = doc.createElement("thead");
        const thead_tr = doc.createElement("tr");
        const tbody = doc.createElement("tbody");
        for (const col of columns) {
          const th = doc.createElement("th");
          th.textContent = col.startsWith("!table:")
            ? ((x) => `${x[0].toUpperCase()}${x.substring(1)}`)(
                col.substring("!table:".length)
              )
            : col;
          thead_tr.appendChild(th);
        }
        thead.appendChild(thead_tr);
        function applyTableRowOrder() {
          const rows = tbody.children;
          // console.log({ rows });
          const buckets = new Map();
          for (const row of rows) {
            const order = row.style.order ? parseInt(row.style.order, 10) : 0;
            if (!buckets.has(order)) {
              buckets.set(order, []);
            }
            buckets.get(order).push(row);
          }
          const allKeys = Array.from(buckets.keys())
            .map((x) => parseInt(x, 10))
            .sort();
          for (const key of allKeys) {
            for (const row of buckets.get(key)) {
              tbody.appendChild(row);
            }
          }
        }
        function getItemType(name, value) {
          if (name.endsWith("/") && value.startsWith("!folder")) {
            return "folder";
          }
          return "text";
        }
        for (const key of keys) {
          const value = await connection.getItem(key);
          const item = {
            name: key,
            size: value.length,
            type: getItemType(key, value),
            valuePreview:
              value.length > 100 ? value.substring(0, 97) + "..." : value,
            value,
          };
          if (!itemFilter(item)) {
            continue;
          }
          // console.log(item)
          const item_tr = doc.createElement("tr");
          for (const col of columns) {
            const item_property_td = doc.createElement("td");
            switch (col) {
              case "!table:action":
                const select = document.createElement("select");
                select.addEventListener("change", (e) => onAction(item, e));
                for (const action of actions) {
                  const opt = document.createElement("option");
                  opt.setAttribute(
                    "label",
                    action.length > 0 ? action : "Action"
                  );
                  opt.setAttribute("value", action);
                  select.appendChild(opt);
                }
                item_property_td.appendChild(select);
                break;
              case "!table:star":
              case "!table:pin": {
                const pinButton = document.createElement("button");
                pinButton.classList.add("table--pin--button");
                const pin = document.createElement("span");
                pin.classList.add("table--pin");
                const type = col.slice("!table:".length);
                pin.textContent = type === "star" ? "⭐" : "📌";
                let isPinned = await itemIsPinned(item, type);
                function applyState() {
                  if (isPinned) {
                    pin.classList.add("pinned");
                    item_tr.style.order = "0";
                  } else {
                    pin.classList.remove("pinned");
                    item_tr.style.order = "1";
                  }
                  applyTableRowOrder();
                }
                applyState();
                pinButton.addEventListener("click", async function () {
                  isPinned = !isPinned;
                  pinButton.setAttribute("disabled", "disabled");
                  await itemSetPinned(item, isPinned, type);
                  applyState();
                  pinButton.removeAttribute("disabled", "disabled");
                });
                pinButton.appendChild(pin);
                item_property_td.appendChild(pinButton);
                break;
              }
              case "name":
                if (item.type === "folder") {
                  const nameLink = doc.createElement("a");
                  nameLink.addEventListener("click", function () {
                    onAction(item, { target: { value: "view" } });
                  });
                  nameLink.textContent = item[col].substring(
                    0,
                    item[col].length - 1
                  );
                  item_property_td.appendChild(nameLink);
                  break;
                }
                const nameCell = doc.createElement("span");
                nameCell.textContent = item[col];
                item_property_td.appendChild(nameCell);
                break;
              case "value":
                if (item.type === "folder") {
                  break;
                }
                const valueLink = doc.createElement("a");
                valueLink.addEventListener("click", function () {
                  onAction(item, { target: { value: "view" } });
                });
                valueLink.textContent = item.valuePreview;
                item_property_td.appendChild(valueLink);
                break;
              default:
                const dataCell = doc.createElement("span");
                dataCell.textContent = item[col];
                item_property_td.appendChild(dataCell);
            }
            item_tr.appendChild(item_property_td);
          }
          tbody.appendChild(item_tr);
        }
        table.appendChild(thead);
        applyTableRowOrder();
        table.appendChild(tbody);
        const t = { element: table };
        return t;
      };
    };
  }
);

async function itemTable(doc) {}
