registerComponent(
  "55786c9510744a8385e085ea127ac3a5",
  async function attachStyleSheet(doc, load) {
    return function (components) {
      return function (href) {
        const element = document.createElement("link")
        element.setAttribute("href", href);
        element.setAttribute("rel", "stylesheet");
        element.setAttribute("type", "text/css");
        doc.head.appendChild(element);
        function detach() {
          doc.head.removeChild(element);
        }
        return {
          detach,
          element,
        };
      };
    };
  }
);
