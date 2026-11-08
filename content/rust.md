---
name: Rust
symbol: Rs
order: 6
color: #ef2b2d
on: light
version: Rust 2021
highlight: rust
layout: sheet
description: Ownership, types and safe speed.
---

# Basics

## Variables and numbers
@id variables
@keywords let mut const shadowing i32 u8 f64 usize bool char cast as overflow integer float
@setup let x = 5;
- Immutable :: let x = 5;
- Mutable :: let mut count = 0;
- With a type :: let v: f64 = 2.5;
- Integer types :: let a: u8 = 255; let b: i32 = -5; let c: u64 = 1_000_000;
- Index / size type :: let n: usize = 10;
- Constant :: const MAX_V: f64 = 1.2;
- Shadow (re-declare) :: let x = x * 2;
- Cast :: let i = 3.7_f64 as i32;
- Integer division :: 7 / 2
- Power / root :: 2_i32.pow(10); 2.0_f64.powi(3); 9.0_f64.sqrt()
- Pi :: std::f64::consts::PI
- Overflow-safe :: 250_u8.checked_add(10); 250_u8.wrapping_add(10); 250_u8.saturating_add(10)
> Variables are immutable unless you write mut; there are no implicit number conversions.

## Printing and formatting
@id printing-output
@keywords println print format macro decimal debug padding eprintln
@setup let x = 1.2345_f64; let n = 7; let name = "WE1"; let v = vec![1, 2, 3];
- Print :: println!("n = {}", n);
- Inline names :: println!("{name}: {x}");
- Decimals :: println!("{:.3}", x);
- Scientific :: println!("{:e}", x);
- Width and align :: println!("{:<10}{:>8.2}", name, x);
- Zero-pad / hex :: println!("{:04} 0x{:02X}", n, 255);
- Debug view :: println!("{:?}", v);
- Pretty debug :: println!("{:#?}", v);
- To stderr :: eprintln!("error: {}", n);
- Into a String :: let s = format!("run_{:03}.csv", n);
- Quick debug print :: dbg!(x);

## Strings
@id strings
@keywords String str slice push_str split trim parse contains replace chars len format
@setup let s = String::from("run_001.csv"); let line = "1, 2, 3";
- Owned text :: let mut t = String::from("run");
- Borrowed text :: let r: &str = "fixed text";
- Append :: let mut u = String::new(); u.push_str("abc"); u.push('!');
- Join with + :: let joined = s.clone() + "_old";
- Length (bytes) :: s.len()
- Contains :: s.contains("run")
- Starts / ends :: s.starts_with("run"); s.ends_with(".csv")
- Replace :: s.replace("run", "test")
- Slice (byte range) :: &s[0..3]
- Split :: let parts: Vec<&str> = line.split(',').collect();
- Trim :: line.trim()
- Parse a number :: let v: f64 = "2.5".parse().unwrap();
- Characters :: for c in s.chars() { }
- Upper / lower :: s.to_uppercase(); s.to_lowercase()
> String owns its text; &str borrows it. Pass &str to functions, store String in structs.

## Conditionals and match
@id if-else
@keywords if else match if let let else option pattern
@setup let n = 3; let v = 0.5_f64; let opt: Option<i32> = Some(4);
- If / else :: if v > 1.0 { } else if v < 0.0 { } else { }
- If as a value :: let sign = if v >= 0.0 { 1 } else { -1 };
```rust Match
match n {
    0 => println!("zero"),
    1 | 2 => println!("small"),
    3..=9 => println!("medium"),
    _ => println!("large"),
}
```
- If let (one pattern) :: if let Some(x) = opt { println!("{x}"); }
- Let else (early exit) :: let Some(x) = opt else { return; };
> match must cover every case; _ catches the rest.

## Loops
@id for-loop
@keywords for while loop range iter enumerate zip rev break continue
@setup let v = vec![1, 2, 3]; let w = vec![4, 5, 6]; let mut done = false;
- Range :: for i in 0..10 { }
- Inclusive :: for i in 1..=10 { }
- Step :: for i in (0..100).step_by(5) { }
- Over items :: for x in &v { }
- With index :: for (i, x) in v.iter().enumerate() { }
- Two at once :: for (a, b) in v.iter().zip(&w) { }
- Backwards :: for i in (0..10).rev() { }
- While :: while !done { done = true; }
- Forever :: loop { break; }
- Break with a value :: let found = loop { break 42; };
> for x in v consumes the vector; for x in &v only borrows it.

## Functions and closures
@id functions
@keywords fn return reference borrow closure generic tuple return value
```rust Function
fn scale(raw: u16, gain: f64) -> f64 {
    raw as f64 * gain    // last expression is returned (no semicolon)
}
```
- Borrow a slice :: fn mean(x: &[f64]) -> f64 { x.iter().sum::<f64>() / x.len() as f64 }
- Change caller's value :: fn reset(v: &mut Vec<i32>) { v.clear(); }
- Return two values :: fn min_max(x: &[i32]) -> (i32, i32) { (x[0], x[x.len() - 1]) }
- Unpack :: let (lo, hi) = (1, 9);
- Closure :: let add = |a: i32, b: i32| a + b;
- Captures variables :: let gain = 2.0; let scaled = |x: f64| x * gain;
```rust Generic
fn largest<T: PartialOrd + Copy>(xs: &[T]) -> T {
    let mut m = xs[0];
    for &x in xs {
        if x > m { m = x; }
    }
    m
}
```

# Ownership

## Ownership and borrowing
@id ownership-and-moves
@keywords ownership move borrow reference mut clone copy lifetime
@setup let mut v = vec![1, 2, 3]; let a = String::from("x");
- Move :: let a = String::from("x"); let b = a;    // a can't be used now
- Copy instead :: let c = a.clone();
- Shared borrow :: let r = &v;
- Mutable borrow :: let m = &mut v; m.push(4);
- Numbers are Copy :: let p = 5; let q = p;    // both usable
```rust Lifetime (return a borrow)
fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}
```
> Rule: many & readers or one &mut writer at a time, never both.

## Box, Rc and RefCell
@id box-rc-and-refcell
@keywords box rc refcell heap shared ownership interior mutability arc
- Heap value :: let b = Box::new(5);
- Shared owners :: let shared = std::rc::Rc::new(vec![1]); let other = std::rc::Rc::clone(&shared);
- Change through & :: let cell = std::cell::RefCell::new(vec![1]); cell.borrow_mut().push(2);
- Across threads :: let data = std::sync::Arc::new(std::sync::Mutex::new(0));

# Collections

## Vec
@id vectors
@keywords vec vector push pop len get sort contains iter slice windows retain extend
@setup let mut v = vec![3, 1, 2];
- Create :: let empty: Vec<f64> = Vec::new();
- With values :: let p = vec![1, 2, 3];
- n copies :: let zeros = vec![0.0; 100];
- Add / remove last :: v.push(4); v.pop();
- Length :: v.len(); v.is_empty()
- Element :: v[0]
- Safe get (Option) :: v.get(10)
- Slice :: &v[1..3]
- Contains :: v.contains(&3)
- Position :: v.iter().position(|&x| x == 2)
- Keep matching :: v.retain(|&x| x > 1);
- Add many :: v.extend([5, 6]);
- Pairs of neighbours :: for w in v.windows(2) { }
> v[i] panics if out of range; v.get(i) returns None instead.

## Iterators
@id iterators
@keywords iter map filter collect sum max min fold count any all chain
@setup let v = vec![1, 2, 3, 4]; let f = vec![0.5_f64, 1.5];
- Transform :: let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();
- Filter :: let even: Vec<&i32> = v.iter().filter(|x| *x % 2 == 0).collect();
- Sum :: let total: i32 = v.iter().sum();
- Max / min :: v.iter().max(); v.iter().min()
- Float max :: f.iter().cloned().fold(f64::NEG_INFINITY, f64::max)
- Count matching :: v.iter().filter(|&&x| x > 2).count()
- Any / all :: v.iter().any(|&x| x > 3); v.iter().all(|&x| x > 0)
- Mean :: f.iter().sum::<f64>() / f.len() as f64
> Iterators are lazy: nothing happens until collect, sum, a for loop, etc.

## HashMap and HashSet
@id dictionaries
@keywords hashmap hashset key value insert get entry contains remove btreemap
@setup let mut m: std::collections::HashMap<String, i32> = std::collections::HashMap::new(); let mut seen: std::collections::HashSet<i32> = std::collections::HashSet::new();
- Import :: use std::collections::HashMap;
- Insert :: m.insert("we1".to_string(), 2);
- Get (Option) :: m.get("we1")
- Has key :: m.contains_key("we1")
- Count things :: *m.entry("we2".to_string()).or_insert(0) += 1;
- Loop :: for (k, v) in &m { }
- Remove :: m.remove("we1");
- Set :: seen.insert(3); seen.contains(&3);
> HashMap order is random; use BTreeMap for sorted keys.

## Sorting
@id sorting
@keywords sort sort_by sort_unstable reverse float partial_cmp dedup
@setup let mut v = vec![3, 1, 2]; let mut f = vec![2.5_f64, 0.5]; let mut names = vec!["b", "a"];
- Sort :: v.sort();
- Descending :: v.sort_by(|a, b| b.cmp(a));
- Floats :: f.sort_by(|a, b| a.partial_cmp(b).unwrap());
- By a key :: names.sort_by_key(|s| s.len());
- Reverse :: v.reverse();
- Remove repeats (sorted) :: v.dedup();

# Types

## Structs and methods
@id structs
@keywords struct impl method self new associated function derive debug clone
```rust Struct with methods
#[derive(Debug, Clone)]
struct Sensor {
    name: String,
    gain: f64,
}

impl Sensor {
    fn new(name: &str, gain: f64) -> Self {
        Sensor { name: name.to_string(), gain }
    }
    fn scale(&self, raw: f64) -> f64 {
        raw * self.gain
    }
    fn set_gain(&mut self, g: f64) {
        self.gain = g;
    }
}
```
@setup #[derive(Debug, Clone)] struct Point { x: f64, y: f64 } let mut p = Point { x: 1.0, y: 2.0 };
- Create :: let q = Point { x: 0.0, y: 0.0 };
- Field :: p.x = 3.0;
- Copy all but one :: let r = Point { x: 5.0, ..p.clone() };
- Debug print :: println!("{:?}", p);
- Tuple struct :: struct Volts(f64);
> &self reads, &mut self changes, self consumes the value.

## Enums and Option
@id enums
@keywords enum option some none variant match unwrap_or
@setup let peak: Option<f64> = Some(0.4);
- Enum :: enum Mode { Idle, Cv, Lsv }
- With data :: enum Cmd { Start(u32), Stop }
- Maybe a value :: let none: Option<f64> = None;
- Default if None :: peak.unwrap_or(0.0)
- Transform inside :: peak.map(|v| v * 1000.0)
- Check :: peak.is_some(); peak.is_none()
```rust Match an enum
enum Shape { Circle(f64), Rect(f64, f64) }

fn area(s: &Shape) -> f64 {
    match s {
        Shape::Circle(r) => 3.14159 * r * r,
        Shape::Rect(w, h) => w * h,
    }
}
```

## Traits
@id traits
@keywords trait impl generic bound display debug default
```rust Trait and implementation
trait Describe {
    fn describe(&self) -> String;
}

struct Run { id: u32 }

impl Describe for Run {
    fn describe(&self) -> String {
        format!("run {}", self.id)
    }
}
```
- Generic bound :: fn show<T: std::fmt::Debug>(x: T) { println!("{:?}", x); }
- Derive common traits :: #[derive(Debug, Clone, PartialEq, Default)] struct Cfg { rate: u32 }

# Errors and I/O

## Errors and Result
@id result-and
@keywords result ok err question mark unwrap expect panic error handling
```rust Return a Result; ? passes errors up
fn read_config(path: &str) -> Result<String, std::io::Error> {
    let text = std::fs::read_to_string(path)?;
    Ok(text)
}
```
@setup let r: Result<f64, String> = Ok(1.0);
- Handle both :: match r { Ok(v) => println!("{v}"), Err(e) => eprintln!("{e}") }
- Crash with message :: r.clone().expect("config should load");
- Default on error :: r.clone().unwrap_or(0.0)
- Is it OK? :: r.is_ok()
- Make an error :: let bad: Result<f64, String> = Err("bad voltage".to_string());
- Panic :: assert!(1 + 1 == 2, "maths broke");
- Main can return errors :: fn main() -> Result<(), Box<dyn std::error::Error>> { Ok(()) }
> unwrap() panics on Err: fine in quick scripts, use ? or match in real code.

## Files
@id reading-a-file
@keywords file read write lines bufreader path directory fs exists create_dir
- Read whole file :: let text = std::fs::read_to_string("run.csv").unwrap();
- Write whole file :: std::fs::write("out.txt", "hello\n").unwrap();
```rust Read line by line
use std::io::BufRead;
let file = std::fs::File::open("run.csv").unwrap();
for line in std::io::BufReader::new(file).lines() {
    let line = line.unwrap();
}
```
- Path :: let p = std::path::Path::new("data/run1.csv");
- Exists :: std::path::Path::new("data").exists()
- Make folders :: std::fs::create_dir_all("results").unwrap();
- List a folder :: for entry in std::fs::read_dir("data").unwrap() { }

## Command line and environment
@id command-line-arguments
@keywords args env var command line arguments exit process
- Arguments :: let args: Vec<String> = std::env::args().collect();
- First argument :: let file = std::env::args().nth(1).unwrap_or_default();
- Environment variable :: let port = std::env::var("PORT").unwrap_or_default();
- Exit with code :: std::process::exit(1);

## Threads and time
@id threads
@keywords thread spawn join sleep instant duration time timing
- Spawn and wait :: let h = std::thread::spawn(|| 2 + 2); let four = h.join().unwrap();
- Sleep :: std::thread::sleep(std::time::Duration::from_millis(100));
- Time a block :: let t0 = std::time::Instant::now();
- Elapsed seconds :: let secs = std::time::Instant::now().elapsed().as_secs_f64();

# Project

## Cargo
@id cargo-commands
@keywords cargo new build run test add crate release check clippy fmt
```bash Everyday commands
cargo new analyse
cargo run -- data.csv
cargo build --release
cargo test
cargo add serde rand
cargo fmt
cargo clippy
```
- Module in the same file :: mod stats { pub fn twice(x: f64) -> f64 { 2.0 * x } }
- Use a name :: use std::collections::HashMap;
```rust Unit test
#[cfg(test)]
mod tests {
    #[test]
    fn adds() {
        assert_eq!(2 + 2, 4);
    }
}
```
> Random numbers and most extras come from crates: cargo add rand.

# Switching languages

## Coming from C and Python
@id gotchas
@keywords difference c python compare switch translate versus
@setup let v = vec![1, 2, 3]; let i = 5;
- Mutability is opt-in :: let mut count = 0;
- No null :: let maybe: Option<i32> = None;    // instead of NULL / None
- No exceptions :: let r: Result<i32, String> = Ok(1);    // return Result
- Length :: v.len()    // Python len(v)
- Cast explicitly :: let x = i as f64;    // no implicit conversion
- No ++ :: let mut j = 0; j += 1;
- Blocks are expressions :: let s = if i > 0 { "pos" } else { "neg" };
> The compiler's error messages usually tell you the fix — read them to the end.
