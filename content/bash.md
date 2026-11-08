---
name: Bash
symbol: $_
order: 7
color: #016b40
on: light
version: Bash 4+ · zsh on macOS
highlight: bash
layout: sheet
description: Terminal, scripts and lab workflows.
---

# Getting around

## Navigating
@id navigating
@keywords cd ls pwd folder directory home path open tab completion
- Where am I :: pwd
- Go to folder :: cd ~/Developer/Syntax
- Up one / back :: cd ..; cd -
- Home :: cd ~
- List (long, hidden) :: ls -la
- Newest first :: ls -lt
- Sizes readable :: ls -lh
- Open in Finder :: open .
- Open a file :: open fig.pdf
- Open in VS Code :: code .
> Tab completes names; ↑ recalls the last command; Ctrl-R searches history.

## Files and folders
@id files-and-directories
@keywords mkdir cp mv rm touch copy move delete rename folder
- Make folder(s) :: mkdir -p data/raw
- Copy file :: cp run.csv backup/
- Copy folder :: cp -r data/ data_backup/
- Move / rename :: mv old.csv new.csv
- Delete file :: rm run.csv
- Delete folder :: rm -r old_folder
- Ask before deleting :: rm -i *.tmp
- Empty file :: touch notes.txt
- Link :: ln -s ~/Data/lab data
> rm is permanent — there's no Trash. Check a glob with ls first.

## Looking at files
@id looking-at-files
@keywords cat less head tail wc view file count lines follow log
- Print :: cat notes.txt
- Scroll (q to quit) :: less big.log
- First / last lines :: head -n 5 run.csv; tail -n 5 run.csv
- Follow a growing log :: tail -f run.log
- Count lines :: wc -l run.csv
- Compare files :: diff a.txt b.txt
- Disk use of folder :: du -sh data/
- Free space :: df -h

## Keyboard shortcuts
@id terminal-shortcuts
@keywords shortcut ctrl c ctrl r history clear stop cancel
- Stop the running command :: Ctrl-C
- Search history :: Ctrl-R
- Start / end of line :: Ctrl-A; Ctrl-E
- Delete to start of line :: Ctrl-U
- Clear screen :: clear    # or Cmd-K in Terminal
- Repeat last command :: !!
- Last argument :: !$
- Show history :: history | tail -20

# Scripting

## Script setup
@id script-setup
@keywords shebang set -euo pipefail chmod executable run script
```bash Top of every script
#!/usr/bin/env bash
set -euo pipefail
```
- Make executable :: chmod +x run.sh
- Run it :: ./run.sh
- Run with bash :: bash run.sh
- Debug trace :: bash -x run.sh
> set -e stops on errors, -u on unset variables, -o pipefail on failures inside pipes.

## Variables and quoting
@id variables
@keywords variable assign quote double single export environment command substitution arithmetic
- Assign (no spaces) :: name="run1"
- Use :: echo "$name"
- Next to text :: echo "${name}_out.csv"
- Command output :: today=$(date +%F)
- Arithmetic :: n=$((n + 1))
- Default value :: port=${PORT:-/dev/ttyUSB0}
- Export to programs :: export DATA_DIR=~/data
- Single quotes = literal :: echo '$HOME stays as text'
- Floats (bash can't) :: echo "scale=3; 10/3" | bc
> Always quote "$var" — unquoted variables split on spaces in file names.

## Strings
@id strings
@keywords string length substring replace strip extension basename dirname lowercase
@setup s="run_001.csv"; f="data/run_001.csv"
- Length :: echo "${#s}"
- Substring :: echo "${s:4:3}"
- Replace first / all :: echo "${s/run/test}"; echo "${s//_/-}"
- Drop extension :: echo "${s%.csv}"
- Keep extension :: echo "${s##*.}"
- File name only :: basename "$f"
- Folder only :: dirname "$f"
- Lowercase (bash 4) :: echo "${s,,}"
- Contains :: [[ $s == *run* ]] && echo yes

## Conditionals
@id if-else
@keywords if then elif else fi test file exists string compare numbers case
@setup n=3; f="a.txt"; a="x"; b="y"
```bash If / elif / else
if [[ -f "$f" ]]; then
    echo "file exists"
elif [[ -d "$f" ]]; then
    echo "it's a folder"
else
    echo "missing"
fi
```
- Numbers :: [[ $n -gt 0 ]]    # -eq -ne -lt -le -ge
- Strings :: [[ $a == "$b" ]]; [[ -z $a ]]
- File / folder exists :: [[ -f $f ]]; [[ -d data ]]
- And / or :: [[ -f $f && -s $f ]]
- Run if OK / if failed :: make && ./fw; cd data || exit 1
```bash Case
case "$1" in
    start) echo "starting" ;;
    stop|quit) echo "stopping" ;;
    *) echo "usage: $0 start|stop"; exit 1 ;;
esac
```
> Spaces inside [[ ]] are required: [[ $n -gt 0 ]], not [[$n -gt 0]].

## Loops
@id for-loop
@keywords for while loop files range lines read seq
- Over files :: for f in data/*.csv; do echo "$f"; done
- Range :: for i in {1..10}; do echo "$i"; done
- Stepped :: for v in $(seq 0 0.1 1); do echo "$v"; done
- While :: while [[ ! -f done.flag ]]; do sleep 5; done
- Lines of a file :: while IFS= read -r line; do echo "$line"; done < list.txt
- Skip / stop :: continue; break
> for f in *.csv with no matches loops once over the literal "*.csv": guard with [[ -e $f ]] || continue.

## Functions and arguments
@id functions
@keywords function arguments $1 $@ $# return exit code local getopts
```bash Function
log() {
    local level="$1"; shift
    echo "[$(date +%T)] $level: $*"
}
log INFO "sweep started"
```
- First / all arguments :: echo "$1" "$@"
- Number of arguments :: echo "$#"
- Script name :: echo "$0"
- Require an argument :: [[ $# -ge 1 ]] || { echo "usage: $0 file"; exit 1; }
- Return status :: return 1
- Last exit code :: echo "$?"

## Arrays
@id arrays
@keywords array list associative dictionary loop length append
- Create :: rates=(10 50 100)
- Item / all :: echo "${rates[0]}" "${rates[@]}"
- Length :: echo "${#rates[@]}"
- Append :: rates+=(200)
- Loop :: for r in "${rates[@]}"; do echo "$r"; done
- Dictionary (bash 4) :: declare -A gain=([we1]=2 [we2]=4)
- Look up :: echo "${gain[we1]}"
> macOS ships bash 3.2; zsh arrays start at 1. Install a newer bash with Homebrew for declare -A.

# Text and data

## Pipes and redirection
@id pipes
@keywords pipe redirect stdout stderr append dev null tee input output
- Pipe :: ls | wc -l
- Save output :: python3 analyse.py > out.txt
- Append :: echo "done" >> log.txt
- Errors to file :: make 2> errors.txt
- Both to file :: ./run.sh > run.log 2>&1
- Show and save :: ./run.sh | tee run.log
- Discard :: cmd > /dev/null 2>&1
- Here-doc :: cat > cfg.txt <<'EOF' … EOF

## grep, find, sed, awk
@id grep
@keywords grep find sed awk search text replace column filter recursive
- Search text :: grep -n "error" run.log
- Recursive, ignore case :: grep -rni "TODO" src/
- Count matches :: grep -c "OK" run.log
- Find files by name :: find . -name "*.csv"
- Newer than a day :: find data -name "*.csv" -mtime -1
- Find and delete :: find . -name ".DS_Store" -delete
- Replace in file (macOS) :: sed -i '' 's/old/new/g' file.txt
- Print column 2 :: awk -F, '{print $2}' run.csv
- Mean of column 2 :: awk -F, 'NR>1 {s+=$2; n++} END {print s/n}' run.csv
- Sort numerically :: sort -t, -k2 -n run.csv
- Unique counts :: sort names.txt | uniq -c
- Columns :: cut -d, -f1,3 run.csv

## Archives and downloads
@id archives
@keywords zip unzip tar gz download curl wget
- Zip a folder :: zip -r data.zip data/
- Unzip :: unzip data.zip -d data/
- tar.gz create / extract :: tar -czf data.tgz data/; tar -xzf data.tgz
- Download :: curl -LO https://example.com/file.csv

# Your machine

## Processes and jobs
@id processes
@keywords process ps top kill background job nohup tmux screen sleep
- What's running :: top    # or htop
- Find a process :: ps aux | grep python
- Stop by PID / name :: kill 1234; pkill -f analyse.py
- Run in background :: ./sweep.sh &
- Survive closing the terminal :: nohup ./sweep.sh > sweep.log 2>&1 &
- Jobs / bring back :: jobs; fg %1
- Keep Mac awake :: caffeinate -i ./sweep.sh
- New tmux session :: tmux new -s sweep
- Detach / reattach :: Ctrl-B D; tmux attach -t sweep

## Serial ports and devices
@id serial-ports
@keywords serial port usb tty board microcontroller screen baud device list
- List serial ports (Mac) :: ls /dev/tty.usb*
- List serial ports (Linux) :: ls /dev/ttyUSB* /dev/ttyACM*
- USB devices (Mac) :: system_profiler SPUSBDataType
- Open a terminal :: screen /dev/tty.usbmodem1101 115200
- Quit screen :: Ctrl-A then K, then y
- Who has the port :: lsof /dev/tty.usbmodem1101
- Python ports list :: python3 -m serial.tools.list_ports

## Environments and tools
@id environments
@keywords path which conda pip homebrew brew install environment variable zshrc
- Where is a command :: which python3
- PATH :: echo "$PATH"
- Add to PATH (~/.zshrc) :: export PATH="$HOME/bin:$PATH"
- Reload config :: source ~/.zshrc
- conda env :: conda activate lab
- List envs :: conda env list
- Homebrew install :: brew install tmux
- Version check :: python3 --version

## Remote machines
@id ssh
@keywords ssh scp rsync remote server cluster copy key
- Log in :: ssh user@host
- Copy to / from :: scp run.csv user@host:~/data/; scp user@host:~/out.csv .
- Sync a folder :: rsync -avh data/ user@host:~/data/
- Back up locally :: rsync -avh --delete ~/Developer/ /Volumes/Backup/Developer/
- Run one command :: ssh user@host 'ls ~/data'
> rsync trailing slash matters: data/ copies the contents, data copies the folder.

# Workflows

## Batch jobs
@id batch
@keywords batch process every file parameter sweep loop rename timestamp log
```bash Process every data file
mkdir -p results
for f in data/*.csv; do
    python3 analyse.py "$f" > "results/$(basename "${f%.csv}").txt"
done
```
```bash Parameter sweep with a log
for rate in 10 50 100; do
    echo "$(date +%T) rate=$rate" | tee -a sweep.log
    python3 run.py --rate "$rate" >> sweep.log 2>&1
done
```
```bash Rename many files
for f in *.CSV; do
    mv "$f" "${f%.CSV}.csv"
done
```
- Timestamped name :: out="run_$(date +%Y%m%d_%H%M%S).csv"
- Time a command :: time python3 analyse.py

# Switching languages

## Coming from Python
@id gotchas
@keywords difference python compare zsh gotcha spaces quoting
- Assignment has no spaces :: x=5    # x = 5 runs a command called x
- Compare numbers :: [[ $a -lt $b ]]    # < compares text
- Success is 0 :: true; echo "$?"    # 0 means success
- Only integer maths :: $((7 / 2))    # 3
- Quote variables :: "$file"
- Comment :: # like Python
> macOS Terminal runs zsh, which is nearly identical for everyday commands; scripts with #!/usr/bin/env bash run in bash.
