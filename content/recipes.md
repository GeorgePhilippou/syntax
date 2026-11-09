---
name: Recipes
symbol: ★
order: 26
color: #3c4f9c
on: light
version: Python · end to end
highlight: python
layout: sheet
columns: 1
group: library
parents: python numpy matplotlib scipy pandas parsing models
aliases: recipe recipes
description: Whole workflows to copy and adapt — load, clean, align, filter, plot, summarise.
---

# Data in

## Load and clean a device CSV
@id recipe-load-clean
@keywords load clean csv device nan numeric units time zero
```python Load, coerce to numbers, drop bad rows, convert units
import numpy as np
import pandas as pd

df = pd.read_csv("run_150ms.csv")
df.columns = df.columns.str.strip()
for col in ["t_ms", "current_A"]:
    df[col] = pd.to_numeric(df[col], errors="coerce")
df = df.dropna(subset=["t_ms", "current_A"]).sort_values("t_ms")

t = (df["t_ms"].to_numpy() - df["t_ms"].iloc[0]) / 1000    # seconds from 0
i = df["current_A"].to_numpy() * 1e6                        # µA
```
- Quick sanity check :: print(len(t), np.nanmin(i), np.nanmax(i), 1 / np.median(np.diff(t)), "Hz")

## Parse a raw log file
@id recipe-parse-log
@keywords parse log text regex lines device sd card firmware output
```python Pull numbers out of lines like "t=1234 V=0.250 I=-1.2e-06"
import re
import numpy as np

pat = re.compile(r"t=(\d+)\s+V=(-?[\d.]+)\s+I=(-?[\d.eE+-]+)")
rows = []
with open("session.log", errors="replace") as f:
    for line in f:
        m = pat.search(line)
        if m:
            rows.append([float(g) for g in m.groups()])
data = np.asarray(rows)
t_ms, v, i = data.T
```

## Every dataset folder into one summary
@id recipe-batch
@keywords batch folders dataset loop summary table csv natural sort
```python Loop over Dataset_* folders, one row each
import re
from pathlib import Path
import numpy as np
import pandas as pd

root = Path("Dataset_AMP_Validate")
dirs = sorted(root.glob("Dataset_*"), key=lambda p: int(re.search(r"\d+", p.name).group()))
summary = []
for d in dirs:
    files = list(d.glob("*.csv"))
    if not files:
        continue
    df = pd.read_csv(files[0])
    i = pd.to_numeric(df.iloc[:, 1], errors="coerce").to_numpy()
    summary.append({"dataset": d.name, "n": np.isfinite(i).sum(),
                    "mean": np.nanmean(i), "std": np.nanstd(i)})
pd.DataFrame(summary).to_csv("summary.csv", index=False)
```

# Processing

## Align IMU to AMP timestamps
@id recipe-align
@keywords align imu amp timestamps resample nearest interpolate overlap
```python Put IMU onto the AMP time base (only where both exist)
import numpy as np

order = np.argsort(t_imu)
t_imu, acc = t_imu[order], acc[order]
keep = (t_amp >= t_imu[0]) & (t_amp <= t_imu[-1])
t, i = t_amp[keep], i_amp[keep]
acc_on_t = np.interp(t, t_imu, acc)              # smooth signals
k = np.clip(np.searchsorted(t_imu, t) - 1, 0, len(t_imu) - 1)
state_on_t = imu_state[order][k]                   # labels/steps: nearest earlier
```
- Magnitude of 3-axis accel :: acc = np.sqrt(ax_ ** 2 + ay ** 2 + az ** 2)

## Filter without shifting the signal
@id recipe-filter
@keywords filter lowpass zero phase sosfiltfilt drift highpass nan gaps
```python Low-pass at 2 Hz and remove slow drift
import numpy as np
from scipy import signal

fs = 1 / np.median(np.diff(t))
ok = np.isfinite(i)
i_filled = np.interp(t, t[ok], i[ok])                  # filters can't take NaN
lp = signal.butter(4, 2.0, btype="low", fs=fs, output="sos")
hp = signal.butter(2, 0.05, btype="high", fs=fs, output="sos")
i_clean = signal.sosfiltfilt(hp, signal.sosfiltfilt(lp, i_filled))
i_clean[~ok] = np.nan                                  # put the gaps back
```

## Motion-artefact metrics per window
@id recipe-windows
@keywords artefact windows metrics rms peak to peak percentile event correlation spearman
```python Metrics in windows around each event, then correlate
import numpy as np
from scipy import stats

rows = []
for te in events:
    w = (t >= te - 1) & (t < te + 2)
    if np.count_nonzero(w) < 10:
        continue
    seg = i_clean[w]
    rows.append([np.nanmax(np.abs(acc_on_t[w])),
                 np.nanpercentile(seg, 95) - np.nanpercentile(seg, 5),
                 np.sqrt(np.nanmean((seg - np.nanmedian(seg)) ** 2))])
motion, p2p, rms = np.asarray(rows).T
rho, p = stats.spearmanr(motion, p2p)
```

# Figures

## Signal with motion on a twin axis
@id recipe-twin-plot
@keywords twin axis plot events shaded legend amp imu figure
```python Current + acceleration, shaded motion, one legend
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(7, 3), layout="constrained")
ax.plot(t, i_clean, color="C0", label="Current")
ax2 = ax.twinx()
ax2.plot(t, acc_on_t, color="C1", alpha=0.6, label="|a|")
for t0, t1 in motion_windows:
    ax.axvspan(t0, t1, color="C3", alpha=0.12)
ax.set_xlabel("Time (s)")
ax.set_ylabel("Current (µA)", color="C0")
ax2.set_ylabel("Acceleration (g)", color="C1")
h1, l1 = ax.get_legend_handles_labels()
h2, l2 = ax2.get_legend_handles_labels()
ax.legend(h1 + h2, l1 + l2, loc="upper right", frameon=False)
fig.savefig("amp_imu.pdf")
plt.close(fig)
```

## CV/LSV sweeps in one colour scale
@id recipe-sweeps
@keywords cv lsv sweeps voltammogram colormap colorbar many lines
```python One line per sweep, coloured by sweep number
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(4, 3), layout="constrained")
cmap = plt.get_cmap("viridis")
for k, (v, i) in enumerate(sweeps):
    ax.plot(v, i * 1e6, color=cmap(k / max(len(sweeps) - 1, 1)), linewidth=1)
sm = plt.cm.ScalarMappable(cmap=cmap, norm=plt.Normalize(1, len(sweeps)))
fig.colorbar(sm, ax=ax, label="Sweep")
ax.set_xlabel("Potential (V)")
ax.set_ylabel("Current (µA)")
```

## Nyquist and Bode from an EIS CSV
@id recipe-eis
@keywords eis nyquist bode impedance fit circuit csv plot
```python Fit R0-p(R1,C1) and plot both views
import matplotlib.pyplot as plt
import numpy as np
from impedance import preprocessing
from impedance.models.circuits import CustomCircuit

f, Z = preprocessing.readCSV("EIS_data_Series_RC.csv")
f, Z = preprocessing.ignoreBelowX(f, Z)
circuit = CustomCircuit("R0-p(R1,C1)", initial_guess=[200, 2000, 1e-6]).fit(f, Z)
Z_fit = circuit.predict(f)

fig, (a1, a2, a3) = plt.subplots(1, 3, figsize=(10, 3), layout="constrained")
a1.plot(Z.real, -Z.imag, "o", ms=3); a1.plot(Z_fit.real, -Z_fit.imag, "-")
a1.set_aspect("equal"); a1.set_xlabel("Z' (Ω)"); a1.set_ylabel("−Z'' (Ω)")
a2.loglog(f, np.abs(Z), "o", ms=3); a2.loglog(f, np.abs(Z_fit)); a2.set_ylabel("|Z| (Ω)")
a3.semilogx(f, np.angle(Z, deg=True), "o", ms=3); a3.semilogx(f, np.angle(Z_fit, deg=True))
a3.set_ylabel("Phase (°)")
for a in (a2, a3):
    a.set_xlabel("Frequency (Hz)")
```

## Figure template for a paper
@id recipe-paper-figure
@keywords paper ieee figure template fonts size pdf column
```python IEEE single-column figure
import matplotlib.pyplot as plt

plt.rcParams.update({"font.size": 8, "axes.labelsize": 8, "legend.fontsize": 7,
                     "xtick.labelsize": 7, "ytick.labelsize": 7, "pdf.fonttype": 42})
fig, ax = plt.subplots(figsize=(3.5, 2.4), layout="constrained")
ax.plot(x, y, linewidth=1)
ax.spines[["top", "right"]].set_visible(False)
ax.set_xlabel("Speed (km/h)")
ax.set_ylabel("Artefact (µA)")
fig.savefig("fig_speed.pdf")
```

# Devices

## Capture serial data to a CSV
@id recipe-capture
@keywords serial capture csv record device uart port timestamp
```python Record for 60 s, timestamped on the computer
import csv
import time
import serial

with serial.Serial("/dev/tty.usbserial-AU001M64", 115200, timeout=1) as port, \
        open(time.strftime("capture_%Y%m%d_%H%M%S.csv"), "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["host_s", "raw"])
    port.reset_input_buffer()
    t0 = time.perf_counter()
    while time.perf_counter() - t0 < 60:
        line = port.readline().decode(errors="replace").strip()
        if line:
            w.writerow([f"{time.perf_counter() - t0:.4f}", line])
```

## Simulate a circuit's response
@id recipe-simulate
@keywords simulate rc circuit control transfer function step waveform response noise
```python RC low-pass response to a square-wave input, plus noise
import control as ct
import matplotlib.pyplot as plt
import numpy as np

R, C = 10e3, 1e-6
sys = ct.tf([1], [R * C, 1])
t = np.linspace(0, 0.1, 5000)
u = 0.4 * (np.sin(2 * np.pi * 20 * t) > 0)
y = ct.forced_response(sys, T=t, U=u).outputs
y_noisy = y + np.random.default_rng(0).normal(0, 0.005, t.size)

fig, ax = plt.subplots()
ax.plot(t * 1e3, u, label="Input")
ax.plot(t * 1e3, y_noisy, label="Output")
ax.set_xlabel("Time (ms)")
ax.legend()
```
