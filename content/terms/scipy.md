# SciPy hover explanations (adds to the Python and NumPy glossaries).
signal :: scipy.signal: filters, smoothing, peaks, spectra and resampling.
butter :: Designs a Butterworth filter: flat passband. butter(order, cutoff, btype, fs=…, output="sos").
btype :: Filter type: "low", "high", "band" or "bandstop".
output :: Filter format; "sos" (second-order sections) is the numerically safe one.
sos :: Filter stored as second-order sections — use with sosfiltfilt.
fs :: Sampling rate in Hz; lets you give cutoffs in Hz.
sosfiltfilt :: Filters forwards then backwards: no time shift, doubled attenuation. Offline use.
sosfilt :: One-pass (causal) filtering, as in real time — introduces a delay.
filtfilt :: Zero-phase filtering for b, a filters.
iirnotch :: Narrow notch filter, e.g. at 50 Hz mains.
sosfreqz :: Frequency response of an SOS filter, to check what it does.
savgol_filter :: Savitzky–Golay smoothing: fits local polynomials, keeps peak shapes.
window_length :: Number of points in each smoothing window (odd).
polyorder :: Polynomial order for Savitzky–Golay (smaller than the window).
deriv :: Return a smoothed derivative instead of the smoothed signal.
delta :: Sample spacing, used to scale derivatives.
medfilt :: Median filter: removes spikes without smearing edges.
kernel_size :: Window size for medfilt (odd).
detrend :: Removes a straight-line (or constant) trend.
find_peaks :: Finds local maxima; filter by prominence, height, distance.
prominence :: How far a peak rises above its surroundings — the best "is this a real peak?" setting.
distance :: Minimum samples between peaks.
height :: Minimum peak height.
peak_widths :: Width of each peak at a given relative height.
rel_height :: 0.5 = width at half the peak's prominence (FWHM-style).
welch :: Power spectral density averaged over segments — smoother than a raw FFT.
nperseg :: Segment length for welch/spectrogram: longer = finer frequency resolution.
periodogram :: Raw power spectrum of the whole signal.
spectrogram :: How the spectrum changes over time.
decimate :: Downsamples by an integer factor, filtering first to avoid aliasing.
resample :: Resamples to a number of points using the FFT.
resample_poly :: Resamples by a ratio up/down with a polyphase filter.
optimize :: scipy.optimize: fitting, minimising and root finding.
curve_fit :: Fits model(x, *params) to data; returns best parameters and covariance.
p0 :: Starting guess for the parameters.
popt :: The best-fit parameters.
pcov :: Covariance of the parameters; sqrt of its diagonal gives the uncertainties.
bounds :: Lower and upper limits for each parameter.
sigma :: Uncertainty of each data point, used as weights.
absolute_sigma :: Treat sigma as real units, so uncertainties aren't rescaled.
minimize :: Finds the parameters that make a cost function smallest.
least_squares :: Minimises the sum of squared residuals you return.
brentq :: Finds where a function crosses zero between two points.
stats :: scipy.stats: tests, correlations and distributions.
linregress :: Straight-line fit with slope, intercept, r, p and standard error.
slope :: Gradient of the fitted line.
intercept :: Where the fitted line crosses x = 0.
rvalue :: Correlation coefficient r of the fit; square it for R².
pvalue :: Probability of a result this strong if there were no real effect.
describe :: n, min/max, mean, variance, skew and kurtosis in one call.
sem :: Standard error of the mean.
interval :: Confidence interval from a distribution, e.g. stats.t.interval.
iqr :: Interquartile range (75th − 25th percentile).
median_abs_deviation :: Robust spread: median distance from the median.
zscore :: How many standard deviations each value is from the mean.
pearsonr :: Linear correlation r and its p-value.
spearmanr :: Rank (monotonic) correlation rho and p-value — robust to outliers and non-linearity.
kendalltau :: Another rank correlation, good for small samples.
ttest_ind :: t-test for two independent groups; equal_var=False gives Welch's test.
equal_var :: False = Welch's t-test (doesn't assume equal variances).
mannwhitneyu :: Non-parametric test for two independent groups.
wilcoxon :: Non-parametric test for paired samples.
f_oneway :: One-way ANOVA for 3+ groups.
kruskal :: Non-parametric alternative to ANOVA.
shapiro :: Tests whether data look normally distributed.
interpolate :: scipy.interpolate: interpolation and splines.
interp1d :: Makes a reusable interpolation function from x, y.
kind :: Interpolation type: "linear", "nearest", "cubic", …
bounds_error :: interp1d: False returns fill_value outside the data instead of raising.
fill_value :: Value used outside the data range (e.g. np.nan, or "extrapolate").
CubicSpline :: Smooth curve through every point; can also give derivatives.
PchipInterpolator :: Smooth interpolation that never overshoots the data.
integrate :: scipy.integrate: areas and differential equations.
cumulative_trapezoid :: Running integral (e.g. charge over time); initial=0 keeps the length.
initial :: Starting value so the cumulative result has the same length as the input.
solve_ivp :: Solves differential equations dy/dt = f(t, y) over a time span.
max_step :: Largest time step the ODE solver may take.
savemat :: Saves arrays to a MATLAB .mat file.
