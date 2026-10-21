---
name: C++
symbol: C⁺⁺
order: 4
color: #ccbadf
version: C++17
highlight: cpp
description: Fine control. Modern abstractions.
---

# Basics

## Variables
@keywords assignment declaration auto initialise brace
@diff Explicit or auto types; brace initialisation.

Declare with a type, or let `auto` deduce it.

```cpp
int count = 3;
double voltage{2.5};        // brace init: rejects narrowing
auto label = std::string{"sensor"};
auto ratio = 0.5;           // double
```

`int x{2.7};` is a compile error (narrowing), while `int x = 2.7;` silently truncates.

## Data types
@id types
@keywords int double bool char auto size_t int32_t uint8_t
@diff Static types; auto still has one fixed type.

Built-in and fixed-width types.

```cpp
#include <cstdint>

int n = 42;
double ratio = 0.75;
bool ready = true;
char letter = 'A';
std::size_t length = 10;
std::int32_t reading = -12;
std::uint8_t byte = 255;
auto inferred = 42u;   // unsigned int
```

## Constants
@keywords const constexpr immutable compile time
@diff constexpr for compile-time constants.

Name values that should not change.

```cpp
constexpr double PI = 3.141592653589793;  // known at compile time
constexpr int SIZE = 16;
int buffer[SIZE];                         // usable as an array size
const int limit = std::rand() % 10;       // const, but set at runtime
```

Prefer `constexpr` over `#define`: it has a type and respects scope.

## Operators
@keywords arithmetic equality logical and or not modulo increment
@diff Integer / truncates; == compares.

Calculate, compare and combine values.

```cpp
int quotient = 7 / 2;      // 3
int remainder = 7 % 2;     // 1
double exact = 7 / 2.0;    // 3.5
bool both = (quotient > 0) && (remainder > 0);
bool either = !both || quotient == 3;
int i = 0;
++i;                       // prefer prefix for iterators
```

## Comments
@keywords comment documentation multiline block

Leave a note the compiler ignores.

```cpp
// A single-line note

/* A note that spans
   multiple lines. */

/// Doxygen-style documentation comment
```

## Printing output
@id print
@keywords cout cerr endl stream output console
@diff std::cout with << chaining.

Write to the console with streams.

```cpp
#include <iostream>

int main() {
    int count = 3;
    std::cout << "Count: " << count << '\n';
    std::cerr << "Something went wrong\n";
}
```

`std::endl` adds a newline **and** flushes. Use `'\n'` unless you need the flush.

## Formatting output
@id format
@keywords setprecision fixed setw iomanip format decimal places padding
@diff iomanip manipulators (std::format in C++20).

Control decimals, width and padding.

```cpp
#include <iomanip>
#include <iostream>

int main() {
    double pi = 3.14159;
    std::cout << std::fixed << std::setprecision(2) << pi << '\n';  // 3.14
    std::cout << std::setw(6) << 42 << '\n';                        // "    42"
    std::cout << std::setfill('0') << std::setw(5) << 42 << '\n';   // 00042
    std::cout << std::hex << 255 << std::dec << '\n';               // ff
}
```

Manipulators like `fixed` and `setprecision` stick until changed; `setw` applies only to the next value. C++20 adds `std::format("{:.2f}", pi)`.

## Type conversion
@id convert
@keywords static_cast stoi stod to_string parse convert cast
@diff static_cast; std::stoi and std::to_string.

Convert between numbers and strings.

```cpp
#include <string>

double d = 3.9;
int truncated = static_cast<int>(d);   // 3
int n = std::stoi("42");               // throws on bad input
double x = std::stod("2.5");
std::string text = std::to_string(7);  // "7"
```

`std::stoi` throws `std::invalid_argument` or `std::out_of_range` — wrap it in `try` for user input.

## Reading input
@id input
@keywords cin getline input keyboard stdin read
@diff std::cin >> or std::getline.

Read values or whole lines from the user.

```cpp
#include <iostream>
#include <string>

int main() {
    int age;
    std::cout << "Age: ";
    if (!(std::cin >> age)) return 1;   // fails on non-numbers
    std::cin.ignore();                  // drop the leftover '\n'

    std::string name;
    std::getline(std::cin, name);       // whole line, spaces included
}
```

Mixing `>>` and `getline` without `ignore()` makes `getline` read an empty line.

# Strings

## Strings
@keywords std::string length concatenate append char
@diff std::string owns and grows its text.

`std::string` manages its own memory.

```cpp
#include <string>

std::string name = "Ada";
name += " Lovelace";               // append
std::size_t len = name.size();     // 12
char first = name[0];              // 'A'
bool same = (name == "Ada Lovelace"); // == compares contents
const char *c_str = name.c_str();  // for C APIs
```

## String methods
@id string-methods
@keywords find substr replace insert erase npos contains starts with
@diff Member functions; find returns npos when missing.

Search and edit strings.

```cpp
#include <string>

std::string s = "hello world";
std::size_t at = s.find("world");      // 6
if (s.find("xyz") == std::string::npos) { /* not found */ }
std::string word = s.substr(0, 5);     // "hello" (pos, count)
s.replace(0, 5, "HELLO");              // "HELLO world"
s.insert(0, ">> ");
s.erase(0, 3);
```

C++20 adds `starts_with` and `ends_with`. Before that: `s.rfind("pre", 0) == 0`.

## Splitting strings
@id split
@keywords split tokenize stringstream getline delimiter join
@diff std::getline with a delimiter on a stringstream.

Split text on a delimiter.

```cpp
#include <sstream>
#include <string>
#include <vector>

std::string csv = "a,b,c";
std::vector<std::string> parts;
std::stringstream stream(csv);
std::string item;
while (std::getline(stream, item, ',')) {
    parts.push_back(item);
}
```

For whitespace-separated values, `stream >> item` skips spaces automatically.

## string_view
@id string-view
@keywords string_view non-owning view substring cheap
@diff Non-owning view into existing text.

Pass text without copying it.

```cpp
#include <string_view>

std::size_t count_spaces(std::string_view text) {
    std::size_t n = 0;
    for (char c : text) if (c == ' ') ++n;
    return n;
}
```
@check top

A `string_view` must not outlive the string it views. Don't return one that points into a local `std::string`.

# Control flow

## If / else
@id if
@keywords conditional else if branch init statement
@diff Like C, plus if with an initialiser.

Choose a branch using a condition.

```cpp
int temperature = 25;
if (temperature > 30) {
    std::cout << "Hot\n";
} else if (temperature > 20) {
    std::cout << "Warm\n";
} else {
    std::cout << "Cool\n";
}

std::map<std::string, int> ages{{"ada", 36}};
if (auto it = ages.find("ada"); it != ages.end()) {  // C++17
    std::cout << it->second << '\n';
}
```

## Ternary operator
@id ternary
@keywords conditional expression ?: inline if
@diff condition ? a : b

Pick one of two values in a single expression.

```cpp
int a = 4, b = 9;
int larger = (a > b) ? a : b;
std::string label = larger > 5 ? "big" : "small";
```

`std::max(a, b)` is clearer for the common min/max case.

## For loop
@id for
@keywords iteration range repeat counter loop
@diff init; condition; increment.

Repeat an action a known number of times.

```cpp
for (int i = 0; i < 5; ++i) {
    std::cout << i << '\n';   // 0 to 4
}
```

## While loop
@id while
@keywords iteration repeat do while loop
@diff Condition first; do…while runs at least once.

Repeat while a condition stays true.

```cpp
int count = 0;
while (count < 3) {
    ++count;
}

do {
    --count;
} while (count > 0);
```

## Break and continue
@id loop-control
@keywords break continue skip exit loop
@diff break and continue affect the innermost loop.

Leave a loop early or skip an iteration.

```cpp
for (int i = 0; i < 10; ++i) {
    if (i % 2 == 0) continue;
    if (i > 7) break;
    std::cout << i << '\n';   // 1 3 5 7
}
```

## Switch
@id switch
@keywords switch case default fall through enum
@diff Integer or enum cases; break prevents fall-through.

Select one of several cases.

```cpp
enum class Mode { Idle, Busy, Off };
Mode mode = Mode::Busy;
switch (mode) {
    case Mode::Idle:
        std::cout << "Idle\n";
        break;
    case Mode::Busy:
        std::cout << "Busy\n";
        [[fallthrough]];       // make intentional fall-through explicit
    default:
        std::cout << "Done\n";
}
```

Cases can't be strings. Use `if`/`else if` or a `std::map` of handlers instead.

# Functions

## Functions
@id function
@keywords function declaration parameters return overload
@diff Typed parameters; overloading allowed.

Name a reusable operation; overloads can share a name.

```cpp
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }  // overload

auto square(int x) -> int { return x * x; }       // trailing return type

int main() {
    return add(2, 3) == 5 ? 0 : 1;
}
```

## Pass by reference
@id by-reference
@keywords reference & const reference copy parameter modify swap
@diff T& modifies; const T& avoids copies.

Choose how arguments are passed.

```cpp
#include <string>
#include <vector>

void increment(int &n) { ++n; }                        // modifies caller
double sum(const std::vector<double> &v) {             // read-only, no copy
    double total = 0;
    for (double x : v) total += x;
    return total;
}
void take(std::string s) { /* gets its own copy */ }
```
@check top

Rule of thumb: small types by value, large read-only types by `const&`, outputs by `&`.

## Default arguments
@id default-args
@keywords default parameter optional argument
@diff Defaults go in the declaration, rightmost first.

Give parameters fallback values.

```cpp
#include <string>

std::string greet(const std::string &name, const std::string &greeting = "Hello") {
    return greeting + ", " + name;
}
// greet("Ada")        -> "Hello, Ada"
// greet("Ada", "Hi")  -> "Hi, Ada"
```
@check top

If a function is declared in a header, put the default there — not again in the definition.

## Returning multiple values
@id multiple-return
@keywords pair tuple structured bindings return two values
@diff Return a pair/tuple/struct; unpack with auto [a, b].

Return several values and unpack them.

```cpp
#include <utility>

std::pair<int, int> divide(int a, int b) {
    return {a / b, a % b};
}

int main() {
    auto [quotient, remainder] = divide(7, 2);   // C++17 structured bindings
    return quotient + remainder == 4 ? 0 : 1;
}
```

## Lambdas
@id lambda
@keywords lambda anonymous function closure capture [&] [=] std::function
@diff [captures](params) { body }

Write a small function inline.

```cpp
#include <functional>

int factor = 3;
auto times = [factor](int x) { return x * factor; };   // capture by value
int total = 0;
auto add = [&total](int x) { total += x; };            // capture by reference
add(times(2));                                         // total == 6

std::function<int(int)> stored = times;                // store any callable
```

`[=]` captures everything used by value, `[&]` by reference. A reference capture must not outlive the variable.

## Scope
@id scope
@keywords local global block namespace lifetime static
@diff Braces define scope and object lifetime.

Names and objects live until the end of their block.

```cpp
namespace config {
    constexpr int retries = 3;
}

int main() {
    int count = 1;
    {
        int inner = 2;
        count += inner;
    }   // inner is destroyed here
    return count + config::retries;
}
```

Destructors run at the closing brace, which is what makes RAII work.

## Templates
@id generics
@keywords template generic typename function template class template
@diff template <typename T>

Write one function for many types.

```cpp
template <typename T>
T largest(T a, T b) {
    return (a > b) ? a : b;
}

template <typename T>
struct Box {
    T value;
};

int main() {
    int a = largest(3, 7);          // T deduced as int
    double b = largest<double>(2, 3.5);
    Box<int> box{42};
    return a + box.value > 0 ? 0 : 1;
}
```

Template definitions normally live in headers, because the compiler needs the full definition at each use.

# Collections

## Vectors
@id array
@keywords vector array list dynamic index size at
@diff std::vector: resizable, zero-based.

The default container: a resizable array.

```cpp
#include <vector>

std::vector<int> values = {10, 20, 30};
int first = values[0];        // no bounds check
int safe = values.at(1);      // throws std::out_of_range
std::size_t n = values.size();
std::vector<double> zeros(5, 0.0);   // five zeros
```

`std::array<int, 3>` is the fixed-size alternative with no heap allocation.

## Vector operations
@id array-ops
@keywords push_back emplace_back pop_back insert erase clear empty resize remove
@diff push_back, insert and erase with iterators.

Add, remove and resize.

```cpp
#include <algorithm>
#include <vector>

std::vector<int> v = {1, 2, 3};
v.push_back(4);                 // [1 2 3 4]
v.pop_back();                   // [1 2 3]
v.insert(v.begin(), 0);         // [0 1 2 3]
v.erase(v.begin() + 1);         // [0 2 3]
v.erase(std::remove(v.begin(), v.end(), 2), v.end());  // remove all 2s
bool empty = v.empty();
v.clear();
```

Adding elements can reallocate and invalidate existing iterators, pointers and references.

## Iterating
@id iterate
@keywords range for foreach loop auto const reference iterator
@diff Range-based for with const auto&.

Visit each element.

```cpp
#include <vector>

std::vector<int> values{10, 20, 30};
for (const auto &value : values) {
    std::cout << value << '\n';
}
for (auto &value : values) {
    value *= 2;      // & lets you modify in place
}
```

## Index and value
@id enumerate
@keywords index counter enumerate position loop with index
@diff Classic for, or a counter with range-for.

Loop with both the position and the element.

```cpp
std::vector<std::string> names{"a", "b", "c"};
for (std::size_t i = 0; i < names.size(); ++i) {
    std::cout << i << ": " << names[i] << '\n';
}
```

Use `std::size_t` (unsigned) for indexes to avoid signed/unsigned comparison warnings.

## Maps
@id dict
@keywords map unordered_map dictionary hash key value lookup insert count find
@diff std::map (sorted) or std::unordered_map (hashed).

Look values up by key.

```cpp
#include <map>
#include <string>
#include <unordered_map>

std::unordered_map<std::string, int> ages;
ages["ada"] = 36;                       // insert or overwrite
ages.insert({"alan", 41});              // doesn't overwrite
if (ages.count("ada")) { /* exists */ }
if (auto it = ages.find("bob"); it != ages.end()) {
    int bob = it->second;
}
ages.erase("alan");

std::map<std::string, int> sorted{{"b", 2}, {"a", 1}};
for (const auto &[key, value] : sorted) {   // in key order
    std::cout << key << '=' << value << '\n';
}
```

`map[key]` **inserts** a default value when the key is missing. Use `find` or `count` to check without inserting.

## Sets
@id set
@keywords set unordered_set unique membership contains
@diff std::set (sorted) / std::unordered_set.

Store unique values and test membership.

```cpp
#include <set>

std::set<int> seen = {3, 1, 3, 2};   // {1, 2, 3}
seen.insert(5);
bool has = seen.count(2) > 0;        // C++20: seen.contains(2)
seen.erase(1);
```

## Sorting
@id sort
@keywords sort algorithm comparator descending lambda stable_sort
@diff std::sort with an optional comparator.

Sort a container.

```cpp
#include <algorithm>
#include <functional>
#include <vector>

std::vector<int> v = {3, 1, 2};
std::sort(v.begin(), v.end());                     // 1 2 3
std::sort(v.begin(), v.end(), std::greater<>());   // 3 2 1

struct Person { std::string name; int age; };
std::vector<Person> people{{"Ada", 36}, {"Alan", 41}};
std::sort(people.begin(), people.end(),
          [](const Person &a, const Person &b) { return a.age < b.age; });
```

The comparator must be a strict "less than" — returning `<=` breaks `std::sort`.

## Algorithms
@id transform
@keywords transform accumulate find_if count_if any_of copy_if map filter reduce sum
@diff <algorithm> and <numeric> on iterator ranges.

Map, filter and reduce with the standard library.

```cpp
#include <algorithm>
#include <numeric>
#include <vector>

std::vector<int> v = {1, 2, 3, 4};
int total = std::accumulate(v.begin(), v.end(), 0);           // 10

std::vector<int> squares(v.size());
std::transform(v.begin(), v.end(), squares.begin(), [](int x) { return x * x; });

std::vector<int> evens;
std::copy_if(v.begin(), v.end(), std::back_inserter(evens), [](int x) { return x % 2 == 0; });

auto it = std::find_if(v.begin(), v.end(), [](int x) { return x > 2; });
bool any = std::any_of(v.begin(), v.end(), [](int x) { return x > 3; });
long count = std::count(v.begin(), v.end(), 2);
```

`accumulate` uses the type of its initial value: pass `0.0` when summing doubles.

## Searching
@id search
@keywords find contains index of min_element max_element
@diff std::find returns an iterator; end() means not found.

Find an element and its position.

```cpp
#include <algorithm>
#include <vector>

std::vector<int> v = {4, 8, 15};
auto it = std::find(v.begin(), v.end(), 8);
if (it != v.end()) {
    auto index = it - v.begin();      // 1
}
auto largest = *std::max_element(v.begin(), v.end());  // 15
```

## Pairs and tuples
@id tuple
@keywords pair tuple get make_pair first second structured bindings
@diff std::pair/std::tuple; unpack with auto [a, b].

Group a few values without defining a struct.

```cpp
#include <string>
#include <tuple>
#include <utility>

std::pair<std::string, int> p{"ada", 36};
std::string name = p.first;

std::tuple<int, double, char> t{1, 2.5, 'x'};
double d = std::get<1>(t);
auto [i, x, c] = t;
```

# Classes

## Structs
@id struct
@keywords struct aggregate record fields members
@diff struct members are public by default.

Group related values.

```cpp
struct Sensor {
    int id = 0;            // default member initialisers
    double value = 0.0;
};

Sensor s{1, 2.5};
s.value = 3.0;
Sensor *p = &s;
p->value = 4.0;
```

`struct` and `class` are identical except for the default access (public vs private).

## Classes
@id class
@keywords class constructor destructor member function private public this const method
@diff Constructors, access control and const methods.

Bundle data with the functions that use it.

```cpp
#include <string>
#include <utility>

class Account {
public:
    explicit Account(std::string owner, double balance = 0)
        : owner_(std::move(owner)), balance_(balance) {}   // initialiser list

    void deposit(double amount) { balance_ += amount; }
    double balance() const { return balance_; }             // const: doesn't modify

private:
    std::string owner_;
    double balance_;
};

int main() {
    Account a{"Ada", 10};
    a.deposit(5);
    return a.balance() == 15 ? 0 : 1;
}
```

Mark single-argument constructors `explicit` to prevent surprising implicit conversions.

## Inheritance
@id inheritance
@keywords inheritance virtual override polymorphism base derived abstract
@diff virtual + override; virtual destructor in the base.

Override behaviour through a base class.

```cpp
#include <memory>
#include <vector>

struct Shape {
    virtual ~Shape() = default;          // needed when deleting via base pointer
    virtual double area() const = 0;     // pure virtual: Shape is abstract
};

struct Square : Shape {
    double side;
    explicit Square(double s) : side(s) {}
    double area() const override { return side * side; }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Square>(2));
    return shapes[0]->area() == 4 ? 0 : 1;
}
```

Always write `override`: the compiler then catches signature mistakes.

## Enums
@id enum
@keywords enum class scoped enumeration underlying type
@diff enum class is scoped and strongly typed.

Name a fixed set of values.

```cpp
enum class Color { Red, Green, Blue };

Color c = Color::Green;
if (c == Color::Green) { /* ... */ }
int raw = static_cast<int>(c);   // 1 — no implicit conversion
```

Prefer `enum class` over plain `enum`: names don't leak into the surrounding scope.

# Memory

## References
@id references
@keywords reference alias & lvalue binding
@diff A reference is an alias; it can't be reseated or null.

Give an existing object a second name.

```cpp
int value = 1;
int &ref = value;     // must be initialised
ref = 5;              // value is now 5
const int &view = value;  // read-only alias
```

## Smart pointers
@id pointers
@keywords unique_ptr shared_ptr make_unique make_shared ownership heap new delete
@diff unique_ptr/shared_ptr express ownership.

Own heap memory without manual delete.

```cpp
#include <memory>

int main() {
    auto owner = std::make_unique<int>(42);   // single owner
    *owner = 43;
    auto moved = std::move(owner);            // owner is now null

    auto shared = std::make_shared<int>(7);   // reference counted
    auto another = shared;                    // count == 2
    return *moved == 43 ? 0 : 1;
}   // memory freed automatically
```

Default to `unique_ptr`. Use raw pointers only for non-owning access, and avoid `new`/`delete` in ordinary code.

## Move semantics
@id move
@keywords move rvalue std::move ownership transfer copy
@diff std::move transfers resources instead of copying.

Transfer a resource instead of copying it.

```cpp
#include <string>
#include <utility>
#include <vector>

std::string big(1000, 'x');
std::vector<std::string> list;
list.push_back(std::move(big));   // no copy; big is now valid but unspecified
big = "reused";                   // safe to assign again
```

`std::move` doesn't move anything itself — it allows the receiver to steal the contents.

## Optional values
@id optional
@keywords optional nullopt maybe value_or has_value
@diff std::optional<T> for "maybe a value".

Represent "a value or nothing".

```cpp
#include <optional>
#include <string>

std::optional<int> parse_digit(char c) {
    if (c >= '0' && c <= '9') return c - '0';
    return std::nullopt;
}

int main() {
    auto d = parse_digit('7');
    if (d) { int n = *d; }
    int fallback = parse_digit('x').value_or(-1);
    return fallback == -1 ? 0 : 1;
}
```

# Errors

## Exceptions
@id errors
@keywords try catch throw exception runtime_error what
@diff try/catch typed exceptions; catch by const&.

Throw and catch errors.

```cpp
#include <iostream>
#include <stdexcept>

double divide(double a, double b) {
    if (b == 0) throw std::invalid_argument("division by zero");
    return a / b;
}

int main() {
    try {
        divide(1, 0);
    } catch (const std::invalid_argument &e) {
        std::cerr << "Bad input: " << e.what() << '\n';
    } catch (const std::exception &e) {
        std::cerr << e.what() << '\n';
    }
}
```

Catch more specific types first. Mark functions that can't throw as `noexcept`.

## Assertions
@id assert
@keywords assert static_assert debug invariant NDEBUG
@diff assert at runtime; static_assert at compile time.

Catch programming mistakes early.

```cpp
#include <cassert>

static_assert(sizeof(int) >= 4, "need 32-bit int");

int divide(int a, int b) {
    assert(b != 0 && "divisor must be nonzero");
    return a / b;
}
```
@check top

# Files & system

## Reading a file
@id read-file
@keywords ifstream getline read file line by line
@diff std::ifstream + std::getline; closes automatically.

Read a text file line by line.

```cpp
#include <fstream>
#include <iostream>
#include <string>

int main() {
    std::ifstream file("data.txt");
    if (!file) {
        std::cerr << "cannot open data.txt\n";
        return 1;
    }
    std::string line;
    while (std::getline(file, line)) {
        std::cout << line << '\n';
    }
}   // file closes here
```

Read a whole file at once: `std::string all{std::istreambuf_iterator<char>(file), {}};`

## Writing a file
@id write-file
@keywords ofstream write append save file
@diff std::ofstream; std::ios::app to append.

Write or append to a file.

```cpp
#include <fstream>

int main() {
    std::ofstream out("out.txt");                     // truncates
    out << "value=" << 42 << '\n';
    std::ofstream log("log.txt", std::ios::app);      // appends
    log << "started\n";
    return out ? 0 : 1;
}
```

## Files and directories
@id paths
@keywords filesystem path exists directory list create_directories extension
@diff std::filesystem (C++17).

Inspect paths and list directories.

```cpp
#include <filesystem>
#include <iostream>
namespace fs = std::filesystem;

int main() {
    fs::path p = "data/report.csv";
    std::cout << p.filename() << ' ' << p.extension() << '\n';  // "report.csv" ".csv"
    if (!fs::exists("out")) fs::create_directories("out/logs");
    for (const auto &entry : fs::directory_iterator(".")) {
        std::cout << entry.path() << '\n';
    }
}
```

## Command-line arguments
@id args
@keywords argc argv command line arguments
@diff argc/argv, same as C.

Read the program's arguments.

```cpp
#include <iostream>
#include <string>
#include <vector>

int main(int argc, char *argv[]) {
    std::vector<std::string> args(argv + 1, argv + argc);
    for (const auto &arg : args) std::cout << arg << '\n';
}
```

## Headers and namespaces
@id imports
@keywords include header namespace using pragma once
@diff #include headers; std:: namespace.

Split code into headers and use namespaces.

```cpp geometry.hpp
#pragma once

namespace geo {
    double area(double w, double h);
}
```

```cpp main.cpp
#include <iostream>
#include "geometry.hpp"

int main() {
    std::cout << geo::area(2, 3) << '\n';
}
```
@check skip

Never put `using namespace std;` in a header — it leaks into every file that includes it.

## Compiling
@id build
@keywords g++ clang++ compile flags -std=c++17 warnings cmake
@diff c++ -std=c++17 file.cpp -o app

Compile with warnings on.

```bash
c++ -std=c++17 -Wall -Wextra -g main.cpp -o app
c++ -std=c++17 -O2 main.cpp geometry.cpp -o app
c++ -std=c++17 -fsanitize=address,undefined -g main.cpp -o app
```

# Utilities

## Math functions
@id math
@keywords cmath sqrt pow abs round floor ceil min max clamp
@diff <cmath> plus std::min/max/clamp.

Common maths.

```cpp
#include <algorithm>
#include <cmath>

double r = std::sqrt(2.0);
double p = std::pow(2.0, 10);
double a = std::abs(-3.5);
double near = std::round(2.5);              // 3
int lo = std::min(3, 7), hi = std::max(3, 7);
int c = std::clamp(15, 0, 10);              // 10
```

## Random numbers
@id random
@keywords random mt19937 uniform_int_distribution random_device seed
@diff <random>: engine + distribution.

Generate random numbers properly.

```cpp
#include <random>

std::mt19937 rng{std::random_device{}()};          // seed once
std::uniform_int_distribution<int> die(1, 6);      // inclusive
std::uniform_real_distribution<double> unit(0.0, 1.0);
int roll = die(rng);
double x = unit(rng);
```

Create the engine once and reuse it — constructing one per call is slow and less random.

## Timing and sleep
@id time
@keywords chrono steady_clock duration milliseconds sleep_for elapsed
@diff std::chrono clocks and durations.

Measure elapsed time and pause.

```cpp
#include <chrono>
#include <thread>

auto start = std::chrono::steady_clock::now();
std::this_thread::sleep_for(std::chrono::milliseconds(50));
auto elapsed = std::chrono::steady_clock::now() - start;
auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(elapsed).count();
```

Use `steady_clock` for measuring durations; `system_clock` can jump.
