# impedance.py, python-control and statsmodels hover explanations.
impedance :: impedance.py: fits equivalent circuits to EIS data.
preprocessing :: impedance.py helpers for loading and trimming data.
readCSV :: Reads a CSV with frequency, Z′ and Z″ columns into frequencies and complex Z.
ignoreBelowX :: Drops points below the real axis (inductive, first-quadrant only).
CustomCircuit :: An equivalent-circuit model from a string like "R0-p(R1,C1)".
initial_guess :: Starting values for each circuit element, in order.
constants :: Elements held fixed during fitting, e.g. {"R0": 200}.
predict :: Model impedance at given frequencies (after fitting).
parameters_ :: Fitted element values, in circuit order.
conf_ :: Uncertainty of each fitted value.
plot_nyquist :: Nyquist plot helper (Z′ vs −Z″) from impedance.py.
plot_bode :: Bode plot helper (|Z| and phase vs frequency).
circuit :: An equivalent-circuit model object.
frequencies :: Measurement frequencies in Hz.
ct :: The usual short name for python-control.
control :: python-control: transfer functions, simulation and frequency response.
tf :: Transfer function from numerator and denominator coefficients: tf([1], [RC, 1]).
poles :: Roots of the denominator — where the system responds most.
dcgain :: Steady-state gain for a constant input.
sample_system :: Converts a continuous system to discrete time at a sample period.
step_response :: Output for a unit step input.
forced_response :: Output for any input waveform U over times T.
outputs :: The simulated output signal from a response.
impulse_response :: Output for a short impulse.
bode_plot :: Draws magnitude and phase against frequency.
frequency_response :: Magnitude, phase and frequency values for a system.
sm :: The usual short name for statsmodels.api.
smf :: statsmodels' formula interface ("y ~ x + C(group)").
OLS :: Ordinary least squares regression.
add_constant :: Adds an intercept column before fitting.
summary :: Full results table: coefficients, CIs, p-values, R².
params :: Fitted coefficients.
pvalues :: p-value for each coefficient.
rsquared :: R² of the fit.
ols :: Formula version of OLS.
mixedlm :: Mixed-effects model — handles repeated measurements per participant.
groups :: The grouping column (e.g. participant) for a mixed model.
lowess :: Locally weighted smoothing: follows a trend without assuming a formula.
frac :: Share of data used for each local fit in LOWESS.
xvals :: x positions where LOWESS should report the smoothed values.
