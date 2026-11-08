---
name: Python
symbol: Py
order: 2
color: #a8c7d0
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

## Serial port
@id serial-port
@keywords pyserial uart com usb board device msp430 baud bytes struct
```python Open, write, read a line
import serial
with serial.Serial("/dev/tty.usbmodem1101", 115200, timeout=1) as port:
    port.write(b"START\n")
    line = port.readline().decode().strip()
```
- Read n bytes :: data = port.read(64)
- Bytes waiting :: port.in_waiting
- Clear input :: port.reset_input_buffer()
- Parse a CSV line :: t, v = map(float, line.split(","))
- Bytes ↔ text :: b"OK".decode(); "GO".encode()
- Unpack binary :: struct.unpack("<hH", data[:4])
```bash List ports
python -m serial.tools.list_ports
```
> pip install pyserial, but import serial.

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

## NumPy arrays
@id numpy-arrays
@keywords numpy array linspace arange zeros shape mask where argmax index column
- Create :: a = np.array([1.0, 2.0, 3.0])
- Step range :: np.arange(0, 1, 0.01)
- N points :: np.linspace(-0.5, 0.8, 131)
- Zeros / ones :: np.zeros(100); np.ones((3, 4))
- Size :: a.shape; a.size; len(a)
- Element / slice :: a[0]; a[-1]; a[10:20]
- Mask :: a[a > 0.5]
- Indices where true :: idx = np.where(v > 0.2)[0]
- Index of max :: i = np.argmax(current)
- Nearest value :: i = np.argmin(np.abs(v - 0.3))
- Column / row :: m[:, 0]; m[0, :]
- Columns to matrix :: np.column_stack([t, v])
- Reshape :: a.reshape(-1, 2)
- Join :: np.concatenate([a, b])
- Copy :: b = a.copy()
> Maths is elementwise: a * b is MATLAB a .* b; a @ b is a matrix product.

## NumPy maths
@id numpy-maths
@keywords mean std median sum cumsum diff gradient integrate trapz interp smooth polyfit nan
- Stats :: a.mean(); a.std(ddof=1); np.median(a)
- Min / max / range :: a.min(); a.max(); np.ptp(a)
- Sum / running sum :: a.sum(); np.cumsum(a)
- Difference / slope :: np.diff(a); np.gradient(i, v)
- Integrate :: np.trapezoid(i, t)    # np.trapz before NumPy 2
- Interpolate :: np.interp(x_new, x, y)
- Moving average :: np.convolve(a, np.ones(5) / 5, mode="same")
- Line fit :: slope, intercept = np.polyfit(x, y, 1)
- Evaluate polynomial :: np.polyval(coeffs, x)
- Clip :: np.clip(a, 0, 1)
- Ignore NaN :: np.nanmean(a); np.isnan(a)

## Loading and saving data
@id loading-and-saving-arrays
@keywords loadtxt savetxt genfromtxt npy npz mat matlab file csv load save
- Load CSV :: data = np.loadtxt("run.csv", delimiter=",", skiprows=1)
- Split columns :: t, v, i = data.T
- Missing values / names :: np.genfromtxt("run.csv", delimiter=",", names=True)
- Save CSV :: np.savetxt("out.csv", np.column_stack([t, v]), delimiter=",", header="t,v", comments="")
- Binary :: np.save("run.npy", a); a = np.load("run.npy")
- Several arrays :: np.savez("run.npz", t=t, v=v)
- MATLAB .mat :: scipy.io.loadmat("run.mat")["v"].ravel()

## pandas
@id pandas-basics
@keywords pandas dataframe read_csv excel filter column groupby concat describe
- Load :: df = pd.read_csv("run.csv")
- Excel sheet :: pd.read_excel("runs.xlsx", sheet_name="CV")
- Inspect :: df.head(); df.info(); df.describe()
- Column :: df["voltage"]
- Several columns :: df[["time", "voltage"]]
- Filter rows :: df[df["voltage"] > 0.2]
- Two conditions :: df[(df.v > 0) & (df.i < 1e-6)]
- New column :: df["power"] = df.v * df.i
- Rename :: df = df.rename(columns={"V": "voltage"})
- Row by position :: df.iloc[0]
- Group :: df.groupby("sensor")["peak"].mean()
- Sort :: df.sort_values("time")
- To NumPy :: df["voltage"].to_numpy()
- Save :: df.to_csv("out.csv", index=False)
- Stack many files :: pd.concat([pd.read_csv(p) for p in paths], ignore_index=True)

## Plotting
@id line-plot
@keywords matplotlib plot figure axes label legend scatter errorbar subplot savefig log twin
```python Figure
fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(v, i * 1e6, label="run 1")
ax.set_xlabel("Potential (V)")
ax.set_ylabel("Current (µA)")
ax.legend()
fig.tight_layout()
plt.show()
```
- Line style :: ax.plot(x, y, "--", color="C1", linewidth=1.5)
- Scatter :: ax.scatter(x, y, s=10)
- Error bars :: ax.errorbar(x, m, yerr=s, fmt="o", capsize=3)
- Limits :: ax.set_xlim(-0.5, 0.8)
- Log axis :: ax.set_yscale("log")
- Grid :: ax.grid(alpha=0.3)
- Second y-axis :: ax2 = ax.twinx()
- Grid of plots :: fig, axs = plt.subplots(2, 2, sharex=True)
- Histogram :: ax.hist(data, bins=30)
- Heatmap :: im = ax.imshow(m, aspect="auto"); fig.colorbar(im)
- Label a point :: ax.annotate("peak", (vp, ip))
- Save :: fig.savefig("fig.png", dpi=300, bbox_inches="tight")
- Vector (papers) :: fig.savefig("fig.pdf")
- Close in a loop :: plt.close(fig)

## Fitting and signals
@id curve-fitting
@keywords scipy curve_fit regression ttest correlation peaks smoothing filter savgol butter
```python curve_fit
from scipy.optimize import curve_fit

def model(x, a, k):
    return a * np.exp(-k * x)

popt, pcov = curve_fit(model, x, y, p0=[1.0, 0.1])
perr = np.sqrt(np.diag(pcov))
```
- Imports :: from scipy import stats, signal
- Linear regression :: res = stats.linregress(x, y); r2 = res.rvalue ** 2
- t-test :: stats.ttest_ind(a, b); stats.ttest_rel(before, after)
- Correlation :: np.corrcoef(x, y)[0, 1]
- Find peaks :: peaks, _ = signal.find_peaks(i, prominence=1e-7)
- Smooth :: signal.savgol_filter(i, 11, 3)
- Low-pass :: b, a = signal.butter(4, 0.1); y = signal.filtfilt(b, a, x)

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
