---
name: pandas
symbol: pd
order: 23
color: #6c8fe6
on: light
version: pandas 2.x
highlight: python
layout: sheet
group: library
parents: python numpy
aliases: pd pandas
description: Tables: load, clean, group, align and save.
---

# Loading

## Reading files
@id pandas-basics
@keywords read_csv read_excel sep skiprows usecols names header comment encoding delimiter
- CSV :: df = pd.read_csv("run.csv")
- No header row :: pd.read_csv("run.csv", header=None, names=["t", "v", "i"])
- Skip junk lines :: pd.read_csv("log.csv", skiprows=3, comment="#")
- Only some columns :: pd.read_csv("run.csv", usecols=["time", "current"])
- Semicolons / tabs :: pd.read_csv("run.txt", sep=";"); pd.read_csv("run.tsv", sep="\t")
- Odd characters :: pd.read_csv("run.csv", encoding="latin-1")
- Excel sheet :: pd.read_excel("runs.xlsx", sheet_name="CV")
- All sheets :: sheets = pd.read_excel("runs.xlsx", sheet_name=None)
- Many files :: df = pd.concat([pd.read_csv(p).assign(file=p.name) for p in paths], ignore_index=True)

## Looking at a table
@id pandas-inspect
@keywords head tail info describe shape columns dtypes value_counts unique nunique
- First / last rows :: df.head(); df.tail(3)
- Columns and types :: df.info(); df.dtypes
- Size :: df.shape
- Column names :: list(df.columns)
- Summary stats :: df.describe()
- Counts of each value :: df["sensor"].value_counts()
- Distinct values :: df["sensor"].unique()
- Show all columns :: pd.set_option("display.max_columns", None)

# Selecting

## Columns and rows
@id pandas-select
@keywords column select loc iloc row label position at
- One column (Series) :: df["voltage"]
- Several columns :: df[["time", "voltage"]]
- Rows by position :: df.iloc[0]; df.iloc[10:20]
- Rows and columns by label :: df.loc[df["v"] > 0, ["t", "i"]]
- Single value :: df.at[0, "voltage"]
- To NumPy :: df["voltage"].to_numpy()
> loc = labels (and conditions), iloc = integer positions.

## Filtering
@id pandas-filter
@keywords filter condition query isin between and or mask
- Condition :: df[df["voltage"] > 0.2]
- Two conditions :: df[(df["v"] > 0) & (df["i"] < 1e-6)]
- In a list :: df[df["sensor"].isin(["WE1", "WE2"])]
- Range :: df[df["t"].between(5, 10)]
- Text contains :: df[df["file"].str.contains("Validate")]
- Query string :: df.query("v > 0 and condition == 'walking'")

# Cleaning

## Fixing messy data
@id pandas-clean
@keywords to_numeric coerce dropna fillna astype rename strip columns duplicates errors missing
- Text → numbers (bad → NaN) :: df["i"] = pd.to_numeric(df["i"], errors="coerce")
- Drop rows with NaN :: df = df.dropna(subset=["t", "i"])
- Fill gaps :: df["i"] = df["i"].interpolate()
- Strip spaces from headers :: df.columns = df.columns.str.strip()
- Rename :: df = df.rename(columns={"Current (A)": "i"})
- Change type :: df["participant"] = df["participant"].astype(str)
- Remove duplicates :: df = df.drop_duplicates()
- Drop columns :: df = df.drop(columns=["unused"])
- Reset row numbers :: df = df.reset_index(drop=True)

## New columns
@id pandas-columns
@keywords new column assign apply map where calculation derived
- From other columns :: df["power"] = df["v"] * df["i"]
- Unit change :: df["i_uA"] = df["i"] * 1e6
- Several at once :: df = df.assign(t_s=df["t_ms"] / 1000, i_uA=df["i"] * 1e6)
- Conditional :: df["phase"] = np.where(df["t"] < 30, "rest", "walk")
- Relative to first value :: df["t0"] = df["t"] - df["t"].iloc[0]
- Apply a function :: df["label"] = df["file"].map(lambda s: s.split("_")[1])

# Combining and grouping

## Grouping and summaries
@id pandas-group
@keywords groupby agg mean std count pivot_table summary per participant
- Mean per group :: df.groupby("participant")["peak"].mean()
- Several stats :: df.groupby("condition")["peak"].agg(["mean", "std", "count"])
- Named results :: df.groupby("sensor").agg(peak_mean=("peak", "mean"), n=("peak", "size"))
- Two keys :: df.groupby(["participant", "condition"])["peak"].median().reset_index()
- Wide table :: df.pivot_table(index="participant", columns="condition", values="peak", aggfunc="mean")
- Loop over groups :: for name, g in df.groupby("file"): print(name, len(g))

## Joining tables
@id pandas-merge
@keywords concat merge join merge_asof nearest time align timestamps
- Stack rows :: pd.concat([df1, df2], ignore_index=True)
- Join on a key :: df = pd.merge(runs, meta, on="participant", how="left")
- Align by nearest time :: pd.merge_asof(amp.sort_values("t"), imu.sort_values("t"), on="t", direction="nearest")
- …within a tolerance :: pd.merge_asof(amp, imu, on="t", direction="nearest", tolerance=0.05)
> merge_asof is the table version of "find the IMU sample nearest each AMP sample" — both must be sorted by the key.

## Time series
@id pandas-time
@keywords datetime to_datetime index resample rolling window mean timestamp
- Parse timestamps :: df["time"] = pd.to_datetime(df["time"])
- From seconds :: df["time"] = pd.to_datetime(df["t_s"], unit="s")
- Time as the index :: df = df.set_index("time")
- Resample to 1 s means :: df.resample("1s").mean()
- Rolling mean :: df["i_smooth"] = df["i"].rolling(window=11, center=True).mean()
- Rolling over time :: df["i"].rolling("2s").median()

# Output

## Sorting and saving
@id pandas-save
@keywords sort_values to_csv to_excel save rank nlargest
- Sort :: df = df.sort_values(["participant", "t"])
- Largest n :: df.nlargest(5, "peak")
- Rank :: df["rank"] = df["peak"].rank(ascending=False)
- CSV :: df.to_csv("summary.csv", index=False)
- Excel :: df.to_excel("summary.xlsx", index=False)
- Plot quickly :: df.plot(x="t", y="i")

## Gotchas
@id gotchas
@keywords settingwithcopy copy chained assignment index loc warning
- Edit with loc, not chained :: df.loc[df["v"] < 0, "i"] = np.nan
- Copy a filtered table before changing it :: sub = df[df["v"] > 0].copy()
- Columns with spaces :: df["Current (A)"]    # not df.Current (A)
- Mixed types become object :: pd.to_numeric(df["i"], errors="coerce")
> If you see SettingWithCopyWarning, add .copy() where you made the subset.
