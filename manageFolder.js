let uniqueTab = 0

registerComponent(
  "854b254976844797a7e7a5ece1fcf966",
  async function manageFolder(doc, load) {
//    return function (components) {
      return function (
        activeConnection,
        path,
        tab,
        reloadView
      ) {
        console.log(
	        `manageFolder on connection ${activeConnection} with path ${JSON.stringify(
	          path
	        )}`
        );
        return {
	        createFile() {
	          let name = "",
	            value = "";
	          function updateName(e) {
	            name = e.target.value;
	          }
	          function updateValue(e) {
	            console.log("updated value", e.target.value);
	            value = e.target.value;
	          }
	          async function createFileSubmit() {
	            console.log("should create file", name, value);
	            await activeConnection.setItem(name, value);
	            createTab.close();
	            await reloadView();
	          }
	          const title = `New file ${uniqueTab++}`
	          const createTab = tab(title);
	          createTab.printer.html`
	           <h3>${title}</h3>
	           <input placeholder="name" onchange=${updateName} onkeyup=${updateName} />
	           <textarea placeholder="content" onchange=${updateValue} onkeyup=${updateValue} />
	           <button onclick=${createFileSubmit}>Create</button>
	          `;
	        },
	        createFolder() {
	          let name = "";
	          function updateName(e) {
	            name = e.target.value;
	          }
	          async function createFolderSubmit() {
	            console.log("should create folder", name);
	            await activeConnection.setItem(`${name}/`, '!folder')
	            createTab.close();
	            await reloadView();
	          }
	          const title = `New folder ${uniqueTab++}`
	          const createTab = tab(title);
	          createTab.printer.html`
	           <h3>${title}</h3>
	           <input placeholder="name" onchange=${updateName} onkeyup=${updateName} />
	           <button onclick=${createFolderSubmit}>Create folder</button>
	          `;
	        },
        };
      };
 //   };
  }
);
