# pandas hover explanations (adds to the Python and NumPy glossaries).
df :: The usual name for a DataFrame (a table).
DataFrame :: A table with named columns.
Series :: One column of a DataFrame.
columns :: The column names.
sep :: Column separator for read_csv (",", ";", "\t").
header :: Which line holds the column names; None if there isn't one.
names :: Column names to use instead of (or when there's no) header.
comment :: Character that starts a comment line to ignore, e.g. "#".
encoding :: Text encoding of the file, e.g. "latin-1".
sheet_name :: Which Excel sheet (None = all of them, as a dict).
assign :: Returns a copy with new or changed columns.
ignore_index :: Renumber rows 0…n−1 after concatenating.
tail :: Last few rows.
dtypes :: Type of each column.
value_counts :: How many times each value appears.
nunique :: Number of distinct values.
set_option :: Display settings, e.g. show all columns.
at :: Fast access to a single value by row label and column.
isin :: True where values are in a list.
between :: True where values are within a range (inclusive).
contains :: str.contains: True where the text contains a pattern.
query :: Filter rows with a text expression.
to_numeric :: Converts text to numbers; errors="coerce" turns bad values into NaN.
errors :: "coerce" turns unparseable values into NaN instead of raising.
dropna :: Removes rows with missing values; subset= limits which columns count.
subset :: Columns to consider (dropna, drop_duplicates).
fillna :: Replaces missing values.
interpolate :: Fills gaps by interpolating between neighbours.
drop_duplicates :: Removes repeated rows.
drop :: Removes rows or columns.
reset_index :: Back to 0…n−1 row numbers; drop=True discards the old index.
agg :: Several summaries at once, e.g. ["mean", "std", "count"].
pivot_table :: Reshapes to a wide table: rows × columns with an aggregate in each cell.
aggfunc :: The summary used in pivot_table.
merge :: Joins two tables on matching key columns.
how :: Join type: "left", "inner", "outer".
merge_asof :: Joins each row to the nearest (or previous) row in another table by a sorted key such as time.
direction :: merge_asof: "backward", "forward" or "nearest".
tolerance :: merge_asof: furthest a match may be.
to_datetime :: Converts text or numbers into timestamps.
unit :: Units of numeric times for to_datetime, e.g. "s" or "ms".
set_index :: Uses a column as the row labels (e.g. time).
resample :: Groups by time intervals, e.g. resample("1s").mean().
rolling :: Moving window calculations, e.g. rolling(11).mean().
window :: Size of a rolling window (count or time like "2s").
center :: rolling: put the result at the window's centre instead of its end.
nlargest :: The n rows with the largest values in a column.
rank :: Rank of each value (1 = smallest unless ascending=False).
ascending :: Sort or rank smallest first (True) or largest first (False).
to_excel :: Saves the table to an Excel file.
str :: The text type (astype(str)); on a column, .str gives text methods like .str.strip() and .str.contains().
