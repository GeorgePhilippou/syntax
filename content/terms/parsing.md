# Parsing and serial hover explanations (adds to the Python glossary).
re :: Regular expressions: patterns for finding and extracting text.
search :: Finds the first match anywhere in the text (None if not found).
group :: Text captured by a pattern's (…) group; group(1) is the first.
groups :: All captured groups as a tuple.
findall :: Every match, as a list of strings (or tuples of groups).
compile :: Pre-builds a pattern for reuse — faster in loops.
sub :: Replaces matches with new text.
reader :: csv.reader: yields each row as a list of strings.
next :: Takes the next item from an iterator — e.g. the header row.
newline :: Open CSVs with newline="" so the csv module handles line endings.
DictWriter :: Writes rows from dicts with fixed column names.
fieldnames :: Column names for DictWriter.
writeheader :: Writes the column-name row.
Sniffer :: Guesses a CSV's delimiter from a sample.
sniff :: Analyses sample text and returns the detected CSV format.
seek :: Moves the read position in a file; seek(0) goes back to the start.
bytes :: An immutable sequence of raw bytes, written b"…".
calcsize :: Number of bytes a struct format uses.
pack :: Turns numbers into bytes using a struct format.
iter_unpack :: Unpacks a repeating record format across a whole buffer.
from_bytes :: Builds an int from bytes: int.from_bytes(b, "little").
to_bytes :: Turns an int into bytes of a given length and order.
hex :: Shows bytes as hex text.
frombuffer :: Reads raw bytes straight into a NumPy array of the given dtype.
tools :: serial.tools: helpers that come with pyserial.
list_ports :: Lists serial ports on this computer.
comports :: The available serial ports; each has .device and .description.
device :: A port's path, e.g. /dev/tty.usbmodem1101.
timeout :: Seconds a read waits before giving up (and returning what it has).
read_until :: Reads until a marker such as b"\n".
flush :: Writes buffered data to disk now — so a crash doesn't lose it.
KeyboardInterrupt :: The error raised by Ctrl-C; catch it to stop cleanly.
with_name :: Same folder, different file name.
errors :: decode(errors="replace") turns bad bytes into � instead of raising.
indent :: json.dumps: spaces per level for readable output.
