---
name: C
symbol: C
order: 1
color: #c6cf9a
version: C17
highlight: c
description: Close to the machine. Clear on the details.
---

# Basics

## Variables
@keywords assignment declaration declare initialise
@diff Explicit types; semicolons end statements.

Declare a type, a name and (ideally) an initial value.

```c
int count = 3;
double voltage = 2.5;
char grade = 'A';
char label[] = "sensor";
```

An uninitialised local variable holds an indeterminate value. Reading it is undefined behaviour.

## Data types
@id types
@keywords int float double char bool stdint int32_t uint8_t size_t
@diff bool needs stdbool.h; exact widths need stdint.h.

Pick a fixed-width type when the size matters.

```c
#include <stdbool.h>
#include <stdint.h>

int n = 42;            // at least 16 bits, usually 32
long big = 100000L;
double ratio = 0.75;   // prefer double over float
bool ready = true;
uint8_t byte = 0xFF;   // exactly 8 bits
int32_t reading = -12;
size_t length = 10;    // sizes and indexes
```

`char` may be signed or unsigned depending on the platform. Use `unsigned char` or `uint8_t` for raw bytes.

## Constants
@keywords const define macro enum immutable
@diff const qualifies an object; #define is text substitution.

Name a value that should not change.

```c
#define BUFFER_SIZE 256          // preprocessor: no type, no semicolon
const double PI = 3.141592653589793;
enum { MAX_USERS = 64 };          // a true integer constant
```

Use `enum` or `#define` when you need a compile-time constant (array sizes, `case` labels). A `const int` is not a constant expression in C.

## Operators
@keywords arithmetic equality logical and or not modulo increment bitwise
@diff Integer / truncates; == compares, = assigns.

Calculate, compare and combine values.

```c
int quotient = 7 / 2;     // 3   (truncates toward zero)
int remainder = 7 % 2;    // 1
double exact = 7 / 2.0;   // 3.5
int a = 5, b = 3;
int both = (a > 0) && (b > 0);
int either = (a > 9) || !(b > 9);
a += 2;   // 7
a++;      // 8
```

`if (x = 5)` assigns and is always true. Turn on `-Wall` so the compiler warns you.

## Bitwise operators
@id bitwise
@keywords bit mask shift and or xor flags register
@diff &, |, ^, ~, << and >> on integers.

Set, clear, toggle and test individual bits.

```c
unsigned flags = 0;
flags |= (1u << 3);        // set bit 3
flags &= ~(1u << 3);       // clear bit 3
flags ^= (1u << 2);        // toggle bit 2
int on = (flags >> 2) & 1u; // test bit 2
```

Shift unsigned values. Right-shifting a negative signed value is implementation-defined, and shifting by the type width or more is undefined.

## Comments
@keywords comment documentation multiline block

Leave a note the compiler ignores.

```c
// A single-line note

/* A note that spans
   multiple lines. */
```

Block comments cannot be nested. To disable a large chunk of code, use `#if 0` … `#endif`.

## Printing output
@id print
@keywords printf puts console stdout output
@diff printf uses format specifiers.

Write to the console with printf.

```c
#include <stdio.h>

int main(void) {
    int count = 3;
    printf("Count: %d\n", count);
    puts("puts adds the newline for you");
    return 0;
}
```

`printf` does not add a newline. Output may stay buffered until a newline or `fflush(stdout)`.

## Format specifiers
@id format
@keywords printf %d %f %s %x %p %zu %lu width precision padding
@diff % specifiers must match the argument type.

The printf codes you keep forgetting.

```c
int count = 0;
printf("%d %i\n", -5, 42);        // int
printf("%u %ld %lld\n", 7u, 8L, 9LL); // unsigned, long, long long
printf("%zu\n", sizeof(int));     // size_t
printf("%f %.2f %e\n", 3.14159, 3.14159, 1234.5); // 3.141590 3.14 1.234500e+03
printf("%c %s\n", 'A', "text");   // char, string
printf("%x %X %o\n", 255, 255, 8); // ff FF 10
printf("%p\n", (void *)&count);   // pointer
printf("[%5d] [%-5d] [%05d]\n", 42, 42, 42); // [   42] [42   ] [00042]
printf("100%%\n");                // literal %
```

A mismatched specifier (e.g. `%d` with a `double`) is undefined behaviour. `float` is promoted to `double`, so `%f` covers both in printf — but `scanf` needs `%f` for float and `%lf` for double.

## Type conversion
@id convert
@keywords cast convert atoi strtol strtod string to int number parse
@diff Explicit casts; strtol/strtod parse text.

Cast between numeric types and parse numbers from text.

```c
#include <stdlib.h>

double d = 3.9;
int truncated = (int)d;            // 3
double ratio = (double)7 / 2;      // 3.5

char *end;
long value = strtol("42abc", &end, 10); // 42, end points at "abc"
double x = strtod("2.5", NULL);
```

Prefer `strtol`/`strtod` over `atoi`: they report where parsing stopped and set `errno` on overflow.

## Reading input
@id input
@keywords scanf fgets stdin keyboard read user input
@diff fgets a line, then parse it.

Read a line from the user safely.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char line[64];
    printf("Number: ");
    if (fgets(line, sizeof line, stdin)) {
        long n = strtol(line, NULL, 10);
        printf("You typed %ld\n", n);
    }
    return 0;
}
```

`scanf("%d", &n)` leaves the newline in the buffer and fails silently on bad input. Reading a whole line with `fgets` and parsing it is more robust.

# Strings

## Strings
@keywords char array string literal null terminator strlen
@diff Strings are char arrays ending in '\0'.

A C string is an array of `char` ending with `'\0'`.

```c
#include <string.h>

char name[16] = "Ada";        // room for 15 chars + '\0'
size_t len = strlen(name);    // 3 (not counting '\0')
const char *greeting = "hi";  // string literal: read-only
char first = name[0];         // 'A'
```

Modifying a string literal is undefined behaviour — point to it with `const char *`.

## String functions
@id string-methods
@keywords strcpy strncpy strcat strcmp snprintf strchr strstr copy compare concatenate
@diff Library functions on char arrays; you manage the space.

Copy, join, compare and search strings.

```c
#include <stdio.h>
#include <string.h>

char buffer[32];
snprintf(buffer, sizeof buffer, "%s-%d", "item", 7); // safest way to build strings

int same = strcmp("abc", "abc") == 0;  // compare with strcmp, not ==
char *at = strchr(buffer, '-');        // first '-' or NULL
char *found = strstr(buffer, "tem");   // substring or NULL

char dest[8];
strncpy(dest, "overflowing", sizeof dest - 1);
dest[sizeof dest - 1] = '\0';          // strncpy may not terminate
```

`==` on two strings compares addresses, not contents. `strcat` and `strcpy` do no bounds checking — prefer `snprintf`.

## Character tests
@id chars
@keywords ctype isdigit isalpha isspace toupper tolower character
@diff ctype.h classifies and converts characters.

Classify and convert single characters.

```c
#include <ctype.h>

char c = 'a';
int digit = isdigit((unsigned char)c);   // nonzero if '0'–'9'
int letter = isalpha((unsigned char)c);
int space = isspace((unsigned char)c);
char upper = (char)toupper((unsigned char)c); // 'A'
int value = '7' - '0';                   // 7
```

Cast to `unsigned char` before calling ctype functions; negative `char` values are undefined behaviour.

# Control flow

## If / else
@id if
@keywords conditional else if branch
@diff Parenthesised condition; braces for blocks.

Choose a branch using a condition.

```c
int temperature = 25;
if (temperature > 30) {
    puts("Hot");
} else if (temperature > 20) {
    puts("Warm");
} else {
    puts("Cool");
}
```

Any nonzero value is true. Always use braces — a second line without them is not part of the `if`.

## Ternary operator
@id ternary
@keywords conditional expression ?: inline if
@diff condition ? a : b

Pick one of two values in a single expression.

```c
int a = 4, b = 9;
int larger = (a > b) ? a : b;
const char *label = (larger > 5) ? "big" : "small";
```

## For loop
@id for
@keywords iteration range repeat counter loop
@diff init; condition; update in parentheses.

Repeat an action a known number of times.

```c
for (int i = 0; i < 5; i++) {
    printf("%d\n", i);   // 0 to 4
}

for (int i = 10; i > 0; i -= 2) {
    printf("%d\n", i);   // 10 8 6 4 2
}
```

Declaring `i` inside the `for` (C99+) limits it to the loop.

## While loop
@id while
@keywords iteration repeat do while loop
@diff Condition first; do…while runs at least once.

Repeat while a condition stays true.

```c
int count = 0;
while (count < 3) {
    count++;
}

int tries = 0;
do {
    tries++;
} while (tries < 3);   // body always runs once
```

## Break and continue
@id loop-control
@keywords break continue exit loop skip goto
@diff break and continue affect the innermost loop.

Leave a loop early or skip to the next iteration.

```c
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;  // skip even numbers
    if (i > 7) break;          // stop entirely
    printf("%d\n", i);         // 1 3 5 7
}
```

To exit nested loops at once, use a flag or a `goto` to a label after the loops.

## Switch
@id switch
@keywords switch case default fall through multiple branches
@diff Integer cases; break prevents fall-through.

Select one of several cases by integer value.

```c
int mode = 2;
switch (mode) {
    case 1:
        puts("Ready");
        break;
    case 2:
    case 3:
        puts("Busy");   // 2 and 3 share this code
        break;
    default:
        puts("Unknown");
}
```

Without `break`, execution falls through to the next case. Case labels must be integer constants — no strings.

# Functions

## Functions
@id function
@keywords function declaration prototype parameters return void
@diff Return type before the name; declare before use.

Name a reusable operation with inputs and a result.

```c
int add(int a, int b);          // prototype (often in a .h file)

int main(void) {
    return add(2, 3) == 5 ? 0 : 1;
}

int add(int a, int b) {
    return a + b;
}
```

Write `(void)` for no parameters; an empty `()` means "unspecified" before C23.

## Pass by pointer
@id by-reference
@keywords pointer parameter out parameter modify argument swap reference
@diff Arguments are copied; pass a pointer to modify.

Let a function change the caller's variable.

```c
void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 1, y = 2;
    swap(&x, &y);   // x == 2, y == 1
    return 0;
}
```

C always passes by value. Arrays decay to a pointer to their first element, so functions can modify array contents.

## Returning multiple values
@id multiple-return
@keywords out parameters struct return two values tuple
@diff Return a struct or use pointer out-parameters.

Return more than one result.

```c
typedef struct { int quotient; int remainder; } DivResult;

DivResult divide(int a, int b) {
    DivResult r = { a / b, a % b };
    return r;
}

void min_max(const int *v, int n, int *min, int *max) {
    *min = *max = v[0];
    for (int i = 1; i < n; i++) {
        if (v[i] < *min) *min = v[i];
        if (v[i] > *max) *max = v[i];
    }
}
```
@check top

## Function pointers
@id lambda
@keywords callback function pointer qsort comparator higher order
@diff No lambdas; pass a function pointer.

Pass a function as an argument.

```c
int twice(int x) { return 2 * x; }

void apply(int *v, int n, int (*fn)(int)) {
    for (int i = 0; i < n; i++) v[i] = fn(v[i]);
}

typedef int (*Transform)(int);   // typedef makes it readable
Transform t = twice;
```
@check top

Read `int (*fn)(int)` as "fn is a pointer to a function taking int and returning int".

## Scope and static
@id scope
@keywords local global static block lifetime extern
@diff Braces create block scope; static persists.

Control where a name is visible and how long it lives.

```c
static int file_private = 0;   // visible only in this .c file

int next_id(void) {
    static int counter = 0;    // keeps its value between calls
    return ++counter;
}

void demo(void) {
    int outer = 1;
    {
        int inner = 2;         // only exists in this block
        outer += inner;
    }
}
```
@check top

# Collections

## Arrays
@id array
@keywords array index sizeof length fixed size
@diff Fixed size, zero-based, no bounds checks.

A fixed-size, zero-based sequence of values.

```c
int values[5] = {10, 20, 30};      // remaining elements are 0
int first = values[0];
size_t length = sizeof values / sizeof values[0];  // 5

int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};
int middle = grid[1][1];           // 5
```

The `sizeof` trick only works on a real array — not on a pointer parameter. Out-of-bounds access is undefined behaviour, not an error.

## Dynamic arrays
@id array-ops
@keywords realloc grow append resize vector push
@diff Grow manually with realloc.

Grow an array at runtime.

```c
#include <stdlib.h>

int main(void) {
    size_t count = 0, capacity = 4;
    int *items = malloc(capacity * sizeof *items);
    if (!items) return 1;

    for (int value = 0; value < 10; value++) {
        if (count == capacity) {
            capacity *= 2;
            int *bigger = realloc(items, capacity * sizeof *bigger);
            if (!bigger) { free(items); return 1; }
            items = bigger;
        }
        items[count++] = value;
    }
    free(items);
    return 0;
}
```

Assign `realloc` to a temporary: on failure it returns `NULL` but the original block is still allocated.

## Iterating an array
@id iterate
@keywords foreach loop over array traverse index
@diff Index-based loop; no foreach.

Visit each element.

```c
int values[] = {10, 20, 30};
size_t n = sizeof values / sizeof values[0];
for (size_t i = 0; i < n; i++) {
    printf("%zu: %d\n", i, values[i]);
}
```

Pass the length alongside the array when calling a function: `void show(const int *v, size_t n)`.

## Sorting
@id sort
@keywords qsort sort comparator order ascending descending
@diff qsort with a comparison function.

Sort an array with qsort.

```c
#include <stdlib.h>

int compare_ints(const void *a, const void *b) {
    int x = *(const int *)a, y = *(const int *)b;
    return (x > y) - (x < y);   // avoids overflow of x - y
}

int main(void) {
    int v[] = {3, 1, 2};
    qsort(v, 3, sizeof v[0], compare_ints);   // 1 2 3
    return 0;
}
```

For descending order, swap the arguments in the comparison.

# Structures

## Structs
@id struct
@keywords struct typedef record fields dot arrow
@diff struct groups typed fields; -> through pointers.

Group related values under named fields.

```c
typedef struct {
    int id;
    double value;
} Sensor;

Sensor s = { .id = 1, .value = 2.5 };   // designated initialisers
Sensor *p = &s;
s.value = 3.0;      // . on a struct value
p->value = 4.0;     // -> through a pointer
```

Without `typedef`, you must write `struct Sensor` everywhere.

## Enums
@id enum
@keywords enum enumeration named constants states
@diff Named integer constants.

Give names to a set of integer constants.

```c
typedef enum { IDLE, RUNNING, STOPPED } State;   // 0, 1, 2

State s = RUNNING;
const char *names[] = {"idle", "running", "stopped"};
```
@check top

Enum values are plain `int`s; the compiler won't stop you assigning any integer.

# Memory

## Pointers
@keywords pointer address dereference & * NULL
@diff Manual address and lifetime management.

Store and use the address of a value.

```c
int value = 42;
int *ptr = &value;    // & takes the address
*ptr = 43;            // * dereferences: value is now 43

int *nothing = NULL;
if (nothing != NULL) { *nothing = 1; }
```

Never dereference `NULL`, an uninitialised pointer or a pointer to a variable that has gone out of scope.

## Pointers and arrays
@id pointer-arithmetic
@keywords pointer arithmetic array decay p++ offset
@diff p + i moves by i elements.

Walk through memory with pointer arithmetic.

```c
int v[] = {10, 20, 30};
int *p = v;           // array decays to &v[0]
int second = *(p + 1); // same as v[1] and p[1]
for (int *it = v; it != v + 3; ++it) {
    printf("%d\n", *it);
}
```

## Reading declarations
@id const-pointers
@keywords const pointer pointer to const read declaration right left
@diff Read pointer declarations right to left.

Where `const` goes changes what is constant.

```c
int x = 1, y = 2;
const int *a = &x;       // pointer to const int: *a can't change
int *const b = &x;       // const pointer: b can't be repointed
const int *const c = &x; // neither
a = &y;                  // fine
*b = 5;                  // fine
```

Read right to left: `int *const b` is "b is a const pointer to int".

## Memory allocation
@id memory
@keywords malloc calloc free heap allocation leak
@diff malloc and free manage heap storage.

Reserve storage at runtime and release it.

```c
#include <stdlib.h>

int main(void) {
    int *values = malloc(3 * sizeof *values);   // uninitialised
    int *zeros = calloc(3, sizeof *zeros);      // zero-filled
    if (values == NULL || zeros == NULL) return 1;
    values[0] = 42;
    free(values);
    free(zeros);
    values = NULL;    // avoid a dangling pointer
    return 0;
}
```

Every successful allocation needs exactly one `free`. `free(NULL)` is safe.

## Copying memory
@id memcpy
@keywords memcpy memset memmove copy fill zero buffer
@diff memcpy/memset work on raw bytes.

Copy or fill blocks of bytes.

```c
#include <string.h>

int a[4] = {1, 2, 3, 4}, b[4];
memcpy(b, a, sizeof a);       // copy bytes; must not overlap
memmove(a + 1, a, 3 * sizeof a[0]); // safe when overlapping
memset(b, 0, sizeof b);       // zero every byte
```

`memset` sets bytes, so it only gives meaningful values for 0 (or -1 on two's complement ints).

# Errors

## Error handling
@id errors
@keywords error return code errno perror NULL check
@diff Check return values; no exceptions.

Detect a failure from a return value and handle it.

```c
#include <errno.h>
#include <stdio.h>
#include <string.h>

int main(void) {
    FILE *file = fopen("missing.txt", "r");
    if (file == NULL) {
        fprintf(stderr, "open failed: %s\n", strerror(errno));
        return 1;
    }
    fclose(file);
    return 0;
}
```

A common cleanup pattern is `goto cleanup;` to a single block at the end of the function that frees everything.

## Assertions
@id assert
@keywords assert debug invariant NDEBUG static_assert
@diff assert aborts in debug builds.

Catch programming mistakes during development.

```c
#include <assert.h>

_Static_assert(sizeof(int) >= 4, "need 32-bit int"); // compile time

int divide(int a, int b) {
    assert(b != 0);   // aborts with file and line if false
    return a / b;
}
```
@check top

Defining `NDEBUG` removes `assert` checks, so never put side effects inside them.

# Files & system

## Reading a file
@id read-file
@keywords fopen fgets fread read file line by line
@diff fopen, fgets in a loop, fclose.

Read a text file line by line.

```c
#include <stdio.h>

int main(void) {
    FILE *f = fopen("data.txt", "r");
    if (!f) { perror("data.txt"); return 1; }
    char line[256];
    while (fgets(line, sizeof line, f)) {
        fputs(line, stdout);   // line keeps its '\n'
    }
    fclose(f);
    return 0;
}
```

Strip the newline with `line[strcspn(line, "\n")] = '\0';`.

## Writing a file
@id write-file
@keywords fopen fprintf write append "w" "a" save
@diff fopen with "w" or "a", then fprintf.

Write or append text to a file.

```c
#include <stdio.h>

int main(void) {
    FILE *f = fopen("out.txt", "w");   // "a" to append
    if (!f) return 1;
    fprintf(f, "value=%d\n", 42);
    if (fclose(f) != 0) return 1;      // flush errors appear here
    return 0;
}
```

Use `"rb"`/`"wb"` for binary files (it matters on Windows).

## Command-line arguments
@id args
@keywords argc argv command line arguments parameters
@diff argc counts; argv[0] is the program name.

Read the arguments passed to your program.

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "usage: %s FILE\n", argv[0]);
        return 1;
    }
    for (int i = 1; i < argc; i++) printf("arg %d: %s\n", i, argv[i]);
    return 0;
}
```

## Headers and includes
@id imports
@keywords include header .h guard pragma once library link
@diff #include pastes a header; link libraries separately.

Split code across files and use libraries.

```c sensor.h
#ifndef SENSOR_H
#define SENSOR_H

double read_sensor(int id);

#endif
```

```c main.c
#include <stdio.h>   // system header
#include <math.h>
#include "sensor.h"  // your header

int main(void) {
    printf("%f\n", sqrt(2.0));
    return 0;
}
```
@check skip

Compile together: `cc main.c sensor.c -lm -o app`. On Linux, math functions need `-lm`.

## Compiling
@id build
@keywords gcc clang compile flags warnings -Wall -O2 debug -g make
@diff cc file.c -o app

Compile with useful warnings.

```bash
cc -std=c17 -Wall -Wextra -g main.c -o app       # debug build
cc -std=c17 -Wall -O2 main.c -o app              # optimised
cc -fsanitize=address,undefined -g main.c -o app # catch memory bugs
./app
```

`-fsanitize=address` finds out-of-bounds access and use-after-free at runtime — use it while developing.

# Utilities

## Math functions
@id math
@keywords sqrt pow abs fabs round floor ceil sin cos math.h
@diff math.h; link with -lm on Linux.

Common maths from math.h.

```c
#include <math.h>
#include <stdlib.h>

double r = sqrt(2.0);
double p = pow(2.0, 10.0);   // 1024
double a = fabs(-3.5);       // abs for doubles
int i = abs(-3);             // abs for ints (stdlib.h)
double up = ceil(2.1), down = floor(2.9), near = round(2.5); // 3 2 3
double angle = atan2(1.0, 1.0); // radians
```

## Random numbers
@id random
@keywords rand srand random seed time
@diff rand() seeded with srand.

Generate pseudo-random integers.

```c
#include <stdlib.h>
#include <time.h>

int main(void) {
    srand((unsigned)time(NULL));     // seed once
    int die = rand() % 6 + 1;        // 1..6 (slightly biased)
    double unit = rand() / (RAND_MAX + 1.0); // [0, 1)
    return die > 0 ? 0 : 1;
}
```

`rand()` is fine for simple programs, not for anything security-related.

## Time and sleep
@id time
@keywords clock time measure elapsed sleep delay
@diff clock() for CPU time; time() for wall clock.

Measure elapsed time.

```c
#include <stdio.h>
#include <time.h>

int main(void) {
    clock_t start = clock();
    volatile double sum = 0;
    for (int i = 0; i < 1000000; i++) sum += i;
    double seconds = (double)(clock() - start) / CLOCKS_PER_SEC;
    printf("%.3f s\n", seconds);
    return 0;
}
```

There's no portable sleep in standard C: use `sleep()`/`usleep()` from `unistd.h` on macOS/Linux.
