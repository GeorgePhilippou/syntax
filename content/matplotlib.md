---
name: Matplotlib
symbol: plt
order: 21
color: #2e5aa8
on: light
version: Matplotlib 3.8+
highlight: python
layout: sheet
group: library
parents: python
aliases: plt matplotlib mpl
description: Figures, axes, twin axes and paper-ready plots.
---

# Basics

## Figure and axes: pick one style
@id figure-and-axes
@keywords figure axes plt ax object oriented pyplot style gca gcf subplots which
```python Axes style (use this)
fig, ax = plt.subplots(figsize=(6, 4))
ax.plot(t, i)
ax.set_xlabel("Time (s)")
ax.set_ylabel("Current (µA)")
```
- pyplot style (quick only) :: plt.plot(t, i); plt.xlabel("Time (s)")
- plt.xlabel → ax.set_xlabel :: ax.set_xlabel("Time (s)")
- plt.title → ax.set_title :: ax.set_title("AMP vs IMU")
- plt.xlim → ax.set_xlim :: ax.set_xlim(0, 10)
- Current axes / figure :: ax = plt.gca(); fig = plt.gcf()
> plt.* acts on "whichever axes is current" — with twinx or subplots that's often not the one you mean. Use ax.* everywhere.

## Lines and markers
@id line-plot
@keywords plot line marker style color linewidth alpha label linestyle
- Line :: ax.plot(t, v, label="run 1")
- Markers only :: ax.plot(t, v, "o", markersize=3)
- Style string :: ax.plot(t, v, "--", color="C1")    # C0…C9 = default colours
- Width / transparency :: ax.plot(t, v, linewidth=1.5, alpha=0.7)
- Step plot (DAC levels) :: ax.step(t, v, where="post")
- Fill under / between :: ax.fill_between(t, lo, hi, alpha=0.2)

## Labels, titles and legends
@id legends
@keywords label title legend location fontsize units mu greek latex
- Axis labels :: ax.set_xlabel("Potential (V)"); ax.set_ylabel("Current (µA)")
- Title :: ax.set_title("LSV, 50 mV/s")
- Maths in labels :: ax.set_ylabel(r"$\Delta I$ (µA)")
- Legend :: ax.legend(loc="best", frameon=False)
- Legend outside :: ax.legend(loc="upper left", bbox_to_anchor=(1.02, 1))
- Legend with columns :: ax.legend(ncol=2, fontsize=8)
- Leave a line out :: ax.plot(t, v, label="_nolegend_")
- Whole-figure title :: fig.suptitle("Participant 3")

## Limits, scales and ticks
@id ticks
@keywords xlim ylim log scale ticks tick_params locator formatter invert axis margins
- Limits :: ax.set_xlim(-0.5, 0.8); ax.set_ylim(bottom=0)
- Log axis :: ax.set_xscale("log")
- Reverse an axis :: ax.invert_xaxis()
- Tick label size / direction :: ax.tick_params(labelsize=9, direction="in")
- Colour ticks (twin axes) :: ax.tick_params(axis="y", colors="C1")
- Fixed tick spacing :: ax.xaxis.set_major_locator(MultipleLocator(0.2))
- Scientific notation :: ax.ticklabel_format(axis="y", style="sci", scilimits=(-3, 3))
- Tick positions / labels :: ax.set_xticks([0, 1, 2]); ax.set_xticklabels(["A", "B", "C"])
> from matplotlib.ticker import MultipleLocator

## Grid, spines and style
@id spines
@keywords grid spines box frame style rcparams font size
- Grid :: ax.grid(True, alpha=0.3)
- Hide top/right frame :: ax.spines[["top", "right"]].set_visible(False)
- Global font size :: plt.rcParams["font.size"] = 10
- A built-in style :: plt.style.use("seaborn-v0_8-whitegrid")

# Layouts

## Grids of plots
@id subplots
@keywords subplots grid rows columns sharex sharey axs layout constrained gridspec mosaic
- 2×2 grid :: fig, axs = plt.subplots(2, 2, figsize=(8, 6))
- Use one panel :: axs[0, 1].plot(t, v)
- Loop over panels :: for ax in axs.flat: ax.grid(alpha=0.3)
- Stacked, shared time axis :: fig, (ax1, ax2) = plt.subplots(2, 1, sharex=True)
- Tidy spacing :: fig, ax = plt.subplots(layout="constrained")
- Named layout :: fig, axd = plt.subplot_mosaic([["cv", "cv"], ["imu", "amp"]])
- Different sizes :: plt.subplots(2, 1, gridspec_kw={"height_ratios": [3, 1]})
- Panel letters :: ax.text(0.02, 0.95, "(a)", transform=ax.transAxes, fontweight="bold")

## Twin axes with one legend
@id twin-axes
@keywords twinx second y axis legend merge handles labels two units
```python Two y-axes, one legend
fig, ax = plt.subplots()
ax.plot(t, i, color="C0", label="Current")
ax2 = ax.twinx()
ax2.plot(t_imu, acc, color="C1", label="Acceleration")
ax.set_ylabel("Current (µA)", color="C0")
ax2.set_ylabel("Accel (g)", color="C1")
h1, l1 = ax.get_legend_handles_labels()
h2, l2 = ax2.get_legend_handles_labels()
ax.legend(h1 + h2, l1 + l2, loc="upper right")
```
- Second x-axis instead :: ax_top = ax.twiny()
- Put one behind the other :: ax.set_zorder(ax2.get_zorder() + 1); ax.patch.set_visible(False)
> Each twin has its own legend list — merge them, or one legend will hide the other.

# Annotating

## Lines, bands and events
@id annotate-regions
@keywords axvline axhline axvspan shade region event marker threshold vertical horizontal
- Vertical line (event) :: ax.axvline(t_event, color="k", linestyle=":", linewidth=1)
- Horizontal line (threshold) :: ax.axhline(0, color="0.5", linewidth=0.8)
- Shade a time window :: ax.axvspan(t0, t1, color="C3", alpha=0.15, label="Motion")
- Shade a value band :: ax.axhspan(-0.1, 0.1, color="0.9")
- Many events :: for te in events: ax.axvline(te, color="0.6", linewidth=0.8)

## Text and arrows
@id annotate-text
@keywords text annotate arrow label point transform axes fraction
- Text at data point :: ax.text(vp, ip, " peak", va="center")
- Text in a corner :: ax.text(0.98, 0.02, "n = 12", transform=ax.transAxes, ha="right")
- Arrow to a point :: ax.annotate("peak", xy=(vp, ip), xytext=(vp + 0.1, ip), arrowprops=dict(arrowstyle="->"))

# Plot types

## Scatter, error bars and bars
@id scatter
@keywords scatter errorbar bar barh boxplot violin mean std
- Scatter :: ax.scatter(x, y, s=12, alpha=0.7)
- Coloured by a value :: sc = ax.scatter(x, y, c=z, cmap="viridis"); fig.colorbar(sc, ax=ax)
- Error bars :: ax.errorbar(x, m, yerr=s, fmt="o", capsize=3)
- Bars :: ax.bar(names, values)
- Box plot :: ax.boxplot([g1, g2], labels=["Still", "Walking"])

## Histograms
@id histograms
@keywords hist histogram bins density distribution
- Histogram :: ax.hist(x, bins=30)
- Normalised :: ax.hist(x, bins=30, density=True, alpha=0.6)
- Two groups :: ax.hist([a, b], bins=20, label=["A", "B"])

## Images and heatmaps
@id heatmaps
@keywords imshow pcolormesh heatmap colorbar matrix image extent aspect
- Matrix as image :: im = ax.imshow(M, aspect="auto", origin="lower")
- With real axes :: ax.imshow(M, extent=[t0, t1, f0, f1], aspect="auto")
- Grid of values :: ax.pcolormesh(X, Y, Z, shading="auto")
- Colour bar :: fig.colorbar(im, ax=ax, label="Power (dB)")

## Colours and colormaps
@id colormaps
@keywords colormap cmap get_cmap color cycle viridis tab10 many lines sweeps
- Default colour cycle :: ax.plot(t, v, color="C0")    # C0…C9
- Named colours :: ax.plot(t, v, color="black"); ax.plot(t, v, color="0.5")    # "0.5" = mid grey
- Colormap :: cmap = plt.get_cmap("viridis")
- One colour per sweep :: colors = cmap(np.linspace(0, 1, n_sweeps))
- Use them :: for k, c in enumerate(colors): ax.plot(v, sweeps[k], color=c)
- Categorical palette :: plt.get_cmap("tab10")(k)
> Prefer viridis/cividis (readable in greyscale and for colour-blind readers) over jet.

## Nyquist and Bode plots
@id nyquist-bode
@keywords nyquist bode impedance eis magnitude phase log frequency equal aspect
```python Nyquist
fig, ax = plt.subplots()
ax.plot(Z.real, -Z.imag, "o-")
ax.set_xlabel("Z' (Ω)")
ax.set_ylabel("−Z'' (Ω)")
ax.set_aspect("equal")
```
```python Bode
fig, (ax1, ax2) = plt.subplots(2, 1, sharex=True)
ax1.loglog(f, np.abs(Z))
ax2.semilogx(f, np.angle(Z, deg=True))
ax1.set_ylabel("|Z| (Ω)")
ax2.set_ylabel("Phase (°)")
ax2.set_xlabel("Frequency (Hz)")
```

# Output

## Saving figures for papers
@id figures-for-papers
@keywords savefig pdf png dpi tight bbox vector ieee column width font embed
- Vector PDF :: fig.savefig("fig.pdf", bbox_inches="tight")
- PNG at print quality :: fig.savefig("fig.png", dpi=300, bbox_inches="tight")
- IEEE single column :: fig, ax = plt.subplots(figsize=(3.5, 2.5))
- IEEE double column :: fig, ax = plt.subplots(figsize=(7.16, 3))
- Paper font sizes :: plt.rcParams.update({"font.size": 8, "axes.labelsize": 8, "legend.fontsize": 7})
- Embed fonts in PDF :: plt.rcParams["pdf.fonttype"] = 42
- Transparent background :: fig.savefig("fig.png", transparent=True)
> Set figsize to the real printed size, then fonts at 8–9 pt look right without rescaling.

## Spyder and interactive use
@id interactive
@keywords spyder inline qt backend interactive close all show pause animation update ion
- Close every figure :: plt.close("all")
- Close one (in loops) :: plt.close(fig)
- Separate windows (Spyder console) :: %matplotlib qt
- Back to inline :: %matplotlib inline
- Live update :: line.set_data(t, v); ax.relim(); ax.autoscale_view(); plt.pause(0.01)
- Turn interactive mode on :: plt.ion()
> Creating figures in a loop without closing them eats memory and slows Spyder — close each one after saving.

## Widgets
@id widgets
@keywords widget button slider textbox interactive callback on_clicked
```python Button and slider
from matplotlib.widgets import Button, Slider
ax_btn = fig.add_axes([0.8, 0.02, 0.1, 0.05])
btn = Button(ax_btn, "Next")
btn.on_clicked(lambda event: show_next())
ax_sl = fig.add_axes([0.15, 0.02, 0.5, 0.03])
sl = Slider(ax_sl, "Sweep", 0, 10, valinit=0, valstep=1)
sl.on_changed(lambda val: draw_sweep(int(val)))
```
> Keep a reference to each widget (btn = …) or it stops responding.
