---
name: SciPy
symbol: sp
order: 22
color: #8fb0ff
on: dark
version: SciPy 1.11+
highlight: python
layout: sheet
group: library
parents: python numpy
aliases: scipy sp
description: Filters, smoothing, fitting, interpolation and statistics.
---

# Signal processing

## Filters
@id filters
@keywords butter sos sosfiltfilt filtfilt lowpass highpass bandpass notch cutoff zero phase fs order
@setup from scipy import signal; import numpy as np; fs = 100.0; x = np.random.default_rng(0).normal(size=1000)
- Import :: from scipy import signal
- Design low-pass (SOS) :: sos = signal.butter(4, 5, btype="low", fs=fs, output="sos")
- Apply, no phase shift :: y = signal.sosfiltfilt(sos, x)
- High-pass (remove drift) :: sos = signal.butter(2, 0.1, btype="high", fs=fs, output="sos")
- Band-pass :: sos = signal.butter(4, [0.5, 20], btype="band", fs=fs, output="sos")
- Notch (50 Hz mains) :: b, a = signal.iirnotch(50, Q=30, fs=fs)
- Apply b, a filter :: y = signal.filtfilt(b, a, x)
- Real-time (causal) :: y = signal.sosfilt(sos, x)
- Check the response :: w, h = signal.sosfreqz(sos, fs=fs)
> Give cutoffs in Hz with fs=…; use output="sos" — it stays stable at high orders where b, a doesn't.

## Smoothing
@id smoothing
@keywords savgol savitzky golay median filter smooth noise window polyorder lowess
@setup from scipy import signal; import numpy as np; x = np.random.default_rng(0).normal(size=500)
- Savitzky–Golay :: y = signal.savgol_filter(x, window_length=11, polyorder=3)
- Smooth derivative :: dy = signal.savgol_filter(x, 11, 3, deriv=1, delta=0.01)
- Median (removes spikes) :: y = signal.medfilt(x, kernel_size=5)
> savgol keeps peak heights better than a moving average; window_length must be odd and > polyorder.

## Baseline and detrending
@id detrend
@keywords detrend baseline drift linear remove offset polynomial
@setup from scipy import signal; import numpy as np; t = np.linspace(0, 10, 500); x = 0.1 * t + np.sin(t)
- Remove straight-line drift :: y = signal.detrend(x)
- Remove the mean only :: y = signal.detrend(x, type="constant")
- Polynomial baseline :: p = np.polyfit(t, x, 2); y = x - np.polyval(p, t)
- Baseline from a quiet window :: quiet = t < 1; y = x - np.median(x[quiet])

## Peaks
@id peaks
@keywords find_peaks peak prominence height width distance valley minimum
@setup from scipy import signal; import numpy as np; i = np.sin(np.linspace(0, 20, 400))
- Find peaks :: peaks, props = signal.find_peaks(i, prominence=0.1)
- Minimum spacing :: signal.find_peaks(i, distance=50)
- Height threshold :: signal.find_peaks(i, height=0.5)
- Valleys (minima) :: troughs, _ = signal.find_peaks(-i)
- Peak widths :: widths = signal.peak_widths(i, peaks, rel_height=0.5)[0]
- Largest peak :: k = peaks[np.argmax(props["prominences"])]

## Spectra
@id spectra
@keywords welch psd periodogram spectrogram spectrum frequency noise power
@setup from scipy import signal; import numpy as np; fs = 100.0; x = np.random.default_rng(0).normal(size=4096)
- Power spectrum (Welch) :: f, pxx = signal.welch(x, fs=fs, nperseg=1024)
- Periodogram :: f, pxx = signal.periodogram(x, fs=fs)
- Spectrogram :: f, t, Sxx = signal.spectrogram(x, fs=fs)
- Plot on log axes :: ax.semilogy(f, pxx)

## Resampling
@id resampling
@keywords resample decimate downsample upsample rate interp
@setup from scipy import signal; import numpy as np; x = np.random.default_rng(0).normal(size=1000)
- Downsample by 10 (filters first) :: y = signal.decimate(x, 10)
- To exactly n samples :: y = signal.resample(x, 250)
- Rational ratio :: y = signal.resample_poly(x, up=2, down=5)
> For irregular timestamps use np.interp or interp1d onto a uniform grid instead.

# Fitting and interpolation

## Curve fitting
@id curve-fitting
@keywords curve_fit fit model parameters covariance uncertainty bounds p0 exponential decay cottrell
```python Fit a model
from scipy.optimize import curve_fit

def model(t, a, tau, c):
    return a * np.exp(-t / tau) + c

popt, pcov = curve_fit(model, t, i, p0=[1.0, 0.5, 0.0])
perr = np.sqrt(np.diag(pcov))    # 1-σ uncertainties
i_fit = model(t, *popt)
```
- Bounds :: curve_fit(model, t, i, p0=[1, 0.5, 0], bounds=([0, 0, -1], [10, 5, 1]))
- Weight by error :: curve_fit(model, t, i, sigma=err, absolute_sigma=True)
- R² of a fit :: r2 = 1 - np.sum((i - i_fit) ** 2) / np.sum((i - np.mean(i)) ** 2)
> A good p0 is often the difference between a fit and "Optimal parameters not found".

## Linear regression
@id linear-regression
@keywords linregress slope intercept r squared p value regression calibration
- Straight-line fit :: res = stats.linregress(x, y)
- Results :: res.slope; res.intercept; res.rvalue ** 2; res.pvalue; res.stderr
- Calibration inverse :: conc = (signal_value - res.intercept) / res.slope
> from scipy import stats

## Interpolation
@id interpolation
@keywords interp1d cubic spline extrapolate fill_value akima pchip
@setup from scipy.interpolate import interp1d, CubicSpline, PchipInterpolator
- Linear, reusable :: f = interp1d(t, x, bounds_error=False, fill_value=np.nan)
- Evaluate :: x_new = f(t_new)
- Cubic :: f = interp1d(t, x, kind="cubic")
- Smooth spline :: cs = CubicSpline(t, x); cs(t_new); cs(t_new, 1)    # value, slope
- No overshoot :: PchipInterpolator(t, x)(t_new)
> fill_value=np.nan marks points outside the data instead of raising an error.

## Optimisation
@id optimisation
@keywords minimize least_squares root brentq optimise solve
- Minimise a function :: res = optimize.minimize(cost, x0=[1.0, 0.1]); res.x
- Least squares (residuals) :: res = optimize.least_squares(residuals, x0=[1.0, 0.1])
- Solve f(x) = 0 :: root = optimize.brentq(f, 0.0, 1.0)
> from scipy import optimize

# Statistics

## Describing data
@id describe
@keywords describe sem mean confidence interval iqr zscore mad skew
- Summary :: stats.describe(x)
- Standard error :: stats.sem(x)
- 95% CI of the mean :: stats.t.interval(0.95, len(x) - 1, loc=np.mean(x), scale=stats.sem(x))
- IQR :: stats.iqr(x)
- Robust spread (MAD) :: stats.median_abs_deviation(x)
- z-scores :: stats.zscore(x)

## Correlation
@id correlation
@keywords pearson spearman kendall correlation rank coefficient p value
- Pearson (linear) :: r, p = stats.pearsonr(x, y)
- Spearman (rank, monotonic) :: rho, p = stats.spearmanr(x, y)
- Kendall :: tau, p = stats.kendalltau(x, y)
> Spearman suits small, noisy or non-linear relationships (e.g. artefact size vs motion).

## Comparing groups
@id tests
@keywords ttest mannwhitney wilcoxon anova kruskal normality shapiro paired independent
- Two independent groups :: stats.ttest_ind(a, b, equal_var=False)    # Welch
- Paired (same participants) :: stats.ttest_rel(before, after)
- Non-parametric, independent :: stats.mannwhitneyu(a, b)
- Non-parametric, paired :: stats.wilcoxon(before, after)
- 3+ groups :: stats.f_oneway(g1, g2, g3); stats.kruskal(g1, g2, g3)
- Normality :: stats.shapiro(x)
> With small n (< ~15), prefer the non-parametric tests unless the data are clearly normal.

# Maths

## Integration and ODEs
@id integration
@keywords integrate trapezoid cumulative_trapezoid solve_ivp ode differential equation simulate
@setup from scipy import integrate
- Area under curve :: q = integrate.trapezoid(i, t)
- Running integral :: Q = integrate.cumulative_trapezoid(i, t, initial=0)
```python Solve an ODE (RC charging)
def rhs(t, v):
    return (vin - v) / (R * C)

sol = integrate.solve_ivp(rhs, (0, 0.01), [0.0], max_step=1e-5)
t, v = sol.t, sol.y[0]
```

## MATLAB files
@id mat-files
@keywords loadmat savemat matlab mat file
- Load :: from scipy.io import loadmat, savemat; d = loadmat("run.mat")
- One variable as 1-D :: v = d["v"].ravel()
- Save :: savemat("out.mat", {"t": t, "v": v})
