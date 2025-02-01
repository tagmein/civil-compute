globalThis.LOAD['themes/standard'].resolve(async function ({}) {
 return `
.--components-split--container {
 display: flex;
 flex-direction: column;
 height: 100%;
 max-height: 100%;
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
 background: #101010;
 box-shadow: inset 0 0 2px 2px #80808080;
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 flex-shrink: 0;
 height: auto;
 max-height: 100%;
 overflow-x: hidden;
 overflow-y: auto;
 padding: 15px 0 5em;
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
 min-width: 55vw !important;
 outline: 3px solid #f0f0f080;
 padding: 0;
 width: 440px !important;
}
.--components-menu--container > input {
 background-color: #40404080;
 border: none;
 box-sizing: border-box;
 color: inherit;
 font-family: inherit;
 font-size: inherit;
 padding: 10px 22px;
 width: 100%;
}
.--components-menu--container > div.--menu-item-container {
 align-items: center;
 border-bottom: 1px solid #40404040;
 cursor: pointer;
 display: flex;
 flex-grow: 1;
 padding: 10px 22px;
 }
.--components-menu--container > div.--menu-item-container.--disabled {
 color: #f0f0f080;
 cursor: text;
}
.--components-menu--container > div.--menu-item-container:not(.--disabled):hover {
 background-color: #a8c4e0;
 color: #8e4c0a;
 transform-origin: 100px center;
 transition: transform 0.25s ease, filter 0.25s ease;
}
.--components-menu--container > div.--menu-item-container:not(.--disabled):active {
 filter: blur(1px);
 transform: scale(0.95);
}
.--components-highlight {
 box-shadow: 0 0 40px inset #ffff8080;
}
*::selection {
 background: white;
 color: black;
}
.--components-doc--container {
  box-sizing: border-box;
  margin: 0;
  max-height: 100vh;
  min-width: 528px;
  overflow: auto;
  padding: 0 20px 5em;
}
.--components-doc--container > label {
  background-color: #80808080;
  display: block;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  position: sticky;
  top: 0;
}
.--components-view.--minimized .--components-doc--container > label {
height: 281px;
left: -7px;
overflow: hidden;
pointer-events: none;
position: absolute;
text-overflow: ellipsis;
top: calc(100% - 300px);
transform: rotate(-90deg);
white-space: nowrap;
width: 100%;
width: 281px;
}
.--components-doc--item-value {
 padding: 10px;
}
.--components-doc--item-name {
 background-color: #80808020;
 color: #001020;
 display: block;
 font-size: 12px;
 font-weight: bold;
 overflow: hidden;
 padding: 10px;
 text-overflow: ellipsis;
 white-space: nowrap;
 text-decoration: underline;
}

.--components-doc--item-name:hover {
 background-color: #80808080;
 color: #405060;
}

.--components-doc--item-name:active {
 background-color: #80808080;
 color: #203040;
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
 gap: 0;
}
.--components-doc--container > div > .--index {
 background-color: #80808040;
 border-right: #40404040;
 box-sizing: border-box;
 color: #f0f0f080;
 flex-grow: 0;
 flex-shrink: 0;
 font-family: monospace;
 position: relative;
 padding: 10px;
 text-align: right;
 width: 50px;
}

.--components-doc--container > div > .--index:hover::after {
  content: '𝍢';
  display: block;
  position: absolute;
  left: 4px;
  top: 8px;
 }
.--components-doc--container > div > .--index:active::after {
 color: #80808080;
}

.--components-doc--container > div > .--components-text--container {
 overflow-x: auto;
 overflow-y: hidden;
 padding: 10px;
  }
.--components-view {
 background-color: #80808080;
 border-left: 1px solid #404040;
 border-right: 1px solid #a0a0a0;
 display: flex;
 flex-direction: row;
 max-height: 100vh;
 position: relative;
}

.--components-view.--maximized {
 background-color: #000000;
 bottom: 0;
 box-shadow: inset 0 0 10px 10px #80808080;
 height: 100vh;
 left: 0;
 overflow: auto;
 position: fixed;
 right: 0;
 top: 0;
 width: 100vw;
}

.--components-view.--minimized {
 width: 25px !important;
 overflow: hidden;
 opacity: 0.25;
}


.--components-view.--minimized:hover {
 opacity: 0.95;
}

body > main > .--components-view {
 padding-right: 45vw;
 width: fit-content;
}
body > main > .--components-view.--minimized {
 padding-right: 0;
}
 body > main > .--components-view.--maximized {
  padding-right: 0;
 }
.--components-view--control {
 box-sizing: border-box;
 display: flex;
 flex-direction: column;
 flex-grow: 0;
 flex-shrink: 0;
 gap: 4px;
 padding: 16px 4px;
 width: 25px;
}
.--components-view--control > button {
 box-sizing: border-box;
 height: 16px;
 width: 16px;
 border-radius: 16px;
 border: 1px solid #808080;
 opacity: 0.5;
}
.--components-view--control > button:hover {
 opacity: 1;
}
.--components-view--control > button:active {
 opacity: 0.75;
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
.--components-view--control--Sustain {
 background-color: #4040c0;
}
.--sustained > .--components-view--control > .--components-view--control--Sustain {
 background-color: #a0a0ff;
 box-shadow: inset 0 0 2px 2px #4040c0;
}

.--components-view--tray {
 background-color: #404040;
 border-bottom: none;
 border-top-left-radius: 24px;
 border-top-right-radius: 24px;
 border: 1px solid #808080;
 bottom: 0;
 box-shadow: 0 0 64px #ffffff40;
 box-sizing: border-box;
 gap: 8px;
 height: 64px;
 left: 24px;
 mix-blend-mode: difference;
 padding: 8px;
 pointer-events: none;
 position: fixed;
 right: 24px;
 z-index: 1000000;
}
.--components-view--tray > div {
 align-items: center;
 background-color: #a0a0a0;
 border-radius: 16px;
 border: 1px solid #808080;
 cursor: pointer;
 display: grid;
 flex-grow: 1;
 flex-shrink: 0;
 height: 48px;
 justify-content: center;
 max-width: 240px;
 min-width: 48px;
 overflow: hidden;
 pointer-events: all;
 text-overflow: ellipsis;
}
.--components-view--tray > div:hover {
 box-shadow: inset 0 0 24px 8px #ffffff;
}
.--components-view--tray > div:active {
 box-shadow: inset 0 0 24px 8px #808080;
}
.--components-commander {
 width: 100%;
}
 .--component-explorer-form  {
  display: flex;
  flex-direction: column;
  padding: 15px;
  max-height: 100vh;
  overflow: auto;
 }
.--component-explorer-form > input,
.--component-explorer-form > textarea {
 background-color: transparent;
 margin-bottom: 15px;
 border: 2px solid #40404040;
 color: #ffffff;
 padding: 10px;
}
.--component-explorer-form > div > button {
 background-color: #80808080;
 border: 2px solid #40404040;
 color: #ffffff;
 padding: 10px;
}
`
})
