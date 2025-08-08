registerComponent(
  "d497f01ca9394a37920ea1004f59093a",
  async function app(doc, loadOriginal) {
    const APPS = {
      explore: "6c89403b99c6448896ca159099fcab88",
      preferences:
        "fc0956d382dc4ea3b236502ad8470c0d",
    };
    return function (components) {
      async function load(appName) {
        if (!(appName in APPS)) {
          throw new Error(
            `${appName} is not a known application`
          );
        }
        const app = await loadOriginal(
          doc,
          `/apps/${appName}.js`,
          APPS[appName]
        );
        return app(components);
      }
      const g = {
        load,
      };
      return g;
    };
  }
);
