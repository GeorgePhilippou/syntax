---
name: Python
symbol: Py
order: 2
color: #93aeff
on: dark
version: Python 3.10+
highlight: python
layout: sheet
description: Analysis, plotting and scripts.
---

# Basics

## Variables and numbers
@id variables
@keywords int float str bool none type cast convert number operators
- Assign :: x = 3.3
- Several at once :: a, b = 1, 2
- Swap :: a, b = b, a
- Check type :: isinstance(x, float)
- Convert :: int("42"); float("1e-3"); str(7)
- Round :: round(x, 3)
- Divide / floor divide :: 7 / 2; 7 // 2    # 3.5, 3
- Remainder :: 7 % 2
- Power :: 2 ** 10
- Big and small :: 1e-6; 1_000_000
- Increment :: i += 1
- Constant (by convention) :: MAX_V = 1.2
> No declarations or semicolons; 4-space indentation marks blocks.

## Printing and f-strings
@id printing-output
@keywords print format float decimal places precision scientific padding align fstring printf
- Print :: print("V =", v)
- f-string :: f"{v} V"
- Decimal places :: f"{x:.3f}"
- Scientific :: f"{x:.2e}"
- Percent :: f"{ratio:.1%}"
- Width and align :: f"{name:<10}{v:>8.2f}"
- Thousands :: f"{n:,}"
- Debug (name=value) :: f"{x=}"
- No newline :: print(x, end="")
- Separator :: print(a, b, sep=", ")
- To stderr :: print("error", file=sys.stderr)

## Strings
@id strings
@keywords split join strip replace find contains substring upper lower
- Length :: len(s)
- Character / slice :: s[0]; s[-1]; s[2:5]
- Split :: s.split(",")
- Join :: ",".join(parts)
- Strip whitespace :: s.strip()
- Replace :: s.replace("old", "new")
- Find (-1 if missing) :: s.find("x")
- Contains :: "mV" in s
- Starts / ends with :: s.startswith("#"); name.endswith(".csv")
- Case :: s.upper(); s.lower()
- Multi-line :: """three quotes"""
- Raw (no escapes) :: r"C:\data\run1"
> Strings are immutable: methods return a new string.

## Conditionals
@id if-else
@keywords if elif else match switch case ternary and or not none
```python If / elif / else
if v > 1.0:
    state = "high"
elif v < 0:
    state = "negative"
else:
    state = "ok"
```
- Logic :: a and b; a or b; not a
- Range check :: 0 < v < 1.2
- Ternary :: label = "on" if flag else "off"
- None check :: if x is None: …
- Empty check :: if not items: …
```python Match (switch)
match cmd:
    case "start":
        run()
    case "stop" | "quit":
        stop()
    case _:
        print("unknown")
```
> Falsy: 0, 0.0, "", [], {}, None. Write is None, not == None.

## Loops
@id for-loop
@keywords for while range enumerate zip break continue reversed iterate
- Count :: for i in range(10): …
- Start, stop, step :: range(0, 100, 5)
- Over items :: for v in values: …
- With index :: for i, v in enumerate(values): …
- Two lists together :: for t, v in zip(times, volts): …
- Backwards :: for v in reversed(values): …
- Dict items :: for key, val in d.items(): …
- While :: while not done: …
- Skip / stop :: continue; break
> range(10) is 0 to 9: the stop value is excluded.

## Functions
@id functions
@keywords def return default keyword arguments lambda args kwargs type hints
```python Define
def area(r, scale=1.0):
    """Return the scaled circle area."""
    return scale * math.pi * r ** 2
```
- Keyword call :: area(2.0, scale=0.5)
- Return several :: return mean, std
- Unpack result :: m, s = stats(data)
- Any number of args :: def f(*args, **kwargs): …
- Lambda :: f = lambda row: row[1]
- Type hints :: def f(x: float) -> float: …
- Safe list default :: def f(items=None): …
> Never use a mutable default like items=[]: it's shared between calls.

## Errors
@id exceptions
@keywords try except raise assert traceback error exception finally
```python Try / except
try:
    value = float(text)
except ValueError as e:
    print(f"bad number: {e}")
else:
    use(value)
finally:
    cleanup()
```
- Raise :: raise ValueError(f"bad voltage {v}")
- Assert :: assert len(t) == len(v), "length mismatch"
- Common types :: ValueError, TypeError, KeyError, IndexError, FileNotFoundError
> Read a traceback bottom-up: last line is the error, the line above is where.

# Collections

## Lists
@id lists
@keywords list append extend insert remove pop length contains copy array
- Create :: xs = [1, 2, 3]
- Append :: xs.append(4)
- Extend :: xs.extend([5, 6])
- Insert at front :: xs.insert(0, 99)
- Remove by value :: xs.remove(99)
- Pop :: last = xs.pop(); first = xs.pop(0)
- Length :: len(xs)
- Contains :: 3 in xs
- Index of :: xs.index(3)
- Sum / min / max :: sum(xs); min(xs); max(xs)
- Copy :: ys = xs.copy()
- Repeat :: [0] * 10
> ys = xs does not copy: both names point at the same list.

## Slicing
@id slicing
@keywords slice index range last reverse step negative
- Element :: xs[0]; xs[-1]
- Range :: xs[2:5]    # items 2, 3, 4
- From / up to :: xs[2:]; xs[:3]
- Every other :: xs[::2]
- Reverse :: xs[::-1]
- Last n :: xs[-3:]
- Drop both ends :: xs[1:-1]
> 0-based and end-exclusive: MATLAB x(2:5) is Python x[1:5].

## Comprehensions
@id comprehensions
@keywords list comprehension filter map any all generator
- Transform :: [v * 2 for v in xs]
- Filter :: [v for v in xs if v > 0]
- Dict :: {name: len(name) for name in names}
- Flatten :: [x for row in grid for x in row]
- Any / all :: any(v < 0 for v in xs); all(v > 0 for v in xs)

## Dictionaries
@id dictionaries
@keywords dict map key value get items counter defaultdict hash
- Create :: d = {"gain": 2, "rate": 100}
- Get / set :: d["gain"]; d["gain"] = 4
- Get with default :: d.get("offset", 0.0)
- Has key :: "gain" in d
- Delete :: del d["gain"]
- Keys / values :: list(d.keys()); list(d.values())
- Loop :: for k, v in d.items(): …
- Merge :: merged = d | other
- Count :: Counter(words).most_common(3)
- Group into lists :: groups = defaultdict(list)
> from collections import Counter, defaultdict

## Tuples and sets
@id tuples
@keywords tuple set unique unpack union intersection
- Tuple :: point = (1.0, 2.0)
- Unpack :: x, y = point
- One-item tuple :: (5,)
- Set :: seen = {1, 2, 3}
- Add :: seen.add(4)
- Unique values :: set(xs)
- Union / both / minus :: a | b; a & b; a - b

## Sorting
@id sorting
@keywords sort sorted reverse key lambda max min order
- Sorted copy :: sorted(xs)
- In place :: xs.sort()
- Descending :: sorted(xs, reverse=True)
- By a field :: sorted(rows, key=lambda r: r["time"])
- By two fields :: sorted(rows, key=lambda r: (r[0], -r[1]))
- Longest item :: max(runs, key=len)

# Files and system

## Paths
@id paths
@keywords pathlib path folder directory glob exists mkdir file name extension
- Import :: from pathlib import Path
- Join :: p = Path("data") / "run1.csv"
- Home / Desktop :: Path.home() / "Desktop"
- This script's folder :: Path(__file__).parent
- Name parts :: p.name; p.stem; p.suffix; p.parent
- Exists :: p.exists(); p.is_file()
- Make folder :: out.mkdir(parents=True, exist_ok=True)
- All CSVs :: sorted(Path("data").glob("*.csv"))
- Recursive :: Path("data").rglob("*.csv")
- Change extension :: p.with_suffix(".png")

## Text files
@id reading-a-file
@keywords open read write lines with file append encoding
```python Read line by line
with open(path) as f:
    for line in f:
        line = line.strip()
```
- Whole file :: text = Path(path).read_text()
- Write whole file :: Path(path).write_text(report)
- Write a line :: f.write(f"{t},{v}\n")
- Modes :: open(path, "w"); open(path, "a"); open(path, "rb")
- Encoding :: open(path, encoding="utf-8")

## CSV and JSON
@id csv-files
@keywords csv json read write header dictreader writer config
```python Read CSV with header
import csv
with open("run.csv", newline="") as f:
    for row in csv.DictReader(f):
        v = float(row["voltage"])
```
```python Write CSV
with open("out.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["time", "voltage"])
    w.writerows(zip(times, volts))
```
- Load JSON :: config = json.loads(Path("cfg.json").read_text())
- Save JSON :: Path("cfg.json").write_text(json.dumps(config, indent=2))

## Scripts
@id command-line-arguments
@keywords main argparse sys argv exit environment subprocess time sleep timestamp
```python Main guard
def main():
    ...

if __name__ == "__main__":
    main()
```
```python argparse
parser = argparse.ArgumentParser()
parser.add_argument("file", type=Path)
parser.add_argument("--rate", type=float, default=100.0)
parser.add_argument("-v", "--verbose", action="store_true")
args = parser.parse_args()
```
- Raw arguments :: sys.argv[1:]
- Exit with code :: sys.exit(1)
- Environment :: os.environ.get("PORT", "/dev/ttyUSB0")
- Run a command :: subprocess.run(["make", "flash"], check=True)
- Time a block :: t0 = time.perf_counter()
- Sleep :: time.sleep(0.5)
- Timestamp :: datetime.now().strftime("%Y-%m-%d_%H%M%S")

## Imports and environments
@id imports-and-modules
@keywords import module package pip conda venv install environment requirements
- Module :: import math
- Alias :: import numpy as np
- Names :: from pathlib import Path
- Science stack :: import numpy as np; import matplotlib.pyplot as plt; import pandas as pd
```bash conda
conda create -n lab python=3.12
conda activate lab
conda install -c conda-forge numpy scipy matplotlib pandas
```
```bash venv and pip
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip freeze > requirements.txt
```

# Data

## Science libraries
@id science-stack
@keywords numpy pandas matplotlib scipy libraries import stack data analysis plotting
- Usual imports :: import numpy as np; import pandas as pd; import matplotlib.pyplot as plt
- SciPy pieces :: from scipy import signal, stats, optimize
- Check versions :: np.__version__; pd.__version__
> Full sheets: see NumPy, pandas, Matplotlib, SciPy, Parsing & serial, EIS & models and Recipes under Python libraries.

# Classes

## Classes
@id classes
@keywords class init self method dataclass inherit super enum repr
```python Class
class Sensor:
    def __init__(self, name, gain=1.0):
        self.name = name
        self.gain = gain

    def scale(self, raw):
        return raw * self.gain
```
```python Dataclass
from dataclasses import dataclass

@dataclass
class Run:
    name: str
    rate: float = 0.1
```
- Create :: s = Sensor("WE1", gain=2.0)
- Inherit :: class Probe(Sensor): …
- Call parent :: super().__init__(name)
- Enum :: class Mode(Enum): CV = 1; LSV = 2

# Switching languages

## Coming from C and MATLAB
@id gotchas
@keywords difference matlab c compare switch translate versus
- Elementwise multiply :: a * b      # MATLAB a .* b
- Matrix multiply :: a @ b           # MATLAB a * b
- Power :: a ** 2                    # MATLAB a.^2; ^ is XOR here
- Not equal :: a != b                # MATLAB a ~= b
- Logic :: a and b; a or b; not a    # C && || !
- Divide :: 7 / 2; 7 // 2            # 3.5 and 3 (C gives 3)
- Increment :: i += 1                # no i++
- Last element :: x[-1]              # MATLAB x(end)
- Size :: len(x); a.shape            # MATLAB numel, size
- Copy array :: b = a.copy()         # b = a shares the data
- Format :: f"{x:.3f}"               # printf("%.3f", x)
- Ternary :: a if c else b           # C c ? a : b
- Comment :: x = 1  # comment        # MATLAB %, C //
> 0-based, end-exclusive slices: MATLAB x(1:3) is x[0:3].
> Blocks are indentation: no end, no braces.
