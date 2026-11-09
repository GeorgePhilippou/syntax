---
name: NumPy
symbol: np
order: 20
color: #4f7fd9
on: light
version: NumPy 1.26 / 2.x
highlight: python
layout: sheet
group: library
parents: python
aliases: np numpy
description: Arrays, masks, NaN-safe maths and time alignment.
---

# Arrays

## Creating arrays
@id numpy-arrays
@keywords array asarray zeros ones full empty arange linspace logspace like dtype
- Import :: import numpy as np
- From a list :: a = np.array([1.0, 2.0, 3.0])
- Make sure it's an array :: x = np.asarray(values, dtype=float)
- Zeros / ones :: np.zeros(100); np.ones((3, 4))
- Filled with a value :: np.full(100, np.nan)
- Same shape as another :: np.zeros_like(a); np.full_like(a, np.nan)
- Step range :: np.arange(0, 1, 0.01)
- N points :: np.linspace(-0.5, 0.8, 131)
- Log-spaced (EIS freqs) :: np.logspace(-2, 5, 50)    # 0.01 Hz to 100 kHz
- Number type :: a.dtype; a.astype(np.float32)
- Copy :: b = a.copy()
> np.asarray doesn't copy if it's already an array; np.array always copies.

## Shape and reshaping
@id numpy-shape
@keywords shape size ndim reshape ravel flatten transpose newaxis squeeze expand dims
@setup import numpy as np; a = np.arange(12); m = a.reshape(3, 4)
- Size :: a.shape; a.size; a.ndim; len(a)
- Reshape :: m = a.reshape(3, 4)
- Work out one dimension :: a.reshape(-1, 2)
- Flatten :: m.ravel()
- Transpose :: m.T
- Add an axis :: a[:, np.newaxis]    # (12,) → (12, 1)
- Drop size-1 axes :: np.squeeze(m)
- Ensure at least 1-D :: np.atleast_1d(3.0)
> (n,) is a 1-D array; (n, 1) is a column. Many shape errors come from mixing them.

## Indexing and slicing
@id slicing
@keywords index slice row column last every other fancy indexing take
@setup import numpy as np; a = np.arange(10); m = np.arange(12).reshape(3, 4); idx = [0, 2]
- Element / last :: a[0]; a[-1]
- Range (end excluded) :: a[2:5]
- Every other / reversed :: a[::2]; a[::-1]
- Row / column :: m[1, :]; m[:, 0]
- Several rows :: m[idx]
- Several elements :: a[[1, 3, 5]]
- Sub-block :: m[0:2, 1:3]
> A slice is a view: changing it changes the original. Use .copy() to keep them separate.

## Boolean masks
@id masks
@keywords mask boolean where condition filter and or not count nonzero flatnonzero
@setup import numpy as np; v = np.linspace(-1, 1, 11); i = v ** 2
- Mask :: mask = v > 0.2
- Apply :: v[mask]
- Combine (use brackets) :: (v > 0) & (v < 0.5)
- Or / not :: (v < -0.5) | (v > 0.5); ~mask
- How many true :: np.count_nonzero(mask)
- Indices where true :: np.flatnonzero(mask)
- Pick by condition :: np.where(v > 0, i, 0.0)
- Any / all :: np.any(mask); np.all(mask)
- Set where true :: i[~mask] = np.nan
> Use & | ~ with arrays, not and / or / not — and wrap each comparison in brackets.

## Combining arrays
@id combining-arrays
@keywords concatenate stack vstack hstack column_stack split append
@setup import numpy as np; a = np.arange(3); b = np.arange(3, 6)
- Join end to end :: np.concatenate([a, b])
- As columns :: np.column_stack([a, b])
- As rows :: np.vstack([a, b])
- Side by side :: np.hstack([a, b])
- New axis :: np.stack([a, b], axis=0)
- Split in two :: left, right = np.split(np.arange(6), 2)
> Collect pieces in a list and concatenate once at the end — np.append in a loop is slow.

# Maths

## Element-wise maths and broadcasting
@id numpy-maths
@keywords elementwise broadcasting multiply divide power abs sqrt exp log matrix dot
@setup import numpy as np; a = np.arange(1, 4); m = np.ones((3, 3)); v = np.ones(3)
- Element-wise :: a * 2; a + a; a ** 2; 1 / a
- Functions :: np.abs(a); np.sqrt(a); np.exp(a); np.log10(a)
- Broadcast a row :: m - a    # subtracts a from every row
- Broadcast a column :: m - a[:, np.newaxis]
- Matrix product :: m @ v
- Element-wise max of two :: np.maximum(a, 2)
- Scale to 0–1 :: (a - a.min()) / (a.max() - a.min())
> Arrays with shapes (3, 4) and (4,) combine; (3, 4) and (3,) don't — add an axis.

## Statistics
@id numpy-stats
@keywords mean median std var percentile quantile min max argmax argmin axis ptp rms
@setup import numpy as np; x = np.random.default_rng(0).normal(size=100); m = x.reshape(10, 10)
- Centre :: np.mean(x); np.median(x)
- Spread :: np.std(x, ddof=1); np.var(x, ddof=1)
- Percentiles :: np.percentile(x, [5, 50, 95])
- Interquartile range :: q1, q3 = np.percentile(x, [25, 75]); iqr = q3 - q1
- Range :: np.ptp(x)
- Where the max is :: np.argmax(x); np.argmin(x)
- RMS :: np.sqrt(np.mean(x ** 2))
- Per column / per row :: m.mean(axis=0); m.mean(axis=1)
- Correlation :: np.corrcoef(x[:-1], x[1:])[0, 1]
> axis=0 collapses rows (one result per column); axis=1 collapses columns.

## Missing data (NaN)
@id numpy-nan
@keywords nan isnan isfinite nanmean nanmedian nanstd nanmax nanargmax inf clean missing interpolate gaps
@setup import numpy as np; x = np.array([1.0, np.nan, 3.0, np.inf, 5.0]); t = np.arange(5.0)
- Missing value :: np.nan
- Test :: np.isnan(x); np.isfinite(x)    # isfinite also rejects ±inf
- Keep good values :: good = x[np.isfinite(x)]
- NaN-safe stats :: np.nanmean(x); np.nanmedian(x); np.nanstd(x)
- NaN-safe max / index :: np.nanmax(x); np.nanargmax(x)
- Replace :: np.nan_to_num(x, nan=0.0)
- Fill gaps by interpolation :: ok = np.isfinite(x); x[~ok] = np.interp(t[~ok], t[ok], x[ok])
- Drop rows with any NaN :: m = np.column_stack([t, x]); m = m[np.all(np.isfinite(m), axis=1)]
- Count missing :: np.count_nonzero(~np.isfinite(x))
> np.nan == np.nan is False — always test with np.isnan or np.isfinite.

## Sorting, ranking and searching
@id sorting
@keywords sort argsort rank unique searchsorted order index top n
@setup import numpy as np; x = np.array([3.0, 1.0, 2.0]); t = np.array([0.0, 0.5, 1.0, 1.5])
- Sorted copy :: np.sort(x)
- Order that sorts it :: order = np.argsort(x)
- Sort two arrays together :: order = np.argsort(t); t, x2 = t[order], np.arange(4)[order]
- Descending :: np.sort(x)[::-1]
- Top 2 indices :: np.argsort(x)[-2:]
- Rank of each value :: ranks = np.argsort(np.argsort(x))
- Unique values / counts :: np.unique(x, return_counts=True)
- Where would 0.7 go? :: np.searchsorted(t, 0.7)    # index into sorted t

## Differences and cumulative
@id numpy-diff
@keywords diff gradient cumsum cumprod trapezoid integrate derivative
@setup import numpy as np; t = np.linspace(0, 1, 101); i = np.sin(t)
- Differences :: np.diff(i)    # one shorter
- Sample intervals :: dt = np.diff(t)
- Derivative (same length) :: np.gradient(i, t)
- Running total :: np.cumsum(i)
- Integrate (charge) :: q = np.trapezoid(i, t)    # np.trapz before NumPy 2
- Sampling rate :: fs = 1 / np.median(np.diff(t))

## Rounding and clipping
@id numpy-rounding
@keywords round floor ceil clip limit int
@setup import numpy as np; x = np.array([-1.26, 0.5, 2.74])
- Round :: np.round(x, 2)
- Down / up :: np.floor(x); np.ceil(x)
- Limit to a range :: np.clip(x, 0, 1)
- To integers :: x.astype(int)    # truncates toward zero

# Signals and time

## Aligning two sensors in time
@id time-alignment
@keywords align timestamps resample interp searchsorted nearest imu sync merge different rates
@setup import numpy as np; t_amp = np.linspace(0, 10, 101); i_amp = np.sin(t_amp); t_imu = np.linspace(0, 10, 1001); acc = np.cos(t_imu)
- Resample onto other times :: acc_on_amp = np.interp(t_amp, t_imu, acc)
- Nearest earlier sample :: k = np.searchsorted(t_imu, t_amp, side="right") - 1
- Clamp to valid range :: k = np.clip(k, 0, len(t_imu) - 1)
- Value at those samples :: acc_at = acc[k]
- Overlap window only :: keep = (t_amp >= t_imu[0]) & (t_amp <= t_imu[-1])
- Uniform time grid :: grid = np.arange(t_amp[0], t_amp[-1], 0.05)
- Start time at zero :: t = t_amp - t_amp[0]
> np.interp needs the x values (t_imu) sorted ascending — sort first if logs arrive out of order.

## Windows and moving averages
@id numpy-windows
@keywords moving average rolling window convolve sliding window mean median
@setup import numpy as np; x = np.random.default_rng(1).normal(size=200); n = 5
- Moving average :: np.convolve(x, np.ones(n) / n, mode="same")
- Rolling windows :: w = np.lib.stride_tricks.sliding_window_view(x, n)
- Rolling median :: np.median(w, axis=1)
- Block averages :: x[: len(x) // n * n].reshape(-1, n).mean(axis=1)

## Complex numbers (impedance)
@id complex-numbers
@keywords complex impedance real imag abs angle phase magnitude nyquist bode 1j
@setup import numpy as np; f = np.logspace(0, 5, 50); R, C = 1000.0, 1e-6
- Imaginary unit :: z = 3 + 4j
- RC in series :: Z = R + 1 / (1j * 2 * np.pi * f * C)
- Parts :: Z.real; Z.imag
- Magnitude / phase :: np.abs(Z); np.angle(Z, deg=True)
- Nyquist axes :: x, y = Z.real, -Z.imag
- Build from parts :: Z2 = Z.real + 1j * Z.imag

## FFT
@id fft
@keywords fft frequency spectrum rfft rfftfreq amplitude power
@setup import numpy as np; fs = 100.0; t = np.arange(0, 10, 1 / fs); x = np.sin(2 * np.pi * 5 * t)
- Spectrum (real signal) :: X = np.fft.rfft(x)
- Matching frequencies :: freqs = np.fft.rfftfreq(len(x), d=1 / fs)
- Amplitude :: amp = 2 * np.abs(X) / len(x)
- Dominant frequency :: freqs[np.argmax(amp[1:]) + 1]

## Random numbers
@id random-numbers
@keywords random generator normal uniform noise seed integers choice
- Generator (seeded) :: rng = np.random.default_rng(42)
- Gaussian noise :: noise = rng.normal(0, 0.01, size=1000)
- Uniform :: rng.uniform(0, 1, size=10)
- Integers :: rng.integers(0, 10, size=5)
- Shuffle / pick :: rng.permutation(10); rng.choice([1, 2, 3], size=2)

# Files

## Loading and saving
@id loading-and-saving-arrays
@keywords loadtxt genfromtxt savetxt save load npz csv usecols skiprows delimiter
- Numeric CSV :: data = np.loadtxt("run.csv", delimiter=",", skiprows=1)
- Some columns only :: t, i = np.loadtxt("run.csv", delimiter=",", skiprows=1, usecols=(0, 2), unpack=True)
- Gaps / bad cells → NaN :: np.genfromtxt("run.csv", delimiter=",", skip_header=1, invalid_raise=False)
- By column name :: d = np.genfromtxt("run.csv", delimiter=",", names=True); d["voltage"]
- Save CSV :: np.savetxt("out.csv", np.column_stack([t, i]), delimiter=",", header="t,i", comments="")
- Binary :: np.save("run.npy", data); data = np.load("run.npy")
- Several arrays :: np.savez("run.npz", t=t, i=i); f = np.load("run.npz"); f["t"]

# Habits

## Replacing loops
@id vectorising
@keywords vectorise loop range len faster without loop
@setup import numpy as np; v = np.linspace(0, 1, 11); out = np.zeros_like(v)
```python Loop (slow, long)
for k in range(len(v)):
    out[k] = v[k] * 2 if v[k] > 0.5 else 0.0
```
- Same in one line :: out = np.where(v > 0.5, v * 2, 0.0)
- Running difference :: d = v[1:] - v[:-1]    # instead of a loop over k
- Count matches :: np.count_nonzero(v > 0.5)    # instead of a counter
- Pairs of neighbours :: for a, b in zip(v[:-1], v[1:]): …

## Gotchas
@id gotchas
@keywords gotcha view copy integer dtype shape broadcasting nan equality
- Slices share data :: b = a[2:5].copy()    # copy if you'll modify it
- Integer arrays stay integer :: np.array([1, 2]) / 2    # fine, but a[0] = 0.7 stores 0
- and / or fail on arrays :: (x > 0) & (x < 1)
- NaN isn't equal to itself :: np.isnan(x)
- Mean of empty is NaN :: np.mean([])    # with a RuntimeWarning
> When something looks wrong, print x.shape and x.dtype first.
