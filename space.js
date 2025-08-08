registerComponent(
  "8f2a5bb93f0d47b1935a02c8b929ac0f",
  async function space(doc, load) {
    return function (components) {
      return function () {
        const element = doc.createElement("div");
        element.classList.add("space");
        const s = {
          element,
        };
        return s;
      };
    };
  }
);
