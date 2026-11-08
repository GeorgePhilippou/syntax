---
name: MATLAB
symbol: M
order: 3
color: #ee5f2f
on: light
version: R2021a+
highlight: matlab
layout: sheet
description: Matrices, analysis and figures.
---

# Basics

## Variables and numbers
@id variables
@keywords variable assign double int class type convert semicolon number operators
- Assign (quiet) :: x = 3.3;
- Assign (prints) :: x = 3.3
- Several outputs :: [a, b] = deal(1, 2);
- Check type :: class(x); isa(x, 'double')
- Convert :: str2double("42"); num2str(7); double(int16(5))
- Integer types :: uint16(4095); int32(-5)
- Round :: round(x, 3); floor(x); ceil(x); fix(x)
- Remainder :: mod(7, 2); rem(-7, 2)
- Power :: 2^10
- Scientific :: 1e-6
- Constants :: pi; Inf; NaN; eps
- Increment :: i = i + 1;
- Clear / list :: clear x; clearvars; whos
> Everything is a double matrix unless you say otherwise; a scalar is 1×1.

## Printing and formatting
@id printing-output
@keywords fprintf sprintf disp format decimal places scientific newline string
- Show a value :: disp(x)
- Formatted :: fprintf('V = %.3f V\n', v);
- Scientific :: fprintf('%.2e\n', i);
- Integer / string :: fprintf('%d runs in %s\n', n, name);
- Width and align :: fprintf('%-10s%8.2f\n', name, v);
- Vector, one per line :: fprintf('%g\n', x);
- Table of two columns :: fprintf('%.3f, %.3e\n', [t(:) v(:)]');
- Into a string :: s = sprintf('run_%03d.csv', k);
- Newer string style :: s = "V = " + string(v);
- Number to text :: num2str(x, 4)
> Single quotes make a char array; double quotes make a string. fprintf needs \n.

## Strings
@id strings
@keywords string char split join strip replace contains find substring upper lower strcmp
- Length :: strlength(s); length(c)
- Join strings :: s = "run" + 1; c = ['run' '1'];
- Split :: parts = split(s, ",");
- Join :: strjoin(parts, ",")
- Strip :: strtrim(s)
- Replace :: replace(s, "old", "new")
- Contains :: contains(s, "mV")
- Starts / ends :: startsWith(s, "#"); endsWith(f, ".csv")
- Equal :: strcmp(a, b); a == b    % == only for string type
- Case :: upper(s); lower(s)
- Substring :: extractBetween(s, 2, 5); c(2:5)
- Number from text :: str2double(s)
- Regex :: tokens = regexp(s, '(\d+)mV', 'tokens');

## Conditionals
@id if-else
@keywords if elseif else end switch case otherwise logical and or not
```matlab If / elseif / else
if v > 1.0
    state = "high";
elseif v < 0
    state = "negative";
else
    state = "ok";
end
```
```matlab Switch
switch mode
    case "cv"
        runCV();
    case {"lsv", "dpv"}
        runSweep();
    otherwise
        error("unknown mode %s", mode);
end
```
- Logic (scalars) :: a && b; a || b; ~a
- Logic (arrays) :: x > 0 & x < 1; x < 0 | x > 1
- Not equal :: a ~= b
- Empty check :: if isempty(x)
- Any / all :: any(x < 0); all(x > 0)
> Switch cases don't fall through: no break needed.

## Loops
@id for-loop
@keywords for while end break continue loop iterate range numel
- Count :: for k = 1:10
- Step :: for v = 0:0.1:1
- Down :: for k = 10:-1:1
- Over elements :: for k = 1:numel(x)
- While :: while ~done
- Skip / stop :: continue; break
- Close a block :: end
```matlab Preallocate, then fill
y = zeros(1, n);
for k = 1:n
    y(k) = f(x(k));
end
```
> Prefer vectorised maths (y = f(x)) over loops; preallocate if you must loop.

## Functions
@id functions
@keywords function end output arguments nargin default anonymous handle local file
```matlab Function file area.m
function A = area(r, scale)
    if nargin < 2
        scale = 1;
    end
    A = scale * pi * r.^2;
end
```
```matlab Several outputs
function [m, s] = stats(x)
    m = mean(x);
    s = std(x);
end
```
- Call :: A = area(2);
- Take both outputs :: [m, s] = stats(data);
- Ignore an output :: [~, i] = max(x);
- Anonymous function :: f = @(x) 2*x + 1;
- Function handle :: g = @sin; g(pi/2)
```matlab Named arguments (R2019b+)
function y = scaleData(x, opts)
    arguments
        x double
        opts.Gain (1,1) double = 1
    end
    y = x * opts.Gain;
end
```
> A file's first function must match its file name; local functions go below it (or at the end of a script).

## Errors
@id exceptions
@keywords try catch error warning assert validate exception message
```matlab Try / catch
try
    data = readmatrix(file);
catch err
    warning("Skipping %s: %s", file, err.message);
end
```
- Raise :: error("Bad voltage: %g", v);
- Warn :: warning("Noisy run %d", k);
- Assert :: assert(numel(t) == numel(v), "length mismatch");
- Validate :: validateattributes(x, {'numeric'}, {'positive'});
- Stop in debugger on error :: dbstop if error

# Arrays

## Creating arrays
@id numpy-arrays
@keywords array vector matrix zeros ones linspace colon size numel length reshape concatenate
- Row vector :: x = [1 2 3];
- Column vector :: x = [1; 2; 3];
- Matrix :: M = [1 2; 3 4];
- Range :: x = 0:0.01:1;
- N points :: v = linspace(-0.5, 0.8, 131);
- Zeros / ones :: zeros(1, 100); ones(3, 4)
- Size :: size(M); size(M, 1); numel(M)
- Transpose :: x'
- Join side by side :: [a, b]
- Stack :: [a; b]
- Reshape :: reshape(x, 2, [])
- As a column :: x(:)
> Most functions work column by column: mean(M) gives one value per column.

## Indexing
@id slicing
@keywords index slice end first last logical mask find colon row column
- First / last :: x(1); x(end)
- Range :: x(2:5)    % 2, 3, 4, 5
- Last n :: x(end-2:end)
- Every other :: x(1:2:end)
- Reverse :: flip(x)
- Element of matrix :: M(2, 3)
- Whole row / column :: M(2, :); M(:, 1)
- Mask :: x(x > 0.5)
- Indices where true :: idx = find(v > 0.2);
- First match :: k = find(v > 0.2, 1);
- Nearest value :: [~, k] = min(abs(v - 0.3));
- Delete elements :: x(x < 0) = [];
> 1-based and end-inclusive: MATLAB x(2:5) is Python x[1:5].

## Element-wise maths
@id numpy-maths
@keywords elementwise times power dot operator mean std sum cumsum diff gradient trapz interp polyfit nan
- Multiply / divide :: a .* b; a ./ b
- Power :: x.^2
- Matrix multiply :: A * B
- Solve Ax = b :: x = A \ b;
- Stats :: mean(x); std(x); median(x)
- Min / max with index :: [m, k] = max(i);
- Sum / running sum :: sum(x); cumsum(x)
- Difference / slope :: diff(x); gradient(i, v)
- Integrate :: trapz(t, i)
- Interpolate :: interp1(x, y, xq)
- Moving average :: movmean(x, 5)
- Line fit :: p = polyfit(x, y, 1);
- Evaluate polynomial :: polyval(p, x)
- Ignore NaN :: mean(x, 'omitnan'); isnan(x)
> * is a matrix product. For element-by-element maths always use .* ./ .^

## Sorting and searching
@id sorting
@keywords sort sortrows unique ismember find max min order descend
- Sort :: [s, order] = sort(x);
- Descending :: sort(x, 'descend')
- Sort table / matrix by column :: sortrows(T, 'time')
- Unique values :: unique(x)
- Is in list :: ismember(5, x)
- Count matches :: nnz(x > 0)

# Data types

## Cell arrays
@id lists
@keywords cell array curly braces mixed types list cellfun
- Create :: c = {1, "two", [3 4]};
- Get contents :: c{2}
- Sub-cell :: c(2)
- Append :: c{end+1} = "new";
- Number of items :: numel(c)
- Apply to each :: lens = cellfun(@numel, c);
- Several outputs :: cellfun(@(s) upper(s), c, 'UniformOutput', false)
> {} gets the item inside; () gives you a smaller cell array.

## Structs
@id structs
@keywords struct field dot fieldnames isfield array of structs config
- Create :: s = struct('name', "WE1", 'gain', 2);
- Field :: s.gain = 4;
- Dynamic field :: s.(fieldName)
- Has field :: isfield(s, 'gain')
- Field names :: fieldnames(s)
- Remove field :: s = rmfield(s, 'gain');
- Array of structs :: runs(3).name = "run3";

## Dictionaries and maps
@id dictionaries
@keywords dictionary containers map key value lookup
- Dictionary (R2022b+) :: d = dictionary(["gain" "rate"], [2 100]);
- Look up :: d("gain")
- Add :: d("offset") = 0.1;
- Has key :: isKey(d, "gain")
- Older: containers.Map :: m = containers.Map({'gain','rate'}, {2, 100});
- Keys / values :: keys(m); values(m)

## Tables
@id pandas-basics
@keywords table readtable column filter groupsummary varfun sortrows writetable
- Load :: T = readtable("run.csv");
- Look :: head(T); summary(T)
- Column :: T.voltage
- Several columns :: T(:, ["time" "voltage"])
- Filter rows :: T(T.voltage > 0.2, :)
- Two conditions :: T(T.v > 0 & T.i < 1e-6, :)
- New column :: T.power = T.v .* T.i;
- Rename :: T = renamevars(T, "V", "voltage");
- Group :: groupsummary(T, "sensor", "mean", "peak")
- Sort :: sortrows(T, "time")
- To array :: T{:, ["time" "voltage"]}
- Save :: writetable(T, "out.csv");
- Stack tables :: T = [T1; T2];

# Files

## Loading and saving data
@id loading-and-saving-arrays
@keywords readmatrix writematrix readtable load save mat csv excel xlsread
- Numeric CSV :: data = readmatrix("run.csv");
- Skip header lines :: readmatrix("run.csv", "NumHeaderLines", 1)
- Columns :: t = data(:, 1); v = data(:, 2);
- Excel sheet :: readtable("runs.xlsx", "Sheet", "CV")
- Save CSV :: writematrix([t v], "out.csv");
- Save variables :: save("run.mat", "t", "v");
- Load variables :: load("run.mat");
- Load into a struct :: S = load("run.mat"); S.v

## Paths and folders
@id paths
@keywords fullfile dir folder files glob exist mkdir fileparts path addpath pwd cd
- Join path :: f = fullfile("data", "run1.csv");
- All CSVs :: files = dir(fullfile("data", "*.csv"));
- Full name of each :: fullfile(files(k).folder, files(k).name)
- Recursive :: dir(fullfile("data", "**", "*.csv"))
- Parts :: [folder, name, ext] = fileparts(f);
- Exists :: isfile(f); isfolder(d)
- Make folder :: mkdir("figures")
- This script's folder :: fileparts(mfilename('fullpath'))
- Add code to path :: addpath(genpath("lib"))
```matlab Process every file
files = dir(fullfile("data", "*.csv"));
for k = 1:numel(files)
    f = fullfile(files(k).folder, files(k).name);
    data = readmatrix(f);
end
```

## Text files
@id reading-a-file
@keywords fopen fclose fgetl fprintf textscan readlines writelines file
- All lines :: lines = readlines("log.txt");
- Whole file :: txt = fileread("log.txt");
- Write lines :: writelines(lines, "out.txt");
```matlab Write line by line
fid = fopen("out.csv", "w");
fprintf(fid, "%.4f,%.6e\n", [t(:) v(:)]');
fclose(fid);
```

# Figures

## Plotting
@id line-plot
@keywords plot figure xlabel ylabel legend hold subplot tiledlayout scatter errorbar log axis exportgraphics saveas
```matlab Figure
figure;
plot(v, i * 1e6, 'LineWidth', 1.5, 'DisplayName', 'run 1');
hold on
xlabel('Potential (V)');
ylabel('Current (\muA)');
legend('Location', 'best');
grid on; box on
```
- Line style :: plot(x, y, '--o', 'Color', [0.2 0.4 0.8])
- Scatter :: scatter(x, y, 10, 'filled')
- Error bars :: errorbar(x, m, s, 'o', 'CapSize', 4)
- Limits :: xlim([-0.5 0.8]); ylim auto
- Log axis :: set(gca, 'YScale', 'log')
- Second y-axis :: yyaxis right
- Grid of plots :: tiledlayout(2, 2); nexttile
- Histogram :: histogram(x, 30)
- Heatmap / image :: imagesc(M); colorbar
- Label a point :: text(vp, ip, ' peak')
- Font size :: set(gca, 'FontSize', 12)
- Save (papers) :: exportgraphics(gcf, "fig.pdf", 'ContentType', 'vector')
- Save image :: exportgraphics(gcf, "fig.png", 'Resolution', 300)
- Close all :: close all

## Fitting and signals
@id curve-fitting
@keywords fit fitlm lsqcurvefit regression ttest corrcoef findpeaks smooth filter butter filtfilt sgolay
```matlab Nonlinear fit
model = @(p, x) p(1) * exp(-p(2) * x);
p = lsqcurvefit(model, [1 0.1], x, y);
```
- Linear model :: mdl = fitlm(x, y); mdl.Rsquared.Ordinary
- Curve Fitting Toolbox :: f = fit(x(:), y(:), 'exp1');
- t-test :: [h, p] = ttest2(a, b);
- Paired :: [h, p] = ttest(before, after);
- Correlation :: R = corrcoef(x, y); R(1, 2)
- Find peaks :: [pk, loc] = findpeaks(i, 'MinPeakProminence', 1e-7);
- Smooth :: smoothdata(i, 'sgolay', 11)
- Low-pass :: [b, a] = butter(4, 0.1); y = filtfilt(b, a, x);

# Switching languages

## Coming from Python and C
@id gotchas
@keywords difference python c compare switch translate versus
- First element :: x(1)    % Python x[0]
- Last element :: x(end)    % Python x[-1]
- Inclusive range :: x(1:3)    % Python x[0:3]
- Element-wise :: a .* b    % Python a * b
- Not equal :: a ~= b    % Python/C a != b
- Not :: ~a    % Python not a, C !a
- Comment :: % line;  %{ block %}
- Indexing uses () :: x(3); f(3)    % same brackets as calls
- Strings :: "text" string vs 'text' char
- No += :: i = i + 1;
- Blocks close with end :: if …  end
- Copy is automatic :: b = a;    % b is an independent copy
> Ending a line with ; hides its output; leaving it off prints the result.
