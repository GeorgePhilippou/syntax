---
name: Python
symbol: Py
order: 2
color: #a8c7d0
version: Python 3.10+
highlight: python
description: Readable by design. Powerful by nature.
---

# Concepts

## How Python runs your code
@id concept-program
@kind concept
@keywords script interpreter run python file main entry point explain
@diff Runs top to bottom; no main required.

Python reads a file from top to bottom and runs each statement as it goes.

There's no compile step and no required `main` function: `python3 analysis.py` just executes the file. Definitions (`def`, `class`, `import`) are statements too — they create names when they run, which is why you must define a function before the line that calls it.

```python
import math                      # runs first: loads the math module

def area(radius):                # creates the function (doesn't run its body)
    return math.pi * radius ** 2

print(area(2.0))                 # now the body runs

if __name__ == "__main__":       # True only when this file is run directly,
    print("run as a script")     # not when another file imports it
```

## What a function is
@id concept-function
@kind concept
@keywords function def parameters arguments call explain
@diff def name(params): an indented body; return gives the result.

A named, reusable block of code with inputs and an output.

The names in the `def` line are **parameters**; the values you pass in a call are **arguments**. Each call runs the body from the top with fresh local variables, which disappear when the call ends.

```python
def kinetic_energy(mass, velocity):      # parameters
    """Return kinetic energy in joules."""
    return 0.5 * mass * velocity ** 2

e1 = kinetic_energy(2.0, 3.0)            # arguments: 2.0 and 3.0 -> 9.0
e2 = kinetic_energy(mass=1.0, velocity=10.0)   # keyword arguments
```

## What return does
@id concept-return
@kind concept
@keywords return value print vs return None output result explain
@diff return hands a value back; print only displays it.

`return` ends the function and hands a value back to the caller. That value replaces the call, so you can store it or use it in more calculations.

The most common beginner mix-up is `print` versus `return`. `print` shows something on screen, but the caller gets nothing. A function without a `return` gives back `None`.

```python
def double_print(x):
    print(x * 2)          # shows 8 on screen…

def double_return(x):
    return x * 2          # …this hands 8 back

a = double_print(4)       # prints 8, but a is None
b = double_return(4)      # b is 8
total = double_return(4) + 1   # 9 — returned values can be used

def first_negative(values):
    for v in values:
        if v < 0:
            return v      # leaves immediately, mid-loop
    return None           # explicit "nothing found"
```

## None
@id concept-none
@kind concept
@keywords None null nothing missing NoneType explain
@diff Python's "no value"; test with is None.

`None` is Python's value for "nothing here" — like `void`/`NULL` in C.

It's what functions return without a `return`, the usual default for optional parameters, and a placeholder for "not computed yet". There's only one `None`, so compare with `is`.

```python
result = None
if result is None:
    result = 42

def find(items, target):
    for i, item in enumerate(items):
        if item == target:
            return i
    return None

index = find([3, 5], 9)
if index is not None:      # not "if index:" — 0 is a valid index but falsy
    print(index)
```

`AttributeError: 'NoneType' object has no attribute ...` almost always means a function returned `None` when you expected a value.

## Names and objects
@id concept-references
@kind concept
@keywords variables references mutable immutable copy aliasing list explain
@diff Names point to objects; assignment never copies.

A variable is a **name tag on an object**, not a box containing a value. Assignment attaches another tag; it never copies.

This only matters for **mutable** objects (lists, dicts, NumPy arrays): changing the object through one name is visible through every other name. Numbers, strings and tuples are **immutable**, so they can't be changed in place.

```python
a = [1, 2, 3]
b = a              # same list, two names
b.append(4)
print(a)           # [1, 2, 3, 4]

c = a.copy()       # a new list
c.append(5)        # a is unchanged

import copy
nested = [[1], [2]]
deep = copy.deepcopy(nested)   # copies inner lists too

import numpy as np
x = np.zeros(3)
view = x[:2]       # NumPy slices are views, not copies
view[0] = 9        # x[0] is now 9 too
```

The same applies to function arguments: a function that modifies a list you passed in changes your list.

## Methods and objects
@id concept-objects
@kind concept
@keywords object method attribute dot class instance explain
@diff value.method() calls a function attached to the value.

Everything in Python is an object, and objects carry their own functions, called **methods**.

`text.upper()` calls the `upper` method of the string `text`. The dot reaches inside an object: `obj.attribute` is data, `obj.method()` is a call. Use `dir(obj)` to list what an object has and `help(obj.method)` to read the docs.

```python
text = "voltage"
text.upper()             # method call -> 'VOLTAGE'

import numpy as np
data = np.array([1.0, 2.0, 3.0])
data.shape               # attribute (no parentheses) -> (3,)
data.mean()              # method -> 2.0

print(type(data))        # <class 'numpy.ndarray'>
print([name for name in dir(data) if not name.startswith("_")][:5])
```

## Reading a traceback
@id concept-traceback
@kind concept
@keywords traceback error stack trace debug exception read explain
@diff Read from the bottom up.

When Python crashes it prints a **traceback**. Read it from the **bottom up**.

The last line is the error type and message. The lines above show the chain of calls that led there, ending with the exact line in your file. Library lines (paths into `site-packages`) usually just mean you passed in a bad value.

```text
Traceback (most recent call last):
  File "analysis.py", line 12, in <module>
    result = normalise(data)
  File "analysis.py", line 5, in normalise
    return values / values.max()
AttributeError: 'list' object has no attribute 'max'
```

Here: line 5 called `.max()` on a list. Fix it with `np.array(values)`, or `max(values)`.

To inspect at the point of failure, run `python3 -m pdb analysis.py`, or put `breakpoint()` on the line before.

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

# Plotting

## Line plot
@id plot
@keywords matplotlib plot line figure xlabel ylabel title show
@diff fig, ax = plt.subplots(); ax.plot(x, y)

The basic matplotlib pattern: create a figure and axes, plot, label.

```python
import matplotlib.pyplot as plt
import numpy as np

t = np.linspace(0, 2, 200)
signal = np.sin(2 * np.pi * 3 * t) * np.exp(-t)

fig, ax = plt.subplots()
ax.plot(t, signal)
ax.set_xlabel("Time (s)")
ax.set_ylabel("Amplitude (V)")
ax.set_title("Damped oscillation")
ax.grid(True, alpha=0.3)
plt.show()
```

Use `fig, ax = plt.subplots()` and call methods on `ax`. It scales to multi-panel figures, unlike the `plt.plot(...)` shortcut.

## Several lines and a legend
@id plot-multiple
@keywords legend label color linestyle marker multiple lines
@diff label= on each line, then ax.legend().

Overlay data series and tell them apart.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 50)
fig, ax = plt.subplots()
ax.plot(x, np.sqrt(x), label="model", color="black", linewidth=2)
ax.plot(x, np.sqrt(x) + np.random.normal(0, 0.1, x.size), "o", label="measured", markersize=4)
ax.plot(x, 0.8 * np.sqrt(x), "--", label="lower bound", color="tab:red")
ax.legend(frameon=False)
ax.set_xlim(0, 10)
plt.show()
```

Format strings: colour `b g r k`, marker `o s ^ x .`, line `- -- : -.` (e.g. `"r--"`, `"ko"`).

## Subplots
@id subplot
@keywords subplots grid multiple panels sharex tight_layout constrained
@diff plt.subplots(rows, cols) returns an array of axes.

Several panels in one figure.

```python
import matplotlib.pyplot as plt
import numpy as np

t = np.linspace(0, 1, 500)
fig, axes = plt.subplots(2, 2, figsize=(8, 6), sharex=True, layout="constrained")
axes[0, 0].plot(t, np.sin(10 * t))
axes[0, 0].set_title("(a) sine")
axes[0, 1].plot(t, np.cos(10 * t), color="tab:orange")
axes[1, 0].plot(t, t ** 2)
axes[1, 1].plot(t, np.exp(-5 * t))
for ax in axes.flat:
    ax.grid(alpha=0.3)
for ax in axes[1, :]:
    ax.set_xlabel("Time (s)")
plt.show()
```

`layout="constrained"` stops labels overlapping (older versions: `fig.tight_layout()`).

## Scatter and error bars
@id plot-scatter
@keywords scatter errorbar error bars uncertainty colour map points
@diff ax.errorbar(x, y, yerr=...) for uncertainties.

Points with uncertainties, or coloured by a third variable.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(1, 8)
y = 2 * x + np.random.normal(0, 1, x.size)
err = np.full(x.size, 0.8)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9, 4))
ax1.errorbar(x, y, yerr=err, fmt="o", capsize=3, label="data")
ax1.plot(x, 2 * x, "k--", label="fit")
ax1.legend()

px, py = np.random.rand(2, 200)
points = ax2.scatter(px, py, c=px + py, cmap="viridis", s=15)
fig.colorbar(points, ax=ax2, label="x + y")
plt.show()
```

## Histograms
@id plot-hist
@keywords histogram distribution bins density hist
@diff ax.hist(data, bins=...)

Show the distribution of values.

```python
import matplotlib.pyplot as plt
import numpy as np

samples = np.random.normal(5.0, 1.2, 2000)
fig, ax = plt.subplots()
ax.hist(samples, bins=40, density=True, alpha=0.6, edgecolor="white", label="samples")
ax.axvline(samples.mean(), color="k", linestyle="--", label=f"mean = {samples.mean():.2f}")
ax.set_xlabel("Value")
ax.set_ylabel("Probability density")
ax.legend()
plt.show()
```

## Heatmaps and images
@id plot-heatmap
@keywords imshow pcolormesh heatmap colorbar matrix 2d image contour
@diff imshow for images; pcolormesh for x/y grids.

Plot 2D data with a colour bar.

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-2, 2, 200)
y = np.linspace(-1, 1, 100)
X, Y = np.meshgrid(x, y)
Z = np.exp(-(X ** 2 + 3 * Y ** 2))

fig, ax = plt.subplots()
mesh = ax.pcolormesh(X, Y, Z, cmap="magma", shading="auto")
ax.contour(X, Y, Z, levels=5, colors="white", linewidths=0.5)
fig.colorbar(mesh, ax=ax, label="Intensity")
ax.set_aspect("equal")
plt.show()

# For a plain matrix/image: ax.imshow(matrix, origin="lower", cmap="gray")
```

Perceptually uniform colour maps (`viridis`, `magma`, `cividis`) read correctly in greyscale and for colour-blind readers.

## Log scales and twin axes
@id plot-log
@keywords log scale semilogy loglog twinx second y axis
@diff ax.set_yscale("log"); ax.twinx() for a second y-axis.

Logarithmic axes, and two quantities on one plot.

```python
import matplotlib.pyplot as plt
import numpy as np

f = np.logspace(1, 5, 200)                 # 10 Hz to 100 kHz
gain = 1 / np.sqrt(1 + (f / 1e3) ** 2)
phase = -np.degrees(np.arctan(f / 1e3))

fig, ax = plt.subplots()
ax.semilogx(f, 20 * np.log10(gain), color="tab:blue")
ax.set_xlabel("Frequency (Hz)")
ax.set_ylabel("Gain (dB)", color="tab:blue")

ax2 = ax.twinx()                           # shares the x-axis
ax2.semilogx(f, phase, color="tab:red")
ax2.set_ylabel("Phase (°)", color="tab:red")
plt.show()
```

## Figures for papers
@id plot-save
@keywords savefig pdf png dpi publication figure size rcParams font thesis paper
@diff Set size in inches, save as PDF/SVG for vector output.

Consistent, publication-ready figures.

```python
import matplotlib.pyplot as plt
import numpy as np

plt.rcParams.update({
    "font.size": 9,
    "axes.labelsize": 9,
    "legend.fontsize": 8,
    "figure.dpi": 150,
    "savefig.bbox": "tight",
    "axes.spines.top": False,
    "axes.spines.right": False,
})

fig, ax = plt.subplots(figsize=(3.4, 2.4))   # inches: one journal column
x = np.linspace(0, 1, 100)
ax.plot(x, x ** 2)
ax.set_xlabel(r"Strain $\varepsilon$")        # LaTeX-style maths in labels
ax.set_ylabel(r"Stress $\sigma$ (MPa)")
fig.savefig("figure1.pdf")                     # vector: sharp at any zoom
fig.savefig("figure1.png", dpi=300)            # raster for slides
```

Make the figure the size it will be printed, so the fonts come out the size you set. Put the `rcParams` block in a shared `style.py` and import it in every plotting script.

## Plotting from a CSV
@id plot-csv
@keywords pandas csv plot dataframe columns read plot data file
@diff pd.read_csv then ax.plot(df["col"], ...)

Load data with pandas and plot its columns.

```python
import matplotlib.pyplot as plt
import pandas as pd

df = pd.read_csv("results.csv")              # header row becomes column names
fig, ax = plt.subplots()
ax.plot(df["time_s"], df["value"], label="value")
ax.set_xlabel("Time (s)")
ax.legend()

for name, group in df.groupby("sample"):     # one line per sample
    ax.plot(group["time_s"], group["value"], label=str(name))
plt.show()
```

# Data analysis

## pandas basics
@id pandas
@keywords pandas dataframe read_csv head describe columns select rows
@diff DataFrame: labelled columns, like a spreadsheet.

Load a table and look around.

```python
import pandas as pd

df = pd.read_csv("results.csv")
df.head()                 # first 5 rows
df.shape                  # (rows, columns)
df.columns                # column names
df.describe()             # count, mean, std, min, quartiles, max
df.info()                 # types and missing values

df["value"]               # one column (a Series)
df[["time_s", "value"]]   # several columns
df.iloc[0]                # first row by position
df.loc[df["value"] > 1]   # rows by condition
df["power"] = df["value"] ** 2      # new column
df.to_csv("out.csv", index=False)
```

Pass `sep="\t"`, `skiprows=2` or `names=[...]` to `read_csv` for awkward files.

## Filtering and grouping
@id pandas-group
@keywords groupby filter query mean aggregate summary sort pandas
@diff df.groupby("col").agg(...)

Summarise data by category.

```python
import pandas as pd

df = pd.read_csv("results.csv")
hot = df[(df["temp"] > 30) & (df["valid"])]       # use & and | with parentheses
summary = df.groupby("sample")["value"].agg(["mean", "std", "count"])
per_day = df.groupby("day").agg(mean_temp=("temp", "mean"), runs=("run", "nunique"))
ranked = df.sort_values("value", ascending=False).head(10)
clean = df.dropna(subset=["value"])               # drop rows with missing values
```

## Loading and saving arrays
@id numpy-io
@keywords numpy loadtxt savetxt genfromtxt np.save np.load npz binary text
@diff np.loadtxt for text; np.save/np.load for speed.

Read numeric text files and save arrays.

```python
import numpy as np

data = np.loadtxt("measurements.txt", delimiter=",", skiprows=1)
t, v = data[:, 0], data[:, 1]                 # columns
t, v = np.loadtxt("measurements.txt", delimiter=",", skiprows=1, unpack=True)

np.savetxt("out.csv", np.column_stack([t, v]), delimiter=",",
           header="t,v", comments="", fmt="%.6g")

np.save("signal.npy", v)                      # fast binary, exact
v2 = np.load("signal.npy")
np.savez("run1.npz", time=t, voltage=v)       # several named arrays
run = np.load("run1.npz")
run["voltage"]
```

Use `np.genfromtxt` when some values are missing (they become `nan`).

## Curve fitting
@id curve-fit
@keywords curve_fit scipy fit model parameters least squares regression polyfit
@diff scipy.optimize.curve_fit(model, x, y, p0=...)

Fit a model to data and get parameter uncertainties.

```python
import numpy as np
from scipy.optimize import curve_fit

def model(t, amplitude, tau, offset):
    return amplitude * np.exp(-t / tau) + offset

t = np.linspace(0, 5, 50)
y = model(t, 2.0, 1.3, 0.1) + np.random.normal(0, 0.05, t.size)

params, cov = curve_fit(model, t, y, p0=[1, 1, 0])   # p0 = initial guess
errors = np.sqrt(np.diag(cov))
for name, value, err in zip(["A", "tau", "c"], params, errors):
    print(f"{name} = {value:.3f} ± {err:.3f}")

slope, intercept = np.polyfit(t, y, 1)               # straight-line fit
```

A good `p0` matters: with a bad guess the fit can fail or find a wrong local minimum.

## Statistics
@id stats
@keywords mean std standard deviation error median percentile ttest scipy stats
@diff np.mean/np.std (ddof=1 for sample std).

Summary statistics and a quick significance test.

```python
import numpy as np
from scipy import stats

x = np.array([9.8, 10.1, 10.0, 9.9, 10.3])
np.mean(x), np.median(x)
sd = np.std(x, ddof=1)               # sample standard deviation
sem = sd / np.sqrt(x.size)           # standard error of the mean
np.percentile(x, [25, 75])

y = np.array([10.4, 10.6, 10.2, 10.5, 10.7])
t_stat, p_value = stats.ttest_ind(x, y)
r, p = stats.pearsonr(x, y)
```

`np.std` defaults to `ddof=0` (population). For measured samples you usually want `ddof=1`, which is what MATLAB's `std` uses.

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
