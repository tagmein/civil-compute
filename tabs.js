registerComponent(
  "51fa578280fa4286b15a32347e677d26",
  async function tabs(doc, load) {
    return function (components) {
      return function (containerElement, informElement) {
        const tabsElement = doc.createElement("div");
        const contentElement = doc.createElement("div");
        tabsElement.classList.add("tabs");
        contentElement.classList.add("tabs-content");
        containerElement.appendChild(tabsElement);
        containerElement.appendChild(contentElement);
        function tab(title, onTabClose, onTabClick) {
          const tabContainer = doc.createElement("div");
          const tabButton = doc.createElement("button");
          tabButton.addEventListener("click", onTabClick);
          const tabCloseButton = doc.createElement("button");
          tabCloseButton.innerHTML = "&times;";
          tabContainer.appendChild(tabButton);
          tabContainer.appendChild(tabCloseButton);
          tabsElement.appendChild(tabContainer);
          const tabContent = doc.createElement("div");
          contentElement.appendChild(tabContent);
          const printer = components.printer(tabContent);
          function close() {
            tabsElement.removeChild(tabContainer);
            contentElement.removeChild(tabContent);
            onTabClose?.();
          }
          function retitle(newTitle = "Untitled") {
            tabButton.textContent = newTitle;
          }
          tabCloseButton.addEventListener("click", close);
          retitle(title);
          return { close, element: tabContent, printer, retitle };
        }
        const t = {
          tabsElement,
          contentElement,
          tab,
        };
        return t;
      };
    };
  }
);
