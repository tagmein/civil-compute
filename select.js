registerComponent(
  "ade53932bf8f4855ac7d1860f7381f42",
  async function select(doc, load) {
    return function (components) {
      return function ({
        action,
        fireImmediate = true,
        options,
        selectedOption = undefined,
        storageKey = undefined,
        textContent,
      }) {
        const element =
          doc.createElement("select");
        element.classList.add("button", "select");
        element.setAttribute(
          "name",
          textContent ?? storageKey
        );
        element.textContent = textContent;
        for (const option of options) {
          const optionElement =
            doc.createElement("option");
          optionElement.setAttribute(
            "label",
            option.textContent
          );
          optionElement.setAttribute(
            "value",
            option.value
          );
          element.appendChild(optionElement);
        }
        if (typeof selectedOption !== "undefined") {
          element.selectedIndex = options.findIndex(option => option.value === selectedOption)
        }
        if (typeof action === "function") {
          element.addEventListener(
            "change",
            async function () {
              await action(element.value);
              if (
                typeof storageKey === "string"
              ) {
                sessionStorage.setItem(
                  storageKey,
                  element.value
                );
              }
            }
          );
          if (
            typeof selectedOption ===
              "undefined" &&
            options.length > 0
          ) {
            function noStoredValue() {
              if (fireImmediate) {
                action(options[0].value);
              }
            }
            if (typeof storageKey === "string") {
              const storedValue =
                sessionStorage.getItem(
                  storageKey
                ) ??
                localStorage.getItem(storageKey);
              if (
                options.some(
                  (o) => o.value === storedValue
                )
              ) {
                element.value = storedValue;
                if (fireImmediate) {
                  action(storedValue);
                } else {
                  noStoredValue();
                }
              } else {
                noStoredValue();
              }
            } else {
              noStoredValue();
            }
          }
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
