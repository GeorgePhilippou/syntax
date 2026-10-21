---
name: MATLAB
symbol: M
order: 3
color: #edb491
version: R2021a+
highlight: matlab
description: Think in matrices. Build with numbers.
---

# Concepts

## Scripts and functions
@id concept-program
@kind concept
@keywords script function file workspace run m-file explain
@diff Scripts share the workspace; functions have their own.

MATLAB code lives in `.m` files, and there are two kinds.

- A **script** is a list of commands. Running it is like typing them into the Command Window: its variables appear in (and can overwrite) your workspace.
- A **function file** starts with `function` and has its own private workspace. Only its outputs come back. The file name must match the function name.

```matlab
% analyse.m — a script
data = readmatrix("run1.csv");
peak = findPeak(data(:, 2));      % call a function
fprintf("Peak: %.3f\n", peak);

function p = findPeak(signal)     % local function: must be at the END of a script
    p = max(signal);
end
```

Run a script by typing its name (`analyse`) or pressing **Run**. If MATLAB says a function is undefined, its file isn't in the current folder or on the path.

## What a function is
@id concept-function
@kind concept
@keywords function inputs outputs arguments call define explain
@diff [outputs] = name(inputs)

A function takes inputs, runs in its own workspace, and returns outputs.

The first line lists the outputs, the name and the inputs: `function [out1, out2] = name(in1, in2)`. MATLAB passes inputs **by value**: changing an input inside the function doesn't change the caller's variable. To change something, return the new version and assign it.

```matlab
function [m, s] = summarise(x)
    m = mean(x);
    s = std(x);
end

% calling it:
% [m, s] = summarise([9.8 10.1 10.0]);
% m = summarise(data);        % ask for fewer outputs if you like
```

## How outputs are returned
@id concept-return
@kind concept
@keywords return output value assign function result explain
@diff Assign to the output variable; return just exits early.

MATLAB has no `return value` statement. You **assign to the output variable** named in the `function` line, and whatever it holds when the function ends is returned.

`return` exists, but it only **exits early** — the outputs must already be set.

```matlab
function result = safeDivide(a, b)
    result = NaN;            % set a default first
    if b == 0
        return               % leave early; result is NaN
    end
    result = a / b;          % this value is returned
end
```

"Output argument 'result' not assigned" means some path through the function never set it.

## Everything is a matrix
@id concept-matrix
@kind concept
@keywords matrix array element-wise vectorise dimensions size explain
@diff Scalars are 1×1 matrices; operators are matrix maths.

MATLAB's basic type is the matrix: a single number is a 1×1 matrix, a row vector is 1×n, a column is n×1.

That's why `*` means matrix multiplication and `.*` means element-by-element. Most errors like "Incorrect dimensions for matrix multiplication" or "Arrays have incompatible sizes" mean a row was used where a column was expected (fix with `'` to transpose), or `*` was used where `.*` was meant.

```matlab
x = [1 2 3];        % 1×3 row
y = [4; 5; 6];      % 3×1 column
size(x), size(y)
x * y               % 32: (1×3)·(3×1) matrix product
x .* y'             % [4 10 18]: element-wise, after transposing y
x + y               % 3×3! implicit expansion of a row and a column
```

Check sizes with `size()` whenever a result looks surprising.

## One-based indexing
@id concept-indexing
@kind concept
@keywords index 1-based end column major linear indexing explain
@diff Indexes start at 1; storage is column by column.

Indexes start at **1**, not 0, and matrices are stored **column by column**.

Code ported from Python or C often has off-by-one errors: `x(0)` is an error, and the last element is `x(end)`. Linear indexing `A(k)` counts down the first column, then the next.

```matlab
A = [1 2 3; 4 5 6];
A(1, 1)       % 1 — first element
A(end, end)   % 6 — last element
A(2)          % 4 — linear index goes down columns first
A(:)'         % [1 4 2 5 3 6]
for k = 1:numel(A)   % loops start at 1
    disp(A(k))
end
```

# Basics

## Variables
@keywords assignment semicolon workspace clear who
@diff A trailing semicolon suppresses display.

Assign values; everything is a matrix.

```matlab
count = 3;            % semicolon hides the output
voltage = 2.5         % no semicolon: prints "voltage = 2.5000"
label = "sensor";
clear count           % remove a variable
whos                  % list variables with sizes and types
```

Numbers are `double` by default — even `3` is a 1×1 double matrix.

## Data types
@id types
@keywords double int32 uint8 logical char string class isa single
@diff double by default; integers saturate.

The common types.

```matlab
x = 2.5;              % double
n = int32(7);         % integer types: int8 … uint64
b = true;             % logical
c = 'chars';          % char row vector
s = "text";           % string scalar
class(n)              % 'int32'
isa(x, 'numeric')     % true
intmax('uint8')       % 255
uint8(300)            % 255 — integers saturate, not wrap
int32(7) / int32(2)   % 4 — integer division rounds
```

## Constants
@keywords pi eps Inf NaN constant
@diff Built-ins like pi; no const keyword.

Built-in constants, and naming your own.

```matlab
pi                    % 3.1416
exp(1)                % e
Inf, -Inf, NaN
eps                   % floating-point spacing at 1.0
1i                    % imaginary unit
MAX_ITER = 100;       % uppercase by convention; still reassignable
```

Avoid using `i`, `j` or `pi` as variable names — you'll shadow the built-ins.

## Operators
@keywords arithmetic element-wise .* ./ .^ comparison logical ~= && ||
@diff * is matrix multiply; .* is element-wise.

Matrix vs element-wise operators.

```matlab
a = [1 2 3];
b = [4 5 6];
a .* b          % [4 10 18] element-wise
a ./ b          % element-wise divide
a .^ 2          % [1 4 9]
a * b'          % 32 — matrix product (1×3 times 3×1)
a == b          % logical array
a ~= b          % not equal (not !=)
x = 5;
(x > 0) && (x < 10)   % short-circuit, scalars only
(a > 1) & (b < 6)     % element-wise logical
mod(-7, 3)            % 2  (rem(-7, 3) is -1)
```

There's no `+=` or `++`: write `x = x + 1`.

## Comments
@keywords comment block %{ %} help documentation
@diff % for comments; %{ %} on their own lines.

Leave notes and write help text.

```matlab
% A single-line comment

%{
A block comment.
The delimiters must be alone on their lines.
%}

x = 1;  % trailing comment
%% Section break (run sections with Ctrl+Enter)
```

Ctrl+R / Ctrl+T comment and uncomment selected lines in the editor.

## Printing output
@id print
@keywords disp fprintf display output console
@diff disp for quick output; fprintf for formatted.

Display values.

```matlab
x = 3;
disp(x)
disp("Value: " + x)          % string + number concatenates
fprintf("Value: %d\n", x)    % no automatic newline
x                            % omitting ; shows "x = 3"
```

## Formatting text
@id format
@keywords sprintf fprintf num2str format decimal places %d %f %s %g
@diff sprintf/fprintf use C-style format specs.

Build formatted strings.

```matlab
s = sprintf("%.2f", pi)            % "3.14"
sprintf("%5d|%-5d|", 42, 42)       % "   42|42   |"
sprintf("%05.1f", 3.14159)         % "003.1"
sprintf("%s has %d items", "box", 3)
num2str(pi, 4)                     % '3.142'
string(42)                         % "42"
compose("%d-%d", [1 2; 3 4])       % format each row
fprintf("%d\n", [1 2 3])           % format repeats: prints 3 lines
```

`fprintf` recycles the format string for every element of an array argument — handy for printing tables.

## Type conversion
@id convert
@keywords str2double num2str string double int32 cast convert parse
@diff str2double for text; type names convert numbers.

Convert between numbers and text.

```matlab
str2double("3.14")      % 3.1400 (NaN if invalid)
str2num('[1 2 3]')      % evaluates text — avoid with untrusted input
num2str(42)             % '42'
string(2.5)             % "2.5"
double('A')             % 65 — character code
int32(3.7)              % 4 — rounds, doesn't truncate
fix(3.7), floor(-3.7)   % 3 -4
logical([0 2])          % [0 1]
```

## Reading input
@id input
@keywords input prompt keyboard user
@diff input(prompt) evaluates; use "s" for text.

Ask the user for a value.

```matlab
n = input("Enter a number: ");
name = input("Your name: ", "s");   % "s" returns raw text
```

Without `"s"`, `input` evaluates what the user types as an expression.

# Strings

## Strings and char arrays
@id strings
@keywords string char double quotes single quotes concatenate strlength
@diff "string" vs 'char array' behave differently.

Two kinds of text.

```matlab
s = "hello";              % string scalar
c = 'hello';              % 1×5 char array
s + " world"              % "hello world"
[c ' world']              % 'hello world' — concatenate chars
strlength(s)              % 5
length(c)                 % 5
s == "hello"              % true
strcmp(c, 'hello')        % true — use for char arrays
c(1)                      % 'h'
```

`'abc' == 'abd'` compares element by element and errors on different lengths. Use `strcmp`.

## String functions
@id string-methods
@keywords split join strtrim replace upper lower contains startsWith extractBetween strsplit
@diff Functions, not methods.

Common text operations.

```matlab
s = "  Hello, World  ";
strtrim(s)                     % "Hello, World"
upper(s), lower(s)
replace(s, "World", "MATLAB")
split("a,b,c", ",")            % 3×1 string array
join(["a" "b" "c"], "-")       % "a-b-c"
contains(s, "World")           % true
startsWith("report.csv", "rep")
endsWith("report.csv", ".csv")
strfind('hello', 'l')          % [3 4]
extractBetween("[42]", "[", "]")  % "42"
```

## Substrings
@id slicing
@keywords substring extract part index characters extractAfter
@diff Index char arrays with (); 1-based, inclusive.

Take part of some text.

```matlab
c = 'abcdef';
c(1:3)                 % 'abc'
c(end-1:end)           % 'ef'
c(end:-1:1)            % 'fedcba'
s = "abcdef";
extractAfter(s, 2)     % "cdef"
extractBefore(s, 4)    % "abc"
char(s)                % convert to char to index characters
```

Indexing a string scalar `s(1)` returns the whole string — convert with `char` first.

# Control flow

## If / else
@id if
@keywords conditional elseif else end branch
@diff elseif is one word; end closes the block.

Choose a branch using a condition.

```matlab
temperature = 25;
if temperature > 30
    disp("Hot")
elseif temperature > 20
    disp("Warm")
else
    disp("Cool")
end
```

`if` on an array is true only if **all** elements are nonzero. Use `any` or `all` to be explicit.

## For loop
@id for
@keywords for loop range colon step iteration
@diff for i = 1:n; the range includes n.

Loop over a range.

```matlab
for i = 1:5            % 1 2 3 4 5 — inclusive
    disp(i)
end

for i = 10:-2:1        % 10 8 6 4 2
    disp(i)
end

for x = [3 7 11]       % any row vector
    disp(x)
end
```

Changing `i` inside the loop doesn't affect the next iteration.

## While loop
@id while
@keywords while loop repeat condition
@diff while cond … end; no do-while.

Repeat while a condition holds.

```matlab
count = 0;
while count < 3
    count = count + 1;
end
```

Press Ctrl+C in the Command Window to stop a runaway loop.

## Break and continue
@id loop-control
@keywords break continue return exit loop skip
@diff break and continue, as in C.

Leave a loop early or skip an iteration.

```matlab
for n = 1:10
    if mod(n, 2) == 0
        continue
    end
    if n > 7
        break
    end
    disp(n)          % 1 3 5 7
end
```

## Switch
@id switch
@keywords switch case otherwise multiple values strings
@diff otherwise is the default; no fall-through; strings allowed.

Select one of several cases.

```matlab
mode = "fast";
switch mode
    case "slow"
        disp("Taking it easy")
    case {"fast", "turbo"}       % several values in a cell array
        disp("Going quickly")
    otherwise
        disp("Unknown mode")
end
```

No `break` needed: only the first matching case runs.

# Functions

## Functions
@id function
@keywords function file end output arguments local function
@diff Outputs before the name; one main function per file.

Define a function in a file or at the end of a script.

```matlab
function result = add(a, b)
    result = a + b;
end
```

Save as `add.m` (file name must match) or place at the **end** of a script file as a local function. Call with `add(2, 3)`.

## Multiple outputs
@id multiple-return
@keywords multiple outputs return values nargout tilde ignore
@diff [a, b] = f(); use ~ to ignore an output.

Return several values.

```matlab
[lo, hi] = minMax([3 1 4]);
[~, hi] = minMax([3 1 4]);   % ignore the first output
[m, idx] = max([3 9 4]);     % many built-ins return extras: idx = 2

function [low, high] = minMax(values)   % local functions go at the end of a script
    low = min(values);
    high = max(values);
end
```

## Default arguments
@id default-args
@keywords arguments block default nargin optional validation
@diff arguments block (R2019b+) or nargin checks.

Optional inputs with validation.

```matlab
function out = scale(x, factor, options)
    arguments
        x double
        factor (1,1) double = 2
        options.Offset (1,1) double = 0     % name-value: scale(x, Offset=1)
    end
    out = x * factor + options.Offset;
end
```

Older code checks `nargin`: `if nargin < 2, factor = 2; end`.

## Anonymous functions
@id lambda
@keywords anonymous function handle @ lambda callback fzero integral
@diff f = @(x) expression

Write a one-line function and pass functions around.

```matlab
square = @(x) x.^2;
square(3)                     % 9
square([1 2 3])               % [1 4 9] — use .^ so it vectorises
k = 3;
scaleBy = @(x) k * x;         % captures k's value now
f = @sin;                     % handle to a named function
integral(square, 0, 1)        % 0.3333
fzero(@(x) x.^2 - 2, 1)       % 1.4142
```

## Scope and workspaces
@id scope
@keywords workspace local global persistent script function
@diff Each function has its own workspace.

Where variables live.

```matlab
function n = nextId()
    persistent counter       % keeps its value between calls
    if isempty(counter)
        counter = 0;
    end
    counter = counter + 1;
    n = counter;
end
```

Scripts share the base workspace; functions don't. Avoid `global`.

# Matrices

## Creating arrays
@id array
@keywords array matrix vector zeros ones eye rand linspace colon create
@diff [1 2 3] row, [1; 2; 3] column.

Build vectors and matrices.

```matlab
row = [1 2 3];              % 1×3
col = [1; 2; 3];            % 3×1
M = [1 2; 3 4];             % 2×2
z = zeros(2, 3);
o = ones(3);                % 3×3
I = eye(3);                 % identity
r = rand(2);                % uniform [0,1)
v = 0:0.25:1;               % [0 .25 .5 .75 1]
l = linspace(0, 1, 5);      % 5 points, both ends included
rep = repmat([1 2], 2, 2);  % tile
```

## Indexing
@id indexing
@keywords index end colon row column element 1-based linear
@diff 1-based; parentheses; end is the last index.

Get and set elements, rows and columns.

```matlab
M = magic(4);
M(2, 3)          % row 2, column 3
M(1, :)          % first row
M(:, end)        % last column
M(2:3, [1 4])    % rows 2–3, columns 1 and 4
M(5)             % linear index (column-major order)
M(:)             % all elements as a column
M(1, :) = [];    % delete a row
v = [10 20 30];
v(end + 1) = 40; % append
```

Indexing starts at **1**. `v(0)` is an error.

## Logical indexing
@id logical-indexing
@keywords logical mask filter find condition select replace
@diff Index with a logical mask.

Select or change elements that meet a condition.

```matlab
v = [4 -1 7 0 -3];
v(v < 0)            % [-1 -3]
v(v < 0) = 0;       % clamp negatives to 0
idx = find(v > 3)   % positions: [1 3]
any(v > 5)          % true
all(v >= 0)         % true
nnz(v)              % count of nonzeros
```

## Array operations
@id array-ops
@keywords size numel length append concatenate reshape transpose sum mean dimension
@diff Size functions; operations along a dimension.

Size, reshape and summarise.

```matlab
A = [1 2 3; 4 5 6];
size(A)              % [2 3]
[rows, cols] = size(A);
numel(A)             % 6
length(A)            % 3 — largest dimension (avoid for matrices)
A'                   % transpose
reshape(A, 3, 2)     % column-major reshape
[A; 7 8 9]           % add a row
[A, [0; 0]]          % add a column
sum(A)               % [5 7 9] — sums each column
sum(A, 2)            % [6; 15] — sums each row
sum(A, "all")        % 21
mean(A(:)), max(A, [], 2)
isempty([])          % true
```

Most functions work down columns (dimension 1) by default.

## Iterating
@id iterate
@keywords loop over array elements rows columns for each
@diff for iterates over columns, not elements.

Loop over elements, rows or columns.

```matlab
v = [10 20 30];
for value = v              % row vector: one element at a time
    disp(value)
end

M = [1 2; 3 4];
for k = 1:size(M, 1)       % each row
    row = M(k, :);
    disp(row)
end

for k = 1:numel(v)         % with an index
    fprintf("%d: %d\n", k, v(k));
end
```

`for x = M` gives one **column** per iteration. Pass a row vector, or loop over indices.

## Vectorisation
@id transform
@keywords vectorise arrayfun cellfun map apply element-wise cumsum
@diff Operate on whole arrays instead of looping.

Replace loops with array operations.

```matlab
x = linspace(0, 2*pi, 100);
y = sin(x) .* exp(-x);           % no loop needed
total = sum(x(x > 1));
running = cumsum([1 2 3]);       % [1 3 6]
d = diff([1 4 9]);               % [3 5]
lens = cellfun(@length, {'a', 'bcd'})       % [1 3]
names = cellfun(@upper, {'a', 'b'}, 'UniformOutput', false)
sq = arrayfun(@(k) k^2, 1:4)     % [1 4 9 16]
```

Use `'UniformOutput', false` when the function returns non-scalars; the result is then a cell array.

## Sorting and searching
@id sort
@keywords sort descend unique ismember max min find sortrows
@diff sort returns values and indices.

Sort, find and deduplicate.

```matlab
v = [3 1 2 3];
sorted = sort(v);                  % [1 2 3 3]
[s, idx] = sort(v, "descend");     % idx gives original positions
u = unique(v);                     % [1 2 3]
[tf, loc] = ismember(2, v);        % true, 3
[m, where] = max(v);               % 3, 1
M = [3 1; 1 2; 2 9];
sortrows(M, 2)                     % sort rows by column 2
```

## Linear algebra
@id linear-algebra
@keywords matrix solve inverse backslash det eig transpose dot cross norm
@diff A\b solves linear systems.

Solve and decompose matrices.

```matlab
A = [2 1; 1 3];
b = [3; 5];
x = A \ b            % solves A*x = b (better than inv(A)*b)
det(A)
inv(A)
[V, D] = eig(A);     % eigenvectors and eigenvalues
norm(b)
dot([1 2 3], [4 5 6])
cross([1 0 0], [0 1 0])
rank(A)
```

# Structures

## Cell arrays
@id cell
@keywords cell array braces {} mixed types list of strings
@diff {} holds mixed types; c{i} gets contents.

Store values of different types or sizes.

```matlab
c = {42, "text", [1 2 3]};
c{2}              % "text" — the contents
c(2)              % a 1×1 cell containing "text"
c{end + 1} = 'more';
numel(c)
names = {'Ada', 'Alan'};
for k = 1:numel(names)
    disp(names{k})
end
```

Braces `{}` get the contents; parentheses `()` get a smaller cell array.

## Structs
@id struct
@keywords struct fields dot dynamic fieldnames isfield rmfield
@diff Dot notation; fields can be added on the fly.

Group values under named fields.

```matlab
s.id = 1;
s.value = 2.5;
s.tags = {"a", "b"};
t = struct("id", 2, "value", 3.0);
field = "value";
s.(field)                  % dynamic field name
fieldnames(s)
isfield(s, "id")           % true
people(1).name = "Ada";    % struct array
people(2).name = "Alan";
{people.name}              % collect a field
```

`struct("tags", {{"a", "b"}})` needs double braces — a single cell creates a struct array.

## Dictionaries and maps
@id dict
@keywords dictionary containers.Map key value lookup isKey
@diff dictionary (R2022b+) or containers.Map.

Look values up by key.

```matlab
ages = dictionary(["ada" "alan"], [36 41]);   % R2022b+
ages("ada")                  % 36
ages("grace") = 85;
isKey(ages, "bob")           % false
keys(ages)

m = containers.Map();        % works in older releases
m('ada') = 36;
if isKey(m, 'ada')
    disp(m('ada'))
end
```

## Tables
@id table
@keywords table readtable column variable rows filter summary
@diff Column-oriented data with named variables.

Spreadsheet-like data with named columns.

```matlab
T = table(["Ada"; "Alan"], [36; 41], 'VariableNames', {'Name', 'Age'});
T.Age                       % a column
T(T.Age > 40, :)            % filter rows
T.Senior = T.Age > 40;      % add a column
T = sortrows(T, "Age", "descend");
height(T), width(T)
summary(T)
```

# Errors

## Error handling
@id errors
@keywords try catch error MException rethrow identifier warning
@diff try/catch; error(id, msg) to raise.

Raise and catch errors.

```matlab
try
    x = [1 2 3];
    y = x(5);
catch err
    disp(err.identifier)    % 'MATLAB:badsubscript'
    disp(err.message)
end

function checkPositive(v)
    if v <= 0
        error("myTool:notPositive", "Value must be positive, got %g", v);
    end
end
```

`warning("...")` prints a message but keeps running.

## Assertions and validation
@id assert
@keywords assert validateattributes mustBePositive check input
@diff assert(cond, msg) or arguments validators.

Check assumptions and inputs.

```matlab
x = 5;
assert(x > 0, "x must be positive")
validateattributes(x, {'numeric'}, {'scalar', 'positive'})

function y = halve(x)
    arguments
        x (1,:) double {mustBeNonnegative}
    end
    y = x / 2;
end
```

# Files & data

## Reading files
@id read-file
@keywords readmatrix readtable fileread load textscan csv read file lines
@diff readmatrix/readtable for data; fileread for text.

Load data and text.

```matlab
M = readmatrix("data.csv");          % numbers only
T = readtable("data.csv");           % mixed types, header row
txt = fileread("notes.txt");         % whole file as char
lines = readlines("notes.txt");      % string array (R2020b+)
S = load("results.mat");             % struct of saved variables
```

## Writing files
@id write-file
@keywords writematrix writetable save fprintf fopen write file
@diff writematrix/writetable; save for .mat files.

Save data and text.

```matlab
writematrix(magic(3), "out.csv");
writetable(T, "people.csv");
save("results.mat", "M", "T");     % named variables
writelines(["a" "b"], "out.txt");  % R2022a+

fid = fopen("log.txt", "a");       % low-level, "w" to overwrite
fprintf(fid, "%s\n", "started");
fclose(fid);
```

## Paths and folders
@id paths
@keywords fullfile fileparts dir exist mkdir pwd cd path addpath
@diff fullfile joins; dir lists.

Work with files and folders.

```matlab
p = fullfile("data", "run1", "out.csv");
[folder, name, ext] = fileparts(p);
files = dir(fullfile("data", "*.csv"));
for k = 1:numel(files)
    disp(fullfile(files(k).folder, files(k).name))
end
exist("out.csv", "file")      % 2 if it exists
if ~isfolder("results"), mkdir("results"); end
addpath("utils")              % make functions in utils/ callable
```

## Packages and imports
@id imports
@keywords import package namespace addpath toolbox
@diff Functions on the path need no import.

Access functions from packages and folders.

```matlab
addpath(genpath("lib"))           % add lib/ and subfolders to the path
import matlab.lang.makeValidName
makeValidName("sensor value")     % 'sensorValue'
ver                               % installed toolboxes
which plot                        % where a function comes from
```

Any function file on the path is callable directly. `import` only shortens package names.

# Plotting

## Line plots
@id plot
@keywords plot figure xlabel ylabel title legend grid hold on subplot axis
@diff plot(x, y) plus labelling functions.

Plot and label data.

```matlab
x = linspace(0, 2*pi, 200);
figure
plot(x, sin(x), "b-", "LineWidth", 1.5)
hold on
plot(x, cos(x), "r--")
hold off
xlabel("x (rad)")
ylabel("amplitude")
title("Sine and cosine")
legend("sin", "cos", "Location", "best")
grid on
xlim([0 2*pi])
```

Line specs: colours `r g b k m c`, styles `- -- : -.`, markers `o x + * s .`.

## Subplots and other charts
@id subplot
@keywords subplot tiledlayout scatter bar histogram surf exportgraphics save figure
@diff tiledlayout/nexttile for grids of plots.

Several plots in one figure, and saving them.

```matlab
tiledlayout(2, 2)
nexttile; scatter(rand(1, 50), rand(1, 50), "filled")
nexttile; bar([3 5 2])
nexttile; histogram(randn(1, 1000), 30)
nexttile
[X, Y] = meshgrid(-2:0.1:2);
surf(X, Y, X .* exp(-X.^2 - Y.^2))
exportgraphics(gcf, "figure.png", "Resolution", 300)
```

# Utilities

## Math functions
@id math
@keywords sqrt abs round floor ceil exp log mod rem trig deg2rad
@diff Built-in functions work element-wise.

Common maths (all vectorised).

```matlab
sqrt(2), abs(-3), exp(1), log(10), log10(100)
round(2.5)          % 3 — rounds half away from zero
round(pi, 2)        % 3.14
floor(2.7), ceil(2.1), fix(-2.7)   % 2 3 -2
mod(7, 3), rem(-7, 3)              % 1 -1
sind(30)            % degrees: 0.5
deg2rad(180)
hypot(3, 4)         % 5
```

## Random numbers
@id random
@keywords rand randi randn rng seed randperm
@diff rand, randi, randn; rng to seed.

Random values.

```matlab
rng(42)                 % reproducible
rand                    % uniform [0, 1)
rand(2, 3)              % matrix
randi(6)                % 1..6
randi([10 20], 1, 5)    % five values in 10..20
randn(1, 100)           % normal distribution
randperm(5)             % shuffled 1..5
```

## Timing
@id time
@keywords tic toc pause timeit datetime now elapsed
@diff tic/toc for timing; pause(seconds).

Measure time and wait.

```matlab
tic
pause(0.5)              % wait half a second
elapsed = toc           % seconds since tic

t = datetime("now");
t.Format = "yyyy-MM-dd HH:mm";
string(t)               % "2026-10-21 14:30"
t + days(7)
```
