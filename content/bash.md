---
name: Bash
symbol: $_
order: 7
color: #a7d4b4
version: Bash 4+ / zsh notes
highlight: bash
description: Glue for everything. Quote your variables.
---

# Concepts

## Terminal, shell and Bash
@id concept-shell
@kind concept
@keywords terminal shell bash zsh what is command line prompt explain
@diff The terminal is the window; the shell runs your commands.

What the pieces are called, and why some commands differ between machines.

- **Terminal**: the app with the window (Terminal, iTerm, VS Code's panel).
- **Shell**: the program inside it that reads what you type and runs it. macOS uses **zsh** by default; Linux servers and clusters usually use **bash**. Almost everything here works in both.
- **Command**: a program (`ls`, `python3`, `git`) followed by **options** (`-l`, `--all`) and **arguments** (file names).

```bash
echo "$SHELL"          # which shell you're using
ls -l -a Documents     # command, options, argument
ls -la Documents       # short options can be combined
man ls                 # the manual page (q to quit)
ls --help              # short help (Linux; on macOS use man)
```

macOS ships BSD versions of tools like `sed`, `date` and `find`, which differ slightly from the GNU versions on Linux. If a command works on the cluster but not on your Mac, that's usually why.

## Paths explained
@id concept-paths
@kind concept
@keywords path absolute relative home ~ . .. directory folder explain
@diff / is the root, ~ is home, . is here, .. is up one.

How to name a file or folder anywhere on the system.

The filesystem is a tree. **Absolute** paths start at the root `/` and work from anywhere. **Relative** paths start from your **current directory** (shown by `pwd`).

```bash
/Users/george/phd/data/run1.csv   # absolute (macOS home lives under /Users)
~/phd/data/run1.csv               # ~ means your home folder
data/run1.csv                     # relative to where you are now
./run.sh                          # . is the current folder
../figures/plot.png               # .. is the parent folder
../../                            # two levels up
```
@check skip

- Names with spaces need quotes or a backslash: `cd "My Drive"` or `cd My\ Drive`.
- Paths are case-sensitive on Linux; macOS usually isn't, which can hide bugs until code runs on a server.
- Drag a file from Finder into the terminal to paste its full path.

## How commands are found (PATH)
@id concept-path-var
@kind concept
@keywords PATH command not found which where executable install explain
@diff The shell searches the folders in $PATH, in order.

Why you get `command not found`, and why the "wrong" Python sometimes runs.

When you type `python3`, the shell looks through each folder listed in the `PATH` variable, in order, and runs the first match. A program outside those folders must be run with its path (`./myprogram`).

```bash
echo "$PATH" | tr ':' '\n'         # the folders searched, in order
which python3                      # which one actually runs
type -a python3                    # every match on the PATH
export PATH="$HOME/bin:$PATH"      # add a folder (this session only)
./my_program                       # run a program in the current folder
```

To make a `PATH` change permanent, add the `export` line to `~/.zshrc` (Mac) or `~/.bashrc` (Linux), then open a new terminal.

## Input, output and pipes
@id concept-streams
@kind concept
@keywords stdin stdout stderr stream pipe redirect explain
@diff Every program has stdin, stdout and stderr.

Every program gets three streams: **stdin** (input, normally the keyboard), **stdout** (normal output) and **stderr** (error messages). Both outputs go to the screen unless you redirect them.

A pipe `|` connects one program's stdout to the next program's stdin, so small tools combine into bigger ones.

```bash
ls -1 data/ | wc -l                   # count the files in data/
python3 sim.py > out.txt              # stdout to a file; errors still on screen
python3 sim.py > out.txt 2> err.txt   # stdout and stderr to separate files
python3 sim.py > all.txt 2>&1         # both into one file
sort < names.txt                      # a file as stdin
```

## Exit status
@id concept-exit
@kind concept
@keywords exit status code $? success failure 0 explain
@diff 0 means success; anything else means failure.

Every command finishes with a number: **0 means success**, anything else means failure. That's what `if`, `&&` and `||` check.

This is the same number a C program returns from `main`, or passes to `exit()`.

```bash
ls /nonexistent
echo $?                    # 1 (or 2): it failed
ls ~
echo $?                    # 0: it worked

./compile.sh && ./run.sh   # run only if compiling succeeded
grep -q "ERROR" log.txt || echo "clean run"
```

# Basics

## Script setup
@id setup
@keywords shebang set -euo pipefail strict mode chmod executable script
@diff #!/usr/bin/env bash plus strict mode.

Start every script like this.

```bash
#!/usr/bin/env bash
set -euo pipefail        # exit on error, unset variables, failed pipes
IFS=$'\n\t'              # safer word splitting

main() {
    echo "Hello from $0"
}
main "$@"
```

Make it executable with `chmod +x script.sh`, run it with `./script.sh`. macOS ships Bash 3.2 — install a newer one with Homebrew for associative arrays and other 4.x features.

## Variables
@keywords variable assignment export readonly quote
@diff No spaces around =; read with $name.

Assign and use variables.

```bash
name="Ada"               # no spaces around =
count=3
echo "$name has $count items"
echo "${name}_backup"    # braces separate the name from text
readonly PI=3.14159
export PATH="$HOME/bin:$PATH"   # visible to child processes
unset count
```

`name = "Ada"` (with spaces) runs a command called `name`. Always quote expansions: `"$name"`.

## Quoting
@id quoting
@keywords quotes single double escape word splitting globbing $'...'
@diff Double quotes expand; single quotes don't.

Control expansion and word splitting.

```bash
name="Ada Lovelace"
echo "Hello $name"       # Hello Ada Lovelace  — expands
echo 'Hello $name'       # Hello $name         — literal
echo "Cost: \$5"         # escape inside double quotes
echo $'tab:\there'       # ANSI-C escapes
file="my report.txt"
touch "$file"            # one file
touch $file              # two files: "my" and "report.txt"!
```

Unquoted variables are split on spaces and glob-expanded. Quote them unless you specifically want that.

## Arithmetic
@id operators
@keywords arithmetic math $(( )) let expr increment integer bc
@diff $(( )) for integers; bc for decimals.

Integer maths and comparisons.

```bash
a=7
b=2
echo $(( a + b ))        # 9
echo $(( a / b ))        # 3 — integers only
echo $(( a % b ))        # 1
echo $(( a ** 2 ))       # 49
(( a++ ))
(( a > 5 )) && echo "big"
echo "scale=2; 7 / 2" | bc   # 3.50 for decimals
```

Inside `$(( ))` you don't need `$` before variable names.

## Comments
@keywords comment # multiline heredoc

Leave notes in scripts.

```bash
# A single-line comment
echo "hi"   # trailing comment

: <<'COMMENT'
A multi-line "comment" using a no-op heredoc.
COMMENT
```

## Printing output
@id print
@keywords echo printf stdout stderr output newline
@diff echo for simple; printf for reliable formatting.

Write to the terminal.

```bash
echo "Hello"
echo -n "no newline"
printf "%s has %d items\n" "Ada" 3
printf "%.2f\n" 3.14159
printf "%-10s|%5d|\n" "name" 42
echo "error" >&2         # to stderr
```

`printf` behaves the same everywhere; `echo` flags vary between shells.

## Command substitution
@id substitution
@keywords $( ) backticks capture output command substitution
@diff $(command) captures output.

Capture a command's output.

```bash
today=$(date +%Y-%m-%d)
files=$(ls | wc -l)
echo "Today is $today; $files files here"
branch="$(git rev-parse --abbrev-ref HEAD)"
```

Prefer `$(...)` over backticks — it nests and reads better.

## Reading input
@id input
@keywords read prompt user input -p -s password
@diff read -r into a variable.

Ask the user for input.

```bash
read -r -p "Name: " name
read -r -s -p "Password: " password; echo   # -s hides input
read -r -p "Continue? [y/N] " answer
if [[ $answer == [yY] ]]; then
    echo "Continuing"
fi
```

Always use `-r` so backslashes are kept literally.

# Strings

## String operations
@id string-methods
@keywords length uppercase lowercase replace substring parameter expansion trim
@diff ${var...} parameter expansion.

Manipulate strings without external tools.

```bash
s="Hello World"
echo "${#s}"              # 11 — length
echo "${s^^}"             # HELLO WORLD (Bash 4+)
echo "${s,,}"             # hello world (Bash 4+)
echo "${s/World/Bash}"    # replace first
echo "${s//o/0}"          # replace all: Hell0 W0rld
[[ $s == *World* ]] && echo "contains World"
[[ $s == Hello* ]] && echo "starts with Hello"
```

## Substrings and trimming
@id slicing
@keywords substring offset length strip prefix suffix extension basename # % ##
@diff ${s:offset:len}; # and % strip patterns.

Cut strings and strip prefixes or suffixes.

```bash
s="abcdef"
echo "${s:1:3}"           # bcd
echo "${s: -2}"           # ef (note the space)
file="archive.tar.gz"
echo "${file%.*}"         # archive.tar  — remove shortest suffix
echo "${file%%.*}"        # archive      — remove longest suffix
echo "${file#*.}"         # tar.gz       — remove shortest prefix
echo "${file##*.}"        # gz           — the extension
path="/home/ada/notes.txt"
echo "${path##*/}"        # notes.txt    — like basename
echo "${path%/*}"         # /home/ada    — like dirname
```

`#` trims from the front, `%` from the back; doubling makes it greedy.

## Default values
@id default-args
@keywords default value unset empty ${var:-} ${var:=} ${var:?} required
@diff ${var:-default} and friends.

Fallbacks for unset or empty variables.

```bash
echo "${NAME:-guest}"          # use "guest" if NAME is unset or empty
: "${PORT:=8080}"              # assign the default if unset
echo "$PORT"
file="${1:?usage: script FILE}"   # exit with a message if missing
```

## Splitting strings
@id split
@keywords split IFS read -a delimiter tokenize array
@diff IFS + read -a.

Split text on a delimiter.

```bash
csv="a,b,c"
IFS=',' read -r -a parts <<< "$csv"
echo "${parts[1]}"        # b
for part in "${parts[@]}"; do
    echo "$part"
done
```

Setting `IFS` on the same line as `read` only affects that command.

# Control flow

## If / else
@id if
@keywords if then elif else fi test [[ ]] condition
@diff if [[ condition ]]; then … fi

Choose a branch.

```bash
temperature=25
if (( temperature > 30 )); then
    echo "Hot"
elif (( temperature > 20 )); then
    echo "Warm"
else
    echo "Cool"
fi

if [[ -f config.txt && $USER == "ada" ]]; then
    echo "found config"
fi
```

Use `(( ))` for numbers and `[[ ]]` for strings and files. The spaces inside `[[ ` and ` ]]` are required.

## Test operators
@id tests
@keywords test -f -d -e -z -n -eq -lt == != file exists empty string compare
@diff [[ ]] with -f, -z, ==, -lt …

Conditions for files, strings and numbers.

```bash
[[ -e path ]]     # exists
[[ -f path ]]     # regular file
[[ -d path ]]     # directory
[[ -r path ]]     # readable;  -w writable, -x executable
[[ -s path ]]     # exists and is not empty
[[ -z $s ]]       # string is empty
[[ -n $s ]]       # string is not empty
[[ $a == "$b" ]]  # strings equal (quoted right side = literal)
[[ $a == *.txt ]] # glob pattern match
[[ $a =~ ^[0-9]+$ ]]   # regex match
[[ $x -lt 5 ]]    # numeric: -eq -ne -lt -le -gt -ge
```

## Exit codes and && ||
@id errors
@keywords exit status $? && || true false command success failure
@diff 0 is success; && and || chain on exit status.

Act on success or failure.

```bash
mkdir -p build && cd build          # run second only if first succeeds
grep -q "TODO" notes.txt || echo "no TODOs"
if ! command -v git >/dev/null; then
    echo "git is not installed" >&2
    exit 1
fi
cp a.txt b.txt
echo "exit code: $?"                # 0 = success
```

With `set -e`, a failing command stops the script — except in `if` conditions and `&&`/`||` chains.

## For loop
@id for
@keywords for loop range seq list files glob C-style
@diff for x in list; do … done

Loop over lists, ranges and files.

```bash
for name in Ada Alan Grace; do
    echo "$name"
done

for i in {1..5}; do         # 1 2 3 4 5
    echo "$i"
done

for (( i = 0; i < 10; i += 2 )); do
    echo "$i"
done

for file in *.txt; do
    [[ -e $file ]] || continue   # no matches: the pattern stays literal
    echo "Processing $file"
done
```

`{1..$n}` doesn't work with variables — use `seq 1 "$n"` or the C-style loop.

## While loop
@id while
@keywords while until loop counter condition
@diff while condition; do … done

Repeat while a condition holds.

```bash
count=0
while (( count < 3 )); do
    (( count++ ))
done

until ping -c1 example.com >/dev/null 2>&1; do
    sleep 1
done
```

## Reading lines
@id iterate
@keywords while read line file loop each line IFS
@diff while IFS= read -r line; do … done < file

Process a file or command output line by line.

```bash
while IFS= read -r line; do
    echo "Line: $line"
done < input.txt

git branch --format='%(refname:short)' | while IFS= read -r branch; do
    echo "branch: $branch"
done
```

Variables set inside a piped `while` loop are lost afterwards (it runs in a subshell). Use `done < <(command)` to keep them.

## Break and continue
@id loop-control
@keywords break continue exit loop skip
@diff break and continue; break 2 exits two loops.

Leave a loop early or skip an iteration.

```bash
for i in {1..10}; do
    (( i % 2 == 0 )) && continue
    (( i > 7 )) && break
    echo "$i"            # 1 3 5 7
done
```

## Case
@id switch
@keywords case esac pattern match switch options
@diff case … in pattern) … ;; esac

Match a value against patterns.

```bash
read -r -p "Command: " cmd
case "$cmd" in
    start|run)
        echo "Starting"
        ;;
    stop)
        echo "Stopping"
        ;;
    *.txt)
        echo "A text file"
        ;;
    *)
        echo "Unknown: $cmd"
        ;;
esac
```

# Functions

## Functions
@id function
@keywords function local return arguments $1 echo output
@diff name() { … }; arguments are $1, $2 …

Group commands into reusable functions.

```bash
greet() {
    local name="$1"            # local keeps it out of global scope
    local greeting="${2:-Hello}"
    echo "$greeting, $name"
}

greet "Ada"
greet "Ada" "Hi"
message=$(greet "Alan")        # capture the "return value"
```

`return` only sets an exit status (0–255). To return data, `echo` it and capture with `$(...)`.

## Function results
@id multiple-return
@keywords return status output value true false capture
@diff Return a status; echo the data.

Return success/failure and output.

```bash
is_even() {
    (( $1 % 2 == 0 ))          # exit status of the last command is returned
}

if is_even 4; then
    echo "even"
fi

min_max() {
    printf '%s\n' "$@" | sort -n | sed -n '1p;$p' | tr '\n' ' '
}
read -r low high <<< "$(min_max 3 1 4)"
echo "$low $high"              # 1 4
```

## Script arguments
@id args
@keywords arguments $1 $@ $# $0 shift parameters command line
@diff $1…$9, "$@" for all, $# for count.

Read arguments passed to a script or function.

```bash
echo "Script: $0"
echo "First: ${1:-none}"
echo "Count: $#"
for arg in "$@"; do          # "$@" keeps each argument intact
    echo "arg: $arg"
done
shift                        # drop $1; $2 becomes $1
```

Always write `"$@"` with quotes; `$*` and unquoted `$@` break arguments containing spaces.

## Options with getopts
@id options
@keywords getopts flags options -v -o parse arguments usage
@diff getopts "vo:" opt

Parse `-v` style flags.

```bash
verbose=false
output="out.txt"
while getopts "vo:h" opt; do
    case "$opt" in
        v) verbose=true ;;
        o) output="$OPTARG" ;;
        h) echo "usage: $0 [-v] [-o FILE] ARGS"; exit 0 ;;
        *) exit 1 ;;
    esac
done
shift $(( OPTIND - 1 ))      # remaining arguments are now in $@
echo "verbose=$verbose output=$output rest=$*"
```

`getopts` only handles single-letter options. A `:` after a letter means it takes a value.

# Collections

## Arrays
@id array
@keywords array index append length loop elements @
@diff arr=(a b c); "${arr[@]}" for all elements.

Indexed lists.

```bash
fruits=("apple" "banana" "cherry")
echo "${fruits[0]}"          # apple
echo "${fruits[-1]}"         # cherry (Bash 4.3+)
echo "${#fruits[@]}"         # 3 — length
fruits+=("date")             # append
for fruit in "${fruits[@]}"; do
    echo "$fruit"
done
echo "${fruits[@]:1:2}"      # banana cherry — slice
unset 'fruits[1]'            # remove (leaves a gap in indexes)
files=(*.txt)                # array from a glob
```

`$fruits` alone means `${fruits[0]}`. Always use `"${fruits[@]}"` for all elements.

## Associative arrays
@id dict
@keywords associative array dictionary map declare -A key value
@diff declare -A (Bash 4+).

Key–value maps.

```bash
declare -A ages
ages[ada]=36
ages[alan]=41
echo "${ages[ada]}"
[[ -v ages[bob] ]] || echo "no bob"
for name in "${!ages[@]}"; do       # keys
    echo "$name is ${ages[$name]}"
done
unset 'ages[alan]'
```

Not available in macOS's default Bash 3.2 (zsh has them as `typeset -A`).

## Sorting and uniqueness
@id sort
@keywords sort uniq -n -r -k numeric reverse count duplicates
@diff sort | uniq pipelines.

Sort lines and count duplicates.

```bash
sort names.txt                  # alphabetical
sort -n numbers.txt             # numeric
sort -rn numbers.txt            # numeric, descending
sort -t, -k2 -n data.csv        # by 2nd comma-separated field
sort -u names.txt               # sorted and deduplicated
sort words.txt | uniq -c | sort -rn | head   # top frequencies
mapfile -t sorted < <(printf '%s\n' "${fruits[@]}" | sort)
```

`uniq` only removes **adjacent** duplicates — sort first.

# Files & I/O

## Redirection
@id write-file
@keywords redirect > >> 2> 2>&1 /dev/null stdout stderr append tee
@diff > overwrite, >> append, 2>&1 merge stderr.

Send output to files.

```bash
echo "hello" > out.txt          # overwrite
echo "more" >> out.txt          # append
command_that_fails 2> errors.log
make > build.log 2>&1           # stdout and stderr to one file
make &> build.log               # same, Bash shorthand
quiet_command > /dev/null 2>&1  # discard everything
echo "both" | tee log.txt       # screen and file
echo "both" | tee -a log.txt    # append
```

Order matters: `> file 2>&1` works; `2>&1 > file` doesn't redirect stderr to the file.

## Reading files
@id read-file
@keywords cat head tail less read file wc mapfile
@diff cat/head/tail, or mapfile into an array.

View and read files.

```bash
cat file.txt
head -n 20 file.txt
tail -n 20 file.txt
tail -f app.log                  # follow as it grows
wc -l file.txt                   # count lines
mapfile -t lines < file.txt      # read into an array (Bash 4+)
echo "${#lines[@]} lines"
content=$(<file.txt)             # whole file into a variable
```

## Here documents
@id heredoc
@keywords heredoc here document here string <<EOF <<< multiline
@diff <<EOF for blocks; <<< for a single string.

Feed multi-line text to a command.

```bash
name="Ada"
cat <<EOF > config.txt
user=$name
home=$HOME
EOF

cat <<'EOF'
Literal: $name is not expanded
EOF

grep -c "a" <<< "banana"         # here-string: 1 line matches
```

Use `<<-EOF` to allow leading tabs (not spaces) to be stripped.

## Pipes
@id pipes
@keywords pipe | xargs process substitution <( ) chain commands
@diff | connects stdout to stdin.

Chain commands together.

```bash
ps aux | grep python | grep -v grep
cat access.log | cut -d' ' -f1 | sort | uniq -c | sort -rn | head -5
find . -name "*.log" -print0 | xargs -0 rm -f
diff <(sort a.txt) <(sort b.txt)       # process substitution
```

With `set -o pipefail`, a pipeline fails if any command in it fails, not just the last.

## Files and directories
@id paths
@keywords mkdir cp mv rm ln touch basename dirname realpath ls directory
@diff mkdir -p, cp -r, rm -r …

Everyday file operations.

```bash
mkdir -p project/src/utils       # create parents as needed
cp -r src/ backup/               # copy a directory
mv old.txt new.txt               # rename or move
rm -i file.txt                   # ask before deleting
rm -r build/                     # delete a directory
ln -s /path/to/target link       # symbolic link
touch notes.txt                  # create or update timestamp
basename /a/b/file.txt .txt      # file
dirname /a/b/file.txt            # /a/b
ls -lah                          # long, all, human sizes
du -sh *                         # size of each item
```

## Find
@id find
@keywords find files name type mtime size exec delete search filesystem
@diff find PATH -name PATTERN -type f

Search for files.

```bash
find . -name "*.py"                       # by name
find . -iname "readme*"                   # case-insensitive
find . -type d -name node_modules -prune  # directories
find . -type f -size +10M                 # larger than 10 MB
find . -mtime -1                          # modified in the last day
find . -name "*.tmp" -delete
find . -name "*.sh" -exec chmod +x {} +
```

Quote the pattern (`"*.py"`) so the shell doesn't expand it first.

## Grep
@id grep
@keywords grep search text pattern regex -r -i -n -v -l -E
@diff grep [options] PATTERN [files]

Search inside files.

```bash
grep "error" app.log
grep -i "error" app.log          # case-insensitive
grep -n "TODO" *.py              # show line numbers
grep -r "useState" src/          # recursive
grep -rl "deprecated" .          # only file names
grep -v "^#" config.ini          # lines NOT matching
grep -c "warn" app.log           # count matching lines
grep -E "error|warn" app.log     # extended regex
grep -A 3 -B 1 "panic" app.log   # context after/before
```

`rg` (ripgrep) is a faster alternative that respects `.gitignore`.

## Sed and awk
@id sed-awk
@keywords sed awk replace in place column field print edit text
@diff sed for substitutions; awk for columns.

Edit and extract text from the command line.

```bash
sed 's/old/new/' file.txt          # first match per line
sed 's/old/new/g' file.txt         # all matches
sed -i.bak 's/foo/bar/g' file.txt  # in place, keeping a backup
sed -n '10,20p' file.txt           # print lines 10–20
sed '/^#/d' config.ini             # delete comment lines

awk '{print $1}' access.log                 # first column
awk -F, '{print $2}' data.csv               # comma-separated
awk -F, '$3 > 100 {print $1, $3}' data.csv  # filter rows
awk '{sum += $2} END {print sum}' data.txt  # total a column
```

On macOS, `sed -i` needs an argument: `sed -i '' 's/a/b/' file`. Writing `-i.bak` works on both.

## Archives
@id archives
@keywords tar gzip zip unzip compress extract archive
@diff tar -czf to create; tar -xzf to extract.

Create and extract archives.

```bash
tar -czf backup.tar.gz project/    # create gzip archive
tar -xzf backup.tar.gz             # extract
tar -xzf backup.tar.gz -C /tmp     # extract into a directory
tar -tzf backup.tar.gz             # list contents
zip -r project.zip project/
unzip project.zip
```

Mnemonic: **c**reate / e**x**tract / lis**t**, **z** for gzip, **f** for file.

# System

## Environment variables
@id env
@keywords env export PATH HOME environment variable printenv
@diff export makes a variable visible to children.

Read and set environment variables.

```bash
echo "$HOME" "$USER" "$PWD"
export API_URL="https://example.com"
DEBUG=1 ./run.sh                 # set for one command only
printenv | sort
echo "$PATH" | tr ':' '\n'       # one PATH entry per line
```

Add permanent variables to `~/.zshrc` (macOS default shell) or `~/.bashrc`.

## Processes
@id processes
@keywords ps kill background jobs & wait nohup pid top lsof port
@diff & to background; wait to join; kill PID.

Run, inspect and stop processes.

```bash
long_task &                      # run in the background
pid=$!                           # its process id
wait "$pid"                      # wait for it to finish
jobs                             # background jobs in this shell
ps aux | grep node
kill "$pid"                      # polite (SIGTERM)
kill -9 "$pid"                   # forceful (SIGKILL)
lsof -i :3000                    # what's using port 3000
nohup ./server.sh > server.log 2>&1 &   # survive logout
```

## Traps and cleanup
@id trap
@keywords trap EXIT cleanup temp file mktemp signal INT
@diff trap 'commands' EXIT

Clean up when a script exits.

```bash
tmp=$(mktemp -d)
cleanup() {
    rm -rf "$tmp"
}
trap cleanup EXIT                # runs on normal exit, error or Ctrl+C
trap 'echo "interrupted"; exit 130' INT

echo "working in $tmp"
```

## Dates and timing
@id time
@keywords date format timestamp sleep time measure seconds
@diff date +FORMAT; time CMD; sleep N.

Dates, timestamps and timing.

```bash
date +%Y-%m-%d                   # 2026-10-21
date +%H:%M:%S
date +%s                         # Unix timestamp
stamp=$(date +%Y%m%d-%H%M%S)
cp db.sqlite "backup-$stamp.sqlite"
sleep 2
time ./build.sh                  # how long it took
SECONDS=0; sleep 1; echo "took $SECONDS s"
```

## Downloads and HTTP
@id fetch
@keywords curl wget download http request api json post
@diff curl -fsSL URL

Download files and call APIs.

```bash
curl -fsSL https://example.com/install.sh -o install.sh
curl -s https://api.github.com/repos/git/git | jq '.stargazers_count'
curl -X POST -H "Content-Type: application/json" \
     -d '{"name": "Ada"}' https://httpbin.org/post
curl -I https://example.com      # headers only
```

`-f` fails on HTTP errors, `-s` hides progress, `-S` still shows errors, `-L` follows redirects.

## SSH and remote copy
@id ssh
@keywords ssh scp rsync remote server key copy sync
@diff ssh user@host; rsync -avz src dest.

Connect to and copy between machines.

```bash
ssh ada@server.example.com
ssh -i ~/.ssh/id_ed25519 ada@server "uptime"   # run one command
ssh-keygen -t ed25519 -C "ada@example.com"
ssh-copy-id ada@server
scp report.pdf ada@server:~/docs/
rsync -avz --progress project/ ada@server:~/project/
rsync -avz --delete src/ backup/                # mirror (deletes extras!)
```

With `rsync`, a trailing slash on the source copies its **contents**; without it, the directory itself.

## Permissions
@id permissions
@keywords chmod chown permissions executable rwx 755 644 sudo
@diff chmod +x; chmod 644/755.

Change file permissions and ownership.

```bash
chmod +x script.sh               # make executable
chmod 644 notes.txt              # rw-r--r--
chmod 755 tool                   # rwxr-xr-x
chmod -R u+rwX project/          # recursive, X = dirs only
sudo chown ada:staff file.txt
ls -l file.txt                   # see current permissions
```

Digits: read = 4, write = 2, execute = 1; one digit each for owner, group, others.

## Math with bc and awk
@id math
@keywords bc awk decimal float calculation sqrt
@diff Bash is integers only; use bc or awk.

Floating-point maths from the shell.

```bash
echo "scale=3; 10 / 3" | bc         # 3.333
echo "sqrt(2)" | bc -l              # 1.41421356…
awk 'BEGIN { printf "%.2f\n", 7 / 3 }'   # 2.33
echo $(( RANDOM % 6 + 1 ))          # random 1..6
```

# Getting around

## Navigating folders
@id navigate
@keywords cd pwd ls navigate folder directory move around change directory tab completion
@diff pwd, ls, cd.

Move around the folder tree.

```bash
pwd                  # where am I?
ls                   # what's here?
ls -lh               # details with human-readable sizes
ls -lt | head        # most recently modified first
ls -a                # include hidden files (names starting with .)
cd phd/data          # go into a folder (relative)
cd ..                # up one level
cd ~                 # home (or just: cd)
cd -                 # back to the previous folder
open .               # macOS: open this folder in Finder
tree -L 2            # folder tree, 2 levels (brew install tree)
```

Press **Tab** to complete file and folder names; press it twice to list the options. This saves typing and avoids typos.

## Terminal shortcuts
@id shortcuts
@keywords keyboard shortcuts ctrl history reverse search clear cancel
@diff Ctrl+R searches history; Ctrl+C cancels.

Keys that make the terminal much faster.

```text
Ctrl+C        stop the running command
Ctrl+D        end input / log out of a shell
Ctrl+L        clear the screen (or: clear)
Ctrl+R        search previous commands — type part of it, Enter to run
↑ / ↓         step through history
Ctrl+A / E    jump to start / end of the line
Ctrl+U        delete everything before the cursor
Ctrl+W        delete the previous word
Option+click  move the cursor there (macOS Terminal)
!!            repeat the last command (sudo !! to rerun it as admin)
```

## Looking at files
@id view-files
@keywords less head tail cat open view file quick look column
@diff less for big files; head/tail for ends.

Look inside files without opening an editor.

```bash
less data.csv            # scroll: space/b for pages, /word to search, q to quit
head -n 5 data.csv       # first 5 lines
tail -n 5 log.txt        # last 5 lines
tail -f log.txt          # follow a growing log (Ctrl+C to stop)
wc -l data.csv           # number of lines
column -s, -t < data.csv | less -S   # CSV as aligned columns
open figure.pdf          # macOS: open with the default app
code analysis.py         # open in VS Code (if its command is installed)
```

## Disk space
@id disk-space
@keywords df du disk space full size folder largest files storage quota
@diff df -h for disks, du -sh for folders.

Find out what's using space.

```bash
df -h                            # free space on each disk
du -sh ~/phd                     # total size of a folder
du -sh * | sort -h               # size of each item here, largest last
du -ah . | sort -h | tail -20    # the 20 largest files and folders
find . -type f -size +500M       # files over 500 MB
quota -s                         # your quota on many clusters
```

# Your machine

## Connected USB devices
@id devices-usb
@keywords usb devices connected lsusb system_profiler ioreg hardware plugged in list
@diff macOS: system_profiler SPUSBDataType; Linux: lsusb.

List what's plugged into your computer.

```bash
# macOS
system_profiler SPUSBDataType          # full USB tree with names, vendors, serials
system_profiler SPUSBDataType | grep -E "^\s+[A-Za-z].*:$|Serial"   # just names
ioreg -p IOUSB -l -w 0 | grep -E '"USB Product Name"|"USB Vendor Name"'
system_profiler SPThunderboltDataType  # Thunderbolt / USB-C docks

# Linux
lsusb                                  # one line per device
lsusb -t                               # as a tree
sudo dmesg -w                          # live kernel log: plug a device in and watch
```

On newer macOS, `system_profiler SPUSBHostDataType` may give more detail. On an Apple Silicon Mac, **System Information → USB** shows the same thing graphically.

## Serial ports and boards
@id devices-serial
@keywords serial port tty cu usbmodem usbserial arduino microcontroller baud screen minicom /dev
@diff Look in /dev for tty/cu devices; connect with screen.

Find which port a board (Arduino, microcontroller, instrument) is on, and talk to it.

```bash
ls /dev/cu.* /dev/tty.* 2>/dev/null     # macOS: e.g. /dev/cu.usbmodem14101
ls /dev/ttyUSB* /dev/ttyACM* 2>/dev/null # Linux

# Which one is new? List, plug the device in, then compare
ls /dev/cu.* > before.txt
# ...plug in...
ls /dev/cu.* | diff before.txt -

screen /dev/cu.usbmodem14101 115200     # open a terminal at 115200 baud
# quit screen: Ctrl+A, then K, then y

python3 -m serial.tools.list_ports -v   # with pyserial installed
```

On macOS, use the `cu.` device for connecting out. On Linux, if you get "permission denied", add yourself to the `dialout` group: `sudo usermod -aG dialout $USER`, then log out and back in.

## Disks and drives
@id devices-disks
@keywords diskutil lsblk mount eject external drive usb stick sd card format volume
@diff macOS: diskutil list; Linux: lsblk.

See attached drives and safely eject them.

```bash
# macOS
diskutil list                    # all disks and partitions
diskutil info /Volumes/DATA      # details of one volume
ls /Volumes                      # mounted drives
diskutil eject /Volumes/DATA     # safely eject

# Linux
lsblk -f                         # disks, partitions, filesystems, mount points
findmnt                          # what's mounted where
udisksctl unmount -b /dev/sdb1   # unmount without sudo (desktop Linux)
```

Double-check the disk identifier before running any `diskutil erase…` or `dd` command — they wipe without asking.

## System information
@id system-info
@keywords system info cpu cores memory ram os version uname sw_vers hardware specs
@diff uname -a; sysctl (macOS); nproc/free (Linux).

What machine you're on: OS version, CPU, memory.

```bash
uname -a                         # kernel and architecture (arm64 = Apple Silicon)
sw_vers                          # macOS version
sysctl -n machdep.cpu.brand_string   # macOS CPU name
sysctl -n hw.ncpu                # macOS core count
sysctl -n hw.memsize             # macOS RAM in bytes

nproc                            # Linux core count
free -h                          # Linux memory
lscpu                            # Linux CPU details
cat /etc/os-release              # Linux distribution
```

## Network
@id network
@keywords ip address ifconfig ping wifi network port lsof hostname connectivity
@diff ipconfig getifaddr en0 (macOS); ip addr (Linux).

Check addresses and connectivity.

```bash
ipconfig getifaddr en0           # macOS: your Wi-Fi IP address
ifconfig                         # all interfaces (macOS)
ip addr                          # all interfaces (Linux)
ping -c 3 example.com            # is the network reachable?
curl -I https://example.com      # does a web request work?
lsof -i :8888                    # what's using port 8888 (e.g. Jupyter)
hostname
```

## What's running
@id monitor
@keywords top htop activity cpu memory usage process kill gpu nvidia-smi monitor
@diff top/htop; nvidia-smi for NVIDIA GPUs.

See which programs are using CPU, memory or GPU.

```bash
top -o cpu                      # macOS: sort by CPU (q to quit)
top                             # Linux (press M to sort by memory)
htop                            # nicer, interactive (brew/apt install htop)
ps aux | grep python            # find a process and its PID
kill 12345                      # stop it by PID
pkill -f "python3 train.py"     # stop by matching its command line
nvidia-smi                      # NVIDIA GPU use (on Linux servers)
watch -n 2 nvidia-smi           # refresh every 2 seconds
```

# Research workflows

## Process every data file
@id batch-process
@keywords batch loop files process run program each file results folder
@diff for f in data/*.csv; do …; done

Run the same program on every file in a folder.

```bash
mkdir -p results
for file in data/*.csv; do
    name=$(basename "$file" .csv)               # run1.csv -> run1
    echo "Processing $name"
    python3 analyse.py "$file" > "results/${name}.txt" 2> "results/${name}.err" \
        || echo "FAILED: $name" >> results/failures.log
done
```

To run several at once on a multi-core machine: `ls data/*.csv | xargs -P 4 -I{} python3 analyse.py {}`.

## Run a parameter sweep
@id param-sweep
@keywords parameter sweep loop values nested simulation runs arguments
@diff Nested loops over parameter values.

Run a simulation for every combination of parameters.

```bash
for temp in 280 300 320; do
    for pressure in 1 2 5; do
        out="runs/T${temp}_P${pressure}"
        mkdir -p "$out"
        ./simulate --temp "$temp" --pressure "$pressure" --out "$out" \
            > "$out/log.txt" 2>&1
    done
done
```

## Keep jobs running after you disconnect
@id long-jobs
@keywords tmux screen nohup long running job ssh disconnect background session
@diff tmux new -s name; detach with Ctrl+B D.

Start a long run on a server, log out, and check on it later.

```bash
tmux new -s sim              # start a named session
./long_simulation            # run your job inside it
# detach: Ctrl+B, then D     — it keeps running after you disconnect
tmux ls                      # list sessions
tmux attach -t sim           # reconnect later

nohup ./long_simulation > run.log 2>&1 &   # simpler: no session, just background it
tail -f run.log
```

If your cluster uses a scheduler (Slurm, PBS), submit jobs with `sbatch`/`qsub` instead of running them on the login node.

## Log a run with timestamps
@id run-log
@keywords log tee timestamp date record run output experiment
@diff tee writes output to the screen and a file.

Keep a record of every run's output, while still watching it.

```bash
stamp=$(date +%Y%m%d-%H%M%S)
mkdir -p logs
./experiment --config config.yaml 2>&1 | tee "logs/run-$stamp.log"
echo "exit status: ${PIPESTATUS[0]}" >> "logs/run-$stamp.log"
git rev-parse HEAD >> "logs/run-$stamp.log"   # which version of the code ran
```

`${PIPESTATUS[0]}` is the exit status of the first command in the pipeline, not `tee`'s.

## Rename many files
@id batch-rename
@keywords rename batch files mv loop extension prefix replace spaces
@diff Loop with mv and parameter expansion.

Rename files in bulk safely.

```bash
for f in *.txt; do                       # .txt -> .csv
    mv -n -- "$f" "${f%.txt}.csv"
done

for f in *\ *; do                        # spaces -> underscores
    mv -n -- "$f" "${f// /_}"
done

i=1
for f in IMG_*.jpg; do                   # numbered: sample_001.jpg ...
    mv -n -- "$f" "$(printf 'sample_%03d.jpg' "$i")"
    i=$((i + 1))
done
```

`-n` refuses to overwrite existing files. Test a loop with `echo mv …` first to see what it would do.

## Back up your work
@id backup
@keywords backup rsync external drive copy sync thesis data archive
@diff rsync -a copies only what changed.

Mirror your work to an external drive or server.

```bash
rsync -avh --progress ~/phd/ /Volumes/Backup/phd/            # copy changes only
rsync -avh --delete ~/phd/ /Volumes/Backup/phd/              # exact mirror (deletes extras)
rsync -avh --exclude '.venv' --exclude '*.tmp' ~/phd/ server:~/phd/
rsync -avhn --delete ~/phd/ /Volumes/Backup/phd/             # -n: dry run, show what would happen
```

The trailing `/` on the source matters: `phd/` copies the folder's contents, `phd` copies the folder itself.
