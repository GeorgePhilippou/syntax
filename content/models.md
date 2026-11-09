---
name: EIS & models
symbol: Ω
order: 25
color: #7fa7d8
on: dark
version: impedance · control · statsmodels
highlight: python
layout: sheet
group: library
parents: python numpy
aliases: eis impedance control statsmodels
description: Circuit fitting, transfer functions and statistical models.
---

# Impedance (impedance.py)

## Loading EIS data
@id eis-loading
@keywords impedance preprocessing readCSV ignoreBelowX frequencies complex Z load eis
@setup from impedance import preprocessing
- Import :: from impedance import preprocessing
- Read a CSV (f, Z′, Z″) :: frequencies, Z = preprocessing.readCSV("eis.csv")
- Keep first quadrant only :: frequencies, Z = preprocessing.ignoreBelowX(frequencies, Z)
- From your own columns :: Z = df["Zreal"].to_numpy() + 1j * df["Zimag"].to_numpy()
- Sort by frequency :: order = np.argsort(frequencies); frequencies, Z = frequencies[order], Z[order]

## Circuit models
@id eis-circuits
@keywords circuit string R C CPE Warburg parallel series randles model notation
- Series R–C :: "R0-C0"
- R with parallel RC :: "R0-p(R1,C1)"
- Randles cell :: "R0-p(R1-W1,C1)"
- With a CPE (non-ideal C) :: "R0-p(R1,CPE1)"
- Two time constants :: "R0-p(R1,C1)-p(R2,C2)"
> - joins elements in series, p(…, …) in parallel. W = Warburg, CPE = constant phase element.

## Fitting a circuit
@id eis-fitting
@keywords CustomCircuit fit predict initial guess parameters confidence bounds
@setup from impedance.models.circuits import CustomCircuit
```python Fit and predict
circuit = CustomCircuit("R0-p(R1,C1)", initial_guess=[200, 2000, 1e-6])
circuit.fit(frequencies, Z)
Z_fit = circuit.predict(frequencies)
print(circuit)    # parameter table
```
- Fitted values :: circuit.parameters_
- Uncertainties :: circuit.conf_
- Keep values positive :: circuit.fit(frequencies, Z, bounds=([0, 0, 0], [1e4, 1e6, 1e-2]))
- Fix a parameter :: CustomCircuit("R0-p(R1,C1)", initial_guess=[2000, 1e-6], constants={"R0": 200})
> Initial guesses matter: R0 ≈ high-frequency intercept, R0 + R1 ≈ low-frequency intercept.

## Plotting EIS
@id eis-plots
@keywords plot_nyquist plot_bode nyquist bode scale fmt
@setup from impedance.visualization import plot_nyquist, plot_bode
- Nyquist, data and fit :: fig, ax = plt.subplots(); plot_nyquist(Z, fmt="o", ax=ax); plot_nyquist(Z_fit, fmt="-", ax=ax)
- Bode :: plot_bode(frequencies, Z)
- Equal axes by hand :: ax.set_aspect("equal")

# Transfer functions (python-control)

## Systems
@id control-systems
@keywords control tf transfer function state space RC low pass pole zero
@setup import control as ct
- Import :: import control as ct
- RC low-pass, τ = RC :: sys = ct.tf([1], [1e-3, 1])    # 1 / (τs + 1)
- From poles/zeros :: sys = ct.tf([1, 0], [1, 2, 1])
- Poles :: ct.poles(sys)
- DC gain :: ct.dcgain(sys)
- Discrete time :: sysd = ct.sample_system(sys, 0.001)

## Responses
@id control-responses
@keywords step_response forced_response impulse bode_plot frequency response simulate input waveform
@setup import control as ct; sys = ct.tf([1], [1e-3, 1]); t = np.linspace(0, 0.01, 1000); u = np.sign(np.sin(2000 * t))
- Step :: t_s, y_s = ct.step_response(sys)
- Any input waveform :: resp = ct.forced_response(sys, T=t, U=u); y = resp.outputs
- Impulse :: ct.impulse_response(sys)
- Bode plot :: ct.bode_plot(sys, dB=True)
- Frequency response values :: mag, phase, omega = ct.frequency_response(sys)

# Statistics models (statsmodels)

## Regression
@id statsmodels-regression
@keywords ols regression add_constant summary formula smf p values confidence
@setup import statsmodels.api as sm; import statsmodels.formula.api as smf
- Linear model :: model = sm.OLS(y, sm.add_constant(x)).fit()
- Full table :: print(model.summary())
- Coefficients / p-values :: model.params; model.pvalues
- R² :: model.rsquared
- Formula style (with a DataFrame) :: smf.ols("peak ~ speed + C(condition)", data=df).fit()
- Mixed model (repeated participants) :: smf.mixedlm("peak ~ speed", df, groups=df["participant"]).fit()

## LOWESS smoothing
@id lowess
@keywords lowess loess smoothing trend local regression frac
@setup from statsmodels.nonparametric.smoothers_lowess import lowess
- Smooth trend :: fit = lowess(y, x, frac=0.3)
- Split the result :: xs, ys = fit[:, 0], fit[:, 1]
- Evaluate at your x :: ys = lowess(y, x, frac=0.3, xvals=x)
> frac is the share of points in each local fit: bigger = smoother.
