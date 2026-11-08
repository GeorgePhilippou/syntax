# Hover explanations for Python code: term :: one-line explanation.

# Keywords
def :: Defines a function: def name(params): followed by an indented body.
return :: Ends the function and hands a value back. Without it a function returns None.
lambda :: A small one-line function without a name: lambda x: x * 2.
class :: Defines a new type with its own data (attributes) and functions (methods).
self :: The object a method is called on; always the first parameter of a method.
import :: Loads a module so you can use it: import math.
from :: Imports specific names from a module: from pathlib import Path.
as :: Gives an import or a context manager a local name: import numpy as np.
if :: Runs the indented block only when the condition is true.
elif :: "else if": checked only when the previous conditions were false.
else :: Runs when no earlier if/elif matched (also on for/while/try).
for :: Loops over every item of a list, range, file, dict, …
while :: Repeats while the condition stays true.
in :: Membership test (x in items) or the iteration source in a for loop.
is :: Identity test: same object. Use it for None checks: x is None.
not :: Logical NOT: not True is False.
and :: Logical AND: true only if both sides are; stops early.
or :: Logical OR: true if either side is; returns the first truthy value.
break :: Leaves the loop immediately.
continue :: Skips to the next loop iteration.
pass :: Does nothing; a placeholder where a statement is required.
with :: Context manager: sets something up and always cleans it up (e.g. closes a file).
try :: Starts a block whose errors can be caught by except.
except :: Handles an error raised in the try block.
finally :: Always runs after try/except, error or not — used for cleanup.
raise :: Throws an error: raise ValueError("message").
assert :: Stops with an AssertionError if the condition is false. For sanity checks.
match :: Pattern-matching switch (Python 3.10+).
case :: One pattern inside match; case _ matches anything.
del :: Deletes a name, a list item or a dict key.
global :: Lets a function assign to a module-level variable.
yield :: Makes a function a generator that produces values one at a time.
None :: Python's "no value". Functions without return give None.
True :: Boolean true.
False :: Boolean false.

# Operators
** :: Power: 2 ** 10 is 1024. (^ is bitwise XOR, not power.)
// :: Floor division: 7 // 2 is 3.
/ :: True division: always gives a float, 7 / 2 is 3.5.
% :: Remainder (modulo); also old-style string formatting.
@ :: Matrix multiplication (NumPy), or a decorator before a def/class.
== :: Equal value.
!= :: Not equal.
+= :: Add in place: i += 1.
-> :: Annotates the return type of a function (a hint, not enforced).
:= :: "Walrus": assigns inside an expression.

# Built-in functions
print :: Writes values to the screen, separated by spaces, ending with a newline.
len :: Number of items in a list, string, dict, array, …
range :: Sequence of integers: range(stop) or range(start, stop, step); stop is excluded.
enumerate :: Gives (index, value) pairs while looping.
zip :: Walks several sequences in step, yielding tuples.
reversed :: Iterates a sequence backwards.
sorted :: Returns a new sorted list; key= chooses what to sort by, reverse=True for descending.
sum :: Adds up the items.
min :: Smallest item (or smallest of the arguments); key= customises.
max :: Largest item (or largest of the arguments); key= customises.
round :: Rounds to n decimal places (to even on exact halves).
int :: Converts to a whole number, or the integer type itself.
float :: Converts to a floating-point number, or the float type itself.
str :: Converts to text, or the string type itself.
bool :: Converts to True/False.
list :: Creates a list (ordered, changeable).
dict :: Creates a dictionary (key → value).
set :: Creates a set (unique items, no order).
tuple :: Creates a tuple (ordered, unchangeable).
type :: The type of a value.
isinstance :: Checks whether a value is of a given type.
open :: Opens a file: "r" read, "w" write, "a" append, "rb" binary. Use with with.
input :: Reads a line typed by the user.
map :: Applies a function to every item, lazily.
filter :: Keeps items for which a function returns true.
any :: True if any item is truthy.
all :: True if every item is truthy.
super :: Calls the parent class's version of a method.
__init__ :: The constructor: runs when an object is created, setting up its attributes.
__name__ :: The module's name; "__main__" when the file is run directly.
__file__ :: Path of the current Python file.

# Errors
ValueError :: Right type, wrong value, e.g. float("abc").
TypeError :: Wrong type for the operation, e.g. "a" + 1.
KeyError :: A dict key that doesn't exist.
IndexError :: A list index past the end.
FileNotFoundError :: The file or folder doesn't exist.

# String, list and dict methods
split :: Breaks a string into a list on a separator (whitespace by default).
join :: Joins a list of strings using the string as the separator: ",".join(parts).
strip :: Removes whitespace (or given characters) from both ends.
replace :: Returns a copy with every occurrence replaced.
find :: Index of a substring, or -1 if missing.
startswith :: True if the string begins with the given text.
endswith :: True if the string ends with the given text.
upper :: Upper-case copy of the string.
lower :: Lower-case copy of the string.
format :: Formats values into a string (older style than f-strings).
encode :: Text → bytes (UTF-8 by default).
decode :: Bytes → text (UTF-8 by default).
append :: Adds one item to the end of a list.
extend :: Adds every item of another sequence to a list.
insert :: Inserts an item at a position.
remove :: Removes the first matching value from a list.
pop :: Removes and returns an item (the last one by default).
index :: Position of the first matching value.
copy :: Returns a shallow copy.
sort :: Sorts a list in place (returns None).
reverse :: Reverses a list in place.
get :: Dict lookup with a default instead of a KeyError.
items :: Dict (key, value) pairs, for looping.
keys :: Dict keys.
values :: Dict values.
add :: Adds an item to a set.
Counter :: Dict that counts how often each item appears; most_common(n) gives the top n.
most_common :: The n most frequent items from a Counter.
defaultdict :: Dict that creates a default value (e.g. an empty list) for missing keys.

# Files and system
Path :: pathlib object for a file path; join parts with / and call methods like .exists().
pathlib :: Standard module for working with file paths as objects.
parent :: The folder containing a path.
stem :: File name without its extension.
suffix :: File extension, e.g. ".csv".
exists :: True if the path exists.
is_file :: True if the path is a file.
mkdir :: Creates a folder; parents=True makes missing parents, exist_ok=True ignores existing.
glob :: Finds paths matching a pattern like "*.csv" in a folder.
rglob :: Like glob, but searches all subfolders too.
with_suffix :: Same path with a different extension.
read_text :: Reads the whole file as a string.
write_text :: Writes a string to the file, replacing it.
home :: Your home folder.
readline :: Reads one line (from a file or serial port).
write :: Writes text/bytes to a file or port.
read :: Reads the whole file, or n bytes.
csv :: Standard module for reading and writing CSV files.
DictReader :: Reads CSV rows as dicts keyed by the header row.
writer :: Writes CSV rows from lists.
writerow :: Writes one CSV row.
writerows :: Writes many CSV rows.
json :: Standard module for JSON data.
loads :: Parses a JSON string into Python objects.
dumps :: Turns Python objects into a JSON string; indent= makes it readable.
sys :: Interpreter access: argv, exit, stderr.
argv :: Command-line arguments; argv[0] is the script name.
exit :: Stops the program with a status code (0 = success).
stderr :: The error output stream.
os :: Operating-system functions; os.environ holds environment variables.
environ :: The environment variables, as a dict.
subprocess :: Runs other programs; run([...], check=True) raises if they fail.
argparse :: Standard module for command-line options and --help.
ArgumentParser :: Defines the options your script accepts.
add_argument :: Declares one positional argument or --option.
parse_args :: Reads sys.argv and returns the parsed options.
time :: Standard time module: sleep, perf_counter, …
sleep :: Pauses for the given number of seconds.
perf_counter :: High-resolution clock for timing code.
datetime :: Date and time values; datetime.now() is the current time.
strftime :: Formats a date/time as text, e.g. "%Y-%m-%d".
serial :: pyserial: talks to serial (USB/UART) ports. Install with pip install pyserial.
Serial :: Opens a serial port: Serial(port, baudrate, timeout=…).
in_waiting :: Number of bytes received and waiting to be read.
reset_input_buffer :: Discards anything already received.
struct :: Packs and unpacks binary data, e.g. "<hH" = little-endian int16 + uint16.
unpack :: Turns bytes into numbers using a struct format.
dataclass :: Decorator that writes __init__ and __repr__ for a class of fields.
Enum :: Base class for a fixed set of named constants.
math :: Standard maths module: sqrt, pi, sin, log, …
pi :: π ≈ 3.14159.
pip :: Installs Python packages from PyPI.
conda :: Anaconda's package and environment manager.
venv :: Creates an isolated Python environment in a folder.
activate :: Switches the terminal to use an environment.

# NumPy
numpy :: The array library for numerical work; imported as np.
np :: The usual short name for NumPy (import numpy as np).
array :: Creates a NumPy array from a list.
arange :: Evenly stepped values: arange(start, stop, step); stop excluded.
linspace :: N evenly spaced points from start to stop, both included.
zeros :: Array filled with 0.
ones :: Array filled with 1.
shape :: Array dimensions, e.g. (rows, columns).
size :: Total number of elements.
reshape :: Same data with new dimensions; -1 means "work it out".
concatenate :: Joins arrays end to end.
column_stack :: Stacks 1-D arrays as columns of a 2-D array.
where :: Indices where a condition is true (or chooses between two values).
argmax :: Index of the largest value.
argmin :: Index of the smallest value.
mean :: Average.
std :: Standard deviation; ddof=1 for the sample estimate.
median :: Middle value.
ptp :: Peak-to-peak: max − min.
cumsum :: Running total.
diff :: Differences between neighbouring elements (one shorter).
gradient :: Numerical derivative, same length as the input.
trapezoid :: Area under a curve by the trapezoid rule (np.trapz before NumPy 2).
interp :: Linear interpolation at new x values.
convolve :: Convolution; with a box kernel it's a moving average.
polyfit :: Least-squares polynomial fit; degree 1 gives slope and intercept.
polyval :: Evaluates a polynomial from its coefficients.
clip :: Limits values to a range.
nanmean :: Mean that ignores NaN values.
isnan :: True where a value is NaN.
loadtxt :: Loads a numeric text/CSV file into an array.
genfromtxt :: Like loadtxt but handles missing values and named columns.
savetxt :: Saves an array to a text/CSV file.
save :: Saves an array to a binary .npy file.
load :: Loads a .npy/.npz file.
savez :: Saves several named arrays into one .npz file.
ravel :: Flattens to 1-D.
T :: Transpose: rows become columns.
abs :: Absolute value; works on numbers and on whole NumPy arrays.
exp :: e to the power x.
diag :: Diagonal of a matrix (or a matrix from a diagonal).
corrcoef :: Correlation coefficient matrix.

# pandas
pandas :: Table (DataFrame) library for labelled data; imported as pd.
pd :: The usual short name for pandas.
read_csv :: Loads a CSV file into a DataFrame.
read_excel :: Loads an Excel sheet into a DataFrame.
head :: First few rows.
info :: Column names, types and missing values.
describe :: Summary statistics for each column.
rename :: Renames columns (or index labels).
iloc :: Select rows/columns by position.
loc :: Select rows/columns by label or condition.
groupby :: Splits rows into groups by a column, to aggregate each group.
sort_values :: Sorts rows by a column.
to_numpy :: Converts to a NumPy array.
to_csv :: Saves to CSV; index=False omits the row numbers.
concat :: Stacks DataFrames together.

# matplotlib
plt :: The usual short name for matplotlib.pyplot.
matplotlib :: The plotting library.
pyplot :: matplotlib's plotting interface.
subplots :: Creates a figure and one or more axes: fig, ax = plt.subplots().
fig :: The figure: the whole window/image.
ax :: An axes: one plot area with its own x/y axes.
plot :: Draws lines (and/or markers).
scatter :: Draws points.
errorbar :: Points or lines with error bars.
hist :: Histogram.
imshow :: Shows a 2-D array as an image/heatmap.
colorbar :: Adds a colour scale for an image.
set_xlabel :: Sets the x-axis label.
set_ylabel :: Sets the y-axis label.
set_xlim :: Sets the x-axis range.
set_yscale :: Sets the y-axis scale, e.g. "log".
legend :: Shows the labels given to each plotted line.
twinx :: Second y-axis sharing the same x-axis.
annotate :: Adds a text label at a point.
grid :: Shows grid lines.
tight_layout :: Adjusts spacing so labels don't overlap.
savefig :: Saves the figure; dpi= for resolution, bbox_inches="tight" trims margins.
show :: Displays the figures on screen.
close :: Closes a figure to free memory (important inside loops).

# SciPy
scipy :: Scientific library: fitting, statistics, signal processing, file I/O.
optimize :: SciPy's fitting and optimisation module.
curve_fit :: Fits a model function to data; returns best parameters and their covariance.
stats :: SciPy statistics: tests, regressions, distributions.
linregress :: Straight-line fit with slope, intercept, r value and p value.
ttest_ind :: t-test for two independent groups.
ttest_rel :: Paired t-test (same samples measured twice).
signal :: SciPy signal processing: filters, peaks, smoothing.
find_peaks :: Finds local maxima; prominence= sets how much a peak must stand out.
savgol_filter :: Savitzky–Golay smoothing: window length, polynomial order.
butter :: Designs a Butterworth filter (order, normalised cutoff).
filtfilt :: Applies a filter forwards and backwards: no phase shift.
io :: SciPy file input/output, e.g. loadmat for MATLAB files.
loadmat :: Loads a MATLAB .mat file into a dict of arrays.
