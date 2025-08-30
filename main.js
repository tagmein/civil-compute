const NAME = "Civil Compute";

const MAJOR = 0,
  MINOR = 0,
  PATCH = 0;

const INC = 1;
const NUL = 0;
const DEC = -1;

const KEYLEN = 0x20;

const INTERVAL = 5e2;
const TIMEOUT = 5e3;

const VERSION = ((h) => `${h(MAJOR)}.${h(MINOR)}.${h(PATCH)}`)((n) =>
  n.toString(0x10)
);

console.log(`Civil Compute ${VERSION}`);

async function load(doc, src, key) {
  if (key.length !== KEYLEN) {
    throw new Error(`Key must be of length ${KEYLEN.toString(10)}`);
  }
  return new Promise(function (resolve, reject) {
    const timeout = setTimeout(function () {
      clearInterval(interval);
      reject(`timeout after ${TIMEOUT}ms`);
    }, TIMEOUT);
    const interval = setInterval(function () {}, INTERVAL);
    componentResolvers[key] = function (x) {
      clearInterval(interval);
      clearTimeout(timeout);
      resolve(x);
    };
    const s = doc.createElement("script");
    s.setAttribute("src", src);
    doc.head.appendChild(s);
  });
}

const components = { load };
const componentResolvers = {};

async function main(doc) {
  globalThis.registerComponent = async function (key, component) {
    if (!(key in componentResolvers)) {
      throw new Error(`Component ${key} not found`);
    }
    const resolve = componentResolvers[key];
    delete componentResolvers[key];
    resolve(await component(doc, load));
  };
  const httpKV = await components.load(
    doc,
    "/httpKV.js",
    "8dci6lm4kesdkq67 6384hps9qe49dls"
  );
  components.httpKV = httpKV();
  components.app = await components.load(
    doc,
    "/app.js",
    "d497f01ca9394a37920ea1004f59093a"
  );
  components.attachStyleSheet = (
    await components.load(
      doc,
      "/attachStyleSheet.js",
      "55786c9510744a8385e085ea127ac3a5"
    )
  )();
  components.frame = await components.load(
    doc,
    "/frame.js",
    "396b163bb03a485db2b4d9fe42ac8f44"
  );
  components.manageFolder = await components.load(
    doc,
    "/manageFolder.js",
    "854b254976844797a7e7a5ece1fcf966"
  );
  components.printer = (
    await components.load(
      doc,
      "/printer.js",
      "5c59309fba7346a4b96588fc02ad550e"
    )
  )({ ...components });
  components.notes = (
    await components.load(doc, "/notes.js", "91952fa55f7d42fc8f565f071b583d7d")
  )({ ...components });
  const httpDiskKV = components.httpKV({
    baseUrl: location.origin + "/?mode=disk",
  });
  const disk = (globalThis.disk = {
    async keys() {
      const index = await httpDiskKV.get("!explore.index");
      try {
        return typeof index === "string" && index.length > 0
          ? JSON.parse(index)
          : [];
      } catch (e) {
        console.error(e);
        return ["Error"];
      }
    },
    async getItem(key) {
      return httpDiskKV.get(key);
    },
    async setItem(key, value) {
      const index = await disk.keys();
      if (index.indexOf(key) === -1) {
        await httpDiskKV.set(
          "!explore.index",
          JSON.stringify(index.concat([key]))
        );
      }
      return httpDiskKV.set(key, value);
    },
    async removeItem(key) {
      await httpDiskKV.set(
        "!explore.index",
        JSON.stringify((await globalThis.disk.keys()).filter((x) => x !== key))
      );
      return httpDiskKV.delete(key);
    },
  });
  globalThis.mainFrame = await components.frame({
    ...components,
  });
  mainFrame.menu.insert(0, {
    title: "System",
    items: [
      {
        title: "About",
        action() {
          const about = document.createElement("article");
          about.classList.add("about");
          mainFrame.contentElement.textContent = "";
          mainFrame.contentElement.appendChild(about);
          components.printer(about).text(`${NAME} ${VERSION}`, {
            fontSize: "125%",
          });
        },
      },
      {
        title: "Preferences",
        async action() {
          mainFrame.update = async function () {
            mainFrame.contentElement.textContent = "";
            const appManager = components.app(components);
            const preferencesApp = await appManager.load("preferences");
            mainFrame.contentElement.appendChild(
              (await preferencesApp(mainFrame.activeConnection)).element
            );
          };
          await mainFrame.update();
        },
      },
      {
        title: "Reset",
        action() {
          location.reload();
        },
      },
    ],
  });
  mainFrame.home();
  components.attachStyleSheet("/main.css");
  doc.body.appendChild(mainFrame.element);
  console.log(`Civil Compute initialized in ${Date.now() - initTimestamp}ms`);
}

main(document).catch((e) => console.error(e));
