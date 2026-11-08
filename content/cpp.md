---
name: C++
symbol: C⁺⁺
order: 4
color: #df7ab4
on: dark
version: C++17
highlight: cpp
layout: sheet
description: Classes, containers and the standard library.
---

# Basics

## Variables and types
@id variables
@keywords int double auto const constexpr bool string brace initialisation type cast
@setup double v = 2.5;
- Declare :: int n = 3; double v = 2.5;
- Brace init (no narrowing) :: int count{3};
- Let the compiler deduce :: auto ratio = 0.5;
- Constant :: const double vref = 2.5;
- Compile-time constant :: constexpr int N = 64;
- Fixed width :: std::uint16_t raw = 4095;
- Boolean :: bool done = false;
- Text :: std::string name = "WE1";
- Cast :: int i = static_cast<int>(v);
- Type alias :: using Sample = std::pair<double, double>;
> int x{2.7}; is a compile error; int x = 2.7; silently drops the .7.

## Printing and input
@id printing-output
@keywords cout cin endl iomanip setprecision fixed print format
@setup double v = 1.234; int n = 5; std::string name = "a";
- Print :: std::cout << "V = " << v << '\n';
- Error stream :: std::cerr << "bad value\n";
- Fixed decimals :: std::cout << std::fixed << std::setprecision(3) << v;
- Scientific :: std::cout << std::scientific << v;
- Width :: std::cout << std::setw(8) << n;
- Read a value :: std::cin >> n;
- Read a line :: std::getline(std::cin, name);
- printf still works :: std::printf("%.3f\n", v);
> '\n' is faster than std::endl, which also flushes the output.

## Strings
@id strings
@keywords string length substr find replace append compare to_string stoi stod split stringstream string_view
@setup std::string s = "run_001.csv"; std::string line = "1,2,3"; std::size_t pos = 0;
- Length :: s.size()
- Character :: s[0]; s.back()
- Substring :: s.substr(4, 3)
- Find (npos if missing) :: auto pos = s.find(".csv");
- Not found check :: if (pos == std::string::npos) { }
- Append :: s += "_old";
- Compare :: s == "run"
- Starts with :: s.rfind("run", 0) == 0
- Replace part :: s.replace(0, 3, "test");
- Number ↔ text :: int k = std::stoi("42"); std::string t = std::to_string(3.5);
- Text to double :: double d = std::stod("1e-3");
```cpp Split on commas
std::stringstream ss(line);
std::string field;
while (std::getline(ss, field, ',')) {
    std::cout << field << '\n';
}
```
- Read-only view :: std::string_view view = s;

## Conditionals and loops
@id if-else
@keywords if else switch for while range-based loop break continue ternary
@setup int v = 0; std::vector<int> xs{1, 2, 3};
- If / else :: if (v > 0) { } else if (v < 0) { } else { }
- Ternary :: int sign = (v >= 0) ? 1 : -1;
- Count :: for (int i = 0; i < 10; ++i) { }
- Range-based :: for (int x : xs) { }
- By reference (edit) :: for (int& x : xs) { x *= 2; }
- Without copying :: for (const auto& x : xs) { }
- While :: while (v < 10) { ++v; }
- Skip / stop :: for (…) { if (bad) continue; if (done) break; }
- Switch :: switch (v) { case 0: break; default: break; }
- If with init :: if (auto it = xs.begin(); it != xs.end()) { }

## Functions
@id functions
@keywords function reference const default arguments overload lambda template return pair tuple
```cpp Define
double scale(double raw, double gain = 1.0)
{
    return raw * gain;
}
```
- Pass by reference (edit) :: void clamp(int& x) { if (x < 0) x = 0; }
- Pass by const reference :: double mean(const std::vector<double>& v);
- Default argument :: void log(const std::string& msg, int level = 0);
- Return two values :: std::pair<double, double> minmax(const std::vector<double>& v);
- Unpack them :: auto [lo, hi] = std::make_pair(1.0, 2.0);
- Overload :: int sq(int x); double sq(double x);
```cpp Template (any type)
template <typename T>
T largest(T a, T b)
{
    return a > b ? a : b;
}
```
> Pass big objects as const T&; pass small ones (int, double) by value.

## Lambdas
@id lambdas
@keywords lambda closure capture function std function sort predicate
@setup std::vector<int> xs{3, 1, 2}; int limit = 2;
- Lambda :: auto twice = [](int x) { return 2 * x; };
- Capture by value :: auto over = [limit](int x) { return x > limit; };
- Capture by reference :: int total = 0; auto add = [&total](int x) { total += x; };
- Use with algorithms :: std::sort(xs.begin(), xs.end(), [](int a, int b) { return a > b; });
- Store any callable :: std::function<int(int)> f = [](int x) { return x + 1; };

# Containers

## vector
@id vectors
@keywords vector push_back emplace_back size reserve resize clear erase insert front back array
@setup std::vector<double> v{1.0, 2.0, 3.0};
- Create :: std::vector<double> samples;
- With values :: std::vector<int> p{1, 2, 3};
- n copies :: std::vector<double> zeros(100, 0.0);
- Add :: v.push_back(4.0);
- Size :: v.size(); v.empty()
- Element :: v[0]; v.at(0)    // at() checks bounds
- First / last :: v.front(); v.back()
- Remove last :: v.pop_back();
- Insert at front :: v.insert(v.begin(), 0.5);
- Erase element 1 :: v.erase(v.begin() + 1);
- Clear :: v.clear();
- Reserve space :: v.reserve(1000);
- 2D :: std::vector<std::vector<double>> grid(3, std::vector<double>(4));
> Pushing can move the data: pointers and iterators into a vector become invalid.

## map and set
@id maps
@keywords map unordered_map set unordered_set key value insert find count contains erase
@setup std::map<std::string, int> m; std::set<int> seen;
- Map (sorted) :: std::map<std::string, int> gain{{"we1", 2}};
- Hash map (faster) :: std::unordered_map<std::string, int> fast;
- Set / get :: m["we1"] = 4; int g = m["we1"];
- Has key :: if (m.count("we1")) { }
- Find without inserting :: auto it = m.find("we2");
- Loop :: for (const auto& [key, value] : m) { }
- Erase :: m.erase("we1");
- Set :: seen.insert(3);
- In set :: seen.count(3) > 0
> m[key] creates the key if it's missing; use find or count to only look.

## array, pair, tuple, optional
@id pairs-and-tuples
@keywords array pair tuple optional structured binding fixed size
@setup std::pair<int, double> p{1, 2.5}; auto t = std::make_tuple(1, 2.5, "x"); std::optional<double> peak;
- Fixed-size array :: std::array<int, 4> a{1, 2, 3, 4};
- Pair :: std::pair<int, double> p{1, 2.5};
- Pair parts :: p.first; p.second
- Tuple :: auto t = std::make_tuple(1, 2.5, "x");
- Unpack :: auto [i, d, s] = t;
- Maybe a value :: std::optional<double> peak;
- Check / use :: if (peak) { double x = *peak; }
- Default if empty :: peak.value_or(0.0)

## Algorithms
@id algorithms
@keywords sort find count accumulate max_element min_element transform reverse unique iterator numeric
@setup std::vector<int> v{3, 1, 2}; std::vector<int> out(3); auto it = v.begin();
- Sort :: std::sort(v.begin(), v.end());
- Descending :: std::sort(v.begin(), v.end(), std::greater<int>());
- Find :: auto it = std::find(v.begin(), v.end(), 2);
- Found? :: it != v.end()
- Count :: std::count(v.begin(), v.end(), 2)
- Sum :: int total = std::accumulate(v.begin(), v.end(), 0);
- Max / min :: *std::max_element(v.begin(), v.end())
- Index of max :: std::distance(v.begin(), std::max_element(v.begin(), v.end()))
- Transform :: std::transform(v.begin(), v.end(), out.begin(), [](int x) { return x * 2; });
- Reverse :: std::reverse(v.begin(), v.end());
- Remove duplicates :: v.erase(std::unique(v.begin(), v.end()), v.end());
> Most algorithms take a range as (begin, end); end points one past the last element.

# Classes and memory

## Classes
@id classes
@keywords class struct constructor member method const public private this destructor
```cpp Class
class Sensor {
public:
    Sensor(std::string name, double gain)
        : name_(std::move(name)), gain_(gain) {}

    double scale(double raw) const { return raw * gain_; }
    const std::string& name() const { return name_; }

private:
    std::string name_;
    double gain_ = 1.0;
};
```
@setup class Sensor { public: Sensor(std::string n, double g) : name_(n), gain_(g) {} double scale(double raw) const { return raw * gain_; } private: std::string name_; double gain_; }; Sensor s{"WE1", 2.0};
- Struct (public by default) :: struct Point { double x = 0, y = 0; };
- Create :: Sensor s{"WE1", 2.0};
- Call a method :: double v = s.scale(10.0);
- Through a pointer :: auto* ps = &s; ps->scale(1.0);
- Read-only method :: double scale(double raw) const { … }
- Destructor :: ~Sensor() { … }
> Mark methods that don't change the object const; initialise members in the initialiser list.

## Inheritance
@id inheritance
@keywords inheritance virtual override base derived polymorphism abstract
```cpp Base and derived
class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
};

class Circle : public Shape {
public:
    explicit Circle(double r) : r_(r) {}
    double area() const override { return 3.14159 * r_ * r_; }
private:
    double r_;
};
```
@setup struct Shape { virtual ~Shape() = default; virtual double area() const = 0; }; struct Circle : Shape { explicit Circle(double r) : r_(r) {} double area() const override { return r_; } double r_; };
- Use through base pointer :: std::unique_ptr<Shape> s = std::make_unique<Circle>(2.0);
> Give a base class a virtual destructor if you delete derived objects through it.

## Smart pointers
@id smart-pointers
@keywords unique_ptr shared_ptr make_unique make_shared new delete ownership memory
@setup struct Run { int id = 0; }; auto r = std::make_unique<Run>(); auto r2 = std::make_unique<Run>();
- One owner :: auto r = std::make_unique<Run>();
- Shared owners :: auto sp = std::make_shared<Run>();
- Use :: r->id = 3;
- Transfer ownership :: auto r2 = std::move(r);
- Raw pointer (not owned) :: Run* raw = r2.get();
> Avoid new/delete: smart pointers free memory automatically.

## References and moves
@id references
@keywords reference move rvalue copy swap const reference
@setup std::vector<int> big(1000); int x = 1, y = 2;
- Reference (alias) :: int& alias = x;
- Const reference :: const std::vector<int>& view = big;
- Move instead of copy :: std::vector<int> taken = std::move(big);
- Swap :: std::swap(x, y);
> After std::move, the source is valid but unspecified: don't rely on its contents.

## Errors
@id exceptions
@keywords exception try catch throw runtime_error invalid_argument assert
```cpp Try / catch
try {
    double d = std::stod("abc");
} catch (const std::invalid_argument& e) {
    std::cerr << "bad number: " << e.what() << '\n';
}
```
- Throw :: throw std::runtime_error("sensor timeout");
- Catch any std error :: try { } catch (const std::exception& e) { }
- Assert :: assert(n >= 0);
@setup int n = 0;

# Files and build

## Files
@id reading-a-file
@keywords ifstream ofstream file read write getline filesystem path exists directory
@setup std::filesystem::path p = "data/run1.csv";
```cpp Read line by line
std::ifstream in("run.csv");
if (!in) { std::cerr << "can't open\n"; }
std::string line;
while (std::getline(in, line)) {
    std::cout << line << '\n';
}
```
- Write :: std::ofstream out("out.csv"); out << 1.0 << ',' << 2.0 << '\n';
- Append :: std::ofstream log("log.txt", std::ios::app);
- Path :: std::filesystem::path p = "data/run1.csv";
- Exists :: std::filesystem::exists(p)
- Name parts :: p.filename(); p.stem(); p.extension()
- Make folders :: std::filesystem::create_directories("results");
- List a folder :: for (const auto& e : std::filesystem::directory_iterator("data")) { }

## Maths, random and time
@id math-functions
@keywords cmath sqrt pow abs random mt19937 uniform chrono time duration sleep
@setup double x = 2.0; std::mt19937 rng; auto t0 = std::chrono::steady_clock::now();
- Maths :: std::sqrt(x); std::pow(x, 3); std::abs(-x); std::exp(x)
- Random engine :: std::mt19937 rng{std::random_device{}()};
- Uniform 0–1 :: std::uniform_real_distribution<double> u(0.0, 1.0); double r = u(rng);
- Integer 1–6 :: std::uniform_int_distribution<int> die(1, 6);
- Time a block :: auto t0 = std::chrono::steady_clock::now();
- Elapsed ms :: auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::steady_clock::now() - t0).count();
- Sleep :: std::this_thread::sleep_for(std::chrono::milliseconds(100));

## Headers and compiling
@id compiling
@keywords include header namespace compile g++ clang++ flags std c++17
- Include :: #include <vector>
- Namespace :: namespace lab { int version = 1; }
- Use a name :: using std::string;
```bash Compile and run
g++ -std=c++17 -Wall -Wextra -O2 -o analyse main.cpp stats.cpp
./analyse
```
```bash Debug build with checks
g++ -std=c++17 -g -O0 -fsanitize=address,undefined main.cpp -o analyse
```
> Avoid "using namespace std;" in headers: it leaks names into every file that includes them.

# Switching languages

## Coming from C and Python
@id gotchas
@keywords difference c python compare switch translate versus
@setup std::vector<int> v{1, 2, 3}; std::string s = "a";
- Text :: std::string s;    // not char[]
- Arrays :: std::vector<int> a;    // not malloc
- Print :: std::cout << s;    // printf still works
- Pass to edit :: void f(int& x)    // instead of int*
- Length :: v.size()    // Python len(v)
- Loop over items :: for (auto x : v) { }    // Python for x in v
- No manual freeing :: auto q = std::make_unique<int>(5);    // no malloc/free
- Integer division :: 7 / 2    // 3, like C
> Everything C does still works; reach for the standard library first.
