registerComponent(
  "37cbb4b251074eb29adbeab79485743f",
  async function group(doc, load) {
    return function (components) {
      return function (...children) {
        const element = doc.createElement("div");
        element.classList.add("group");
        for (const child of children) {
          element.appendChild(child);
        }
        const g = {
          element,
        };
        return g;
      };
    };
  }
);
