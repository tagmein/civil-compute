registerComponent(
  "778a25cdc3604e92b34a165c70a0a185",
  async function tray(doc, load) {
    return function (components) {
      return function (...children) {
        const element = doc.createElement("div");
        element.classList.add("tray");
        for (const child of children) {
          element.appendChild(child);
        }
        function positionBelow(other) {
          const b = other.getBoundingClientRect();
          element.style.top = `${
            b.top + b.height
          }px`;
          element.style.left = `${b.left}px`;
        }
        const t = {
          element,
          positionBelow,
        };
        return t;
      };
    };
  }
);
