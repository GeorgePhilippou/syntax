# Hover explanations for Rust code: term :: one-line explanation.

# Keywords
let :: Declares a variable; immutable unless you add mut.
mut :: Makes a variable (or reference) changeable.
const :: Compile-time constant; needs a type, e.g. const MAX: f64 = 1.2;
fn :: Defines a function.
return :: Returns early; normally the last expression (no semicolon) is returned.
if :: Branch; also an expression: let s = if c { a } else { b };
else :: The branch taken when the if condition is false.
match :: Compares a value against patterns; must cover every case.
loop :: Repeats forever until break (break can return a value).
while :: Repeats while the condition is true.
for :: Iterates over a range, collection or iterator.
in :: Separates the loop variable from what it iterates over.
break :: Leaves a loop.
continue :: Skips to the next iteration.
struct :: Defines a type with named fields.
enum :: A type that is one of several variants, which can carry data.
impl :: Adds methods to a type, or implements a trait for it.
trait :: A set of methods types can implement (like an interface).
self :: The value a method is called on (&self reads, &mut self changes).
Self :: The type being implemented, inside impl.
pub :: Makes an item visible outside its module.
mod :: Declares a module.
use :: Brings a path into scope: use std::collections::HashMap;
as :: Numeric cast (x as f64) or renaming an import.
where :: Lists trait bounds after a signature.
dyn :: A trait object: some type implementing the trait, chosen at runtime.
move :: Makes a closure take ownership of what it captures.
ref :: Binds by reference inside a pattern.
true :: Boolean true.
false :: Boolean false.
main :: Where the program starts.

# Types
i32 :: Signed 32-bit integer — the default integer type.
i64 :: Signed 64-bit integer.
u8 :: Unsigned 8-bit integer: 0–255 (also raw bytes).
u16 :: Unsigned 16-bit integer: 0–65,535.
u32 :: Unsigned 32-bit integer.
u64 :: Unsigned 64-bit integer.
usize :: Unsigned integer the size of a pointer; used for lengths and indexes.
f64 :: 64-bit floating point — the default float type.
f32 :: 32-bit floating point.
bool :: true or false.
char :: A single Unicode character, in single quotes.
str :: A string slice; usually seen as &str (borrowed text).
String :: Owned, growable UTF-8 text.
Vec :: Growable array: Vec<T>.
Option :: Either Some(value) or None — Rust's replacement for null.
Some :: An Option that holds a value.
None :: An Option with no value.
Result :: Either Ok(value) or Err(error) — how Rust returns errors.
Ok :: A successful Result.
Err :: A failed Result holding the error.
Box :: Owned pointer to a value on the heap.
Rc :: Reference-counted pointer: several owners, one thread.
Arc :: Atomically reference-counted pointer: several owners across threads.
RefCell :: Lets you mutate through a shared reference, checked at runtime.
Mutex :: Lock giving one thread at a time access to the data.
HashMap :: Key → value map with hashing (no order).
HashSet :: Set of unique values with hashing.
BTreeMap :: Key → value map kept in sorted key order.
Path :: A borrowed filesystem path.
File :: An open file.
BufReader :: Buffered reader; .lines() reads a file line by line.
Instant :: A moment in time, for measuring elapsed time.
Duration :: A span of time, e.g. Duration::from_millis(100).

# Macros
println! :: Prints a formatted line: println!("{} {:.3}", a, b).
print! :: Prints without a newline.
eprintln! :: Prints a line to stderr.
format! :: Builds a String using the same formatting as println!.
vec! :: Creates a Vec: vec![1, 2, 3] or vec![0.0; 100].
dbg! :: Prints an expression and its value with file/line, for debugging.
assert! :: Panics if the condition is false.
assert_eq! :: Panics if the two values differ, showing both.
panic! :: Stops the program (or thread) with a message.

# Operators and syntax
& :: Borrow (shared reference): lets code read a value without taking ownership.
&mut :: Mutable borrow: exclusive access to change a value.
* :: Dereference (read through a reference), or multiply.
? :: Returns the error early if a Result is Err (or None for Option); otherwise unwraps it.
:: :: Path separator: std::fs::read_to_string, String::from.
.. :: Range excluding the end: 0..10 is 0 to 9; in a struct literal, "fill the rest from".
..= :: Range including the end: 1..=10.
=> :: Separates a pattern from its result in a match arm.
-> :: Declares a function's return type.
_ :: Wildcard: matches anything / ignores a value.
| :: Separates alternatives in a pattern, or encloses closure parameters |x|.
' :: Marks a lifetime, e.g. 'a.

# Common methods
new :: Conventional constructor, e.g. String::new(), Vec::new().
from :: Converts from another type, e.g. String::from("text").
to_string :: Converts to an owned String.
clone :: Makes a deep copy.
len :: Number of elements (bytes for strings).
is_empty :: True if there are no elements.
push :: Adds to the end of a Vec.
push_str :: Appends text to a String.
pop :: Removes and returns the last element (as an Option).
get :: Safe lookup returning Option instead of panicking.
contains :: True if the value / substring is present.
contains_key :: True if a map has the key.
insert :: Adds to a map or set.
remove :: Removes from a map or set.
entry :: Map entry API; .or_insert(0) inserts a default if missing.
or_insert :: Value for the entry, inserting the given default if absent.
retain :: Keeps only elements matching a condition.
extend :: Appends all items from another collection.
windows :: Overlapping slices of n neighbours.
sort :: Sorts in place (needs Ord, so not plain floats).
sort_by :: Sorts using your comparison function.
sort_by_key :: Sorts by a key you compute from each element.
partial_cmp :: Compares floats; returns None if either is NaN.
cmp :: Compares two values, giving Less, Equal or Greater.
reverse :: Reverses in place.
dedup :: Removes consecutive duplicates.
iter :: Iterator over references to the elements.
into_iter :: Iterator that takes ownership of the elements.
map :: Transforms each item (lazily).
filter :: Keeps items matching a condition.
collect :: Gathers an iterator into a collection (Vec, HashMap, String…).
sum :: Adds up all items.
max :: Largest item, as an Option.
min :: Smallest item, as an Option.
fold :: Combines all items into one value, starting from an initial value.
count :: Number of items.
any :: True if any item matches.
all :: True if every item matches.
enumerate :: Yields (index, item) pairs.
zip :: Walks two iterators in step.
rev :: Reverses an iterator.
step_by :: Takes every nth item.
position :: Index of the first matching item, as an Option.
cloned :: Turns an iterator of references into owned copies.
chars :: Iterator over a string's characters.
split :: Splits a string on a pattern.
trim :: Removes surrounding whitespace.
parse :: Converts text to a number (or other type); returns a Result.
replace :: Returns a copy with matches replaced.
starts_with :: True if the string begins with the given text.
ends_with :: True if the string ends with the given text.
to_uppercase :: Upper-case copy.
to_lowercase :: Lower-case copy.
unwrap :: Takes the value out of Some/Ok, or panics.
expect :: Like unwrap, but panics with your message.
unwrap_or :: The value, or the given default.
unwrap_or_default :: The value, or the type's default (0, "", …).
is_some :: True if an Option holds a value.
is_none :: True if an Option is None.
is_ok :: True if a Result is Ok.
pow :: Integer power.
powi :: Float raised to an integer power.
sqrt :: Square root.
checked_add :: Addition that returns None on overflow.
wrapping_add :: Addition that wraps around on overflow.
saturating_add :: Addition that stops at the type's maximum.
borrow_mut :: Mutable access to a RefCell's contents (panics if already borrowed).
spawn :: Starts a new thread.
join :: Waits for a thread to finish and gets its result.
sleep :: Pauses the current thread.
elapsed :: Time since an Instant.
as_secs_f64 :: A Duration as seconds (f64).
from_millis :: A Duration from milliseconds.
now :: The current Instant.

# std modules and functions
std :: The standard library.
fs :: Filesystem functions: read_to_string, write, create_dir_all, read_dir.
read_to_string :: Reads a whole file into a String.
write :: Writes a whole file.
create_dir_all :: Makes a folder and any missing parents.
read_dir :: Iterates over the entries of a folder.
open :: Opens a file for reading.
lines :: Iterator over lines.
exists :: True if the path exists.
env :: Process environment: args and environment variables.
args :: Command-line arguments; the first is the program name.
var :: Reads an environment variable, as a Result.
nth :: The nth item of an iterator, as an Option.
process :: Process control; process::exit(code).
exit :: Ends the program immediately with a status code.
thread :: Threads: spawn, sleep.
time :: Instant and Duration.
collections :: HashMap, HashSet, BTreeMap, VecDeque and more.
consts :: Mathematical constants such as PI.
PI :: π ≈ 3.14159 (std::f64::consts::PI).
NEG_INFINITY :: Negative infinity — a starting value for finding a maximum.

# Derives and attributes
derive :: Asks the compiler to generate trait implementations automatically.
Debug :: Trait for {:?} printing.
Clone :: Trait for .clone().
PartialEq :: Trait for == and !=.
PartialOrd :: Trait for < and > comparisons.
Copy :: Trait for types copied instead of moved (numbers, bool, char).
Default :: Trait for a sensible default value.
cfg :: Conditional compilation, e.g. #[cfg(test)] only in test builds.
test :: Marks a function as a unit test run by cargo test.

# Cargo
cargo :: Rust's build tool and package manager.
build :: Compiles the project (--release for optimised).
run :: Builds and runs; arguments after -- go to your program.
check :: Type-checks quickly without producing a binary.
fmt :: std::fmt holds the formatting traits (Debug, Display); cargo fmt formats your code.
clippy :: Linter with helpful suggestions.
--release :: Optimised build (slower to compile, much faster to run).
