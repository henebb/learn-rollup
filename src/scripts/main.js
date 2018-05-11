// Load a stylesheet (requires setting up rollup plugin)
import '../styles/main.css';

// Import a couple modules for testing.
import { sayHelloTo } from './modules/mod1';
import addArray from './modules/mod2';

// Add a debugger (that is a nodejs module, i.e. requires specific setup in rollup config).
import debug from 'debug';

const log = debug('app:log');
// Disable logging in production
// The global ENV will have to be handled with the rollup plugin: replace
if (ENV !== 'production') {
    debug.enable('*');
    log('Logging is enabled!');
    // Add live reload script
    document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
} else {
    debug.disable();
}

// Run some functions from our imported modules.
const result1 = sayHelloTo('Jason');
const result2 = addArray([1, 2, 3, 4]);

// Print the results on the page.
const printTarget = document.getElementsByClassName('debug__output')[0];

printTarget.innerText = `sayHelloTo('Jason') => ${result1}\n\n`;
printTarget.innerText += `addArray([1, 2, 3, 4]) => ${result2}`;
