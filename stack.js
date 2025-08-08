registerComponent(
  "a7873bef93844efba4322d201c9d6648",
  async function stack(doc, load) {
    return function (components) {
      return function (...children) {
        const element = doc.createElement("div");
        element.classList.add("stack");
        for (const child of children) {
          element.appendChild(child);
        }
        const s = {
          element,
        };
        return s;
      };
    };
  }
);
