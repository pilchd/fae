fae
===

*Fast ADIF entry: a nimble language for amateur radio logging*

- [Installation](#installation)
- [A Tour: Logging with FAE](#a-tour-logging-with-fae)
  - [**Building a Log**](#building-a-log)
  - [Writing Data](#writing-data)
  - [Using the Name Stack](#using-the-name-stack)
  - [The FAE Cookbook](#the-fae-cookbook)
- [Usage](#usage)
- [Motivation](#motivation)
- [Contributing](#contributing)
- [Current ADIF Support](#current-adif-support)

**This document is in progress.**


Installation
------------

```sh
# Local install (`fae` available via CWD as `npx fae`)
npm install @pilchd/fle
# Global install (`fae` available via $PATH as `fae`)
npm -g install @pilchd/fle
```


A Tour: Logging with FAE
------------------------

### **Building a Log**

*All of the FAE logs in this section compile to identical ADI output.*

FAE is based on the mechanics of [Fast Log Entry][1] and the syntax of [YAML][2]. Its goal is to provide expressive,
general-purpose logging as close to the ADIF specification as possible. Accordingly, let's begin the tour with some
desired ADI output.

    <OPERATOR:4>W1AW <QSO_DATE:8>20250101 <MODE:4>SSB <RST_SENT:2>59 <RST_RCVD:2>59 <TIME_ON:4>0004 FREQ:6>14.150 <BAND:3>20m <CALL:6>W1AW/1 <EOR>
    <OPERATOR:4>W1AW <QSO_DATE:8>20250101 <MODE:4>SSB <RST_SENT:2>59 <RST_RCVD:2>55 <TIME_ON:4>0008 FREQ:6>14.232 <BAND:3>20m <CALL:6>W1AW/2 <EOR
    <OPERATOR:4>W1AW <QSO_DATE:8>20250101 <MODE:4>CW <RST_SENT:3>599 <RST_RCVD:3>599 <TIME_ON:4>0015 FREQ:6>14.020 <BAND:3>20m <CALL:6>W1AW/3 <POTA_REF:7>US-0000 <EOR>
    <OPERATOR:4>W1AW <QSO_DATE:8>20250101 <MODE:4>CW <RST_SENT:3>559 <RST_RCVD:3>559 <TIME_ON:4>0016 FREQ:6>14.022 <BAND:3>20m <CALL:6>W1AW/4 <POTA_REF:7>US-0001 <EOR>
    <OPERATOR:4>W1AW <QSO_DATE:8>20250101 <MODE:4>CW <RST_SENT:3>599 <RST_RCVD:3>599 <TIME_ON:4>0023 FREQ:6>14.082 <BAND:3>20m <CALL:6>W1AW/5 <POTA_REF:15>US-0002,US-0003 <EOR>

In this case, we're W1AW, and we had a fun evening working SSB and hunting POTA on 20 meters.

In its simplest form, FAE eliminates the need to write the ADIF data-specifiers for each field. We write a **field**
simply by specifying its **field name** followed by its **data** (any whitespace between them is optional), and we write
a **field list** by separating the name/data pairs by spaces. To tell FAE that the list is a **record** (a QSO), we
prepend `-`.

    - OPERATOR W1AW QSO_DATE 20250101 MODE SSB RST_SENT 59  RST_RCVD 59  TIME_ON 0004 FREQ 14.150 BAND 20m CALL W1AW/1
    - OPERATOR W1AW QSO_DATE 20250101 MODE SSB RST_SENT 59  RST_RCVD 55  TIME_ON 0008 FREQ 14.232 BAND 20m CALL W1AW/2
    - OPERATOR W1AW QSO_DATE 20250101 MODE CW  RST_SENT 599 RST_RCVD 599 TIME_ON 0015 FREQ 14.020 BAND 20m CALL W1AW/3 POTA_REF US-0000
    - OPERATOR W1AW QSO_DATE 20250101 MODE CW  RST_SENT 559 RST_RCVD 559 TIME_ON 0016 FREQ 14.022 BAND 20m CALL W1AW/4 POTA_REF US-0001
    - OPERATOR W1AW QSO_DATE 20250101 MODE CW  RST_SENT 599 RST_RCVD 599 TIME_ON 0023 FREQ 14.082 BAND 20m CALL W1AW/5 POTA_REF US-0002,US-0003

This allows us to align the fields vertically.

FAE provides many ways to write the data for fields. We'll use more readable alternatives for the `Date` (`QSO_DATE`)
and `Time` (`TIME_ON`) **data types** in this log.

    - OPERATOR W1AW QSO_DATE 2025-01-01 MODE SSB RST_SENT 59  RST_RCVD 59  TIME_ON 00:04 FREQ 14.150 BAND 20m CALL W1AW/1
    - OPERATOR W1AW QSO_DATE 2025-01-01 MODE SSB RST_SENT 59  RST_RCVD 55  TIME_ON 00:08 FREQ 14.232 BAND 20m CALL W1AW/2
    - OPERATOR W1AW QSO_DATE 2025-01-01 MODE CW  RST_SENT 599 RST_RCVD 599 TIME_ON 00:15 FREQ 14.020 BAND 20m CALL W1AW/3 POTA_REF US-0000
    - OPERATOR W1AW QSO_DATE 2025-01-01 MODE CW  RST_SENT 559 RST_RCVD 559 TIME_ON 00:16 FREQ 14.022 BAND 20m CALL W1AW/4 POTA_REF US-0001
    - OPERATOR W1AW QSO_DATE 2025-01-01 MODE CW  RST_SENT 599 RST_RCVD 599 TIME_ON 00:23 FREQ 14.082 BAND 20m CALL W1AW/5 POTA_REF US-0002,US-0003

FAE is capable of inferring many fields names from their data types alone. By default, its behavior is similar to that
of [Fast Log Entry][3], so we can trim the log quite a bit.

    - OPERATOR W1AW 2025-01-01 SSB 59  59  00:04 14.150 20m W1AW/1
    - OPERATOR W1AW 2025-01-01 SSB 59  55  00:08 14.232 20m W1AW/2
    - OPERATOR W1AW 2025-01-01 CW  599 599 00:15 14.020 20m W1AW/3 US-0000
    - OPERATOR W1AW 2025-01-01 CW  559 559 00:16 14.022 20m W1AW/4 US-0001
    - OPERATOR W1AW 2025-01-01 CW  599 599 00:23 14.082 20m W1AW/5 US-0002,US-0003

FAE also ships with a series of **post-processors** that run on field lists. One of these infers the band from the
frequency according to the [ADIF specification][4], [like FLE][5], so we can stop typing out the band.

    - OPERATOR W1AW 2025-01-01 SSB 59  59  00:04 14.150 W1AW/1
    - OPERATOR W1AW 2025-01-01 SSB 59  55  00:08 14.232 W1AW/2
    - OPERATOR W1AW 2025-01-01 CW  599 599 00:15 14.020 W1AW/3 US-0000
    - OPERATOR W1AW 2025-01-01 CW  559 559 00:16 14.022 W1AW/4 US-0001
    - OPERATOR W1AW 2025-01-01 CW  599 599 00:23 14.082 W1AW/5 US-0002,US-0003

These records have a lot of data in common. In FAE, we can lift up common data with a **factor**.

    OPERATOR W1AW
      - 2025-01-01 SSB 59  59  00:04 14.150 W1AW/1
      - 2025-01-01 SSB 59  55  00:08 14.232 W1AW/2
      - 2025-01-01 CW  599 599 00:15 14.020 W1AW/3 US-0000
      - 2025-01-01 CW  559 559 00:16 14.022 W1AW/4 US-0001
      - 2025-01-01 CW  599 599 00:23 14.082 W1AW/5 US-0002,US-0003

A factor is a field list just like a record, but it *doesn't* start with `-`. Any field lists nested under it (indented by
two spaces) are implicitly prepended with its fields. There are two properties of field lists that make factors useful:

- The **rightmost** instance of any field is the one whose data is used.
- The order of fields in a field list is defined by the **leftmost** instance of every field.

> [!TIP]
> Understanding these field list properties is critical to maximally leveraging FAE. Here are two narrated examples.
>
> `QSO_DATE 20250101 BAND 20m MODE SSB QSO_DATE 20250102`
>
> The *rightmost* property states that `20250102` is the value assigned to `QSO_DATE` in this list.
>
> The *leftmost* property states that `QSO_DATE`, `BAND`, `MODE` is the order of fields in this list.
>
> `BAND 40m QSO_DATE 20250101 BAND 20m MODE SSB BAND 40m`
>
> The *rightmost* property states that:
>
> - `40m` is the value assigned to `BAND` in this list.
> - `SSB` is the value assigned to `MODE` in this list.
> - `20250101` is the value assigned to `QSO_DATE` in this list.
>
> The *leftmost* property states that `BAND`, `QSO_DATE`, `MODE` is the order of fields in this list.

Fields exported by a record are exported in order, so the ADI output is unchanged by this operation.

Factors have one property themselves:

- Factors can contain any combination of records *or factors*.

From these three rules, we can derive tons of ways to represent this log! Let's start by expanding the factor we already
wrote...

    OPERATOR W1AW 2025-01-01
      - SSB 59  59  00:04 14.150 W1AW/1
      - SSB 59  55  00:08 14.232 W1AW/2
      - CW  599 599 00:15 14.020 W1AW/3 US-0000
      - CW  559 559 00:16 14.022 W1AW/4 US-0001
      - CW  599 599 00:23 14.082 W1AW/5 US-0002,US-0003

and then nest two more to lift up the modes.

    OPERATOR W1AW 2025-01-01
      SSB
        - 59 59 00:04 14.150 W1AW/1
        - 59 55 00:08 14.232 W1AW/2
      CW
        - 599 599 00:15 14.020 W1AW/3 US-0000
        - 559 559 00:16 14.022 W1AW/4 US-0001
        - 599 599 00:23 14.082 W1AW/5 US-0002,US-0003

The signal reports don't change very much, so we can "default" them in the factors and rely on the rightmost property to
override them in the records.

    OPERATOR W1AW 2025-01-01
      SSB 59 59
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2 RST_RCVD 55
      CW 599 599
        - 00:15 14.020 W1AW/3 US-0000
        - 00:16 14.022 W1AW/4 559 559 US-0001
        - 00:23 14.082 W1AW/5 US-0002,US-0003

Since FAE ([and FLE][3]) infers signal reports in TX/RX order, we have to write out `RST_RCVD` in the second record.

> [!TIP]
> Some instances of `RST_SENT` and `RST_RCVD` "moved" from before the call sign to after the call sign, but the output
> remains unchanged due to the leftmost property (the leftmost instance of `RST_SENT` or `RST_RCVD` occurs in the same
> spot within each record as before).

Field lists can be specified on multiple lines.

    OPERATOR W1AW
    2025-01-01
      SSB
      59 59
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2
          RST_RCVD 55
      CW
      599 599
        - 00:15 14.020 W1AW/3
          US-0000
        - 00:16 14.022 W1AW/4
          559 559
          US-0001
        - 00:23 14.082 W1AW/5
          US-0002,US-0003

*An additional indent (of two spaces) is required to do this inside a record, as FAE cannot otherwise distinguish
between a continued record and the start of a factor.*

While valid, I think this made our log *less* readable, so I'm going back to how it was ;<wbr>) Newlines are allowed
almost anywhere, and comments prefixed with `//` are allowed anywhere a newline is, so we can tidy this up further.

    // Really fun evening on 20m!
    OPERATOR W1AW 2025-01-01

      SSB 59 59
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2 RST_RCVD 55

      CW 599 599
        - 00:15 14.020 W1AW/3 US-0000
        - 00:16 14.022 W1AW/4 559 559 US-0001
        - 00:23 14.082 W1AW/5 US-0002,US-0003

We're burning a couple of characters on `OPERATOR` and `RST_RCVD`. This is an elementary reason to **declare** an **alias**.

    alias op OPERATOR
    alias > RST_SENT
    alias < RST_RCVD

    // Really fun evening on 20m!
    op W1AW 2025-01-01

      SSB 59 59
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2 <55

      CW 599 599
        - 00:15 14.020 W1AW/3 US-0000
        - 00:16 14.022 W1AW/4 559 559 US-0001
        - 00:23 14.082 W1AW/5 US-0002,US-0003

Aliases are declared with a name and a field list. Once declared, the name can be used anywhere field list elements are
expected, and it behaves just like the field list was typed instead of the name (surrounded by spaces).

If we switched modes more in this log, it would get irritating to write out the default signal report for them every
time--another problem we can solve by combining fragments of our log into aliases.

    alias op OPERATOR
    alias > RST_SENT
    alias < RST_RCVD

    alias SSB SSB 59 59
    alias CW CW 599 599

    // Really fun evening on 20m!
    OPERATOR W1AW 2025-01-01

      SSB
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2 <55

      CW
        - 00:15 14.020 W1AW/3 US-0000
        - 00:16 14.022 W1AW/4 559 559 US-0001
        - 00:23 14.082 W1AW/5 US-0002,US-0003

Note that we aliased *over* infer-able values for the ADIF field `MODE`--this is allowed, as is aliasing over ADIF field
names themselves. Be careful!

> [!TIP]
> The inferred/space-separated brevity of FAE obscures the meaning of these aliases a bit. Out loud:
>
> > "Create an alias called `SSB`; its content is the mode `SSB`, sent report `59`, received report `59`."
> > "Create an alias called `CW`; its content is the mode `CW`, sent report `599`, received report `599`."
>
> For improved clarity, these aliases could be equivalently declared at their position as follows:
>
>     alias SSB  MODE SSB >59 <59
>     alias CW  MODE CW >599 <599

I see no way to improve this log further, so I conclude this part of the tour here ;<wbr>)

Remember that *every* FAE log presented throughout this section generates *identical* output, as would any combination
of them--it's up to you to choose the style for your log. I hope you enjoy doing so, and I hope you find FAE useful
:<wbr>)

If you do, read on--there is additional power inside these (and other) primitives!

### Writing Data

FAE wouldn't be YAML-inspired without five scalar representations!

In brief: data can be represented in **flow format** or **block format**, and there's a few types of each. Flow format
produces a single output, while block format produces a list of at least one. Each ADIF data type parses a particular
interpretation of each format.

#### Flow format

    plain   quoted              tagged             Output
    ----------------------------------------------------------------
    radio   "radio"             :radio             "radio"
    N/A     "Fast ADIF Entry"   :Fast ADIF Entry   "Fast ADIF Entry"

#### Block format

*Any number of contiguous `.` can be used in either position; three are used for clarity.*

    delimited   unlimited   Output
    -------------------------------------------------------------
    ...         ...         ["Fast", "ADIF", null, "Entry"]
      Fast        Fast
      ADIF        ADIF

      Entry       Entry
    ...

    ...         N/A         ["Fast", "ADIF", null, "Entry", null]
      Fast
      ADIF

      Entry

    ...

#### Type interpretation

| ADIF type                                 | flow format | block format |
| ----------------------------------------- | :---------: | :----------: |
| CreditList                                |             |              |
| SponsoredAwardList                        |             |              |
| Boolean                                   |    ✔️📚     |     ✔️📚     |
| Integer                                   |     ✔️      |      ✔️      |
| Number                                    |     ✔️      |      ✔️      |
| Date                                      |    ✔️📚     |     ✔️📚     |
| Time                                      |    ✔️📚     |     ✔️📚     |
| IOTARefNo                                 |             |              |
| String                                    |     ✔️      |     ✔️🔴     |
| MultilineString                           |     ✔️      |      ✔️      |
| Enumeration                               |     ✔️      |      ✔️      |
| GridSquare                                |     ✔️      |      ✔️      |
| GridSquareExt                             |             |              |
| GridSquareList                            |    ✔️📚     |     ✔️📚     |
| Location                                  |             |              |
| POTARefList                               |    ✔️📚     |     ✔️📚     |
| SecondarySubdivisionList                  |             |              |
| SecondaryAdministrativeSubdivisionListAlt |             |              |
| SOTARef                                   |             |              |
| WWFFRef                                   |             |              |

- ` `: currently unsupported
- ✔️: parsed literally
- 📚: includes special syntax
- ⭕: blank lines eliminated
- 🔴: lines are folded with a single space
- 🟥: lines are folded to the list separator

### Using the Name Stack

So far, fields have been written by entering their name followed by their data. While names must always be written
first, more than one name can be specified at a time. Any number of names written together are shifted onto the **name
stack**; subsequent pieces of data will be bound to the name at the top of the stack.

> [!TIP]
> This is not special functionality--it was happening above! The operation of factors and their rightmost/leftmost
> property are completely unchanged.

For example, the following two records are equivalent.

    - RST_SENT 59 RST_RCVD 35  →  <RST_SENT:2>59 <RST_RCVD:2>35 <EOR>
    - RST_SENT RST_RCVD 59 35  →  <RST_SENT:2>59 <RST_RCVD:2>35 <EOR>

Note that FAE manipulates the stack so that names and their data are specified in the same order.

If a group on the stack is "interrupted" by another group, the interrupting group "takes precedence". This is not a
special case.

    - RST_SENT RST_RCVD 59 TIME_ON 1230 35  →  <RST_SENT:2>59 <RST_RCVD:2>35 <TIME_ON:4>1230

There are two additional features for interacting with the names stack: the **pop** and the **nop**.

A **pop** is specified by any number of `-`, and it removes a single name from the top of the stack (if there is one).

    - TIME_ON FREQ CALL NAME RST_SENT RST_RCVD - - W1AW  →  <CALL:4>W1AW <EOR>

A **nop**, specified by any number of `.`, does nothing--but it breaks clumping of the current name group. The names
preceding it will be pushed as their own group *before* the group of names following it.

    - COMMENT NOTES CALL RST_SENT RST_RCVD hello - world  →  <COMMENT:5>hello <CALL:5>world <EOR>
    - COMMENT NOTES CALL ... RST_SENT RST_RCVD hello - world  →  <NOTES:5>world <RST_SENT:5>hello <EOR>

It's usually used in aliases whose field lists are names, so the names don't combine with names where the alias is being
expanded. You'll know when you need it.

These features are useful for logging records that take a similar shape, but are difficult for FAE to infer, such as
contests. See [Contest: `ARRL-DX-SSB`](#contest-arrl-dx-ssb) in the cookbook for an example.

### The FAE Cookbook

...coming soon!

[1]: https://df3cb.com/fle
[2]: https://yaml.org/
[3]: https://df3cb.com/fle/documentation/#qsos "Entering QSOs"
[4]: https://adif.org/adif "III.B.4. Band Enumeration"
[5]: https://df3cb.com/fle/documentation/#band "Band or Frequency"


Usage
-----

FAE ships with a CLI (`fae`). It's quite minimal at the moment:

```sh
# Generate the ADI for log.fae; if the log contains errors, report the first.
fae log.fae
cat log.fae | fae
```

Its compiler can also be called from a new program.

```ts
import {compile, CompilerError} from "@pilchd/fae";

// The compiler accepts FAE content as a string.
const fae = [
    "STATION_CALLSIGN W1AW",
    "  - 2025-01-01 SSB 1234 14.232 W1AW/1"
].join('\n');

try {
    // The compiler returns both the IR and ADI output for the input.
    // It defaults all of its options.
    const {ir, adi} = compile(fae);
    // ADI is represented as an array of its lines.
    adif.forEach(line => console.log(line));
}
// If there are errors, the compiler reports only the first.
catch (e) {
    if (e instanceof CompilerError)
        // If the source is known, errors can annotate it.
        console.error(e.format(fae, { name: "fae" }));

    throw e;
}
```


Motivation
----------

DF3CB's [Fast Log Entry][2] is an excellent tool for simple, general-purpose amateur logging in plaintext. After writing
many logs with it and studying its community implementations, I felt its design could be extrapolated to address a few
issues I had accumulated with more complex logs:

- Not all ADIF fields are supported.

  If I want to specify `TX_PWR` for the records in a log, I cannot.

- It is difficult to *intuit* and impossible to *specify* when field data is shared between records.

  Consider this FLE log:

      2025-01-01 1200
      7.074 W1AW/1
      40m W1AW/2
      W1AW/3

  Three records are generated (three call signs appear). It's perhaps intuitive that `QSO_DATE` and `TIME_ON` should
  appear in all records until changed--but which records have `FREQ` or `BAND`, and what data is assigned to them?
  The answer isn't clear from the document structure, and there's no way to specify a resolution to the ambiguity.

Moreover, these issues are related--this project really started because I wanted to explicitly set the transmitter power
for ~5 records in a log without typing it 5 times.

I set out to create a FLE implementation with a feature flag for this "extended" functionality, but I enjoyed logging
with the "extended" functionality so much that it became the core functionality of the program. It's now its own tool,
but it borrows its core mechanics (and its name!) from FLE:

- Factor common fields out of records.
- Write data succinctly.

From the above (really, since I struggled writing implementations of FLE's time interpolation and changed-part features
that made me happy), FAE derives its own goals:

- Write data *literally* and its metadata *succinctly*.
- Besides core functionality, provide no capability the user cannot replicate.


Contributing
------------

While the application's design should be fully ADIF-compliant, its implementation is not--it needs more work :<wbr>)
Issues regarding current functionality and suggestions for extensions are more than welcome, but I will not accept
contributions at this time; the design is moving too quickly, and I don't want to immediately break them.


Pre-major ADIF Support
----------------------

All fields in the [ADIF 3.1.5][6] specification are supported, with the following exceptions:

- The following fields are supported, but parsed as String (see the current [type support](#type-interpretation)):  
  `AWARD_SUBMITTED` `AWARD_GRANTED` `CNTY` `CNTY_ALT` `CREDIT_SUBMITTED`  
  `CREDIT_GRANTED` `DARC_DOK` `MY_CNTY` `MY_CNTY_ALT` `MY_DARC_DOK`  
  `MY_STATE` `MY_USACA_COUNTIES` `STATE` `USACA_COUNTIES`
- The following fields are supported, but one or more of their dependencies are not checked:  
  `LOTW_QSLRDATE` `LOTW_QSLSDATE` `QSLRDATE` `QSLSDATE`
- No `_INTL` fields are supported (FAE doesn't currently support ADX)

[6]: https://adif.org/315/ADIF_315.htm
