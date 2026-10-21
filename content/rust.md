---
name: Rust
symbol: Rs
order: 6
color: #e8a2a8
version: Rust 2021
highlight: rust
description: Fast, safe and fearless. The compiler has your back.
---

# Basics

## Variables
@keywords let mut immutable shadowing declaration
@diff Immutable by default; mut to change; shadowing allowed.

Bindings are immutable unless you say `mut`.

```rust
let count = 3;
let mut total = 0;
total += count;
let label = "sensor";
let label = label.len();     // shadowing: a new binding, can change type
let (x, y) = (1, 2);         // destructure a tuple
```

## Data types
@id types
@keywords i32 u8 i64 usize f64 bool char type annotation integer float
@diff Sized integer types; usize for indexes.

Scalar types and annotations.

```rust
let n: i32 = -42;        // default integer
let big: u64 = 1_000_000;
let index: usize = 3;    // sizes and indexes
let byte: u8 = 255;
let ratio: f64 = 0.75;   // default float
let ready: bool = true;
let letter: char = 'é';  // 4-byte Unicode scalar
let inferred = 10u16;    // type suffix
```

Integer overflow panics in debug builds and wraps in release. Use `checked_add`, `wrapping_add` or `saturating_add` to be explicit.

## Constants
@keywords const static immutable compile time global
@diff const needs a type and is inlined.

Compile-time constants and statics.

```rust
const MAX_USERS: usize = 64;
static GREETING: &str = "hello";

fn main() {
    let buffer = [0u8; MAX_USERS];   // usable in array sizes
    println!("{} {}", GREETING, buffer.len());
}
```

Constants are SCREAMING_SNAKE_CASE and must have a type annotation.

## Operators
@keywords arithmetic integer division remainder comparison logical
@diff No implicit numeric conversion; no ++.

Arithmetic, comparison and logic.

```rust
let q = 7 / 2;            // 3
let r = 7 % 2;            // 1
let exact = 7.0 / 2.0;    // 3.5
let p = 2_i32.pow(10);    // 1024
let f = 2.0_f64.powf(0.5);
let both = q > 0 && r > 0;
let either = !both || q == 3;
let mut n = 0;
n += 1;                   // no ++ operator
let mixed = q as f64 + exact;   // convert explicitly
```

`7 / 2.0` is a compile error: both operands must have the same type.

## Comments
@keywords comment doc comment /// //! documentation

Notes and documentation comments.

```rust
// A line comment

/* A block comment /* can nest */ in Rust */

/// Documents the next item; shown by `cargo doc` and editors.
/// # Examples
/// ```
/// assert_eq!(double(2), 4);
/// ```
fn double(x: i32) -> i32 {
    x * 2
}
```
@check top

## Printing output
@id print
@keywords println print eprintln dbg macro output console
@diff println! macro with {} placeholders.

Print to the console.

```rust
let count = 3;
let name = "Ada";
println!("Count: {}", count);
println!("Count: {count}");          // inline variable (2021)
println!("{name} has {} items", count);
print!("no newline");
eprintln!("to stderr");
let v = vec![1, 2, 3];
println!("{:?}", v);                 // Debug format: [1, 2, 3]
dbg!(&v);                            // prints file:line and value
```

## Format specifiers
@id format
@keywords format! {:?} {:.2} width padding align hex debug pretty
@diff {:.2}, {:>8}, {:?} inside format strings.

Control how values are formatted.

```rust
let pi = 3.14159;
let s = format!("{:.2}", pi);        // "3.14"
format!("{:8.3}", pi);               // "   3.142"
format!("{:>6}", "ab");              // "    ab"
format!("{:<6}|", "ab");             // "ab    |"
format!("{:^6}|", "ab");             // "  ab  |"
format!("{:05}", 42);                // "00042"
format!("{:x} {:X} {:b}", 255, 255, 5); // "ff FF 101"
format!("{:?}", "quoted");           // "\"quoted\""
format!("{:#?}", vec![1, 2]);        // pretty multi-line Debug
format!("{0} {1} {0}", "a", "b");    // positional: "a b a"
format!("{{literal}}");
```

`{}` needs the `Display` trait; `{:?}` needs `Debug` (add `#[derive(Debug)]`).

## Type conversion
@id convert
@keywords as parse from into to_string convert cast string to number
@diff as for numbers; parse::<T>() for text.

Convert between types.

```rust
let x = 3.9_f64;
let truncated = x as i32;              // 3
let wide: i64 = 5_i32.into();          // lossless conversion
let n: i32 = "42".parse().unwrap();
let parsed = "4x".parse::<i32>();      // Err(...)
let text = 42.to_string();
let small = u8::try_from(300_i32);     // Err: out of range
let ch = (b'a' + 1) as char;           // 'b'
```

`as` silently truncates or saturates. Prefer `From`/`TryFrom` when a conversion might lose data.

## Reading input
@id input
@keywords stdin read_line input keyboard user
@diff io::stdin().read_line into a String.

Read a line from the user.

```rust
use std::io::{self, Write};

fn main() {
    print!("Number: ");
    io::stdout().flush().unwrap();      // print! doesn't flush
    let mut line = String::new();
    io::stdin().read_line(&mut line).expect("read failed");
    match line.trim().parse::<i32>() {
        Ok(n) => println!("You typed {n}"),
        Err(_) => println!("Not a number"),
    }
}
```

`read_line` keeps the trailing newline — `trim()` before parsing.

# Strings

## String and &str
@id strings
@keywords String &str str owned borrowed push_str concatenate len
@diff String owns; &str borrows.

Owned `String` vs borrowed `&str`.

```rust
let literal: &str = "hello";           // borrowed, fixed
let mut owned: String = String::from("hello");
owned.push_str(" world");
owned.push('!');
let joined = owned.clone() + " again"; // + takes ownership of the left side
let combined = format!("{literal} and {owned}");
let len = owned.len();                 // bytes, not characters
let view: &str = &owned;               // &String coerces to &str
```

Write functions that take `&str`; they accept both `&String` and literals.

## String methods
@id string-methods
@keywords split trim replace to_uppercase contains starts_with find lines chars
@diff Methods on str; many return iterators.

Everyday string operations.

```rust
let s = "  Hello, World  ";
let t = s.trim();
t.to_lowercase();
t.replace("World", "Rust");
t.contains("World");
t.starts_with("Hello");
t.find(',');                                   // Some(5)
let parts: Vec<&str> = "a,b,c".split(',').collect();
let words: Vec<&str> = "a b  c".split_whitespace().collect();
let joined = parts.join("-");                  // "a-b-c"
for line in "one\ntwo".lines() {
    println!("{line}");
}
let count = "héllo".chars().count();           // 5 characters
```

## Slicing strings
@id slicing
@keywords slice substring range byte index chars get
@diff &s[a..b] uses byte offsets.

Take part of a string or array.

```rust
let s = "abcdef";
let part = &s[1..4];          // "bcd"
let start = &s[..3];          // "abc"
let end = &s[3..];            // "def"
let safe = s.get(0..10);      // None instead of panicking
let reversed: String = s.chars().rev().collect();

let v = [1, 2, 3, 4];
let middle = &v[1..3];        // [2, 3]
let inclusive = &v[1..=3];    // [2, 3, 4]
```

String indexes are **byte** offsets. Slicing through the middle of a multi-byte character panics.

# Control flow

## If / else
@id if
@keywords conditional else if branch expression
@diff No parentheses; if is an expression.

Choose a branch; `if` also returns a value.

```rust
let temperature = 25;
if temperature > 30 {
    println!("Hot");
} else if temperature > 20 {
    println!("Warm");
} else {
    println!("Cool");
}

let label = if temperature > 20 { "warm" } else { "cool" };   // no ternary needed
```

Conditions must be `bool` — `if 1 { }` doesn't compile.

## For loop
@id for
@keywords for range ..= iteration step rev loop
@diff for i in 0..n; ..= includes the end.

Loop over ranges and iterators.

```rust
for i in 0..5 {              // 0 1 2 3 4
    println!("{i}");
}
for i in 1..=5 {             // 1 to 5 inclusive
    println!("{i}");
}
for i in (0..10).step_by(3) { // 0 3 6 9
    println!("{i}");
}
for i in (1..=3).rev() {     // 3 2 1
    println!("{i}");
}
```

## While and loop
@id while
@keywords while loop infinite break value
@diff loop for infinite; while for conditions.

Repeat while a condition holds, or forever.

```rust
let mut count = 0;
while count < 3 {
    count += 1;
}

let mut attempts = 0;
let result = loop {
    attempts += 1;
    if attempts == 3 {
        break attempts * 10;    // loop can return a value
    }
};
```

## Break and continue
@id loop-control
@keywords break continue label 'outer exit loop
@diff Labels like 'outer: break out of nested loops.

Leave a loop or skip an iteration.

```rust
for n in 0..10 {
    if n % 2 == 0 { continue; }
    if n > 7 { break; }
    println!("{n}");          // 1 3 5 7
}

'outer: for row in 0..3 {
    for col in 0..3 {
        if row * col == 2 { break 'outer; }
    }
}
```

## Match
@id switch
@keywords match pattern arms wildcard guard range exhaustive switch
@diff match must cover every case; no fall-through.

Branch on the shape of a value.

```rust
let code = 404;
let text = match code {
    200 | 201 => "OK",
    300..=399 => "Redirect",
    404 => "Not found",
    n if n >= 500 => "Server error",
    _ => "Other",
};

let point = (0, 7);
match point {
    (0, y) => println!("on the y axis at {y}"),
    (x, 0) => println!("on the x axis at {x}"),
    _ => println!("elsewhere"),
}
```

The compiler rejects a `match` that doesn't handle every possibility.

## if let and let else
@id if-let
@keywords if let let else while let pattern Option shortcut
@diff Match one pattern without a full match.

Handle a single pattern concisely.

```rust
fn first_word(text: &str) -> &str {
    let Some(word) = text.split_whitespace().next() else {
        return "";                       // let-else must diverge
    };
    word
}

fn main() {
    let maybe = Some(3);
    if let Some(n) = maybe {
        println!("got {n}");
    }
    let mut stack = vec![1, 2, 3];
    while let Some(top) = stack.pop() {
        println!("{top}");
    }
    println!("{}", first_word("hello world"));
}
```

# Functions

## Functions
@id function
@keywords fn parameters return type expression implicit return
@diff fn name(x: T) -> R; last expression is returned.

Define reusable operations.

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b              // no semicolon: this is the return value
}

fn log(message: &str) {
    println!("{message}");   // returns () implicitly
}

fn main() {
    let sum = add(2, 3);
    log(&sum.to_string());
}
```

Adding a semicolon after `a + b` turns it into a statement and the function returns `()` — a common compile error.

## Borrowing parameters
@id by-reference
@keywords borrow reference &mut & ownership move parameter
@diff &T to read, &mut T to modify, T to take ownership.

Choose how a function receives a value.

```rust
fn length(text: &str) -> usize { text.len() }           // borrow to read
fn shout(text: &mut String) { text.push('!'); }        // borrow to modify
fn consume(text: String) -> String { text + " (done)" } // take ownership

fn main() {
    let mut s = String::from("hi");
    let n = length(&s);
    shout(&mut s);
    let t = consume(s);       // s is moved; can't use it after this
    println!("{n} {t}");
}
```

## Returning multiple values
@id multiple-return
@keywords tuple return two values destructure
@diff Return a tuple and destructure it.

Return several values with a tuple.

```rust
fn min_max(values: &[i32]) -> (i32, i32) {
    let min = *values.iter().min().unwrap();
    let max = *values.iter().max().unwrap();
    (min, max)
}

fn main() {
    let (low, high) = min_max(&[3, 1, 4]);
    println!("{low} {high}");
}
```

## Closures
@id lambda
@keywords closure lambda anonymous function |x| move capture Fn FnMut
@diff |args| expression; move captures by value.

Anonymous functions that capture their environment.

```rust
let factor = 3;
let times = |x: i32| x * factor;        // borrows factor
let add = |a, b| a + b;
println!("{} {}", times(2), add(1, 2));

let mut count = 0;
let mut increment = || count += 1;      // FnMut: mutates a capture
increment();

let name = String::from("Ada");
let greet = move || format!("hi {name}");   // takes ownership of name

fn apply<F: Fn(i32) -> i32>(f: F, v: i32) -> i32 { f(v) }
apply(times, 5);
```

## Scope and shadowing
@id scope
@keywords scope block lifetime drop shadowing
@diff Values are dropped at the end of their scope.

Values live until the end of their block.

```rust
let count = 1;
{
    let inner = 2;
    println!("{}", count + inner);
}   // inner is dropped here

let x = 5;
let x = x * 2;      // shadowing creates a new binding
{
    let x = "inner";
    println!("{x}");   // "inner"
}
println!("{x}");       // 10
```

## Generics
@id generics
@keywords generic type parameter trait bound where impl Trait
@diff fn f<T: Trait>(x: T)

Write code that works for many types.

```rust
use std::fmt::Display;

fn largest<T: PartialOrd + Copy>(items: &[T]) -> T {
    let mut best = items[0];
    for &item in items {
        if item > best { best = item; }
    }
    best
}

fn describe(item: impl Display) -> String {   // shorthand bound
    format!("<{item}>")
}

struct Pair<T> {
    a: T,
    b: T,
}

fn main() {
    println!("{}", largest(&[3, 7, 2]));
    println!("{}", describe(4.5));
    let p = Pair { a: 1, b: 2 };
    println!("{}", p.a + p.b);
}
```

# Ownership

## Ownership and moves
@id ownership
@keywords ownership move clone copy borrow checker drop
@diff Each value has one owner; assignment moves.

Understand moves, clones and copies.

```rust
let a = String::from("hello");
let b = a;                 // a is moved into b; a can't be used now
let c = b.clone();         // explicit deep copy
println!("{b} {c}");

let x = 5;
let y = x;                 // i32 is Copy, so x is still usable
println!("{x} {y}");
```

Simple types (`i32`, `f64`, `bool`, `char`, tuples of these) are `Copy`. Heap types like `String` and `Vec` move.

## References and borrowing
@id references
@keywords reference borrow & &mut borrow checker rules mutable
@diff Many &T or one &mut T at a time.

Borrow without taking ownership.

```rust
let mut s = String::from("hi");
let r1 = &s;
let r2 = &s;                  // many shared borrows are fine
println!("{r1} {r2}");
let m = &mut s;               // one mutable borrow, once shared ones are done
m.push('!');
println!("{s}");
```

The rule: any number of `&T`, **or** exactly one `&mut T` — never both at the same time.

## Lifetimes
@id lifetimes
@keywords lifetime 'a annotation borrow dangling reference
@diff 'a links the lifetimes of references.

Tell the compiler how references relate.

```rust
fn longer<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}

struct Excerpt<'a> {
    text: &'a str,          // can't outlive the string it borrows
}

fn main() {
    let s1 = String::from("long string");
    let result = longer(&s1, "short");
    let e = Excerpt { text: &s1[..4] };
    println!("{result} {}", e.text);
}
```

Most functions need no annotations — the compiler infers them. You only write them when it can't tell which input a returned reference comes from.

## Box, Rc and RefCell
@id pointers
@keywords Box Rc Arc RefCell heap smart pointer shared ownership interior mutability
@diff Box for heap; Rc for shared; RefCell for runtime borrowing.

Smart pointers for heap data and shared ownership.

```rust
use std::cell::RefCell;
use std::rc::Rc;

let boxed: Box<i32> = Box::new(5);        // heap allocation, single owner
let shared = Rc::new(String::from("hi")); // reference counted
let another = Rc::clone(&shared);         // count is now 2
println!("{} {}", boxed, Rc::strong_count(&another));

let cell = RefCell::new(vec![1]);
cell.borrow_mut().push(2);                // borrow checked at runtime
let total: i32 = cell.borrow().iter().sum();
```

Use `Arc` and `Mutex` instead of `Rc` and `RefCell` across threads.

# Collections

## Vectors
@id array
@keywords Vec vec! array index len get push growable
@diff Vec<T>: growable; get() returns Option.

The growable array.

```rust
let mut values = vec![10, 20, 30];
let first = values[0];             // panics if out of bounds
let maybe = values.get(10);        // None
values.push(40);
let n = values.len();
let zeros = vec![0.0; 5];
let fixed: [i32; 3] = [1, 2, 3];   // fixed-size array
```

## Vector operations
@id array-ops
@keywords push pop insert remove retain extend contains clear truncate dedup
@diff Methods modify in place.

Add, remove and query.

```rust
let mut v = vec![1, 2, 3];
v.push(4);
v.pop();                     // Some(4)
v.insert(0, 0);              // [0, 1, 2, 3]
v.remove(1);                 // returns 1 → [0, 2, 3]
v.extend([5, 6]);
v.retain(|&x| x != 2);       // keep matching items
v.contains(&5);              // true
v.dedup();                   // remove consecutive duplicates
v.is_empty();
v.clear();
```

## Iterating
@id iterate
@keywords for iter iter_mut into_iter loop over vector
@diff &v borrows; v consumes; &mut v modifies.

Loop over a collection.

```rust
let mut values = vec![10, 20, 30];
for value in &values {           // borrow each item
    println!("{value}");
}
for value in &mut values {       // modify in place
    *value *= 2;
}
for value in values {            // consumes the vector
    println!("{value}");
}
// values can't be used here
```

## Index and value
@id enumerate
@keywords enumerate index zip pairs loop with index
@diff .iter().enumerate() yields (index, &value).

Loop with an index, or over two collections.

```rust
let names = ["a", "b", "c"];
let scores = [90, 85, 77];
for (i, name) in names.iter().enumerate() {
    println!("{i}: {name}");
}
for (name, score) in names.iter().zip(scores.iter()) {
    println!("{name} {score}");
}
```

## Iterators
@id transform
@keywords iterator map filter collect sum fold any all find count chain
@diff Lazy adapters ending in collect/sum/etc.

Transform, filter and reduce.

```rust
let nums = vec![1, 2, 3, 4];
let doubled: Vec<i32> = nums.iter().map(|n| n * 2).collect();
let evens: Vec<&i32> = nums.iter().filter(|n| *n % 2 == 0).collect();
let total: i32 = nums.iter().sum();
let product = nums.iter().fold(1, |acc, n| acc * n);
let any_big = nums.iter().any(|&n| n > 3);
let first_big = nums.iter().find(|&&n| n > 2);    // Some(&3)
let count = nums.iter().filter(|&&n| n > 1).count();
let max = nums.iter().max();                       // Some(&4)
let words: Vec<String> = ["a", "b"].iter().map(|s| s.to_uppercase()).collect();
```

Iterator adapters are lazy — nothing runs until you call `collect`, `sum`, `for` etc.

## HashMap
@id dict
@keywords HashMap BTreeMap dictionary key value insert get entry contains_key
@diff HashMap with get() → Option and the entry API.

Look values up by key.

```rust
use std::collections::HashMap;

let mut ages: HashMap<String, u32> = HashMap::new();
ages.insert("ada".to_string(), 36);
if let Some(age) = ages.get("ada") {
    println!("{age}");
}
ages.contains_key("bob");
ages.remove("ada");

let mut counts = HashMap::new();
for word in "a b a".split_whitespace() {
    *counts.entry(word).or_insert(0) += 1;   // count occurrences
}
for (word, n) in &counts {
    println!("{word}: {n}");
}
```

`HashMap` iteration order is random. Use `BTreeMap` for sorted keys.

## HashSet
@id set
@keywords HashSet BTreeSet unique membership union intersection
@diff HashSet<T>; insert returns false for duplicates.

Unique values and membership tests.

```rust
use std::collections::HashSet;

let mut seen = HashSet::new();
seen.insert(3);
let added = seen.insert(3);          // false: already present
seen.contains(&3);
let a: HashSet<i32> = [1, 2, 3].into_iter().collect();
let b: HashSet<i32> = [2, 3, 4].into_iter().collect();
let both: Vec<_> = a.intersection(&b).collect();
let all: HashSet<_> = a.union(&b).collect();
```

## Sorting
@id sort
@keywords sort sort_by sort_by_key reverse descending sort_unstable float
@diff sort / sort_by_key; floats need partial_cmp.

Sort a vector.

```rust
let mut v = vec![3, 1, 2];
v.sort();                              // [1, 2, 3]
v.sort_by(|a, b| b.cmp(a));            // descending
v.sort_by_key(|&x| (x % 2, x));        // by a computed key

let mut people = vec![("Ada", 36), ("Bo", 25)];
people.sort_by_key(|p| p.1);           // by age

let mut floats = vec![2.5, 1.0];
floats.sort_by(|a, b| a.partial_cmp(b).unwrap());   // f64 isn't Ord
```

## Searching
@id search
@keywords find position contains binary_search index of iter
@diff iter().position() returns Option<usize>.

Find items and positions.

```rust
let v = vec![4, 8, 15, 16];
let has = v.contains(&8);
let index = v.iter().position(|&x| x == 15);     // Some(2)
let first_big = v.iter().find(|&&x| x > 10);     // Some(&15)
let sorted_index = v.binary_search(&16);         // Ok(3) — v must be sorted
```

## Tuples
@id tuple
@keywords tuple pair destructure .0 .1
@diff (a, b) with .0/.1 access.

Group a few values of different types.

```rust
let pair = ("Ada", 36);
let name = pair.0;
let (n, age) = pair;
let nested = ((1, 2), 3.5);
let inner = (nested.0).1;      // 2
println!("{name} {n} {age} {inner}");
```

# Types

## Structs
@id struct
@keywords struct fields impl method new self associated function
@diff struct + impl block for methods.

Define your own data types with methods.

```rust
#[derive(Debug, Clone, PartialEq)]
struct Sensor {
    id: u32,
    value: f64,
}

impl Sensor {
    fn new(id: u32) -> Self {            // associated function (constructor)
        Self { id, value: 0.0 }
    }
    fn reading(&self) -> f64 {           // borrows self
        self.value
    }
    fn update(&mut self, value: f64) {   // mutably borrows self
        self.value = value;
    }
}

fn main() {
    let mut s = Sensor::new(1);
    s.update(2.5);
    let copy = Sensor { id: 2, ..s.clone() };   // struct update syntax
    println!("{:?} {}", copy, s.reading());
}
```

## Enums
@id enum
@keywords enum variants data match algebraic
@diff Variants can carry data; use match to unpack.

Types with a fixed set of variants — each can hold data.

```rust
#[derive(Debug)]
enum Shape {
    Circle { radius: f64 },
    Rect(f64, f64),
    Empty,
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle { radius } => std::f64::consts::PI * radius * radius,
            Shape::Rect(w, h) => w * h,
            Shape::Empty => 0.0,
        }
    }
}

fn main() {
    let shapes = vec![Shape::Rect(2.0, 3.0), Shape::Circle { radius: 1.0 }];
    let total: f64 = shapes.iter().map(Shape::area).sum();
    println!("{total:.2}");
}
```

## Option
@id optional
@keywords Option Some None unwrap_or map unwrap expect null
@diff Option<T> replaces null.

Represent "a value or nothing".

```rust
fn find_user(id: u32) -> Option<&'static str> {
    if id == 1 { Some("Ada") } else { None }
}

fn main() {
    let name = find_user(2).unwrap_or("guest");
    let len = find_user(1).map(|n| n.len());       // Some(3)
    match find_user(1) {
        Some(n) => println!("found {n}"),
        None => println!("missing"),
    }
    let must = find_user(1).expect("user 1 exists"); // panics with message if None
    println!("{name} {len:?} {must}");
}
```

## Traits
@id class
@keywords trait impl interface method default implementation dyn polymorphism
@diff Traits define shared behaviour; no inheritance.

Define shared behaviour across types.

```rust
trait Describe {
    fn name(&self) -> String;
    fn describe(&self) -> String {          // default implementation
        format!("This is {}", self.name())
    }
}

struct Dog;
struct Robot { id: u32 }

impl Describe for Dog {
    fn name(&self) -> String { "a dog".into() }
}
impl Describe for Robot {
    fn name(&self) -> String { format!("robot #{}", self.id) }
}

fn main() {
    let things: Vec<Box<dyn Describe>> = vec![Box::new(Dog), Box::new(Robot { id: 7 })];
    for t in &things {
        println!("{}", t.describe());
    }
}
```

## Derive and common traits
@id derive
@keywords derive Debug Clone Copy PartialEq Eq Hash Default Display impl
@diff #[derive(...)] generates standard trait impls.

Get standard behaviour for free.

```rust
use std::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Default, PartialOrd, Ord)]
struct Point {
    x: i32,
    y: i32,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

fn main() {
    let p = Point { x: 1, y: 2 };
    let origin = Point::default();
    println!("{p} {:?} {}", origin, p == origin);
}
```

# Errors

## Result and ?
@id errors
@keywords Result Ok Err ? error propagation unwrap expect match
@diff Result<T, E>; ? returns early on Err.

Handle recoverable errors.

```rust
use std::fs;
use std::num::ParseIntError;

fn parse_sum(a: &str, b: &str) -> Result<i32, ParseIntError> {
    let x: i32 = a.trim().parse()?;     // on Err, return it immediately
    let y: i32 = b.trim().parse()?;
    Ok(x + y)
}

fn main() {
    match parse_sum("2", "x") {
        Ok(total) => println!("{total}"),
        Err(e) => eprintln!("bad number: {e}"),
    }
    let config = fs::read_to_string("config.toml").unwrap_or_default();
    println!("{}", config.len());
}
```

`unwrap()` panics on `Err`. Fine for prototypes and tests; use `?` or `match` in real code.

## Errors in main
@id custom-errors
@keywords Box dyn Error main returns Result custom error anyhow
@diff main can return Result<(), Box<dyn Error>>.

Use `?` everywhere, including `main`.

```rust
use std::error::Error;
use std::fmt;

#[derive(Debug)]
struct ConfigError(String);

impl fmt::Display for ConfigError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "config error: {}", self.0)
    }
}
impl Error for ConfigError {}

fn check(port: u32) -> Result<u32, ConfigError> {
    if port == 0 { Err(ConfigError("port is zero".into())) } else { Ok(port) }
}

fn main() -> Result<(), Box<dyn Error>> {
    let port: u32 = "8080".parse()?;     // ParseIntError converts automatically
    let port = check(port)?;
    println!("listening on {port}");
    Ok(())
}
```

The `anyhow` crate makes this even simpler for applications.

## Panics and assertions
@id assert
@keywords panic assert assert_eq debug_assert unreachable todo
@diff panic! for bugs; assert! for invariants.

Stop on bugs and impossible states.

```rust
fn divide(a: i32, b: i32) -> i32 {
    assert!(b != 0, "divisor must be nonzero, got {b}");
    a / b
}

fn main() {
    assert_eq!(divide(6, 3), 2);
    debug_assert!(1 + 1 == 2);       // only in debug builds
    let n = 3;
    if n > 10 {
        unreachable!("n is always small");
    }
}
```

`todo!()` compiles anywhere and panics when reached — handy while sketching code.

# Files & system

## Reading a file
@id read-file
@keywords fs read_to_string BufReader lines read file
@diff fs::read_to_string, or BufReader for lines.

Read a text file.

```rust
use std::fs;
use std::io::{self, BufRead, BufReader};

fn main() -> io::Result<()> {
    let text = fs::read_to_string("data.txt")?;
    println!("{} bytes", text.len());

    let file = fs::File::open("data.txt")?;
    for line in BufReader::new(file).lines() {
        let line = line?;
        println!("{line}");
    }
    Ok(())
}
```

## Writing a file
@id write-file
@keywords fs write create append OpenOptions writeln file
@diff fs::write, or File + writeln!.

Write or append to a file.

```rust
use std::fs::{self, OpenOptions};
use std::io::{self, Write};

fn main() -> io::Result<()> {
    fs::write("out.txt", "hello\n")?;                 // create or truncate
    let mut log = OpenOptions::new().create(true).append(true).open("log.txt")?;
    writeln!(log, "value={}", 42)?;
    Ok(())
}
```

## Paths and directories
@id paths
@keywords Path PathBuf join exists read_dir create_dir_all extension
@diff Path/PathBuf; fs::read_dir lists entries.

Work with paths and directories.

```rust
use std::fs;
use std::path::{Path, PathBuf};

fn main() -> std::io::Result<()> {
    let p: PathBuf = Path::new("data").join("report.csv");
    println!("{:?} {:?}", p.file_name(), p.extension());
    if !Path::new("out").exists() {
        fs::create_dir_all("out/logs")?;
    }
    for entry in fs::read_dir(".")? {
        println!("{}", entry?.path().display());
    }
    Ok(())
}
```

## Command-line arguments
@id args
@keywords env args command line arguments clap
@diff env::args(); first item is the program.

Read the program's arguments.

```rust
use std::env;
use std::process;

fn main() {
    let args: Vec<String> = env::args().skip(1).collect();
    let Some(path) = args.first() else {
        eprintln!("usage: app FILE");
        process::exit(1);
    };
    println!("reading {path}");
}
```

For real CLIs, the `clap` crate handles flags, help text and validation.

## Environment variables
@id env
@keywords env var environment variable std::env
@diff env::var returns a Result.

Read environment variables.

```rust
use std::env;

let home = env::var("HOME").unwrap_or_default();
let level = env::var("LOG_LEVEL").unwrap_or_else(|_| "info".to_string());
match env::var("API_KEY") {
    Ok(key) => println!("key has {} chars", key.len()),
    Err(_) => println!("API_KEY not set"),
}
println!("{home} {level}");
```

## Modules and crates
@id imports
@keywords mod use pub crate module visibility import Cargo.toml dependencies
@diff mod declares, use imports, pub exposes.

Organise code and use libraries.

```rust
mod geometry {
    pub fn area(w: f64, h: f64) -> f64 {
        w * h
    }
    fn helper() {}            // private to the module
}

use geometry::area;
use std::collections::{HashMap, HashSet};

fn main() {
    println!("{}", area(2.0, 3.0));
    let _m: HashMap<i32, i32> = HashMap::new();
    let _s: HashSet<i32> = HashSet::new();
}
```

```toml Cargo.toml
[dependencies]
serde = { version = "1", features = ["derive"] }
rand = "0.8"
```

`mod geometry;` (with a semicolon) loads the module from `geometry.rs` or `geometry/mod.rs`.

## Cargo commands
@id build
@keywords cargo new build run test check clippy fmt add release
@diff cargo new / run / test / build --release

The commands you use every day.

```bash
cargo new my_app              # create a project (--lib for a library)
cargo run                     # build and run
cargo run -- arg1 arg2        # pass arguments to your program
cargo check                   # fast type-check, no binary
cargo test                    # run tests
cargo build --release         # optimised build in target/release
cargo add serde --features derive
cargo fmt                     # format code
cargo clippy                  # lints and suggestions
cargo doc --open
```

## Tests
@id tests
@keywords test #[test] cfg test assert_eq unit test cargo test
@diff #[test] functions in a #[cfg(test)] module.

Write unit tests next to your code.

```rust
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn adds_numbers() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    #[should_panic]
    fn panics_on_bad_index() {
        let v: Vec<i32> = vec![];
        let _ = v[0];
    }
}
```
@check top

Run with `cargo test`; filter by name with `cargo test adds`.

# Utilities

## Math
@id math
@keywords sqrt pow abs round floor ceil min max clamp PI f64 methods
@diff Methods on the number: x.sqrt().

Common maths — called as methods.

```rust
let x = 2.0_f64;
let r = x.sqrt();
let p = x.powi(10);            // integer power
let a = (-3.5_f64).abs();
let near = 2.5_f64.round();    // 3 — rounds half away from zero
let (fl, ce) = (2.7_f64.floor(), 2.1_f64.ceil());
let pi = std::f64::consts::PI;
let lo = 3.min(7);
let c = 15.clamp(0, 10);       // 10
let m = 4.0_f64.max(9.5);
println!("{r} {p} {a} {near} {fl} {ce} {pi} {lo} {c} {m}");
```

## Random numbers
@id random
@keywords rand crate random gen_range thread_rng shuffle
@diff Needs the rand crate.

Random numbers (with the `rand` crate).

```rust
use rand::seq::SliceRandom;
use rand::Rng;

fn main() {
    let mut rng = rand::thread_rng();
    let die = rng.gen_range(1..=6);
    let unit: f64 = rng.gen();          // [0, 1)
    let mut items = vec![1, 2, 3];
    items.shuffle(&mut rng);
    println!("{die} {unit} {items:?}");
}
```
@check skip

Add it with `cargo add rand`. The standard library has no random number generator. (These are rand 0.8 names; 0.9 renames them to `rand::rng()`, `random_range` and `random`.)

## Timing and sleep
@id time
@keywords Instant Duration elapsed sleep thread timing
@diff Instant::now() and elapsed().

Measure elapsed time and pause.

```rust
use std::thread;
use std::time::{Duration, Instant};

let start = Instant::now();
thread::sleep(Duration::from_millis(50));
let elapsed = start.elapsed();
println!("{:.3} s", elapsed.as_secs_f64());
println!("{} ms", elapsed.as_millis());
```

## Threads
@id threads
@keywords thread spawn join move Arc Mutex concurrency channel
@diff thread::spawn + join; Arc<Mutex<T>> to share.

Run work in parallel.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..4 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            *counter.lock().unwrap() += 1;
        }));
    }
    for h in handles {
        h.join().unwrap();
    }
    println!("{}", *counter.lock().unwrap());   // 4
}
```

The compiler refuses to share data between threads unsafely — `Rc` won't compile here; `Arc` will.
