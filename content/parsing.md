---
name: Parsing & serial
symbol: io
order: 24
color: #5a6fd6
on: light
version: csv · re · struct · pyserial
highlight: python
layout: sheet
group: library
parents: python
aliases: parsing serial csv regex re struct
description: Reading device logs, CSVs, binary packets and serial ports.
---

# Text and CSV

## The csv module
@id csv-files
@keywords csv reader writer dictreader dictwriter delimiter header skip rows
```python Read rows, skip the header
import csv
with open("run.csv", newline="") as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        t, v = float(row[0]), float(row[1])
```
- By column name :: for row in csv.DictReader(f): v = float(row["voltage"])
- Other delimiter :: csv.reader(f, delimiter=";")
- Write rows :: w = csv.writer(f); w.writerow(["t", "v"]); w.writerows(rows)
- Write dicts :: w = csv.DictWriter(f, fieldnames=["t", "v"]); w.writeheader(); w.writerow({"t": 0, "v": 1})
- Guess the delimiter :: dialect = csv.Sniffer().sniff(f.read(2048)); f.seek(0)
> Open CSV files with newline="" or blank lines appear on Windows.

## Parsing lines safely
@id parsing-lines
@keywords split strip float parse line skip bad lines try except comment blank
```python Tolerant line parser
times, values = [], []
with open("log.txt") as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split(",")
        try:
            times.append(float(parts[0]))
            values.append(float(parts[1]))
        except (ValueError, IndexError):
            continue    # skip malformed lines
```
- Several numbers at once :: t, v, i = map(float, line.split(","))
- Key=value pairs :: d = dict(p.split("=") for p in "gain=2,rate=100".split(","))
- Hex text to int :: int("0x1F", 16); int("1F", 16)
- Lists to arrays at the end :: t = np.asarray(times)
> Catch only the errors you expect (ValueError, IndexError) — a bare except also hides typos.

## Regular expressions
@id regular-expressions
@keywords regex re search match findall compile group named groups number pattern
@setup import re
- Find one :: m = re.search(r"V=(-?\d+\.?\d*)", line)
- Use the match :: if m: v = float(m.group(1))
- All numbers in a line :: nums = [float(x) for x in re.findall(r"-?\d+\.?\d*(?:[eE][-+]?\d+)?", line)]
- Named groups :: m = re.match(r"(?P<t>\d+),(?P<v>-?\d+)", line); m["t"]
- Compile once, reuse :: pat = re.compile(r"Dataset_(\d+)_(\w+)")
- Number from a file name :: int(re.search(r"Dataset_(\d+)", name).group(1))
- Replace :: re.sub(r"\s+", " ", text)
- Split on several separators :: re.split(r"[,;\s]+", line)
> Always use r"…" raw strings for patterns, so \d and \s reach re unchanged.

# Binary data

## struct and bytes
@id struct-bytes
@keywords struct pack unpack bytes little endian format int16 uint16 float packet checksum from_bytes
@setup import struct; data = bytes(16)
- Unpack (little-endian int16 + uint16) :: a, b = struct.unpack("<hH", data[:4])
- Common codes :: struct.unpack("<bBhHiIf", bytes(16))    # int8 uint8 int16 uint16 int32 uint32 float32
- Size of a format :: struct.calcsize("<hHf")
- Pack :: payload = struct.pack("<Hf", 1234, 0.5)
- Many records :: for rec in struct.iter_unpack("<hh", data): print(rec)
- Bytes ↔ int :: int.from_bytes(data[:2], "little"); (1234).to_bytes(2, "little")
- Simple checksum :: ok = (sum(data[:-1]) & 0xFF) == data[-1]
- Hex view :: data.hex(" ")
- To a NumPy array :: np.frombuffer(data, dtype="<i2")
> < little-endian, > big-endian. Without one, struct adds padding and uses your machine's order.

# Serial ports

## pyserial
@id serial-port
@keywords pyserial serial port uart baud readline timeout write list ports usb tty
@setup import serial
```python Open, send, read lines
import serial
with serial.Serial("/dev/tty.usbmodem1101", 115200, timeout=1) as port:
    port.reset_input_buffer()
    port.write(b"START\n")
    while True:
        line = port.readline().decode(errors="replace").strip()
        if not line:
            break    # timed out: nothing more
        print(line)
```
- List ports :: from serial.tools import list_ports; [p.device for p in list_ports.comports()]
- Read exact bytes :: chunk = port.read(64)
- Bytes waiting :: port.in_waiting
- Read until a marker :: port.read_until(b"END\n")
- Change timeout :: port.timeout = 0.1
> readline() returns b"" when the timeout passes — treat that as "no data", not an error.

## Logging a stream to CSV
@id serial-logging
@keywords log stream csv flush timestamp capture save serial
```python Capture with timestamps
import csv, time
with serial.Serial(PORT, 115200, timeout=1) as port, open("capture.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["host_time_s", "line"])
    t0 = time.perf_counter()
    while time.perf_counter() - t0 < 60:
        line = port.readline().decode(errors="replace").strip()
        if line:
            w.writerow([round(time.perf_counter() - t0, 4), line])
            f.flush()
```
- Timestamped file name :: name = time.strftime("capture_%Y%m%d_%H%M%S.csv")
- Stop with Ctrl-C cleanly :: try: …  except KeyboardInterrupt: pass

# Folders of datasets

## Finding and ordering files
@id dataset-folders
@keywords glob folder dataset natural sort numbers order files pathlib rglob
@setup from pathlib import Path; import re
- All matching folders :: dirs = sorted(Path("Dataset_AMP_Validate").glob("Dataset_*"))
- Recursive CSVs :: files = sorted(Path("data").rglob("*.csv"))
- Natural order (2 before 10) :: dirs = sorted(dirs, key=lambda p: int(re.search(r"\d+", p.name).group()))
- Skip hidden files :: files = [p for p in files if not p.name.startswith(".")]
- Name without extension :: p = Path("run_150ms.csv"); p.stem
- Output next to input :: out = p.with_name(p.stem + "_clean.csv")
> sorted() on names puts Dataset_10 before Dataset_9 — sort by the number instead.

## JSON settings
@id json-config
@keywords json config settings load dump parameters
- Load :: cfg = json.loads(Path("cfg.json").read_text())
- Save :: Path("cfg.json").write_text(json.dumps(cfg, indent=2))
- With defaults :: rate = cfg.get("rate_hz", 100)
