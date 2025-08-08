const INIT = 1;
const ELEMENT_CONTENT = 2;
const ELEMENT_NAME = 3;
const ELEMENT_ATTRIBUTE_NAME = 4;
const ELEMENT_ATTRIBUTE_VALUE = 5;
const ELEMENT_CLOSE_NAME = 6;
const ELEMENT_OPEN_CLOSE = 7;
const ELEMENT_ATTRIBUTE_VALUE_STRING = 8;

const STATE_LABEL = {
  [INIT]: "INIT",
  [ELEMENT_CONTENT]: "ELEMENT_CONTENT",
  [ELEMENT_NAME]: "ELEMENT_NAME",
  [ELEMENT_ATTRIBUTE_NAME]: "ELEMENT_ATTRIBUTE_NAME",
  [ELEMENT_ATTRIBUTE_VALUE]: "ELEMENT_ATTRIBUTE_VALUE",
  [ELEMENT_CLOSE_NAME]: "ELEMENT_CLOSE_NAME",
  [ELEMENT_OPEN_CLOSE]: "ELEMENT_OPEN_CLOSE",
  [ELEMENT_ATTRIBUTE_VALUE_STRING]: "ELEMENT_ATTRIBUTE_VALUE_STRING",
};

registerComponent(
  "28c484878691480092aaea9562e31fa6",
  async function parsetemplate(doc, load) {
    return function (components) {
      function parseHtml(element, templateParts, params) {
         // console.dir({
         //   element,
         //   templateParts,
         //   params,
         // });
        let state = INIT;
        let buffer = "";
        let currentNode = element;
        let currentElementName = "";
        let elementName = "";
        let restorePreviousNode;
        let attrName, attrValue;
        function createDomElement(tagName) {
          if (typeof tagName !== "string") {
            throw new Error(
              `Missing element name, got ${typeof tagName} ${tagName}`
            );
          }
          const childElement = doc.createElement(tagName);
          currentNode.appendChild(childElement);
          const lastCurrentNode = currentNode;
          const lastElementName = currentElementName;
          currentNode = childElement;
          currentElementName = tagName;
          restorePreviousNode = function () {
            currentNode = lastCurrentNode;
            currentElementName = lastElementName;
          };
          return childElement;
        }
        function flush() {
          const trimmed = buffer.trim();
          buffer = "";
          // console.log("FLUSH", trimmed);
          if (trimmed.length > 0) {
            const textNode = doc.createTextNode(trimmed.replace(/&dquo;/g, "\""));
            currentNode.appendChild(textNode);
          }
        }
        let templateParam;
        for (let part = 0; part < templateParts.length; part++) {
          let isPartParamConsumed = false
          const template = templateParts[part];
          // console.log(
          //   `about to parse this template part: ${template}`
          // );
          for (let i = 0; i < template.length; i++) {
            // console.log(state, STATE_LABEL[state], template[i]);
            if (state === ELEMENT_ATTRIBUTE_VALUE_STRING) {
              switch (template[i]) {
                case '"':
                  currentNode.setAttribute(attrName, buffer);
                  state = ELEMENT_ATTRIBUTE_NAME;
                  attrName = "";
                  buffer = "";
                  break;
                default:
                  buffer += template[i];
              }
              continue;
            }
            // console.log(i, state, template[i], buffer)
            if (part > 0 && typeof params[part - 1] === "string" && !isPartParamConsumed) {
              buffer += params[part - 1]
              flush();
              isPartParamConsumed = true;
            }
            switch (template[i]) {
              case " ":
              case "\n":
                switch (state) {
                  case ELEMENT_CONTENT:
                  case INIT:
                    buffer += template[i];
                    break;
                  case ELEMENT_NAME:
                    createDomElement(buffer);
                    buffer = "";
                    state = ELEMENT_ATTRIBUTE_NAME;
                    break;
                  case ELEMENT_ATTRIBUTE_VALUE:
                    if (buffer.length === 0) {
                      if (attrName.startsWith("on")) {
                        currentNode.addEventListener(
                          attrName.slice(2),
                          params[part - 1]
                        );
                      } else {
                        if (attrName === "value") {
                          currentNode.value = params[part - 1];
                        }
                        currentNode.setAttribute(attrName, params[part - 1]);
                      }
                    } else {
                      currentNode.setAttribute(attrName, buffer);
                    }
                    buffer = "";
                    attrName = "";
                    state = ELEMENT_ATTRIBUTE_NAME;
                  case ELEMENT_ATTRIBUTE_NAME:
                  default:
                    break;
                }
                break;
              case "<":
                switch (state) {
                  case ELEMENT_CONTENT:
                    flush();
                    if (part > 0 && typeof params[part - 1] === "string" && !isPartParamConsumed) {
                      buffer += params[part - 1]
                      flush();
                      isPartParamConsumed = true;
                    }
                    state = ELEMENT_NAME;
                    break
                  default:
                    state = ELEMENT_NAME;
                    flush();
                    break;
                }
                break;
              case "/":
                if (state === ELEMENT_ATTRIBUTE_NAME) {
                  state = ELEMENT_OPEN_CLOSE;
                } else if (state === ELEMENT_NAME) {
                  state = ELEMENT_CLOSE_NAME;
                } else {
                  throw new SyntaxError(
                    `unexpected / at ${i}: ${template.substring(i, i + 20)}${
                      template.length > i + 20 ? "..." : ""
                    }`
                  );
                }
                break;
              case ">":
                switch (state) {
                  case ELEMENT_CLOSE_NAME:
                    if (buffer !== currentElementName) {
                      throw new Error(
                        `can not close </${buffer}> for opening <${currentElementName}>`
                      );
                    }
                    restorePreviousNode();
                    buffer = "";
                    state = INIT;
                    break;
                  case ELEMENT_OPEN_CLOSE:
                    if (buffer.length > 0) {
                      throw new Error(`what to do with $${buffer}`);
                    }
                    restorePreviousNode?.();
                    state = INIT;
                    break;
                  case ELEMENT_NAME:
                    createDomElement(
                      elementName.length > 0 ? elementName : buffer
                    );
                    buffer = "";
                    state = INIT;
                    break;
                  case ELEMENT_ATTRIBUTE_VALUE:
                    switch (attrName) {
                      case "onclick":
                        if (typeof templateParam !== "function") {
                          throw new TypeError(
                            `onclick expects function, got ${typeof templateParam}`
                          );
                        }
                        currentNode.addEventListener("click", templateParam);
                        templateParam = "";
                        buffer = "";
                        break;
                      default:
                        if (attrName.startsWith("on")) {
                          if (typeof templateParam !== "function") {
                            throw new TypeError(
                              `${attrName} expects function, got ${typeof templateParam}`
                            );
                          }
                          currentNode.addEventListener(
                            attrName.slice(2).toLowerCase(),
                            templateParam
                          );
                        } else {
                          currentNode.setAttribute(attrName, buffer);
                        }
                    }
                    attrName = undefined;
                    attrValue = undefined;
                    buffer = "";
                    state = INIT;
                    break;
                  case ELEMENT_ATTRIBUTE_NAME:
                    state = ELEMENT_CONTENT;
                    break;
                }
                break;
              case "=":
                if (state !== ELEMENT_ATTRIBUTE_NAME) {
                  throw new SyntaxError(
                    `(${state}) unexpected = at ${i}: ${template.substring(i, i + 20)}${
                      template.length > i + 20 ? "..." : ""
                    }`
                  );
                }
                attrName = buffer;
                buffer = "";
                state = ELEMENT_ATTRIBUTE_VALUE;
                break;
              case '"':
                switch (state) {
                  case ELEMENT_ATTRIBUTE_NAME:
                    break;
                  case ELEMENT_ATTRIBUTE_VALUE:
                    if (buffer.length > 0) {
                      throw new SyntaxError(
                        `unexpected " at ${i}: ${template.substring(
                          i,
                          i + 20
                        )}${template.length > i + 20 ? "..." : ""}`
                      );
                    }
                    state = ELEMENT_ATTRIBUTE_VALUE_STRING;
                    break;
                  default:
                    throw new SyntaxError(
                      `unexpected " at ${i}: ${template.substring(i, i + 20)}${
                        template.length > i + 20 ? "..." : ""
                      }`
                    );
                }
                break;
              default:
                buffer += template[i];
                break;
            }
          }
          templateParam = params[part];
        }
      }
      return parseHtml;
    };
  }
);
