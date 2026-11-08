# Hover explanations for MATLAB code: term :: one-line explanation.

# Language
function :: Starts a function: function [out1, out2] = name(in1, in2) … end.
end :: Closes a block (if, for, while, function, …). Inside an index it means "last element".
if :: Runs the block when the condition is true (all elements non-zero for arrays).
elseif :: Checked only when the earlier conditions were false.
else :: Runs when no earlier condition matched.
for :: Loops over the columns of a range or array: for k = 1:n.
while :: Repeats while the condition is true.
switch :: Chooses a case by matching a value; no fall-through, no break needed.
case :: One branch of a switch; {a, b} matches either.
otherwise :: The switch branch used when no case matches.
break :: Leaves the loop immediately.
continue :: Skips to the next loop iteration.
return :: Leaves the function early; outputs are whatever is assigned so far.
try :: Starts a block whose errors can be caught.
catch :: Handles an error from the try block; catch err gives you the error object.
arguments :: Argument validation block at the top of a function (R2019b+): types, sizes, defaults.
nargin :: Number of input arguments the caller actually passed.
nargout :: Number of outputs the caller asked for.
true :: Logical 1.
false :: Logical 0.
pi :: π ≈ 3.14159.
Inf :: Infinity.
NaN :: Not-a-Number, e.g. 0/0; use isnan to test for it.
eps :: Spacing of doubles near 1 (≈ 2.2e-16): the precision limit.
ans :: Holds the result of the last expression not assigned to a variable.

# Operators
.* :: Element-wise multiply.
./ :: Element-wise divide.
.^ :: Element-wise power.
* :: Matrix multiply (for scalars, ordinary multiply).
^ :: Matrix power (for scalars, ordinary power).
\ :: Solves linear systems: A \ b solves A·x = b.
' :: Transpose (complex conjugate transpose). .' transposes without conjugating.
~= :: Not equal.
== :: Equal (element-wise for arrays).
~ :: Logical NOT; as an output, [~, i] ignores that output.
&& :: Logical AND for scalars, stops early.
|| :: Logical OR for scalars, stops early.
& :: Element-wise logical AND for arrays.
| :: Element-wise logical OR for arrays.
: :: Colon: a:b:c makes a range; x(:) takes all elements as a column; M(:, 1) means every row.
@ :: Makes a function handle: @sin, or an anonymous function @(x) 2*x.

# Workspace and display
disp :: Displays a value without its name.
fprintf :: Prints formatted text: fprintf('%.3f\n', x). With a file id, writes to that file.
sprintf :: Formats text into a char array instead of printing it.
num2str :: Converts a number to text.
str2double :: Converts text to a number (NaN if it can't).
string :: Converts to a string ("double-quoted" text type).
char :: Character array ('single-quoted' text).
class :: The type of a variable, e.g. 'double'.
isa :: True if a variable is of the given type.
double :: 64-bit floating point — MATLAB's default numeric type.
int16 :: Signed 16-bit integer type; values saturate instead of wrapping.
uint16 :: Unsigned 16-bit integer type (0–65,535).
int32 :: Signed 32-bit integer type.
clear :: Removes variables from the workspace.
clearvars :: Removes variables, with options to keep some.
whos :: Lists variables with sizes and types.
deal :: Copies inputs to several outputs: [a, b] = deal(1, 2).

# Arrays
zeros :: Array of zeros: zeros(rows, cols).
ones :: Array of ones.
linspace :: N evenly spaced points from start to end, both included.
numel :: Number of elements.
size :: Dimensions: size(M) gives [rows cols]; size(M, 1) gives rows.
length :: Largest dimension — prefer numel or size.
reshape :: Same data in new dimensions; [] means "work it out".
flip :: Reverses order.
find :: Indices where a condition is true; find(x, 1) gives the first.
isempty :: True if the array has no elements.
any :: True if any element is non-zero.
all :: True if every element is non-zero.
sort :: Sorts; [s, i] = sort(x) also gives the original positions.
sortrows :: Sorts the rows of a matrix or table by a column.
unique :: Unique values, sorted.
ismember :: True where elements are found in another set.
nnz :: Number of non-zero (true) elements — handy for counting matches.
max :: Largest value; [m, i] = max(x) also gives its index.
min :: Smallest value; [m, i] = min(x) also gives its index.
sum :: Sum (down each column by default).
cumsum :: Running total.
mean :: Average (down each column by default); 'omitnan' skips NaN.
median :: Middle value.
std :: Standard deviation.
abs :: Absolute value.
round :: Rounds to nearest; round(x, n) to n decimal places.
floor :: Rounds down.
ceil :: Rounds up.
fix :: Rounds toward zero.
mod :: Remainder, with the sign of the divisor.
rem :: Remainder, with the sign of the dividend.
diff :: Differences between neighbouring elements.
gradient :: Numerical derivative, same length as the input.
trapz :: Area under a curve by the trapezoid rule: trapz(x, y).
interp1 :: 1-D interpolation at new points.
movmean :: Moving average over a window.
polyfit :: Least-squares polynomial fit; degree 1 gives [slope intercept].
polyval :: Evaluates a polynomial from its coefficients.
isnan :: True where a value is NaN.
exp :: e to the power x.
sin :: Sine (radians).
sqrt :: Square root.
corrcoef :: Correlation coefficient matrix.

# Text
strlength :: Number of characters in each string.
split :: Splits text at a delimiter.
strjoin :: Joins text pieces with a delimiter.
strtrim :: Removes leading and trailing whitespace.
replace :: Replaces every occurrence of some text.
contains :: True if the text contains a pattern.
startsWith :: True if the text begins with a pattern.
endsWith :: True if the text ends with a pattern.
strcmp :: True if two texts are exactly equal (works for chars and strings).
upper :: Upper case.
lower :: Lower case.
extractBetween :: Text between two positions or markers.
regexp :: Regular-expression matching; 'tokens' returns the captured groups.

# Cells, structs, maps, tables
cellfun :: Applies a function to every cell; 'UniformOutput', false when results vary in size.
struct :: Creates a structure with named fields.
isfield :: True if a struct has a field.
fieldnames :: List of a struct's field names.
rmfield :: Removes a field from a struct.
dictionary :: Key–value lookup (R2022b+).
isKey :: True if a dictionary/map contains a key.
containers :: Package holding Map, the older key–value type.
Map :: containers.Map: key–value lookup (pre-R2022b).
keys :: All keys of a map/dictionary.
values :: All values of a map/dictionary.
readtable :: Loads a CSV/Excel file into a table with named columns.
head :: First rows of a table.
summary :: Summary of each table variable.
renamevars :: Renames table variables (columns).
groupsummary :: Group statistics, e.g. mean of one column per group.
writetable :: Saves a table to CSV/Excel.

# Files
readmatrix :: Loads numeric data from CSV/Excel into a matrix.
writematrix :: Saves a matrix to CSV/Excel.
load :: Loads variables from a .mat file (or a numeric text file).
save :: Saves variables to a .mat file.
fullfile :: Joins folder and file names with the right separator.
dir :: Lists files matching a pattern; ** searches subfolders.
fileparts :: Splits a path into folder, name and extension.
isfile :: True if the file exists.
isfolder :: True if the folder exists.
mkdir :: Creates a folder.
mfilename :: Name/path of the current file; 'fullpath' gives the full path.
addpath :: Adds folders to the search path so their functions can be called.
genpath :: A folder plus all its subfolders, for addpath.
readlines :: Reads a text file into a string array, one line each.
fileread :: Reads a whole text file as one char array.
writelines :: Writes a string array to a text file, one line each.
fopen :: Opens a file and returns an id; 'w' write, 'a' append, 'r' read.
fclose :: Closes a file opened with fopen.

# Errors
error :: Throws an error with a formatted message, stopping the function.
warning :: Prints a warning and continues.
assert :: Throws an error if the condition is false.
validateattributes :: Checks a value's type and properties, with a clear error.
dbstop :: Sets a breakpoint; dbstop if error pauses where an error happens.
message :: The error text inside a caught error object.

# Figures
figure :: Opens a new figure window.
plot :: Draws lines/markers; name-value pairs set colour, width, label.
hold :: hold on keeps existing plots when adding new ones.
xlabel :: Sets the x-axis label.
ylabel :: Sets the y-axis label.
legend :: Shows labels from 'DisplayName'; 'Location', 'best' places it.
grid :: grid on shows grid lines.
box :: box on draws the full axes outline.
scatter :: Draws points.
errorbar :: Data points with error bars.
xlim :: Sets the x-axis range.
ylim :: Sets the y-axis range.
set :: Changes a graphics property: set(gca, 'YScale', 'log').
gca :: The current axes.
gcf :: The current figure.
yyaxis :: Switches to the left or right y-axis for a two-axis plot.
tiledlayout :: Grid of plots; use nexttile to move to the next.
nexttile :: Moves to the next tile in a tiledlayout.
histogram :: Histogram with a given number of bins.
imagesc :: Shows a matrix as a colour-scaled image.
colorbar :: Adds a colour scale.
text :: Writes text at a data point.
exportgraphics :: Saves a figure tightly cropped; 'ContentType', 'vector' for papers.
close :: Closes figures; close all closes every one.

# Fitting and signals
lsqcurvefit :: Nonlinear least-squares fit of a model to data (Optimization Toolbox).
fitlm :: Linear regression model with statistics (Rsquared, p-values).
fit :: Curve Fitting Toolbox fit with a named model such as 'exp1'.
ttest :: Paired / one-sample t-test; returns h (reject?) and p.
ttest2 :: Two-sample t-test for independent groups.
findpeaks :: Finds local maxima; 'MinPeakProminence' filters small bumps.
smoothdata :: Smooths data, e.g. with a moving average or Savitzky–Golay.
butter :: Designs a Butterworth filter (order, normalised cutoff).
filtfilt :: Applies a filter forwards and backwards: no phase shift.
