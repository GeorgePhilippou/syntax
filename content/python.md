---
name: Python
symbol: Py
order: 2
color: #a8c7d0
version: Python 3.10+
highlight: python
description: Readable by design. Powerful by nature.
---

# Basics

## Variables
@keywords assignment declaration multiple assignment swap
@diff No type declaration or semicolon.

Assign a name to a value; no declaration needed.

```python
count = 3
voltage = 2.5
label = "sensor"
x, y = 1, 2          # multiple assignment
x, y = y, x          # swap
```

## Data types
@id types
@keywords int float bool str None type isinstance
@diff Types belong to values; True/False/None capitalised.

The built-in scalar types.

```python
count = 3            # int (arbitrary precision)
ratio = 2.5          # float
ready = True         # bool
label = "sensor"     # str
nothing = None       # NoneType

type(count)                  # <class 'int'>
isinstance(ratio, float)     # True
isinstance(3, (int, float))  # check against several types
```

Test for `None` with `is None`, not `== None`.

## Constants
@keywords constant final uppercase immutable
@diff Convention only; typing.Final for checkers.

Name values that shouldn't change.

```python
from typing import Final

PI = 3.141592653589793      # uppercase = "please don't reassign"
MAX_RETRIES: Final = 3      # type checkers flag reassignment
```

Python doesn't enforce constants at runtime.

## Operators
@keywords arithmetic floor division power modulo comparison logical and or not chained
@diff / is float division; // floors; ** is power.

Arithmetic, comparison and logic.

```python
7 / 2      # 3.5  true division
7 // 2     # 3    floor division
-7 // 2    # -4   (floors, doesn't truncate)
7 % 2      # 1
2 ** 10    # 1024
0 < x < 10           # chained comparison
a and b, a or b, not a
x += 1               # no ++ operator
```

`and`/`or` return one of their operands: `name or "default"` is a common idiom.

## Comments
@keywords comment docstring documentation multiline

Leave notes and document functions.

```python
# A single-line comment

def area(w, h):
    """Return the area of a rectangle.

    Docstrings appear in help(area).
    """
    return w * h
```

## Printing output
@id print
@keywords print console output sep end stderr
@diff print() adds a newline; sep/end customise.

Print values to the console.

```python
print("Count:", 3)              # Count: 3  (space-separated)
print("a", "b", sep=", ")       # a, b
print("no newline", end="")
print()                         # just a newline

import sys
print("error!", file=sys.stderr)
```

## f-strings and formatting
@id format
@keywords f-string format decimal places padding width align percent thousands
@diff f"{value:.2f}" format spec mini-language.

Format numbers and text inside f-strings.

```python
pi = 3.14159
n = 1234567
name = "Ada"

f"{pi:.2f}"        # '3.14'
f"{n:,}"           # '1,234,567'
f"{0.256:.1%}"     # '25.6%'
f"{42:5d}"         # '   42'  width 5
f"{42:05d}"        # '00042'
f"{name:<8}|"      # 'Ada     |' left-align
f"{name:>8}|"      # '     Ada|' right-align
f"{name:^8}|"      # '  Ada   |' centre
f"{255:x} {255:b}" # 'ff 11111111'
f"{pi=}"           # 'pi=3.14159'  (3.8+) great for debugging
f"{{literal braces}}"
```

## Type conversion
@id convert
@keywords int float str bool parse cast convert string to number
@diff Call the type: int(), float(), str().

Convert between types.

```python
int("42")          # 42
int(3.9)           # 3  (truncates)
int("ff", 16)      # 255
float("2.5")       # 2.5
str(42)            # '42'
round(2.675, 2)    # 2.67 (floating point!)
bool("")           # False — empty things are falsy
list("abc")        # ['a', 'b', 'c']
```

`int("3.5")` raises `ValueError`. Use `int(float("3.5"))` if needed.

## Reading input
@id input
@keywords input keyboard stdin user prompt
@diff input() always returns a string.

Ask the user for a value.

```python
name = input("Name: ")
age = int(input("Age: "))   # convert yourself; may raise ValueError
```

## Truthiness
@id truthy
@keywords truthy falsy empty None zero bool if not
@diff Empty containers, 0, "" and None are falsy.

What counts as false in a condition.

```python
items = []
if not items:            # empty list, dict, set, str, tuple are falsy
    print("empty")

value = 0
if value is None:        # be explicit when 0 is a valid value
    print("missing")
```

Falsy values: `False`, `None`, `0`, `0.0`, `""`, `[]`, `{}`, `set()`, `()`.

# Strings

## Strings
@keywords str quotes concatenation length multiline raw
@diff Immutable str; single or double quotes.

Create and combine text.

```python
s = "hello"
t = 'also fine'
multi = """spans
several lines"""
raw = r"C:\new\folder"      # backslashes kept as-is
joined = s + " " + t
repeated = "-" * 20
len(s)                      # 5
"ell" in s                  # True
```

Strings are immutable; methods return new strings.

## String methods
@id string-methods
@keywords split join strip replace upper lower startswith endswith find count
@diff Methods return new strings.

The everyday string operations.

```python
s = "  Hello, World  "
s.strip()                  # 'Hello, World'
s.lower(), s.upper()
s.replace("World", "Py")
"a,b,c".split(",")         # ['a', 'b', 'c']
"a b  c".split()           # ['a', 'b', 'c'] any whitespace
", ".join(["a", "b"])      # 'a, b'
"report.csv".endswith(".csv")
"hello".find("l")          # 2 (-1 if missing)
"hello".count("l")         # 2
"42".isdigit()             # True
"title case".title()       # 'Title Case'
"5".zfill(3)               # '005'
```

## Slicing
@id slicing
@keywords slice substring start stop step reverse negative index copy
@diff [start:stop:step]; stop is excluded.

Take part of a string, list or tuple.

```python
s = "abcdef"
s[0]        # 'a'
s[-1]       # 'f'   last
s[1:4]      # 'bcd' stop is excluded
s[:3]       # 'abc' first three
s[-2:]      # 'ef'  last two
s[::2]      # 'ace' every second
s[::-1]     # 'fedcba' reversed

items = [1, 2, 3, 4]
copy = items[:]       # shallow copy
items[1:3] = [9]      # replace a slice: [1, 9, 4]
```

Slices never raise IndexError: `s[10:20]` is just `''`.

# Control flow

## If / else
@id if
@keywords conditional elif else branch
@diff Colon + indentation; elif.

Choose a branch using a condition.

```python
temperature = 25
if temperature > 30:
    print("Hot")
elif temperature > 20:
    print("Warm")
else:
    print("Cool")
```

Indentation defines the block. Use four spaces.

## Conditional expression
@id ternary
@keywords ternary inline if one line conditional expression
@diff a if condition else b

Choose a value in one line.

```python
age = 20
status = "adult" if age >= 18 else "minor"
```

## For loop
@id for
@keywords range iteration repeat loop count step
@diff range(stop) excludes stop.

Repeat over a range of numbers.

```python
for i in range(5):           # 0 1 2 3 4
    print(i)

for i in range(2, 10, 3):    # 2 5 8
    print(i)

for i in range(5, 0, -1):    # 5 4 3 2 1
    print(i)
```

## While loop
@id while
@keywords while loop repeat condition
@diff Indented block; += 1 increments.

Repeat while a condition holds.

```python
count = 0
while count < 3:
    count += 1

while True:
    line = input("> ")
    if line == "quit":
        break
```

## Break, continue and else
@id loop-control
@keywords break continue pass for else loop exit skip
@diff break/continue; loops can have an else clause.

Control a loop from inside.

```python
for n in range(10):
    if n % 2 == 0:
        continue           # skip evens
    if n > 7:
        break              # stop
    print(n)               # 1 3 5 7

for item in [1, 3, 5]:
    if item % 2 == 0:
        print("found even")
        break
else:                      # runs only if the loop didn't break
    print("no even numbers")
```

`pass` is a placeholder for an empty block.

## Match
@id switch
@keywords match case switch pattern matching structural
@diff match/case (3.10+); no fall-through.

Select a branch by value or shape.

```python
command = "go north"
match command.split():
    case ["quit"]:
        print("Bye")
    case ["go", direction]:
        print(f"Going {direction}")
    case ["drop", *items]:
        print(f"Dropping {items}")
    case _:
        print("Unknown command")

code = 404
match code:
    case 200 | 201:
        print("OK")
    case 404:
        print("Not found")
```

A bare name in a case **captures** a value; it doesn't compare to a variable. Use dotted names (`Color.RED`) for constants.

# Functions

## Functions
@id function
@keywords def return function type hints annotations
@diff def name(params): with optional type hints.

Define a reusable operation.

```python
def add(a: int, b: int) -> int:
    return a + b

def log(message):
    print(message)        # returns None implicitly

result = add(2, 3)
```

Type hints are documentation and tooling only — Python doesn't enforce them.

## Default and keyword arguments
@id default-args
@keywords default parameter keyword argument named optional mutable default
@diff Defaults and call-by-name are built in.

Optional parameters and call-by-name.

```python
def greet(name, greeting="Hello", *, punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

greet("Ada")                         # 'Hello, Ada!'
greet("Ada", greeting="Hi")          # keyword argument
greet("Ada", punctuation="?")        # after *, keyword-only

def append_to(item, items=None):     # never use a mutable default like []
    if items is None:
        items = []
    items.append(item)
    return items
```

A default like `items=[]` is created once and shared between calls.

## *args and **kwargs
@id varargs
@keywords args kwargs variadic unpack star arguments
@diff *args tuple, **kwargs dict.

Accept any number of arguments, or unpack them.

```python
def total(*numbers):
    return sum(numbers)

def describe(**fields):
    for key, value in fields.items():
        print(key, value)

total(1, 2, 3)               # 6
describe(name="Ada", age=36)

values = [1, 2, 3]
options = {"sep": ", "}
print(*values, **options)    # 1, 2, 3
```

## Returning multiple values
@id multiple-return
@keywords tuple return unpack two values
@diff Return a tuple and unpack it.

Return several values at once.

```python
def min_max(values):
    return min(values), max(values)   # a tuple

low, high = min_max([3, 1, 4])
```

## Lambdas
@id lambda
@keywords lambda anonymous function key callback inline
@diff lambda args: expression

A small anonymous function.

```python
square = lambda x: x * x
pairs = [(1, "b"), (2, "a")]
pairs.sort(key=lambda p: p[1])     # sort by second item
```

Lambdas hold a single expression. Anything bigger deserves a `def`.

## Scope
@keywords local global nonlocal scope closure
@diff Functions create scope; blocks don't.

Where names are visible.

```python
count = 0

def increment():
    global count          # needed to rebind a global
    count += 1

def counter():
    total = 0
    def step():
        nonlocal total    # rebind the enclosing function's variable
        total += 1
        return total
    return step

for i in range(3):
    pass
print(i)                  # 2 — loop variables leak out of the loop
```

## Decorators
@id decorators
@keywords decorator wrapper functools wraps cache timing @
@diff @decorator wraps a function.

Wrap a function to add behaviour.

```python
import functools
import time

def timed(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.perf_counter() - start:.3f}s")
        return result
    return wrapper

@timed
def slow():
    time.sleep(0.1)

@functools.cache          # memoise results
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)
```

## Generators
@id generators
@keywords yield generator lazy iterator generator expression
@diff yield produces values lazily.

Produce values one at a time.

```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for x in countdown(3):     # 3 2 1
    print(x)

total = sum(x * x for x in range(1_000_000))  # no list built
```

A generator can only be consumed once.

# Collections

## Lists
@id array
@keywords list array index append length nested
@diff Zero-based, resizable, mixed types allowed.

The go-to ordered, mutable collection.

```python
values = [10, 20, 30]
values[0]          # 10
values[-1]         # 30
len(values)        # 3
grid = [[0] * 3 for _ in range(2)]   # 2×3 grid
```

`[[0] * 3] * 2` makes two references to the **same** inner list — use the comprehension.

## List operations
@id array-ops
@keywords append extend insert pop remove del index count clear in
@diff Methods modify the list in place.

Add, remove and find items.

```python
v = [1, 2, 3]
v.append(4)          # [1, 2, 3, 4]
v.extend([5, 6])     # add many
v.insert(0, 0)       # at index 0
v.pop()              # removes and returns last
v.pop(0)             # removes and returns first
v.remove(3)          # first occurrence by value (ValueError if absent)
del v[0]
2 in v               # membership
v.index(2)           # position (ValueError if absent)
v.clear()
```

Methods like `append` and `sort` return `None` — don't write `v = v.append(x)`.

## Comprehensions
@id comprehension
@keywords list comprehension dict comprehension set filter map one line
@diff [expr for x in items if cond]

Build a collection in one expression.

```python
nums = [1, 2, 3, 4, 5]
squares = [n * n for n in nums]
evens = [n for n in nums if n % 2 == 0]
labels = ["even" if n % 2 == 0 else "odd" for n in nums]
lookup = {n: n * n for n in nums}            # dict
unique = {w.lower() for w in ["A", "a", "B"]} # set
pairs = [(x, y) for x in range(2) for y in range(2)]  # nested
```

## map, filter and reduce
@id transform
@keywords map filter reduce sum any all functional
@diff Usually written as comprehensions; sum/any/all built in.

Transform, filter and combine.

```python
from functools import reduce

nums = [1, 2, 3, 4]
doubled = list(map(lambda n: n * 2, nums))
odds = list(filter(lambda n: n % 2, nums))
product = reduce(lambda a, b: a * b, nums, 1)   # 24
sum(nums), min(nums), max(nums)
any(n > 3 for n in nums)    # True
all(n > 0 for n in nums)    # True
```

`map` and `filter` return lazy iterators — wrap in `list()` to see the values.

## Dictionaries
@id dict
@keywords dict dictionary map key value get items keys setdefault update
@diff {key: value}; .get() for safe lookup.

Look up values by key.

```python
ages = {"ada": 36, "alan": 41}
ages["grace"] = 85              # add or overwrite
ages["ada"]                     # 36 (KeyError if missing)
ages.get("bob")                 # None
ages.get("bob", 0)              # default
"ada" in ages                   # key membership
del ages["alan"]
ages.pop("grace", None)         # remove, no error if missing

for name, age in ages.items():
    print(name, age)

merged = ages | {"linus": 54}   # 3.9+
```

Dictionaries keep insertion order (3.7+).

## defaultdict and Counter
@id counter
@keywords defaultdict Counter group count frequency most_common collections
@diff collections handles counting and grouping.

Count and group without key checks.

```python
from collections import Counter, defaultdict

words = ["a", "b", "a", "c", "a"]
counts = Counter(words)
counts["a"]                 # 3
counts.most_common(2)       # [('a', 3), ('b', 1)]

groups = defaultdict(list)
for word in ["apple", "avocado", "banana"]:
    groups[word[0]].append(word)
# {'a': ['apple', 'avocado'], 'b': ['banana']}
```

## Sets
@id set
@keywords set unique membership union intersection difference remove duplicates
@diff {1, 2, 3}; set() for empty.

Unique values with fast membership.

```python
seen = {1, 2, 3}
empty = set()            # {} is an empty dict!
seen.add(4)
seen.discard(10)         # no error if missing
a, b = {1, 2, 3}, {2, 3, 4}
a | b                    # union {1, 2, 3, 4}
a & b                    # intersection {2, 3}
a - b                    # difference {1}
unique = list(dict.fromkeys([3, 1, 3, 2]))  # dedupe, keep order
```

## Tuples
@id tuple
@keywords tuple immutable unpack namedtuple pair
@diff Immutable sequences; unpack with a, b = t.

Fixed, immutable groups of values.

```python
point = (3, 4)
x, y = point
single = (1,)             # the comma makes the tuple
first, *rest = (1, 2, 3)  # rest == [2, 3]

from typing import NamedTuple

class Point(NamedTuple):
    x: float
    y: float

p = Point(1.0, 2.0)
p.x
```

## Iterating
@id iterate
@keywords for each loop over list dict iterate items
@diff Iterate values directly.

Loop over any collection.

```python
for value in [10, 20, 30]:
    print(value)

for key in {"a": 1, "b": 2}:          # dict iterates keys
    print(key)

for ch in "abc":
    print(ch)
```

Don't add or remove items from a list or dict while looping over it — loop over a copy instead.

## enumerate and zip
@id enumerate
@keywords enumerate index zip parallel loop pairs counter
@diff enumerate() gives (index, value); zip() pairs lists.

Loop with an index, or over several lists at once.

```python
names = ["a", "b", "c"]
scores = [90, 85, 77]

for i, name in enumerate(names):          # 0 a, 1 b, 2 c
    print(i, name)

for i, name in enumerate(names, start=1): # count from 1
    print(i, name)

for name, score in zip(names, scores):
    print(name, score)

lookup = dict(zip(names, scores))
```

`zip` stops at the shortest input; pass `strict=True` (3.10+) to raise on a length mismatch.

## Sorting
@id sort
@keywords sort sorted key reverse descending lambda itemgetter
@diff sorted() returns new; .sort() is in place.

Sort by value or by a key.

```python
nums = [3, 1, 2]
sorted(nums)                  # new list [1, 2, 3]
nums.sort(reverse=True)       # in place: [3, 2, 1]

people = [("Ada", 36), ("Alan", 41), ("Bo", 36)]
sorted(people, key=lambda p: p[1])             # by age
sorted(people, key=lambda p: (-p[1], p[0]))    # age desc, then name
sorted(["b", "A", "c"], key=str.lower)         # case-insensitive
```

Sorting is stable, so you can sort by a secondary key first, then the primary.

## Searching
@id search
@keywords find index in contains next first match min max
@diff in, .index(), next() with a generator.

Find items.

```python
v = [4, 8, 15, 16]
8 in v                                     # True
v.index(15)                                # 2
first_big = next((x for x in v if x > 10), None)   # 15, or None
max(v), min(v)
max(["ab", "c"], key=len)                  # 'ab'
```

# Classes

## Dataclasses
@id struct
@keywords dataclass record struct fields default frozen
@diff @dataclass generates __init__, __repr__ and __eq__.

Define a simple record type.

```python
from dataclasses import dataclass, field

@dataclass
class Sensor:
    id: int
    value: float = 0.0
    tags: list[str] = field(default_factory=list)

s = Sensor(1, 2.5)
s.value = 3.0
print(s)        # Sensor(id=1, value=3.0, tags=[])

@dataclass(frozen=True)
class Point:
    x: float
    y: float
```

## Classes
@id class
@keywords class __init__ self method property classmethod staticmethod __repr__
@diff self is explicit; __init__ is the constructor.

Bundle data and behaviour.

```python
class Account:
    interest = 0.02                      # class attribute (shared)

    def __init__(self, owner, balance=0):
        self.owner = owner               # instance attributes
        self._balance = balance          # _ = internal by convention

    def deposit(self, amount):
        self._balance += amount

    @property
    def balance(self):                   # read like an attribute
        return self._balance

    def __repr__(self):
        return f"Account({self.owner!r}, {self._balance})"

a = Account("Ada", 10)
a.deposit(5)
a.balance        # 15
```

## Inheritance
@id inheritance
@keywords inheritance super override subclass abstract base class
@diff class Child(Parent); super() calls the parent.

Extend a class.

```python
class Shape:
    def area(self):
        raise NotImplementedError

class Square(Shape):
    def __init__(self, side):
        super().__init__()
        self.side = side

    def area(self):
        return self.side ** 2

shapes = [Square(2)]
total = sum(s.area() for s in shapes)
isinstance(shapes[0], Shape)    # True
```

## Enums
@id enum
@keywords enum Enum auto named constants
@diff class Color(Enum)

A fixed set of named values.

```python
from enum import Enum, auto

class Color(Enum):
    RED = auto()
    GREEN = auto()

c = Color.GREEN
c.name          # 'GREEN'
c.value         # 2
Color["RED"]    # lookup by name
```

# Errors

## Exceptions
@id errors
@keywords try except finally else raise exception error handling
@diff try/except; catch specific exception types.

Catch and raise errors.

```python
try:
    number = int("abc")
except ValueError as error:
    print(f"Bad number: {error}")
except (TypeError, KeyError):
    print("Other problem")
else:
    print("Ran only if no exception")
finally:
    print("Always runs")

def withdraw(balance, amount):
    if amount > balance:
        raise ValueError("insufficient funds")
    return balance - amount
```

Avoid a bare `except:` — it also catches `KeyboardInterrupt`. Use `raise` alone inside `except` to re-raise.

## Custom exceptions
@id custom-errors
@keywords custom exception class raise from chain
@diff Subclass Exception.

Define your own error types.

```python
class ConfigError(Exception):
    pass

def load(path):
    try:
        return open(path).read()
    except FileNotFoundError as e:
        raise ConfigError(f"missing config: {path}") from e
```

## Assertions
@id assert
@keywords assert debug invariant check
@diff assert condition, "message"

Check assumptions during development.

```python
def mean(values):
    assert values, "values must not be empty"
    return sum(values) / len(values)
```

Assertions are removed with `python -O`. Don't use them to validate user input.

# Files & system

## Reading a file
@id read-file
@keywords open read file lines with encoding pathlib
@diff with open(...) closes the file automatically.

Read a text file.

```python
with open("data.txt", encoding="utf-8") as f:
    for line in f:
        print(line.rstrip("\n"))

from pathlib import Path
text = Path("data.txt").read_text(encoding="utf-8")
lines = text.splitlines()
```

Always pass `encoding="utf-8"` — the default depends on the platform.

## Writing a file
@id write-file
@keywords write file open w a append save
@diff open(path, "w") or Path.write_text.

Write or append text.

```python
with open("out.txt", "w", encoding="utf-8") as f:   # "a" to append
    f.write("first line\n")
    print("second line", file=f)

from pathlib import Path
Path("note.txt").write_text("hello\n", encoding="utf-8")
```

`"w"` truncates the file immediately, even if you never write to it.

## Paths
@id paths
@keywords pathlib Path exists glob mkdir join directory list files extension
@diff pathlib.Path joins with /.

Work with files and directories.

```python
from pathlib import Path

p = Path("data") / "report.csv"   # joins with the right separator
p.name, p.stem, p.suffix          # 'report.csv', 'report', '.csv'
p.parent                          # Path('data')
p.exists(), p.is_file()
Path("out/logs").mkdir(parents=True, exist_ok=True)
for csv in Path(".").glob("**/*.csv"):
    print(csv)
Path.home(), Path.cwd()
```

## CSV files
@id csv
@keywords csv DictReader DictWriter reader writer spreadsheet
@diff csv module; newline="" when opening.

Read and write CSV.

```python
import csv

with open("people.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):        # each row is a dict
        print(row["name"], row["age"])

with open("out.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["name", "age"])
    writer.writerows([["Ada", 36], ["Alan", 41]])
```

All values come back as strings — convert numbers yourself.

## JSON
@id json
@keywords json load dump loads dumps parse serialise
@diff json.load/json.dump; loads/dumps for strings.

Read and write JSON.

```python
import json

data = json.loads('{"name": "Ada", "tags": ["math"]}')
text = json.dumps(data, indent=2)

with open("config.json", encoding="utf-8") as f:
    config = json.load(f)
with open("out.json", "w", encoding="utf-8") as f:
    json.dump(config, f, indent=2)
```

## Command-line arguments
@id args
@keywords sys.argv argparse command line arguments options flags
@diff sys.argv list; argparse for real options.

Read arguments and options.

```python
import argparse
import sys

print(sys.argv)            # ['script.py', 'arg1', ...]

parser = argparse.ArgumentParser(description="Process a file")
parser.add_argument("path")
parser.add_argument("-n", "--count", type=int, default=10)
parser.add_argument("-v", "--verbose", action="store_true")
args = parser.parse_args()
print(args.path, args.count, args.verbose)
```

`argparse` generates `--help` for you.

## Environment variables
@id env
@keywords os.environ getenv environment variable
@diff os.environ dict; os.getenv with default.

Read environment variables.

```python
import os

home = os.environ["HOME"]                 # KeyError if unset
level = os.getenv("LOG_LEVEL", "info")    # with default
os.environ["MODE"] = "test"               # for child processes
```

## Imports and modules
@id imports
@keywords import from as module package __name__ main
@diff import module / from module import name.

Use code from other files and packages.

```python
import math
import numpy as np                 # alias
from pathlib import Path
from collections import Counter, defaultdict

# helpers.py next to this file:
# from helpers import clean

def main():
    print(math.sqrt(9))

if __name__ == "__main__":         # only runs when executed directly
    main()
```

## Running commands
@id subprocess
@keywords subprocess run shell command output capture
@diff subprocess.run with a list of arguments.

Run another program and capture its output.

```python
import subprocess

result = subprocess.run(["git", "status", "--short"],
                        capture_output=True, text=True, check=True)
print(result.stdout)
```

`check=True` raises on a nonzero exit code. Avoid `shell=True` with user input.

## Virtual environments
@id venv
@keywords venv pip install requirements virtualenv activate
@diff python -m venv .venv

Isolate a project's packages.

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
python -m pip install requests numpy
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
deactivate
```

Using `python -m pip` guarantees you install into the Python you're running.

# Utilities

## Math
@id math
@keywords math sqrt pi floor ceil round abs pow log trig
@diff math module; round() uses banker's rounding.

Common maths.

```python
import math

math.sqrt(2)
math.pi, math.e
math.floor(2.7), math.ceil(2.1)   # 2 3
round(2.5), round(3.5)            # 2 4  (round half to even)
abs(-3)
2 ** 0.5
math.isclose(0.1 + 0.2, 0.3)      # True
math.inf, math.isnan(float("nan"))
divmod(7, 2)                      # (3, 1)
```

## Random
@id random
@keywords random randint choice shuffle sample seed uniform
@diff random module; randint is inclusive.

Random numbers and choices.

```python
import random

random.randint(1, 6)          # 1..6 inclusive
random.random()               # [0.0, 1.0)
random.uniform(1.5, 2.5)
random.choice(["a", "b"])
random.sample(range(100), 5)  # 5 unique
items = [1, 2, 3]
random.shuffle(items)         # in place
random.seed(42)               # reproducible
```

Use the `secrets` module for passwords and tokens.

## Dates and time
@id time
@keywords datetime date time now strftime strptime timedelta sleep perf_counter
@diff datetime for dates; time.perf_counter for timing.

Dates, formatting and timing.

```python
from datetime import date, datetime, timedelta
import time

now = datetime.now()
now.strftime("%Y-%m-%d %H:%M")          # '2026-10-21 14:30'
datetime.strptime("21/10/2026", "%d/%m/%Y")
date.today() + timedelta(days=7)
datetime.now().isoformat()

start = time.perf_counter()
time.sleep(0.5)
elapsed = time.perf_counter() - start
```

## Regular expressions
@id regex
@keywords regex re search match findall sub pattern groups
@diff re module with raw-string patterns.

Match and extract with patterns.

```python
import re

text = "Order 42 shipped on 2026-10-21"
m = re.search(r"(\d{4})-(\d{2})-(\d{2})", text)
if m:
    year, month, day = m.groups()
re.findall(r"\d+", text)                # ['42', '2026', '10', '21']
re.sub(r"\s+", " ", "a   b    c")       # 'a b c'
re.fullmatch(r"[a-z]+", "abc") is not None
pattern = re.compile(r"(?P<key>\w+)=(?P<value>\w+)")
pattern.search("mode=fast")["value"]    # 'fast'
```

`re.match` only matches at the start of the string; `re.search` scans the whole string.

## Context managers
@id with
@keywords with context manager contextmanager resource cleanup
@diff with guarantees cleanup.

Guarantee setup and cleanup.

```python
from contextlib import contextmanager
import time

@contextmanager
def timer(label):
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"{label}: {time.perf_counter() - start:.3f}s")

with timer("work"):
    sum(range(1_000_000))
```

# NumPy

## NumPy arrays
@id numpy
@keywords numpy array zeros ones arange linspace shape reshape vectorised
@diff Vectorised arrays; operations are element-wise.

Fast numeric arrays (MATLAB-style).

```python
import numpy as np

a = np.array([1, 2, 3])
z = np.zeros((2, 3))
r = np.arange(0, 1, 0.25)        # [0, .25, .5, .75] stop excluded
l = np.linspace(0, 1, 5)         # 5 points, endpoint included
a * 2, a + a, a ** 2             # element-wise
a @ a                            # dot product (14)
m = np.arange(6).reshape(2, 3)
m.shape                          # (2, 3)
m[:, 0]                          # first column
m[m > 2]                         # boolean mask
m.sum(axis=0), m.mean()
```

Unlike MATLAB, `*` is element-wise; use `@` for matrix multiplication. Indexing starts at 0.
