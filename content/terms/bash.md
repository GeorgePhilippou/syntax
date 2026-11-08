# Hover explanations for Bash/terminal code: term :: one-line explanation.

# Moving around and files
cd :: Change directory (folder). cd - goes back; cd ~ goes home.
pwd :: Prints the folder you're in.
ls :: Lists files. -l long, -a hidden, -h readable sizes, -t newest first.
open :: macOS: opens a file or folder with its default app (open . opens Finder).
code :: Opens VS Code at a file or folder.
mkdir :: Makes a folder; -p creates parents and doesn't complain if it exists.
cp :: Copies files; -r copies folders.
mv :: Moves or renames.
rm :: Deletes permanently (no Trash); -r for folders, -i to ask first.
touch :: Creates an empty file (or updates its timestamp).
ln :: Makes a link; -s a symbolic link (shortcut).
cat :: Prints a file's contents.
less :: Scrollable file viewer; q quits, / searches.
head :: First lines of a file; -n sets how many.
tail :: Last lines; -f keeps following as the file grows.
wc :: Counts lines (-l), words and bytes.
diff :: Shows line differences between two files.
du :: Disk usage of files/folders; -sh gives a readable total.
df :: Free space on each disk; -h readable sizes.
clear :: Clears the terminal screen.
history :: Lists previous commands.

# Scripting
echo :: Prints text.
set :: Shell options: -e stop on error, -u error on unset variables, -o pipefail fail if any pipe part fails.
chmod :: Changes permissions; +x makes a script executable.
bash :: Runs a script with Bash; -x prints each command as it runs.
export :: Makes a variable visible to programs you start.
local :: A variable that exists only inside the function.
shift :: Drops $1 and moves the other arguments down one.
return :: Leaves a function with a status (0 = success).
exit :: Ends the script with a status code (0 = success).
declare :: Declares variable attributes; -A makes an associative array (dictionary).
read :: Reads a line of input; -r keeps backslashes as they are.
IFS :: Internal Field Separator: characters used to split words. IFS= keeps lines intact.
source :: Runs a file in the current shell (e.g. to reload ~/.zshrc).
if :: Runs commands when a test succeeds (exit status 0).
then :: Starts the commands of an if/elif branch.
elif :: "else if" in Bash.
else :: Runs when no earlier test succeeded.
fi :: Ends an if block (if backwards).
case :: Matches a value against patterns.
esac :: Ends a case block (case backwards).
for :: Loops over words, files or a range.
in :: Introduces the list a for loop or case works through.
do :: Starts the body of a loop.
done :: Ends the body of a loop.
while :: Loops while a command succeeds.
break :: Leaves the loop.
continue :: Skips to the next loop iteration.
true :: A command that always succeeds (status 0).
seq :: Prints a sequence of numbers: seq start step end.
bc :: Calculator that handles decimals: echo "scale=3; 10/3" | bc.
date :: Current date/time; +%F gives 2026-11-08, +%T gives 14:05:09.
basename :: File name without the folder.
dirname :: Folder without the file name.
sleep :: Waits a number of seconds.
time :: Times how long a command takes.
EOF :: Marker that ends a here-document.

# Tests inside [[ ]]
[[ :: Test: [[ -f file ]] file exists, -d folder, -z empty string, -eq/-lt/-gt compare numbers, == compares text.
-z :: True if the string is empty.
-eq :: Numbers equal.
-ne :: Numbers not equal.
-gt :: Greater than (numbers).
-lt :: Less than (numbers).
-ge :: Greater than or equal (numbers).
-le :: Less than or equal (numbers).

# Text tools
grep :: Searches for text. -n line numbers, -r recursive, -i ignore case, -c count.
find :: Finds files by name, age, size…; -name pattern, -mtime -1 = changed in the last day.
sed :: Stream editor; s/old/new/g replaces. On macOS, -i '' edits in place.
awk :: Processes text by columns; -F, splits on commas, $2 is column 2.
sort :: Sorts lines; -n numeric, -t, -k2 sorts on column 2.
uniq :: Removes adjacent duplicates; -c counts them (sort first).
cut :: Pulls out columns; -d, sets the delimiter, -f1,3 picks fields.
tee :: Shows output and saves it to a file at the same time; -a appends.
zip :: Makes a .zip archive; -r for folders.
unzip :: Extracts a .zip; -d chooses the destination.
tar :: Archives: -czf creates .tar.gz, -xzf extracts it.
curl :: Downloads or calls URLs; -L follows redirects, -O keeps the file name.

# Processes
top :: Live view of running processes and CPU use (q quits).
ps :: Snapshot of processes; ps aux shows all.
kill :: Stops a process by its ID (PID).
pkill :: Stops processes by name; -f matches the full command line.
nohup :: Keeps a command running after you close the terminal.
jobs :: Lists background jobs in this terminal.
fg :: Brings a background job to the front.
caffeinate :: macOS: keeps the computer awake while a command runs.
tmux :: Terminal sessions that survive disconnecting; detach with Ctrl-B D.
screen :: Serial terminal (screen port baud) or a detachable session; quit with Ctrl-A K.
lsof :: Lists which processes have a file or port open.
system_profiler :: macOS hardware report; SPUSBDataType lists USB devices.

# Environment and remote
which :: Shows which program a command name runs.
PATH :: Folders the shell searches for commands, separated by colons.
HOME :: Your home folder (same as ~).
conda :: Anaconda's environment and package manager.
activate :: Switches to a conda/virtual environment.
brew :: Homebrew: installs command-line tools on macOS.
python3 :: Runs Python 3; -m runs a module as a script.
ssh :: Logs in to another machine securely.
scp :: Copies files to/from another machine over SSH.
rsync :: Copies only what changed; -a keep attributes, -v verbose, -h readable, --delete mirror deletions.
make :: Builds a project using its Makefile.

# Redirection and operators
| :: Pipe: sends one command's output into the next command.
> :: Writes output to a file, replacing it.
>> :: Appends output to a file.
2> :: Sends error output to a file.
&& :: Runs the next command only if the previous one succeeded.
|| :: Runs the next command only if the previous one failed.
& :: Runs the command in the background.
