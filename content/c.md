---
name: C
symbol: C
order: 1
color: #c8962a
version: C17 · MSP430
highlight: c
layout: sheet
description: Firmware and close-to-the-metal code.
---

# Basics

## Types and variables
@id variables
@keywords int float double char stdint uint8_t uint16_t int32_t size_t const volatile static bool sizeof
@setup uint8_t buf[8];
- Fixed width :: uint8_t a; int16_t b; uint32_t c;
- Plain types :: int n; long big; float v; double precise; char ch;
- Boolean :: bool done = false;    // <stdbool.h>
- Size type :: size_t len = sizeof buf;
- Constant :: const float VREF = 2.5f;
- Float literal :: float g = 1.5f;    // 1.5 alone is a double
- Unsigned / long literal :: 100u; 100000UL;
- Hex / binary-ish :: uint8_t m = 0x3F;
- Shared with an ISR :: volatile uint8_t flag = 0;
- Keeps value between calls :: static int count = 0;
- Size in bytes :: sizeof(uint32_t)
- Limits :: INT16_MAX; UINT16_MAX; INT32_MIN
> On MSP430 int is 16 bits: use uint32_t whenever a value can exceed 32767.

## Printing and formatting
@id printing-output
@keywords printf format specifier decimal hex float snprintf PRIu32 inttypes width zero padding
@setup int n = 5; unsigned u = 5; long l = 5; float x = 1.5f; double d = 1.5; char s[] = "hi"; char buf[32]; uint32_t t = 5; uint16_t raw = 5;
- Print :: printf("n = %d\n", n);
- int / unsigned / long :: printf("%d %u %ld", n, u, l);
- Float, 3 decimals :: printf("%.3f", x);
- Scientific :: printf("%.2e", d);
- Hex, zero-padded :: printf("0x%04X", raw);
- String / char :: printf("%s %c", s, s[0]);
- Width and align :: printf("%-10s|%8.2f", s, x);
- Percent sign :: printf("100%%");
- uint32_t portably :: printf("%" PRIu32, t);
- Into a buffer :: snprintf(buf, sizeof buf, "%d,%u\r\n", n, raw);
- size_t :: printf("%zu", sizeof buf);
> printf float support is often disabled in MSP430 builds: print scaled integers instead.

## Operators
@id operators
@keywords arithmetic integer division modulo increment cast compound assignment comparison logical
@setup int a = 7, b = 2, i = 0; float f;
- Integer division :: a / b    // 3, truncates
- Remainder :: a % b
- Float division :: f = (float)a / b;
- Increment :: i++; ++i; i += 2;
- Compare :: a == b; a != b; a >= b;
- Logic :: (a > 0) && (b > 0); !a;
- Cast :: (uint16_t)a
- Ternary :: int m = (a > b) ? a : b;
> = assigns, == compares. if (x = 0) compiles and is always false.

## Conditionals
@id if-else
@keywords if else switch case break default ternary
@setup int v = 0, mode = 0; void start(void); void stop(void);
```c If / else if / else
if (v > 100) {
    start();
} else if (v < 0) {
    stop();
} else {
    v = 0;
}
```
```c Switch
switch (mode) {
case 0:
    start();
    break;
case 1:
case 2:            // falls through: shared code
    stop();
    break;
default:
    break;
}
```
- Ternary :: int s = (v >= 0) ? 1 : -1;
> Forgetting break falls into the next case.

## Loops
@id for-loop
@keywords for while do break continue infinite loop iterate
@setup int n = 10, data[10] = {0}; bool done = false;
- Count :: for (int i = 0; i < n; i++) { }
- Count down :: for (int i = n - 1; i >= 0; i--) { }
- Over an array :: for (size_t i = 0; i < sizeof data / sizeof data[0]; i++) { }
- While :: while (!done) { }
- Do-while (runs once) :: do { n--; } while (n > 0);
- Forever (main loop) :: for (;;) { }
- Skip / leave the loop :: for (…) { if (bad) continue; if (done) break; }
> A size_t counter counting down never goes below 0: use int or count up.

## Functions
@id functions
@keywords function prototype declaration definition void return pointer static inline parameters
@setup typedef struct { float mean, sd; } Stats;
- Prototype (in .h) :: float scale(uint16_t raw, float gain);
```c Definition
float scale(uint16_t raw, float gain)
{
    return raw * gain;
}
```
- No arguments :: void reset(void);
- Private to this file :: static int helper(int x) { return x * 2; }
- Change caller's variable :: void clamp(int *x) { if (*x < 0) *x = 0; }
- Return two values :: void minmax(const int *a, size_t n, int *lo, int *hi);
- Return a struct :: Stats stats(const float *x, size_t n);
- Read-only array param :: float mean(const float *x, size_t n);
- Small and hot :: static inline int sq(int x) { return x * x; }
> Arrays passed to functions become pointers: always pass the length too.

# Data

## Arrays
@id arrays
@keywords array declare initialize length sizeof 2d matrix copy
@setup int a[5] = {0}; int b[5]; float m[3][4];
- Declare :: int samples[64];
- Initialise :: int p[4] = {1, 2, 3, 4};
- All zeros :: uint16_t buf[32] = {0};
- Length :: sizeof a / sizeof a[0]
- Length macro :: #define LEN(x) (sizeof(x) / sizeof((x)[0]))
- 2D :: m[1][2] = 0.5f;
- Copy :: memcpy(b, a, sizeof a);
- Fill :: memset(a, 0, sizeof a);
- Compare :: memcmp(a, b, sizeof a) == 0
> No bounds checking: a[5] on a 5-element array is undefined behaviour.

## Strings
@id strings
@keywords string char array strlen strcpy strncpy strcmp strchr strtok strtol atoi sscanf concatenate
@setup char s[32] = "12,3.5"; char d[32]; const char *p; char *end; long n; int a; float f;
- Literal :: const char *msg = "OK";
- Buffer :: char name[16] = "WE1";
- Length :: strlen(s)
- Copy safely :: snprintf(d, sizeof d, "%s", s);
- Append :: strncat(d, "!", sizeof d - strlen(d) - 1);
- Equal :: strcmp(s, "START") == 0
- Starts with :: strncmp(s, "CV", 2) == 0
- Find char :: p = strchr(s, ',');
- Find text :: p = strstr(s, "3.5");
- To integer :: n = strtol(s, &end, 10);
- To float :: f = strtof(p + 1, NULL);
- Parse fields :: sscanf(s, "%d,%f", &a, &f);
- Split on commas :: for (char *t = strtok(s, ","); t; t = strtok(NULL, ",")) { }
> Strings end with '\0': a 16-char buffer holds 15 characters.

## Pointers
@id pointers
@keywords pointer address dereference null arithmetic const arrow function pointer
@setup int x = 1, arr[4] = {0}; int *p = &x; int *q = arr; typedef struct { int id; } Node; Node node; Node *np = &node;
- Address of :: int *p = &x;
- Value at :: *p = 5;
- Null check :: if (p != NULL) { }
- Array as pointer :: int *q = arr;    // &arr[0]
- Step through :: *(q + 2) = 7;    // arr[2]
- Struct via pointer :: np->id = 3;    // (*np).id
- Read-only target :: const int *rp = &x;
- Fixed pointer :: int *const fp = &x;
- Pointer to pointer :: int **pp = &p;
- Function pointer :: void (*cb)(int) = NULL;
- Generic pointer :: void *raw = &x;
> Read declarations right to left: const int *p is "pointer to const int".

## Structs and enums
@id structs
@keywords struct typedef enum union designated initializer packed member
```c Struct type
typedef struct {
    uint16_t id;
    float gain;
    int32_t offset_uV;
} Channel;
```
@setup typedef struct { uint16_t id; float gain; int32_t offset_uV; } Channel; Channel ch; typedef enum { MODE_IDLE, MODE_CV, MODE_LSV } Mode;
- Designated init :: Channel ch = {.id = 1, .gain = 2.0f};
- Member :: ch.gain = 1.5f;
- Copy :: Channel c2 = ch;
- Array of structs :: Channel chans[4] = {0};
- Enum :: typedef enum { MODE_IDLE, MODE_CV, MODE_LSV } Mode;
- Enum value :: Mode m = MODE_CV;
- Union (same bytes, two views) :: union { float f; uint32_t u; } fu;
> Structs may contain padding: don't send one over UART with sizeof and expect a fixed layout.

## Memory
@id memory-allocation
@keywords malloc calloc realloc free heap stack memcpy memset sizeof leak
@setup size_t n = 10; float *x; int *c;
- Allocate :: float *x = malloc(n * sizeof *x);
- Zeroed :: int *c = calloc(n, sizeof *c);
- Check it :: if (x == NULL) { return -1; }
- Grow :: float *t = realloc(x, 2 * n * sizeof *x);
- Free :: free(c); c = NULL;
> Avoid the heap in firmware: use static or global buffers sized at compile time.

# Embedded

## Bit manipulation
@id bitwise-operators
@keywords bit set clear toggle test mask shift and or xor not register field flag
@setup uint8_t reg = 0; uint16_t word = 0; uint8_t flags = 0; uint8_t hi, lo;
@setup #define FLAG_READY (1u << 0)
- Set bit n :: reg |= (1u << 3);
- Clear bit n :: reg &= ~(1u << 3);
- Toggle :: reg ^= (1u << 3);
- Test :: if (reg & (1u << 3)) { }
- Several bits :: reg |= (1u << 0) | (1u << 2);
- Read a field (bits 4–7) :: uint8_t f = (reg >> 4) & 0x0F;
- Write a field :: reg = (reg & ~0xF0) | ((5u << 4) & 0xF0);
- High / low byte :: hi = word >> 8; lo = word & 0xFF;
- Join bytes :: word = ((uint16_t)hi << 8) | lo;
- Flag constants :: #define FLAG_READY (1u << 0)
- Check flag :: if (flags & FLAG_READY) { }
> Use unsigned types for bit work: shifting signed negatives is implementation-defined.

## Integer and fixed-point maths
@id fixed-point
@keywords adc scale volts millivolts overflow promotion fixed point q15 rounding average integer maths
@setup uint16_t raw = 2048; int32_t sum = 0, x = 0, d = 1, avg; int16_t q = 0; uint16_t a = 1, b = 2; long lx = 0; float f = 0;
@setup #define MAX 100
- ADC to mV (12-bit, 2.5 V) :: int32_t mV = (int32_t)raw * 2500 / 4095;
- Multiply before divide :: (x * 1000) / 4095    // not x / 4095 * 1000
- Widen first :: (uint32_t)a * b
- Round to nearest :: (x + d / 2) / d
- Average by shift :: avg = sum >> 3;    // divide by 8
- Q15 multiply :: int16_t r = (int16_t)(((int32_t)q * q) >> 15);
- Clamp :: if (x > MAX) x = MAX;
- Absolute :: abs(x); labs(lx); fabsf(f);
> uint16_t * uint16_t is computed as 16-bit int on MSP430 and overflows: cast to uint32_t first.

## Registers and MSP430
@id msp430
@check skip
@keywords msp430 register port gpio watchdog interrupt isr pragma vector lpm low power delay timer adc
- Include :: #include <msp430.h>
- Stop watchdog :: WDTCTL = WDTPW | WDTHOLD;
- Pin as output :: P1DIR |= BIT0;
- Set / clear pin :: P1OUT |= BIT0; P1OUT &= ~BIT0;
- Toggle LED :: P1OUT ^= BIT0;
- Read input :: if (P1IN & BIT3) { }
- Pull-up :: P1REN |= BIT3; P1OUT |= BIT3;
- Unlock GPIO (FRAM parts) :: PM5CTL0 &= ~LOCKLPM5;
- Busy wait :: __delay_cycles(1000);
- Enable interrupts :: __enable_interrupt();
- Sleep until ISR :: __bis_SR_register(LPM3_bits | GIE);
- Wake from ISR :: __bic_SR_register_on_exit(LPM3_bits);
```c Interrupt service routine
#pragma vector = TIMER0_A0_VECTOR
__interrupt void timer_isr(void)
{
    tick = 1;    // volatile, read in main loop
}
```
- Atomic section :: __disable_interrupt(); …; __enable_interrupt();
> Keep ISRs short: set a volatile flag, do the work in the main loop.

## Bytes and buffers
@id bytes
@keywords bytes packet uart little endian big endian checksum crc ring buffer circular memcpy serialize
@setup uint8_t buf[16]; uint16_t v = 0x1234; uint32_t w = 0; uint8_t sum = 0; uint8_t head = 0, tail = 0; uint8_t ring[16]; uint8_t byte = 0;
- Little-endian out :: buf[0] = v & 0xFF; buf[1] = v >> 8;
- Little-endian in :: v = buf[0] | ((uint16_t)buf[1] << 8);
- Big-endian 32-bit :: w = ((uint32_t)buf[0] << 24) | ((uint32_t)buf[1] << 16) | ((uint32_t)buf[2] << 8) | buf[3];
- Raw copy :: memcpy(&w, buf, sizeof w);
- Checksum :: for (int i = 0; i < 8; i++) sum += buf[i];
- Ring buffer push (size 16) :: ring[head] = byte; head = (head + 1) & 15;
- Ring buffer empty :: head == tail
> Build packets byte by byte with shifts: portable regardless of CPU endianness.

## Preprocessor
@id headers-and-includes
@keywords define macro include guard ifdef ifndef pragma once conditional compile static_assert debug
- Constant :: #define SAMPLE_HZ 100
- Macro (parenthesise!) :: #define SQ(x) ((x) * (x))
- Own header :: #include "adc.h"
- Library header :: #include <stdint.h>
```c Include guard
#ifndef ADC_H
#define ADC_H

uint16_t adc_read(uint8_t channel);

#endif
```
- Debug-only code :: #ifdef DEBUG … #endif
- Compile-time check :: _Static_assert(sizeof(uint32_t) == 4, "u32");
- Line / file :: printf("%s:%d\n", __FILE__, __LINE__);
> Declarations go in .h, definitions in .c; a global used across files is extern in the .h.

# Files and build

## Files
@id reading-a-file
@keywords fopen fclose fprintf fgets fscanf fread fwrite file read write csv
@setup char line[128]; float t, v; FILE *out;
```c Read a CSV line by line
FILE *f = fopen("run.csv", "r");
if (f == NULL) { perror("run.csv"); return 1; }
while (fgets(line, sizeof line, f)) {
    if (sscanf(line, "%f,%f", &t, &v) == 2) { /* use t, v */ }
}
fclose(f);
```
- Open for writing :: FILE *out = fopen("out.csv", "w");
- Write a row :: fprintf(out, "%.4f,%.6e\n", t, v);
- Binary write :: fwrite(&v, sizeof v, 1, out);
- Close :: fclose(out);

## Command-line programs
@id command-line-arguments
@keywords main argc argv arguments exit return code stderr
@setup int argc; char **argv;
- Entry point :: int main(int argc, char *argv[]) { … }
- Argument count check :: if (argc < 2) { fprintf(stderr, "usage: %s file\n", argv[0]); return 1; }
- Argument as number :: long n = strtol(argv[1], NULL, 10);
- Exit early :: exit(EXIT_FAILURE);

## Compile and build
@id compiling
@keywords gcc clang compile link flags warnings make makefile debug optimize msp430-elf-gcc
```bash Compile and run
gcc -std=c17 -Wall -Wextra -O2 -o analyse main.c stats.c -lm
./analyse data.csv
```
```bash Debug build with checks
gcc -g -O0 -fsanitize=address,undefined main.c -o analyse
```
```bash MSP430
msp430-elf-gcc -mmcu=msp430fr2433 -Os -o fw.elf main.c
```
```bash Makefile
CFLAGS = -std=c17 -Wall -Wextra -O2
analyse: main.o stats.o
	$(CC) -o $@ $^ -lm
```
> -lm links the maths library; undefined reference errors are link errors, not compile errors.

## Debugging and errors
@id error-handling
@keywords assert errno perror segfault undefined behaviour return codes debugging
@setup int ok = 1; int *p = 0;
- Assert :: assert(p != NULL);
- Error message :: perror("fopen");
- Return code :: if (!ok) return -1;
- Error code enum :: typedef enum { ERR_OK, ERR_TIMEOUT, ERR_RANGE } Err;
> Segfault: null or freed pointer, or out-of-bounds index. Garbage values: uninitialised variable.

# Switching languages

## Coming from Python and MATLAB
@id gotchas
@keywords difference python matlab compare switch translate versus
@setup int a = 7, b = 2, i = 0, n = 4, x[4] = {0}; float f;
- Integer division :: a / b    // 3, not 3.5
- Float division :: (float)a / b
- Power :: pow(2.0, 10)    // ^ is XOR
- Logic :: a && b || !i    // Python: and, or, not
- Not equal :: a != b    // MATLAB ~=
- Increment :: i++;
- Last element :: x[n - 1]    // no x[-1] or end
- Comment :: // line   /* block */
- Declare before use :: int count = 0;
> 0-based like Python; arrays don't know their length; every statement ends with ;
