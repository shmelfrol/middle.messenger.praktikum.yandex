const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const { window } = new JSDOM('<main id="app" class="app"></main>', {
  url: 'http://localhost:1234',
});
const { document } = window;
// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!WINDOW", window)
global.window = window;
localStorage = window.localStorage;
history = window.history;
File = window.File;
XMLHttpRequest = window.XMLHttpRequest;
global.document = document;

// global.window = { localStorage: null }
