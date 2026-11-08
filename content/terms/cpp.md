# Hover explanations for C++ code: term :: one-line explanation.

# Types and keywords
int :: Signed whole number, usually 32 bits.
long :: Signed whole number of at least 32 bits.
double :: 64-bit floating-point number, about 15–16 significant digits.
float :: 32-bit floating-point number, about 7 significant digits.
char :: One byte / character.
bool :: true or false.
true :: Boolean true.
false :: Boolean false.
void :: No value: a function that returns nothing.
auto :: Lets the compiler work out the type from the initial value.
const :: Read-only: can't be changed after initialisation. On a method: doesn't modify the object.
constexpr :: Value computed at compile time.
static_cast :: Explicit, checked conversion between related types, e.g. double → int.
using :: Type alias (using T = …) or brings a name into scope (using std::string).
typename :: Introduces a type parameter in a template.
template :: Writes code once for any type: template <typename T>.
class :: User-defined type; members are private by default.
struct :: Like class, but members are public by default.
public :: Members usable from anywhere.
private :: Members usable only inside the class.
virtual :: Method that derived classes can override; called through a base pointer/reference.
override :: Marks a method that overrides a virtual one; the compiler checks it really does.
explicit :: Stops a constructor being used for silent conversions.
default :: = default asks the compiler to generate the function; also the switch fallback label.
this :: Pointer to the current object inside a method.
namespace :: Groups names to avoid clashes, e.g. std::.
return :: Ends the function and hands back a value.
if :: Runs the block when the condition is true.
else :: Runs when the if condition was false.
for :: Loop; for (auto x : v) visits every element.
while :: Repeats while the condition is true.
switch :: Jumps to the matching case label.
case :: One branch label in a switch.
break :: Leaves the loop or switch.
continue :: Skips to the next loop iteration.
try :: Starts a block whose exceptions can be caught.
catch :: Handles an exception thrown in the try block.
throw :: Raises an exception.
nullptr :: The null pointer value (use instead of NULL).
std :: The standard library namespace.
main :: Where the program starts.

# Operators
:: :: Scope resolution: std::vector means vector from namespace std.
& :: In a type: a reference (an alias, int& x). In an expression: address-of or bitwise AND.
* :: In a type: a pointer. In an expression: dereference or multiply.
-> :: Member access through a pointer: p->x.
<< :: Stream output (cout << x), or shift bits left.
>> :: Stream input (cin >> x), or shift bits right.
== :: Equal to.
!= :: Not equal to.
&& :: Logical AND.
|| :: Logical OR.
? :: Ternary: cond ? a : b.
++ :: Increment; ++i is the usual choice in loops.
+= :: Add in place.

# I/O and strings
cout :: Standard output stream: std::cout << value.
cerr :: Error output stream, shown even when output is redirected.
cin :: Standard input stream: std::cin >> value.
endl :: Newline plus flush — slower than '\n'.
getline :: Reads a whole line (or up to a delimiter) into a string.
fixed :: Print floating-point numbers with a fixed number of decimals.
scientific :: Print floating-point numbers in scientific notation.
setprecision :: Number of digits/decimals to print. From <iomanip>.
setw :: Minimum width of the next printed field. From <iomanip>.
printf :: C-style formatted printing, still available.
string :: std::string: text that manages its own memory.
string_view :: Read-only view of text without copying it.
stringstream :: A string you can read from/write to like a stream; good for splitting.
size :: Number of elements (or characters).
substr :: Part of a string: substr(start, length).
find :: Position of a substring (string::npos if missing), or std::find for ranges.
rfind :: Searches from the end; rfind(x, 0) == 0 tests "starts with".
npos :: "Not found" value returned by string searches.
replace :: Replaces part of a string.
stoi :: Text → int.
stod :: Text → double.
to_string :: Number → text.

# Containers
vector :: Resizable array — the default container.
array :: Fixed-size array with size known at compile time.
map :: Sorted key → value container.
unordered_map :: Hash map: fast key → value lookup, no order.
set :: Sorted collection of unique values.
unordered_set :: Hash set of unique values.
pair :: Two values together; .first and .second.
tuple :: Several values of different types together.
optional :: Either holds a value or is empty.
make_pair :: Creates a pair.
make_tuple :: Creates a tuple.
first :: First element of a pair.
second :: Second element of a pair.
push_back :: Adds an element to the end of a vector.
pop_back :: Removes the last element.
emplace_back :: Constructs an element in place at the end.
front :: First element.
back :: Last element.
at :: Element access with bounds checking (throws if out of range).
insert :: Inserts an element.
erase :: Removes an element or range.
clear :: Removes everything.
reserve :: Pre-allocates capacity so pushing doesn't reallocate.
empty :: True if there are no elements.
count :: How many times a key appears (0 or 1 for map/set); or std::count for ranges.
begin :: Iterator to the first element.
end :: Iterator one past the last element.
value_or :: An optional's value, or the given default if it's empty.

# Algorithms (<algorithm>, <numeric>)
sort :: Sorts a range; pass a comparator for custom order.
greater :: Comparator for descending order.
accumulate :: Sums (or folds) a range from a starting value. From <numeric>.
max_element :: Iterator to the largest element.
min_element :: Iterator to the smallest element.
distance :: Number of steps between two iterators — turns an iterator into an index.
transform :: Applies a function to every element, writing the results.
reverse :: Reverses a range.
unique :: Moves duplicates (adjacent) to the end; pair with erase.
swap :: Exchanges two values.
move :: Casts to an rvalue so resources are moved instead of copied.
function :: std::function: holds any callable with a given signature.

# Memory
unique_ptr :: Smart pointer with a single owner; deletes the object automatically.
shared_ptr :: Smart pointer with shared ownership, reference-counted.
make_unique :: Creates an object owned by a unique_ptr.
make_shared :: Creates an object owned by a shared_ptr.
get :: Raw pointer from a smart pointer (doesn't transfer ownership).
new :: Allocates on the heap — prefer make_unique.
delete :: Frees memory from new — prefer smart pointers.

# Errors
exception :: Base class of standard exceptions; what() gives the message.
runtime_error :: Exception for errors detected while running.
invalid_argument :: Exception for a bad argument, e.g. from stod("abc").
what :: The exception's message.
assert :: Stops the program if the condition is false (debug builds).

# Files, maths, random, time
ifstream :: Input file stream: reads a file.
ofstream :: Output file stream: writes a file.
ios :: Stream flags, e.g. std::ios::app to append.
filesystem :: Paths, folders and file operations (C++17).
path :: A filesystem path; filename(), stem(), extension().
exists :: True if the path exists.
create_directories :: Makes a folder and any missing parents.
directory_iterator :: Iterates over the entries of a folder.
filename :: Last part of a path.
stem :: File name without its extension.
extension :: File extension, e.g. ".csv".
sqrt :: Square root.
pow :: Power.
abs :: Absolute value.
exp :: e to the power x.
mt19937 :: Mersenne Twister random engine.
random_device :: Non-deterministic seed source.
uniform_real_distribution :: Evenly distributed real numbers in a range.
uniform_int_distribution :: Evenly distributed integers in a range (inclusive).
chrono :: Time library: clocks and durations.
steady_clock :: Monotonic clock for measuring elapsed time.
now :: Current time point of a clock.
duration_cast :: Converts a duration to other units, e.g. milliseconds.
milliseconds :: A duration in milliseconds.
this_thread :: Functions acting on the current thread.
sleep_for :: Pauses the current thread.

# Build
include :: #include: Pastes in a header file.
g++ :: The GNU C++ compiler.
-std :: Chooses the language standard, e.g. -std=c++17.
-Wall :: Turns on the common warnings.
-Wextra :: Extra warnings.
-O2 :: Optimise for speed.
-O0 :: No optimisation, easiest to debug.
-g :: Include debug information.
-o :: Names the output file.
-fsanitize :: Runtime checks for bad memory use and undefined behaviour.
