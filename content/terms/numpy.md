# NumPy hover explanations (adds to the Python glossary).
isfinite :: True where a value is a real number — false for NaN and ±inf. The safest "is this sample usable?" test.
nan :: Not a Number: NumPy's marker for missing data. Spreads through maths, so use nan-safe functions.
inf :: Infinity, e.g. from dividing by zero.
asarray :: Converts to an array without copying if it already is one.
full :: Array filled with one value, e.g. np.full(n, np.nan).
zeros_like :: Zeros with the same shape and type as another array.
full_like :: Same shape as another array, filled with one value.
logspace :: Points evenly spaced on a log scale: logspace(-2, 5, 50) = 0.01 … 100,000.
dtype :: The number type stored in an array (float64, int32, bool, …).
astype :: Copy converted to another number type.
float32 :: 32-bit float type — half the memory of the default float64.
ndim :: Number of dimensions (1 for a vector, 2 for a table).
newaxis :: Adds a length-1 axis: a[:, np.newaxis] turns shape (n,) into (n, 1).
squeeze :: Removes length-1 axes.
atleast_1d :: Makes scalars into 1-element arrays so code works on both.
flatnonzero :: Indices where an array is non-zero / True.
count_nonzero :: How many elements are non-zero / True — the quick way to count matches.
vstack :: Stacks arrays as rows.
hstack :: Joins arrays side by side.
stack :: Joins arrays along a new axis.
log10 :: Base-10 logarithm, element-wise.
maximum :: Element-wise larger of two arrays (max gives one value for one array).
var :: Variance; ddof=1 for the sample estimate.
percentile :: Value below which a given % of data falls: percentile(x, 95).
nanmedian :: Median ignoring NaN.
nanstd :: Standard deviation ignoring NaN.
nanmax :: Largest value ignoring NaN.
nanmin :: Smallest value ignoring NaN.
nanargmax :: Index of the largest value, ignoring NaN.
nanpercentile :: Percentile ignoring NaN.
nan_to_num :: Replaces NaN/inf with numbers you choose.
argsort :: Indices that would sort the array — use them to sort other arrays the same way.
searchsorted :: Where each value would be inserted into a sorted array: finds the sample at or after a time.
side :: For searchsorted: "left" (first position) or "right" (after equal values).
unique :: Sorted distinct values; return_counts=True also counts them.
return_counts :: Ask unique() to also return how often each value appears.
axis :: Which dimension to work along: axis=0 down columns, axis=1 across rows.
ddof :: "Delta degrees of freedom": ddof=1 divides by n−1 for sample std/var.
real :: Real part of complex numbers (Z′).
imag :: Imaginary part of complex numbers (Z″).
angle :: Phase of complex numbers, in radians (deg=True for degrees).
deg :: Return angles in degrees instead of radians.
fft :: NumPy's Fourier transform module.
rfft :: Fourier transform of a real signal (positive frequencies only).
rfftfreq :: The frequencies matching rfft's output; needs the sample spacing d=1/fs.
random :: NumPy's random-number module.
default_rng :: Creates a random generator; pass a seed for repeatable results.
normal :: Gaussian random numbers: normal(mean, std, size).
uniform :: Evenly distributed random numbers in a range.
integers :: Random integers in a range (high excluded).
permutation :: A shuffled copy (or shuffled 0…n−1).
choice :: Random picks from a list.
lib :: NumPy's helper sub-packages.
stride_tricks :: Advanced views of arrays without copying.
sliding_window_view :: Every window of n consecutive samples as rows, without copying.
convolve :: Slides one array over another; with a box kernel it's a moving average.
usecols :: Read only these columns (by index or name).
skiprows :: Number of lines to skip at the top (loadtxt).
skip_header :: Number of lines to skip at the top (genfromtxt).
invalid_raise :: genfromtxt: False skips lines with the wrong number of columns instead of failing.
unpack :: loadtxt: return each column as a separate array.
delimiter :: Character separating columns, e.g. ",".
names :: genfromtxt: names=True reads column names from the header.
comments :: savetxt: prefix for the header line; comments="" writes a plain header.
header :: Text written as the first line (savetxt).
mode :: convolve: "same" keeps the original length.
frombuffer :: Interprets raw bytes as an array of a given dtype.
