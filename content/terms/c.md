# Hover explanations for C code: term :: one-line explanation.

# Types
int :: Signed whole number; at least 16 bits, usually 32. Range about ±2.1 billion on desktops.
long :: Signed whole number of at least 32 bits (64 on most 64-bit Linux/macOS).
short :: Signed whole number of at least 16 bits.
char :: One byte; holds a character such as 'A' or a small number.
float :: 32-bit floating-point number, about 7 significant digits. Write literals as 1.5f.
double :: 64-bit floating-point number, about 15–16 significant digits. The default for 1.5.
void :: "Nothing": a function that returns no value, or takes no parameters as (void).
bool :: true/false type from <stdbool.h>.
true :: Boolean true (1), from <stdbool.h>.
false :: Boolean false (0), from <stdbool.h>.
unsigned :: Makes an integer type non-negative, doubling its positive range.
signed :: Explicitly allows negative values (the default for int).
size_t :: Unsigned type for sizes and array indexes; what sizeof returns. Print with %zu.
uint8_t :: Unsigned 8-bit integer: 0 to 255. From <stdint.h>.
int8_t :: Signed 8-bit integer: -128 to 127. From <stdint.h>.
uint16_t :: Unsigned 16-bit integer: 0 to 65,535. From <stdint.h>.
int16_t :: Signed 16-bit integer: -32,768 to 32,767. From <stdint.h>.
uint32_t :: Unsigned 32-bit integer: 0 to about 4.29 billion. From <stdint.h>.
int32_t :: Signed 32-bit integer: about ±2.1 billion. From <stdint.h>.
uint64_t :: Unsigned 64-bit integer. From <stdint.h>.
int64_t :: Signed 64-bit integer. From <stdint.h>.
FILE :: Handle for an open file, returned by fopen and passed to fprintf, fgets, fclose.
clock_t :: Type returned by clock(): processor time in ticks.
time_t :: Type returned by time(): seconds since 1 January 1970.

# Keywords
const :: Read-only: the value can't be changed after it's set.
volatile :: Tells the compiler the value can change outside normal code flow (hardware, interrupts, threads), so it must re-read it every time.
static :: Inside a function: keeps its value between calls. At file level: visible only in this file.
extern :: Declares a variable defined in another .c file.
inline :: Hints that a small function should be expanded where it's called.
typedef :: Gives a type a new name, e.g. typedef struct {...} Channel;
struct :: Groups several named values (fields) into one type.
enum :: A set of named integer constants.
union :: Several fields sharing the same memory; only one is meaningful at a time.
sizeof :: Size in bytes of a type or variable, worked out at compile time.
return :: Ends the function and hands a value back to the caller.
if :: Runs the block only when the condition is non-zero (true).
else :: Runs when the preceding if condition was false.
switch :: Jumps to the case matching an integer value.
case :: One branch label inside a switch.
default :: The switch branch used when no case matches.
break :: Leaves the nearest loop or switch immediately.
continue :: Skips to the next iteration of the loop.
for :: Loop with start; condition; step in one line.
while :: Repeats while the condition is true, checked before each pass.
do :: do { … } while (cond); runs the body at least once.
goto :: Jumps to a label; mainly used for cleanup on errors.
NULL :: A pointer that points to nothing. Check for it before dereferencing.
main :: Where the program starts. Returning 0 means success.
argc :: Number of command-line arguments, including the program name.
argv :: Array of command-line argument strings; argv[0] is the program name.

# Operators
-> :: Access a field through a pointer: p->x is (*p).x.
& :: Address of a variable (&x), or bitwise AND (a & b).
* :: Multiply, declare a pointer (int *p), or read the value it points to (*p).
% :: Remainder after integer division: 7 % 2 is 1.
/ :: Divide. With two integers the result is truncated: 7 / 2 is 3.
== :: Equal to (comparison). A single = assigns.
!= :: Not equal to.
&& :: Logical AND: true only if both sides are true; stops early if the left is false.
|| :: Logical OR: true if either side is true; stops early if the left is true.
! :: Logical NOT: turns true into false and vice versa.
| :: Bitwise OR: sets bits that are set in either value.
^ :: Bitwise XOR: flips bits. Not "power" — use pow() for that.
~ :: Bitwise NOT: flips every bit.
<< :: Shift bits left; x << n multiplies by 2ⁿ.
>> :: Shift bits right; x >> n divides by 2ⁿ (for unsigned values).
|= :: Set bits: x |= mask.
&= :: Clear or keep bits: x &= ~mask clears them.
^= :: Toggle bits: x ^= mask.
++ :: Add one. i++ uses the old value first; ++i increments first.
-- :: Subtract one.
+= :: Add to a variable in place: x += 2 is x = x + 2.
? :: Ternary operator: cond ? a : b gives a if cond is true, else b.

# Printing and strings (stdio.h, string.h)
printf :: Prints formatted text to the screen: printf("%d\n", n).
fprintf :: Like printf but to a file or stderr: fprintf(f, "%d\n", n).
snprintf :: Formats text into a buffer without overflowing it. The safe way to build strings.
sprintf :: Formats into a buffer with no size limit — prefer snprintf.
puts :: Prints a string followed by a newline.
scanf :: Reads formatted input from the keyboard.
sscanf :: Reads formatted values out of a string; returns how many it matched.
fgets :: Reads one line (up to a size limit) from a file or stdin.
fopen :: Opens a file: "r" read, "w" write (overwrite), "a" append, "rb"/"wb" binary. Returns NULL on failure.
fclose :: Closes a file opened with fopen.
fwrite :: Writes raw bytes/values to a file.
fread :: Reads raw bytes/values from a file.
perror :: Prints your message plus the reason for the last system error.
stderr :: The error output stream; shown even when normal output is redirected.
stdout :: The normal output stream.
strlen :: Length of a string, not counting the closing '\0'.
strcpy :: Copies a string — no bounds check; prefer snprintf.
strncpy :: Copies at most n characters; may not add '\0'.
strcat :: Appends a string — no bounds check.
strncat :: Appends at most n characters, always adding '\0'.
strcmp :: Compares two strings: 0 if equal, negative/positive for order.
strncmp :: Compares only the first n characters.
strchr :: Finds the first occurrence of a character; returns a pointer or NULL.
strstr :: Finds a substring; returns a pointer or NULL.
strtok :: Splits a string on delimiters, one token per call (modifies the string).
strtol :: Converts text to a long, with error checking via its end pointer.
strtof :: Converts text to a float.
strtod :: Converts text to a double.
atoi :: Converts text to an int (no error checking).
atof :: Converts text to a double (no error checking).
memcpy :: Copies n bytes from one place to another (they mustn't overlap).
memmove :: Like memcpy but safe when the regions overlap.
memset :: Fills n bytes with one value, e.g. zeroing an array.
memcmp :: Compares n bytes; 0 if identical.

# Memory and stdlib.h
malloc :: Allocates memory on the heap; contents are garbage. Returns NULL on failure.
calloc :: Allocates zeroed memory for n items of a given size.
realloc :: Resizes a heap block, possibly moving it. Keep the old pointer until it succeeds.
free :: Releases heap memory from malloc/calloc/realloc.
exit :: Ends the program immediately with a status code.
EXIT_FAILURE :: Status code meaning the program failed (non-zero).
EXIT_SUCCESS :: Status code meaning success (0).
abs :: Absolute value of an int.
labs :: Absolute value of a long.
qsort :: Sorts any array using a comparison function you provide.
bsearch :: Binary search in a sorted array; returns a pointer or NULL.
rand :: Pseudo-random int from 0 to RAND_MAX. Seed it with srand first.
srand :: Seeds rand(); call once, usually with time(NULL).
RAND_MAX :: The largest value rand() can return.

# math.h
sqrt :: Square root (double). Link with -lm.
sqrtf :: Square root for float.
pow :: x raised to the power y: pow(2, 10) is 1024.
exp :: e raised to x.
log :: Natural logarithm (base e).
log10 :: Base-10 logarithm.
log2 :: Base-2 logarithm.
sin :: Sine of an angle in radians.
cos :: Cosine of an angle in radians.
tan :: Tangent of an angle in radians.
atan2 :: Angle of the point (x, y) in radians, handling all four quadrants.
fabs :: Absolute value of a double.
fabsf :: Absolute value of a float.
floor :: Rounds down to the nearest whole number.
ceil :: Rounds up to the nearest whole number.
round :: Rounds to the nearest whole number (halves away from zero).
trunc :: Drops the fractional part.
fmin :: Smaller of two doubles.
fmax :: Larger of two doubles.
hypot :: √(x² + y²) without overflow.
isnan :: True if the value is NaN (not a number).
isinf :: True if the value is infinite.

# ctype.h and time.h
isdigit :: True if the character is 0–9.
isalpha :: True if the character is a letter.
isalnum :: True if the character is a letter or digit.
isspace :: True for space, tab, newline and other whitespace.
toupper :: Converts a letter to upper case.
tolower :: Converts a letter to lower case.
time :: Current time as seconds since 1970; time(NULL).
clock :: Processor time used so far; divide by CLOCKS_PER_SEC for seconds.
CLOCKS_PER_SEC :: Number of clock() ticks per second.
localtime :: Converts a time_t into a calendar date/time struct.
strftime :: Formats a date/time as text, e.g. "%Y-%m-%d".
difftime :: Difference between two time_t values in seconds.

# Limits and formats
INT16_MAX :: Largest int16_t: 32,767.
UINT16_MAX :: Largest uint16_t: 65,535.
INT32_MIN :: Smallest int32_t: -2,147,483,648.
INT32_MAX :: Largest int32_t: 2,147,483,647.
INT_MAX :: Largest int on this platform.
PRIu32 :: Format macro for printing uint32_t portably: printf("%" PRIu32, x). From <inttypes.h>.

# Preprocessor and debugging
include :: #include: Pastes in a header: <...> for library headers, "..." for your own.
define :: #define: Defines a constant or macro; text is substituted before compiling.
ifdef :: #ifdef: Compiles the following code only if a macro is defined.
ifndef :: #ifndef: Compiles the following code only if a macro is not defined (used for include guards).
endif :: #endif: Ends an #if/#ifdef/#ifndef block.
pragma :: #pragma: Compiler-specific instruction.
_Static_assert :: Compile-time check: fails the build if the condition is false.
__FILE__ :: The current source file name, as a string.
__LINE__ :: The current line number.
assert :: Stops the program with a message if the condition is false (disabled by -DNDEBUG).

# Compiler and build
gcc :: The GNU C compiler; also builds and links programs.
clang :: The LLVM C compiler (the default cc on macOS).
-std :: Chooses the C standard, e.g. -std=c17.
-Wall :: Turns on the common warnings. Always use it.
-Wextra :: Turns on extra warnings beyond -Wall.
-O2 :: Optimise for speed.
-O0 :: No optimisation: easiest to debug.
-Os :: Optimise for size.
-g :: Include debug information for gdb/lldb.
-o :: Names the output file.
-lm :: Links the maths library (needed for sqrt, pow, …).
-c :: Compile to an object file (.o) without linking.
-fsanitize :: Adds runtime checks, e.g. address (bad memory use) and undefined (undefined behaviour).
CFLAGS :: Makefile variable holding the compiler flags.
CC :: Makefile variable naming the C compiler.
