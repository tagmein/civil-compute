globalThis.LOAD['themes/standard'].resolve(async function ({}) {
 return `
.--components-split--container {
 display: flex;
 flex-direction: column;
 height: 100%;
 position: relative;
 width: 100%;
}
.--components-split--container.--no-scroll {
 overflow: hidden;
}
.--components-split--container.--row {
 flex-direction: row;
 overflow-y: hidden;
}
.--components-split--container.--split-a > div.--b {
 display: none;
}
.--components-split--container.--split-b > div.--a {
 display: none;
}
.--components-split--container > div {
 flex-basis: 100px;
 flex-grow: 1;
 flex-shrink: 1;
}
.--components-split--container > section.--control {
 background-color: #80808080;
 border-radius: 50%;
 box-shadow: inset 0 0 4px 8px #ffffff40;
 cursor: pointer;
 height: 16px;
 left: 0;
 position: absolute;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 width: 16px;
}
.--components-split--container > section.--control:hover {
 box-shadow: inset 0 0 4px 8px #ffffff80, 0 0 4px 0 #ffffff80;
}
 .--components-split--container.--row > section.--control {
  left: 50%;
  top: 0;
 }
.--components-pane--container {
 box-shadow: inset 0 0 2px 2px #80808080;
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
 flex-grow: 0;
 flex-shrink: 0;
 outline-offset: -15px;
 outline: 3px solid #f0f0f080;
 padding: 15px 0;
}
.--components-menu--container > input {
 background-color: transparent;
 border: none;
 color: inherit;
 font-family: inherit;
 font-size: inherit;
 padding: 10px 22px;
 width: 100%;
}
.--components-menu--container > div {
 align-items: center;
 border-bottom: 1px solid #40404040;
 cursor: pointer;
 display: flex;
 flex-grow: 1;
 padding: 10px 22px;
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
 transition: transform 0.25s ease, filter 0.25s ease;
}
.--components-menu--container > div:not(.--disabled):active {
 filter: blur(1px);
 transform: scale(0.95);
}
.--components-pane--container {
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 height: auto; /*100%;*/
 overflow-x: hidden;
 overflow-y: auto;
}
.--components-highlight {
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
 font-weight: bold;
 padding: 0 10px 10px;
}
.--components-doc--container > div + div {
 border-top: none;
}
.--components-doc--container > div {
 align-items: stretch;
 background-color: #80402080;
 border: 1px solid #80808080;
 color: #fff;
 display: flex;
 flex-direction: row;
 gap: 10px;
}
.--components-doc--container > div > .--index {
 background-color: #80808040;
 border-right: #40404040;
 box-sizing: border-box;
 color: #f0f0f080;
 flex-grow: 0;
 flex-shrink: 0;
 font-family: monospace;
 padding: 10px;
 text-align: right;
 width: 50px;
}
.--components-doc--container > div > .--components-text--container {
 overflow-x: auto;
 overflow-y: hidden;
 padding: 10px;
  }
.--components-view {
 display: flex;
 flex-direction: row;
}
.--components-view--control {
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 gap: 4px;
 padding: 16px 4px;
 width: 24px;
}
.--components-view--control > button {
 box-sizing: border-box;
 height: 16px;
 width: 16px;
 border-radius: 16px;
 border: 1px solid #808080;
}
.--components-view--control--Close {
 background-color: #c00000;
}
.--components-view--control--Minimize {
 background-color: #c0c000;
}
.--components-view--control--Zoom {
 background-color: #00c000;
}
.--components-view--tray {
 position: fixed;
 bottom: 0;
 left: 24px;
 right: 24px;
 border-top-left-radius: 24px;
 border-top-right-radius: 24px;
 height: 64px;
 box-sizing: border-box;
 border: 1px solid #808080;
 background-color: #404040;
 border-bottom: none;
 box-shadow: 0 0 64px #ffffff40;
 gap: 8px;
 padding: 8px;
 z-index: 1000000;
}
.--components-view--tray > div {
 border: 1px solid #808080;
 background-color: #a0a0a0;
 height: 48px;
 min-width: 48px;
 max-width: 240px;
 flex-shrink: 0;
 flex-grow: 1;
 border-radius: 16px;
 display: grid;
 align-items: center;
 justify-content: center;
 text-overflow: ellipsis;
 overflow: hidden;
}
`
})
