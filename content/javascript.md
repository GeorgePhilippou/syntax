---
name: JavaScript
symbol: JS
order: 5
color: #e3cb7f
version: ES2022+
highlight: javascript
description: Small expressions. Endless possibilities.
---

# Basics

## Variables
@keywords let const var declaration assignment
@diff let/const are block-scoped; prefer const.

Declare with `const` by default, `let` if you'll reassign.

```javascript
const voltage = 2.5;
let count = 3;
count = 4;
let [a, b] = [1, 2];
[a, b] = [b, a];          // swap
```

Avoid `var`: it's function-scoped and hoisted, which causes surprises.

## Data types
@id types
@keywords number string boolean null undefined bigint typeof object
@diff One number type; null and undefined both exist.

The primitive types and `typeof`.

```javascript
typeof 42;           // "number" (integers and decimals)
typeof "text";       // "string"
typeof true;         // "boolean"
typeof undefined;    // "undefined"
typeof null;         // "object" — a historic quirk
typeof 10n;          // "bigint"
typeof {};           // "object"
Array.isArray([]);   // true — typeof [] is "object"
Number.isInteger(5.0); // true
```

## Constants
@keywords const freeze immutable
@diff const fixes the binding, not object contents.

`const` prevents rebinding — not mutation.

```javascript
const PI = 3.141592653589793;
const config = { debug: false };
config.debug = true;            // allowed!
const frozen = Object.freeze({ debug: false });
// frozen.debug = true;         // silently ignored (TypeError in strict mode)
```

`Object.freeze` is shallow; nested objects stay mutable.

## Operators
@keywords arithmetic equality === strict comparison logical modulo exponent increment
@diff === compares without coercion.

Arithmetic, comparison and logic.

```javascript
7 / 2;        // 3.5
Math.trunc(7 / 2); // 3
7 % 2;        // 1
2 ** 10;      // 1024
"5" == 5;     // true  (coerces — avoid)
"5" === 5;    // false (strict — use this)
!true, true && false, true || false;
0.1 + 0.2 === 0.3;   // false — floating point
```

## Nullish and optional chaining
@id nullish
@keywords ?? ?. optional chaining nullish coalescing default null undefined
@diff ?. stops at null; ?? defaults only for null/undefined.

Safely read nested values and supply defaults.

```javascript
const user = { profile: { name: "Ada" } };
user.profile?.name;        // "Ada"
user.settings?.theme;      // undefined, no error
user.greet?.();            // call only if it exists

const count = 0;
count || 10;               // 10 — || treats 0 and "" as missing
count ?? 10;               // 0  — ?? only replaces null/undefined

let options = {};
options.retries ??= 3;     // assign if null/undefined
```

## Comments
@keywords comment jsdoc documentation multiline

Leave notes and document functions.

```javascript
// A single-line note

/* A note that spans
   multiple lines. */

/**
 * JSDoc: editors show this on hover.
 * @param {number} a
 * @returns {number}
 */
function double(a) { return a * 2; }
```

## Printing output
@id print
@keywords console.log console.error console.table output debug
@diff console.log in browsers and Node.

Log to the console.

```javascript
const count = 3;
console.log("Count:", count);
console.error("Something failed");
console.warn("Careful");
console.table([{ a: 1, b: 2 }, { a: 3, b: 4 }]);
console.log({ count });        // logs { count: 3 } — handy for debugging
```

## Template literals and formatting
@id format
@keywords template literal backtick interpolation toFixed padStart toLocaleString format
@diff `${expr}` in backticks; toFixed for decimals.

Build strings and format numbers.

```javascript
const name = "Ada", pi = 3.14159;
`Hello, ${name}!`;
`Total: ${2 + 3}`;
pi.toFixed(2);                         // "3.14"
String(42).padStart(5, "0");           // "00042"
"Ada".padEnd(8) + "|";                 // "Ada     |"
(1234567.891).toLocaleString("en-GB"); // "1,234,567.891"
new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(9.5); // "£9.50"
const multi = `Line one
Line two`;
```

## Type conversion
@id convert
@keywords Number parseInt parseFloat String convert parse cast
@diff Number(), parseInt(text, 10), String().

Convert between strings and numbers.

```javascript
Number("42");        // 42
Number("42px");      // NaN
parseInt("42px", 10); // 42 — parses a prefix
parseFloat("2.5kg"); // 2.5
String(42);          // "42"
(255).toString(16);  // "ff"
Number.isNaN(Number("x")); // true
Boolean("");         // false
+"3" + 1;            // 4
"3" + 1;             // "31" — + concatenates if either side is a string
```

# Strings

## Strings
@keywords string length concatenate index character immutable
@diff Immutable; .length is a property.

Create and combine text.

```javascript
const s = "hello";
s.length;           // 5
s[0];               // "h"
s.at(-1);           // "o"
s + " world";
s.includes("ell");  // true
```

## String methods
@id string-methods
@keywords split join trim replace replaceAll toUpperCase startsWith includes indexOf
@diff Methods return new strings.

Everyday string operations.

```javascript
const s = "  Hello, World  ";
s.trim();
s.toLowerCase(); s.toUpperCase();
s.replace("World", "JS");          // first match only
"a-b-c".replaceAll("-", "+");      // "a+b+c"
"a,b,c".split(",");                // ["a", "b", "c"]
["a", "b"].join(", ");             // "a, b"
"report.csv".endsWith(".csv");
"hello".indexOf("l");              // 2 (-1 if missing)
"ab".repeat(3);                    // "ababab"
```

## Substrings
@id slicing
@keywords slice substring part negative index
@diff slice(start, end); end excluded; negatives allowed.

Take part of a string or array.

```javascript
const s = "abcdef";
s.slice(1, 4);     // "bcd"
s.slice(-2);       // "ef"
s.slice(0, 3);     // "abc"
[...s].reverse().join("");  // "fedcba"

const items = [1, 2, 3, 4];
items.slice(1, 3); // [2, 3] — a copy, original unchanged
```

# Control flow

## If / else
@id if
@keywords conditional else if branch truthy
@diff Parenthesised condition; braced blocks.

Choose a branch using a condition.

```javascript
const temperature = 25;
if (temperature > 30) {
    console.log("Hot");
} else if (temperature > 20) {
    console.log("Warm");
} else {
    console.log("Cool");
}
```

Falsy values: `false`, `0`, `""`, `null`, `undefined`, `NaN`. Everything else — including `[]` and `{}` — is truthy.

## Ternary operator
@id ternary
@keywords conditional expression ?: inline if
@diff condition ? a : b

Pick one of two values.

```javascript
const age = 20;
const status = age >= 18 ? "adult" : "minor";
```

## For loop
@id for
@keywords for loop counter range iteration
@diff Three-part loop with a block-scoped let.

Repeat with a counter.

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);   // 0 to 4
}

for (const i of Array(3).keys()) {
    console.log(i);   // 0 1 2
}
```

## While loop
@id while
@keywords while do while loop repeat
@diff Condition first; do…while runs at least once.

Repeat while a condition holds.

```javascript
let count = 0;
while (count < 3) {
    count++;
}

do {
    count--;
} while (count > 0);
```

## Break and continue
@id loop-control
@keywords break continue label skip exit loop
@diff break/continue; labels exit outer loops.

Leave a loop early or skip an iteration.

```javascript
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) continue;
    if (i > 7) break;
    console.log(i);   // 1 3 5 7
}

outer: for (const row of [[1, 2], [3, 4]]) {
    for (const x of row) {
        if (x === 3) break outer;
    }
}
```

`break` doesn't work inside `forEach` — use `for...of` if you need to stop early.

## Switch
@id switch
@keywords switch case default fall through
@diff Strict-equality cases; break prevents fall-through.

Select one of several cases.

```javascript
const mode = "fast";
switch (mode) {
    case "slow":
        console.log("Taking it easy");
        break;
    case "fast":
    case "turbo":
        console.log("Going quickly");
        break;
    default:
        console.log("Unknown");
}
```

An object lookup is often neater: `({ slow: 1, fast: 2 })[mode] ?? 0`.

# Functions

## Functions
@id function
@keywords function declaration arrow return hoisting
@diff function keyword or arrow; no parameter types.

Define reusable operations.

```javascript
function add(a, b) {
    return a + b;
}

const multiply = (a, b) => a * b;      // arrow, implicit return
const makeUser = name => ({ name });   // wrap an object literal in ()
add(2, 3);
```

Function declarations are hoisted (callable before they appear); arrow functions assigned to `const` are not.

## Default and rest parameters
@id default-args
@keywords default parameter rest ...args optional arguments options object
@diff Defaults in the signature; ...rest collects extras.

Optional parameters and variable arguments.

```javascript
function greet(name, greeting = "Hello") {
    return `${greeting}, ${name}`;
}

function total(...numbers) {
    return numbers.reduce((sum, n) => sum + n, 0);
}

function connect({ host = "localhost", port = 8080 } = {}) {
    return `${host}:${port}`;
}
connect({ port: 3000 });   // "localhost:3000"
```

## Returning multiple values
@id multiple-return
@keywords return array object destructure two values
@diff Return an array or object and destructure.

Return several values.

```javascript
function minMax(values) {
    return [Math.min(...values), Math.max(...values)];
}
const [low, high] = minMax([3, 1, 4]);

function stats(values) {
    return { count: values.length, sum: values.reduce((a, b) => a + b, 0) };
}
const { count, sum } = stats([1, 2, 3]);
```

## Arrow functions and callbacks
@id lambda
@keywords arrow function callback anonymous this closure higher order
@diff (args) => expression

Pass functions around.

```javascript
const square = x => x * x;
[1, 2, 3].map(square);

setTimeout(() => console.log("later"), 1000);

function makeCounter() {
    let count = 0;
    return () => ++count;      // closure keeps count alive
}
const next = makeCounter();
next(); next();                // 2
```

Arrow functions don't have their own `this` — they use the surrounding one. That's usually what you want in callbacks, but not for object methods.

## Scope
@keywords block scope let const var closure global hoisting
@diff let/const respect blocks; var doesn't.

Where names are visible.

```javascript
let count = 1;
{
    const inner = 2;
    count += inner;
}
// inner is not defined here

for (var i = 0; i < 3; i++) {}
console.log(i);   // 3 — var leaks out of the block
```

# Collections

## Arrays
@id array
@keywords array list index length create fill from
@diff Zero-based, resizable; length is a property.

Ordered, resizable lists.

```javascript
const values = [10, 20, 30];
values[0];             // 10
values.at(-1);         // 30
values.length;         // 3
Array(3).fill(0);      // [0, 0, 0]
Array.from({ length: 3 }, (_, i) => i * 2); // [0, 2, 4]
const grid = Array.from({ length: 2 }, () => Array(3).fill(0));
```

## Array operations
@id array-ops
@keywords push pop shift unshift splice concat includes indexOf remove insert
@diff push/pop at the end; splice in the middle.

Add, remove and find.

```javascript
const v = [1, 2, 3];
v.push(4);          // add to end
v.pop();            // remove from end
v.unshift(0);       // add to start
v.shift();          // remove from start
v.splice(1, 1);     // remove 1 item at index 1
v.splice(1, 0, 9);  // insert 9 at index 1
v.includes(9);      // true
v.indexOf(9);       // 1
const all = [...v, ...[7, 8]];   // concatenate
```

`sort`, `reverse` and `splice` mutate the array. ES2023 adds copying versions: `toSorted`, `toReversed`, `toSpliced`.

## Destructuring and spread
@id destructuring
@keywords destructuring spread rest ... unpack copy merge
@diff [a, b] = arr; {x, y} = obj; ...spread.

Unpack and copy arrays and objects.

```javascript
const [first, second, ...rest] = [1, 2, 3, 4];
const { name, age = 0, ...others } = { name: "Ada", city: "London" };
const { name: fullName } = { name: "Ada" };   // rename

const copy = [...[1, 2, 3]];
const merged = { ...{ a: 1 }, ...{ b: 2 } };   // { a: 1, b: 2 }
const updated = { ...merged, a: 10 };          // later keys win
```

Spread makes a **shallow** copy. Use `structuredClone(obj)` for a deep copy.

## map, filter and reduce
@id transform
@keywords map filter reduce find some every flatMap functional
@diff Array methods with callbacks; chainable.

Transform, filter and combine arrays.

```javascript
const nums = [1, 2, 3, 4];
nums.map(n => n * 2);                 // [2, 4, 6, 8]
nums.filter(n => n % 2 === 0);        // [2, 4]
nums.reduce((sum, n) => sum + n, 0);  // 10
nums.find(n => n > 2);                // 3
nums.findIndex(n => n > 2);           // 2
nums.some(n => n > 3);                // true
nums.every(n => n > 0);               // true
[[1, 2], [3]].flat();                 // [1, 2, 3]

const people = [{ name: "Ada", age: 36 }, { name: "Alan", age: 41 }];
people.filter(p => p.age > 40).map(p => p.name);   // ["Alan"]
```

Always pass an initial value to `reduce` — it throws on an empty array without one.

## Iterating
@id iterate
@keywords for of forEach loop over array iterate
@diff for...of for values; for...in is for keys.

Loop over arrays and other iterables.

```javascript
const values = [10, 20, 30];
for (const value of values) {
    console.log(value);
}
values.forEach(value => console.log(value));
for (const ch of "abc") console.log(ch);
```

`for...in` iterates **keys** (as strings) — don't use it for arrays.

## Index and value
@id enumerate
@keywords entries index forEach index loop with index
@diff entries() yields [index, value].

Loop with both index and value.

```javascript
const names = ["a", "b", "c"];
for (const [i, name] of names.entries()) {
    console.log(i, name);
}
names.forEach((name, i) => console.log(i, name));
```

## Objects
@id dict
@keywords object key value keys values entries delete in hasOwn dictionary
@diff Plain objects for string keys; Map for anything else.

Store values by key.

```javascript
const ages = { ada: 36, alan: 41 };
ages.grace = 85;
ages["ada"];                 // 36
ages.bob;                    // undefined
"ada" in ages;               // true
Object.hasOwn(ages, "ada");  // true, ignores prototype
delete ages.alan;
Object.keys(ages);           // ["ada", "grace"]
for (const [name, age] of Object.entries(ages)) {
    console.log(name, age);
}
Object.fromEntries([["a", 1]]); // { a: 1 }
```

## Map and Set
@id set
@keywords Map Set unique has get delete size
@diff Map: any key type; Set: unique values.

Keyed collections and unique values.

```javascript
const ages = new Map([["ada", 36]]);
ages.set("alan", 41);
ages.get("ada");      // 36
ages.has("bob");      // false
ages.size;            // 2
for (const [name, age] of ages) console.log(name, age);

const seen = new Set([3, 1, 3]);   // {3, 1}
seen.add(2);
seen.has(3);                       // true
const unique = [...new Set([1, 1, 2])];  // [1, 2]
```

## Sorting
@id sort
@keywords sort compare numeric descending localeCompare toSorted
@diff sort() is string-based unless given a comparator.

Sort arrays correctly.

```javascript
[10, 9, 1].sort();                  // [1, 10, 9] — sorts as strings!
[10, 9, 1].sort((a, b) => a - b);   // [1, 9, 10]
[10, 9, 1].sort((a, b) => b - a);   // descending

const people = [{ name: "Bo", age: 36 }, { name: "Ada", age: 36 }];
people.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));

const sorted = [3, 1, 2].toSorted((a, b) => a - b);  // ES2023, non-mutating
```

## JSON
@id json
@keywords JSON parse stringify serialise
@diff JSON.parse / JSON.stringify.

Convert to and from JSON text.

```javascript
const data = JSON.parse('{"name": "Ada", "tags": ["math"]}');
const text = JSON.stringify(data);            // compact
const pretty = JSON.stringify(data, null, 2); // indented
```

`JSON.parse` throws on invalid input — wrap user-supplied text in `try`.

# Classes

## Classes
@id class
@keywords class constructor method this getter static private # extends
@diff class with constructor; # for private fields.

Bundle data and behaviour.

```javascript
class Account {
    #balance;                         // private field
    static count = 0;

    constructor(owner, balance = 0) {
        this.owner = owner;
        this.#balance = balance;
        Account.count++;
    }

    deposit(amount) {
        this.#balance += amount;
        return this;                  // allows chaining
    }

    get balance() {
        return this.#balance;
    }
}

const a = new Account("Ada", 10).deposit(5);
a.balance;   // 15
```

## Inheritance
@id inheritance
@keywords extends super override subclass instanceof
@diff extends and super().

Extend a class.

```javascript
class Shape {
    area() { return 0; }
}

class Square extends Shape {
    constructor(side) {
        super();                  // required before using this
        this.side = side;
    }
    area() { return this.side ** 2; }
}

const s = new Square(2);
s instanceof Shape;   // true
```

# Async

## Promises and async/await
@id async
@keywords async await promise then catch Promise.all asynchronous
@diff async functions return promises; await pauses.

Work with asynchronous results.

```javascript
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
    await wait(100);
    const [a, b] = await Promise.all([wait(50), wait(50)]);  // in parallel
    return "done";
}

run()
    .then(result => console.log(result))
    .catch(error => console.error(error));
```

`await` inside a `forEach` callback doesn't wait. Use `for...of` (sequential) or `Promise.all` (parallel).

## Fetch
@id fetch
@keywords fetch http request api get post json response
@diff fetch() returns a promise of a Response.

Make HTTP requests.

```javascript
async function getUser(id) {
    const response = await fetch(`https://api.example.com/users/${id}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

async function createUser(user) {
    const response = await fetch("https://api.example.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    return response.json();
}
```

`fetch` only rejects on network failure — a 404 or 500 still resolves, so check `response.ok`.

## Timers
@id time
@keywords setTimeout setInterval clearInterval delay Date performance.now
@diff setTimeout/setInterval; performance.now for timing.

Delay, repeat and measure.

```javascript
const id = setInterval(() => console.log("tick"), 1000);
setTimeout(() => clearInterval(id), 3500);

const start = performance.now();
// ... work ...
const ms = performance.now() - start;

new Date().toISOString();        // "2026-10-21T13:30:00.000Z"
```

# Errors

## Error handling
@id errors
@keywords try catch finally throw Error exception
@diff try/catch/finally; throw new Error.

Throw and catch errors.

```javascript
function divide(a, b) {
    if (b === 0) throw new RangeError("division by zero");
    return a / b;
}

try {
    divide(1, 0);
} catch (error) {
    console.error(error.name, error.message);
} finally {
    console.log("always runs");
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
```

Use `try`/`catch` around `await` to catch rejected promises.

# Modules & environment

## Modules
@id imports
@keywords import export module default named ES modules require
@diff ES modules: import/export.

Share code between files.

```javascript math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }
```

```javascript app.js
import multiply, { add } from "./math.js";
import * as math from "./math.js";
console.log(add(2, 3), multiply(2, 3));
```

In a browser, load with `<script type="module" src="app.js">` over HTTP (not `file://`). Node needs `"type": "module"` in package.json or a `.mjs` extension.

## DOM basics
@id dom
@keywords document querySelector addEventListener click textContent classList createElement
@diff querySelector + addEventListener.

Find elements and react to events in the browser.

```javascript
const button = document.querySelector("#save");
const items = document.querySelectorAll(".item");
button.addEventListener("click", event => {
    event.preventDefault();
    button.textContent = "Saved";
    button.classList.toggle("active");
});
const li = document.createElement("li");
li.textContent = "New item";
document.querySelector("ul").append(li);
```

Use `textContent`, not `innerHTML`, for user-supplied text — `innerHTML` can run injected scripts.

## Local storage
@id storage
@keywords localStorage sessionStorage save persist browser
@diff Strings only; JSON for objects.

Keep small data in the browser.

```javascript
localStorage.setItem("theme", "dark");
localStorage.getItem("theme");          // "dark" or null
localStorage.setItem("prefs", JSON.stringify({ size: 18 }));
const prefs = JSON.parse(localStorage.getItem("prefs") ?? "{}");
localStorage.removeItem("theme");
```

## Node: files
@id read-file
@keywords node fs readFile writeFile promises file read write
@diff node:fs/promises with await.

Read and write files in Node.js.

```javascript
import { readFile, writeFile, appendFile } from "node:fs/promises";

const text = await readFile("data.txt", "utf8");
const lines = text.split("\n");
await writeFile("out.txt", "hello\n");
await appendFile("log.txt", "started\n");
```

Top-level `await` works in ES modules (`.mjs` or `"type": "module"`).

## Node: arguments and env
@id args
@keywords process.argv process.env command line arguments environment
@diff process.argv; first two are node and the script.

Read arguments and environment variables.

```javascript
const args = process.argv.slice(2);     // skip node and script path
const port = Number(process.env.PORT ?? 3000);
if (args.length === 0) {
    console.error("usage: node app.js FILE");
    process.exit(1);
}
```

## npm basics
@id packages
@keywords npm install package.json scripts run npx dependencies
@diff npm install; npm run <script>.

Manage packages and run scripts.

```bash
npm init -y                  # create package.json
npm install lodash           # add a dependency
npm install -D vitest        # dev dependency
npm ci                       # clean install from the lockfile
npm run build                # run a script from package.json
npx some-tool                # run a package's binary
npm outdated
```

# Utilities

## Math
@id math
@keywords Math round floor ceil abs min max sqrt pow random
@diff Math object; Math.round rounds .5 up.

Common maths.

```javascript
Math.round(2.5);     // 3
Math.round(-2.5);    // -2
Math.floor(2.7), Math.ceil(2.1), Math.trunc(-2.7); // 2 3 -2
Math.abs(-3), Math.sqrt(2), 2 ** 0.5;
Math.max(...[3, 9, 4]);   // 9
Math.PI;
Number((2.345).toFixed(2));  // 2.35 — round to 2 decimals
```

## Random
@id random
@keywords Math.random random integer shuffle choice crypto
@diff Math.random() returns [0, 1).

Random numbers.

```javascript
Math.random();                                   // [0, 1)
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
randInt(1, 6);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
crypto.randomUUID();                             // secure id
```

## Regular expressions
@id regex
@keywords regex RegExp match test replace exec groups pattern
@diff /pattern/flags literals.

Match and extract with patterns.

```javascript
const text = "Order 42 shipped on 2026-10-21";
/\d+/.test(text);                         // true
text.match(/\d+/g);                       // ["42", "2026", "10", "21"]
const m = text.match(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/);
m.groups.y;                               // "2026"
"a   b    c".replace(/\s+/g, " ");        // "a b c"
for (const match of text.matchAll(/\d+/g)) {
    console.log(match[0], match.index);
}
```

Without the `g` flag, `replace` changes only the first match.
