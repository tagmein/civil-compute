registerComponent(
  "347b16a9219f48cf825b4db1b4375121",
  async function button(doc, load) {
    return function (components) {
      return function (textContent, action) {
        const element =
          doc.createElement("button");
        element.classList.add("button");
        element.textContent = textContent;
        if (typeof action === "function") {
          element.addEventListener(
            "click",
            action
          );
        } else {
          element.setAttribute(
            "disabled",
            "disabled"
          );
        }
        const g = {
          element,
        };
        return g;
      };
    };
  }
);
