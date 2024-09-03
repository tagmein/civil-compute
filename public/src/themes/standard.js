globalThis.LOAD['themes/standard'].resolve(async function ({}) {
 return `
.--components-split--container {
 display: flex;
 flex-direction: column;
 height: 100%;
 width: 100%;
}
.--components-split--container.--row {
 flex-direction: row;
 overflow-y: hidden;
}
.--components-split--container > div {
 flex-basis: 100px;
 flex-grow: 1;
 flex-shrink: 1;
}
.--components-pane--container {
 box-shadow: inset 0 0 4px 8px #80808080;
}
.--components-pane--2 {
 background-color: #800000;
}
.--components-pane--3 {
 background-color: #808000;
}
.--components-pane--4 {
 background-color: #008000;
}
.--components-grid--container {
 align-items: center;
 box-sizing: border-box;
 display: grid;
 height: 100%;
 justify-content: center;
 padding: 24px;
}
.--components-menu--container {
 flex-grow: 1;
 outline-offset: -15px;
 outline: 3px solid #f0f0f080;
 padding: 10px 0;
}
.--components-menu--container > div {
 border-bottom: 1px solid #40404040;
 cursor: pointer;
 flex-grow: 1;
 padding: 10px 20px;
 display: flex;
 align-items: center;
 }
.--components-menu--container > div.--disabled {
 color: #f0f0f080;
 cursor: text;
}
.--components-menu--container > div:not(.--disabled):hover {
 background-color: #a8c4e0;
 color: #8e4c0a;
 transform-origin: 100px center;
 transform: scale(1.05);
 transition: transform 0.75s, filter 0.25s;
}
.--components-menu--container > div:not(.--disabled):active {
 transform: scale(0.95);
 filter: blur(20px);
}
.--components-pane--container {
 box-sizing: border-box;
 height: 100%;
 display: flex;
 flex-direction: column;
 overflow-x: hidden;
 overflow-y: scroll;
 padding-bottom: 10px;
}
.--components-doc-highlight {
 box-shadow: 0 0 40px inset #ffff8080;
}
*::selection {
 background: white;
 color: black;
}
.--components-doc--container {
 margin: 0;
 padding: 0 20px 10px;
}
.--components-doc--container > label {
 display: block;
 font-size: 14px;
 padding: 0 10px 10px;
 font-weight: bold;
}
.--components-doc--container > div + div {
 border-top: none;
}
.--components-doc--container > div {
 display: flex;
 flex-direction: row;
 gap: 10px;
 background-color: #80402080;
 border: 1px solid #80808080;
 color: #fff;
}
.--components-doc--container > div > .--index {
 background-color: #80808040;
 border-right: #40404040;
 color: #f0f0f080;
 width: 50px;
 text-align: right;
 font-family: monospace;
 padding: 10px;
 box-sizing: border-box;
 height: 100%;
 flex-shrink: 0;
 flex-grow: 0;
}
.--components-doc--container > div > .--components-text--container {
 padding: 10px;
}
`
})
