fae
===

*Fast ADIF entry: a nimble language for amateur radio logging*

- [Installation](#installation)
- [**A Tour: Logging with FAE**](#a-tour-logging-with-fae)
  - [Basic Logging](#basic-logging)
  - [*Writing Strings*](#writing-strings)
  - [Contest Logging: Groups](#contest-logging-groups)
- [Usage](#usage)
- [Motivation](#motivation)
- [Contributing](#contributing)
- [Supported ADIF Fields](#supported-adif-qso-fields)


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

Non-italicized sections of the tour consist of many FAE logs. *The logs in these sections compile to identical ADIF output.*

### Basic Logging

FAE is based on the mechanics of [Fast Log Entry][1] and the syntax of [YAML][2]. Its goal is to provide expressive,
general-purpose logging as close to the ADIF specification as possible. Accordingly, let's begin the tour with some
desired ADI output.

    <OPERATOR:4>W1AW <QSO_DATE:8>20250101 <MODE:4>SSB <RST_SENT:2>59 <RST_RCVD:2>59 <TIME_ON:4>0004 FREQ:6>14.150 <BAND:3>20m <CALL:6>W1AW/1<EOR>
    <OPERATOR:4>W1AW <QSO_DATE:8>20250101 <MODE:4>SSB <RST_SENT:2>59 <RST_RCVD:2>55 <TIME_ON:4>0008 FREQ:6>14.232 <BAND:3>20m <CALL:6>W1AW/2<EOR
    <OPERATOR:4>W1AW <QSO_DATE:8>20250101 <MODE:4>CW <RST_SENT:3>599 <RST_RCVD:3>599 <TIME_ON:4>0015 FREQ:6>14.020 <BAND:3>20m <CALL:6>W1AW/3 <POTA_REF:7>US-0000 <EOR>
    <OPERATOR:4>W1AW <QSO_DATE:8>20250101 <MODE:4>CW <RST_SENT:3>559 <RST_RCVD:3>559 <TIME_ON:4>0016 FREQ:6>14.022 <BAND:3>20m <CALL:6>W1AW/4 <POTA_REF:7>US-0001 <EOR>
    <OPERATOR:4>W1AW <QSO_DATE:8>20250101 <MODE:4>CW <RST_SENT:3>599 <RST_RCVD:3>599 <TIME_ON:4>0023 FREQ:6>14.082 <BAND:3>20m <CALL:6>W1AW/5 <POTA_REF:15>US-0002,US-0003 <EOR>

In this case, we're W1AW, and we had a fun evening working SSB and hunting POTA on 20 meters.

In its simplest form, FAE eliminates the need to write the ADI data-specifiers for each field. We write a **field**
simply by specifying its **field name** followed by its **data** (any whitespace between them is optional), and we write
a **field list** by separating the name/data pairs by spaces. To tell FAE that the list is a **record** (a QSO), we
prepend `-`.

    - OPERATOR W1AW QSO_DATE 20250101 MODE SSB RST_SENT 59  RST_RCVD 59  TIME_ON 0004 FREQ 14.150 BAND 20m CALL W1AW/1
    - OPERATOR W1AW QSO_DATE 20250101 MODE SSB RST_SENT 59  RST_RCVD 55  TIME_ON 0008 FREQ 14.232 BAND 20m CALL W1AW/2
    - OPERATOR W1AW QSO_DATE 20250101 MODE CW  RST_SENT 599 RST_RCVD 599 TIME_ON 0015 FREQ 14.020 BAND 20m CALL W1AW/3 POTA_REF US-0000
    - OPERATOR W1AW QSO_DATE 20250101 MODE CW  RST_SENT 559 RST_RCVD 559 TIME_ON 0016 FREQ 14.022 BAND 20m CALL W1AW/4 POTA_REF US-0001
    - OPERATOR W1AW QSO_DATE 20250101 MODE CW  RST_SENT 599 RST_RCVD 599 TIME_ON 0023 FREQ 14.082 BAND 20m CALL W1AW/5 POTA_REF US-0002,US-0003

This allows us to align the fields vertically.

FAE provides many ways to write the data for fields. We'll use more readable alternatives for the `Date` (`QSO_DATE`),
`Time` (`TIME_ON`), and `POTARefList` (`POTA_REF`) **types** in this log.

    - OPERATOR W1AW QSO_DATE 2025-01-01 MODE SSB RST_SENT 59  RST_RCVD 59  TIME_ON 00:04 FREQ 14.150 BAND 20m CALL W1AW/1
    - OPERATOR W1AW QSO_DATE 2025-01-01 MODE SSB RST_SENT 59  RST_RCVD 55  TIME_ON 00:08 FREQ 14.232 BAND 20m CALL W1AW/2
    - OPERATOR W1AW QSO_DATE 2025-01-01 MODE CW  RST_SENT 599 RST_RCVD 599 TIME_ON 00:15 FREQ 14.020 BAND 20m CALL W1AW/3 POTA_REF US-0000
    - OPERATOR W1AW QSO_DATE 2025-01-01 MODE CW  RST_SENT 559 RST_RCVD 559 TIME_ON 00:16 FREQ 14.022 BAND 20m CALL W1AW/4 POTA_REF US-0001
    - OPERATOR W1AW QSO_DATE 2025-01-01 MODE CW  RST_SENT 599 RST_RCVD 599 TIME_ON 00:23 FREQ 14.082 BAND 20m CALL W1AW/5 POTA_REF US-0002, US-0003

FAE is capable of inferring many fields names from their data types. It does this for all the unique ones and the most
common ambiguous ones, so we can trim the log quite a bit.

    - OPERATOR W1AW 2025-01-01 SSB RST_SENT 59  RST_RCVD 59  00:04 14.150 20m W1AW/1
    - OPERATOR W1AW 2025-01-01 SSB RST_SENT 59  RST_RCVD 55  00:08 14.232 20m W1AW/2
    - OPERATOR W1AW 2025-01-01 CW  RST_SENT 599 RST_RCVD 599 00:15 14.020 20m W1AW/3 US-0000
    - OPERATOR W1AW 2025-01-01 CW  RST_SENT 559 RST_RCVD 559 00:16 14.022 20m W1AW/4 US-0001
    - OPERATOR W1AW 2025-01-01 CW  RST_SENT 599 RST_RCVD 599 00:23 14.082 20m W1AW/5 US-0002, US-0003

FAE also ships with a series of **pre-processors** that run on field lists. One of these infers the band from the
frequency according to the [ADIF specification][3] and implicitly places it after the frequency, so we can stop typing
out the band.

    - OPERATOR W1AW 2025-01-01 SSB RST_SENT 59  RST_RCVD 59  00:04 14.150 W1AW/1
    - OPERATOR W1AW 2025-01-01 SSB RST_SENT 59  RST_RCVD 55  00:08 14.232 W1AW/2
    - OPERATOR W1AW 2025-01-01 CW  RST_SENT 599 RST_RCVD 599 00:15 14.020 W1AW/3 US-0000
    - OPERATOR W1AW 2025-01-01 CW  RST_SENT 559 RST_RCVD 559 00:16 14.022 W1AW/4 US-0001
    - OPERATOR W1AW 2025-01-01 CW  RST_SENT 599 RST_RCVD 599 00:23 14.082 W1AW/5 US-0002, US-0003

These records have a lot of data in common. In FAE, we can lift up common data with a **factor**.

    OPERATOR W1AW
      - 2025-01-01 SSB RST_SENT 59  RST_RCVD 59  00:04 14.150 W1AW/1
      - 2025-01-01 SSB RST_SENT 59  RST_RCVD 55  00:08 14.232 W1AW/2
      - 2025-01-01 CW  RST_SENT 599 RST_RCVD 599 00:15 14.020 W1AW/3 US-0000
      - 2025-01-01 CW  RST_SENT 559 RST_RCVD 559 00:16 14.022 W1AW/4 US-0001
      - 2025-01-01 CW  RST_SENT 599 RST_RCVD 599 00:23 14.082 W1AW/5 US-0002, US-0003

A factor is a field list just like a record, but it *doesn't* start with `-`. Any field lists nested under it (indented by
two spaces) are implicitly prepended with its fields. There are two properties of field lists that make factors useful:

- The **rightmost** instance of any field is the one whose data is used.
- The order of fields in a field list is defined by the **leftmost** instance of every field.

> [!TIP]
> Understanding these field list properties is critical to maximally leveraging FAE. They are quite simple, but perhaps
> confusing at first. Here are two narrated examples.
>
> `QSO_DATE 20250101 BAND 20m MODE SSB QSO_DATE 20250102`
>
> The *rightmost* property states that `20250102` is the value assigned to QSO_DATE in this list.
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

Fields exported by a record are exported in order, so the ADI output is still unchanged.

Factors have one property themselves:

- Factors can contain any combination of records *or factors*.

From these three rules, we can derive *tons* of ways to represent this log! Let's start by expanding the factor we
already wrote...

    OPERATOR W1AW 2025-01-01
      - SSB RST_SENT 59  RST_RCVD 59  00:04 14.150 W1AW/1
      - SSB RST_SENT 59  RST_RCVD 55  00:08 14.232 W1AW/2
      - CW  RST_SENT 599 RST_RCVD 599 00:15 14.020 W1AW/3 US-0000
      - CW  RST_SENT 559 RST_RCVD 559 00:16 14.022 W1AW/4 US-0001
      - CW  RST_SENT 599 RST_RCVD 599 00:23 14.082 W1AW/5 US-0002, US-0003

and then nest two more to lift up the mode.

    OPERATOR W1AW 2025-01-01
      SSB
        - RST_SENT 59 RST_RCVD 59 00:04 14.150 W1AW/1
        - RST_SENT 59 RST_RCVD 55 00:08 14.232 W1AW/2
      CW
        - RST_SENT 599 RST_RCVD 599 00:15 14.020 W1AW/3 US-0000
        - RST_SENT 559 RST_RCVD 559 00:16 14.022 W1AW/4 US-0001
        - RST_SENT 599 RST_RCVD 599 00:23 14.082 W1AW/5 US-0002, US-0003

The RSTs don't change very much, so we can "default" them in the factors and rely on the rightmost property to override
them in the records.

    OPERATOR W1AW 2025-01-01
      SSB RST_SENT 59 RST_RCVD 59
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2 RST_RCVD 55
      CW RST_SENT 599 RST_RCVD 599
        - 00:15 14.020 W1AW/3 US-0000
        - 00:16 14.022 W1AW/4 RST_SENT 559 RST_RCVD 559 US-0001
        - 00:23 14.082 W1AW/5 US-0002, US-0003

*`RST_SENT` and `RST_RCVD` "moved" in the FAE log, but the output remains unchanged due to the leftmost property.*

Field lists can be specified on multiple lines.

    OPERATOR W1AW
    2025-01-01
      SSB
      RST_SENT 59 RST_RCVD 59
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2
          RST_RCVD 55
      CW
      RST_SENT 599 RST_RCVD 599
        - 00:15 14.020 W1AW/3
          US-0000
        - 00:16 14.022 W1AW/4
          RST_SENT 559 RST_RCVD 559
          US-0001
        - 00:23 14.082 W1AW/5
          US-0002, US-0003

*An additional indent is required to do this inside a record, as FAE cannot otherwise distinguish between a continued
record and the start of a factor.*

While valid, I think this made our log *less* readable, so I'm going back to how it was ;<wbr>) Newlines are allowed
almost anywhere, and comments prefixed with `//` are allowed anywhere a newline is, so we can tidy this up further.

    // Really fun evening on 20m!
    OPERATOR W1AW 2025-01-01

      SSB RST_SENT 59 RST_RCVD 59
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2 RST_RCVD 55

      CW RST_SENT 599 RST_RCVD 599
        - 00:15 14.020 W1AW/3 US-0000
        - 00:16 14.022 W1AW/4 RST_SENT 559 RST_RCVD 559 US-0001
        - 00:23 14.082 W1AW/5 US-0002, US-0003

We're burning a lot of characters writing the field names FAE couldn't infer. It allows you to **declare** an **alias**
for any field name at the top of the log for this reason.

    alias > RST_SENT
    alias < RST_RCVD

    // Really fun evening on 20m!
    OPERATOR W1AW 2025-01-01

      SSB > 59 < 59
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2 < 55

      CW > 599 < 599
        - 00:15 14.020 W1AW/3 US-0000
        - 00:16 14.022 W1AW/4 > 559 < 559 US-0001
        - 00:23 14.082 W1AW/5 US-0002, US-0003

Once declared, alias names can be used anywhere a field name is expected (including another alias, if that's your
thing!)

Multiple alias definitions can follow an `alias`. It can increase readability to take advantage of the optional spacing
between field names and data with them, too.

    alias > RST_SENT < RST_RCVD

    // Really fun evening on 20m!
    OPERATOR W1AW 2025-01-01

      SSB >59 <59
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2 <55

      CW >599 <599
        - 00:15 14.020 W1AW/3 US-0000
        - 00:16 14.022 W1AW/4 >559 <559 US-0001
        - 00:23 14.082 W1AW/5 US-0002, US-0003

If we switched modes more in this log, it would get irritating to write out the unchanged default RST for them every
time. FAE supports **macros** to prevent this.

    alias > RST_SENT < RST_RCVD

    macro ssb SSB >59  <59
    macro cw  CW  >599 <599

    // Really fun evening on 20m!
    OPERATOR W1AW 2025-01-01

      ssb
        - 00:04 14.150 W1AW/1
        - 00:08 14.232 W1AW/2 <55

      cw
        - 00:15 14.020 W1AW/3 US-0000
        - 00:16 14.022 W1AW/4 >559 <559 US-0001
        - 00:23 14.082 W1AW/5 US-0002, US-0003

A macro is declared alongside a field list (which can include previously-declared macros!), and its name becomes a
placeholder for those fields with their data in any following field list. It can be thought of as a reusable piece of a
field list.

I see no way to improve this log, so I conclude this part of the tour here ;<wbr>)

Remember that *every* FAE log presented throughout this section generates *identical* output, as would any combination
of them--it's up to you to choose the style for your log. I hope you enjoy doing so, and I hope you find FAE useful
:<wbr>)

### *Writing Strings*

FAE wouldn't be YAML-inspired without three string representations! For the tour, we explore them briefly within the
`String` ADIF type (they behave slightly differently for `MultilineString`) by providing data to the `COMMENT` field.  
The text following `→` denotes the literal data used by `COMMENT` in the example records.

The simplest string representation is **unlimited**--these strings contain just themselves.

    - COMMENT Thanks!  →  Thanks!

They can contain most characters, but spaces are a notable exception. For those, we need the **delimited**
representation.

    - COMMENT "Thanks for QSO!"  →  Thanks for QSO!
    - COMMENT "Audio distorted\\\"wobbly\""  →  Audio distorted\"wobbly"

These strings can contain more characters, but some of them become **special characters**, like `"` and `\`. Writing
these requires prefixing them with `\`.

For long strings (or strings with lots of special characters), FAE provides the **multiline** representation.

    - COMMENT
        Thanks for QSO!
        Great to catch up.

    → Thanks for QSO! Great to catch up.

To use this, start a new line where the data would usually go--then, write it instead on lines indented at least two
levels (four spaces) past the current indent. Any additional indentation is removed; lines with no text are ignored.

    - COMMENT

        Thanks for QSO!

          Great to catch up.

    → Thanks for QSO! Great to catch up.

The pieces are joined together by a single space to form the data.

`MultilineString` uses the same representations, but it contains an additional special character (`n`) for the newline
and has more detailed joining rules. Please see the type documentation for more details on writing strings.

### Contest Logging: Groups

Suppose we racked up some contacts in the ARRL phone sweepstakes. Logging its infamous exchange once per QSO quickly
becomes tedious:

    - STX 1 1200 W1AW/1  SRX 123 PRECEDENCE A CHECK 80 ARRL_SECT CT
    - STX 2 1202 W1AW/2  SRX 321 PRECEDENCE B CHECK 90 ARRL_SECT CT
    - STX 3 1205 W1AW/3  SRX 454 PRECEDENCE C CHECK 00 ARRL_SECT CT

Aliases can help here, particularly with our serial numbers, but there's still a lot of noise in the exchange.

    alias # STX
    alias ## SRX p PRECEDENCE ' CHECK @ ARRL_SECT

    - #1 1200 W1AW/1  ##123 p A '80 @CT
    - #2 1202 W1AW/2  ##321 p B '90 @CT
    - #3 1205 W1AW/3  ##454 p C '00 @CT

It's clear that the order and type of the fields we're writing to represent the exchange is constant, so the
expressiveness of the field names (even when aliased) is just getting in the way.

FAE supports **groups** for this reason.

    alias # STX

    group | SRX PRECEDENCE CHECK ARRL_SECT

    - #1 1200 W1AW/1  | 123 A 80 CT
    - #2 1202 W1AW/2  | 321 B 90 CT
    - #3 1205 W1AW/3  | 454 C 00 CT

Here, we declare a `|` group consisting of the field names `SRX`, `PRECEDENCE`, `CHECK`, `ARRL_SECT` (in that order).
When `|` appears in a field list, the next `n` pieces of data (where `n` is the number of fields in the group) populate
the data for the fields in the group (in order). The names of the fields are not written again, so instances of the
group contain only the text strictly required to populate their fields.

> [!IMPORTANT]
> The list of field names in the group declaration isn't a *field list*--it's just a list of field names. The list of
> data in instances of the group isn't one, either--it's just a list of data. FAE builds a field list with the paired
> field names and field data from *both* lists behind the scenes.

*Any name that can be used for an alias or macro can be used for a group--using `|` in these sort of logs just looks
pretty to me.*

[1]: https://df3cb.com/fle
[2]: https://yaml.org/
[3]: https://adif.org/adif/ "III.B.4. Band Enumeration"


Usage
-----

FAE ships with a CLI (`fae`). It's quite minimal at the moment:

```sh
# Generate the ADIF for my-log.fae; if the log contains errors, report the first.
cat my-log.fae | fae
```

Its compiler can also be called from a new program.

```js
import {compile, SyntaxError, ValidationError} from "@pilchd/fae";

// The parser accepts FAE content as a string.
const fae = [
    "OPERATOR W1AW",
    "  - 2025-01-01 SSB 1234 14.232 W1AW/1"
].join('\n');

try {
    // The compiler returns ADIF content as an array of its lines.
    // It defaults all of its options; please refer to its documentation.
    const adif = compile(fae);
    adif.forEach(line => console.log(line));
}
// If there are errors, it will report only one per execution.
catch (e) {
    // `SyntaxError` indicates a fault that occurred during parsing.
    if (e instanceof SyntaxError)
        console.error(e.message);
    // `ValidationError` indicates a fault that occurred during translation.
    if (e instanceof ValidationError)
        console.error(e.message);
}
```

See `example/` for additional implementations; all functions are documented inline (for now :<wbr>)).


Motivation
----------

DF3CB's [Fast Log Entry][2] is an excellent tool for simple, general-purpose amateur logging in plaintext. After writing
many logs with it and studying its community implementations, I felt its design could be extrapolated to address a few
issues I had accumulated with more complex logs:

- Not all ADIF fields are supported.

  If I want to specify `TX_PWR` for the records in a log, I cannot.

- It is difficult to *intuit* and impossible to *specify* when field data is shared between records.

  Consider this FLE log:
  ```
  2025-01-01 1200
  7.074 W1AW/1
  40m W1AW/2
  W1AW/3
  ```
  Three records are generated (three call signs appear). It's perhaps intuitive that `QSO_DATE` and `TIME_ON` should
  appear in all records until changed--but which records have `FREQ` or `BAND`, and what data is assigned to them?
  The answer isn't clear from the document structure, and there's no way to specify a resolution to the ambiguity.

Moreover, these issues are related--this project really started because I wanted to explicitly set the transmitter power
for ~5 records in a log without typing it 5 times.

I set out to create a FLE implementation with a feature flag for this "extended" functionality, but I enjoyed logging
with the "extended" functionality so much that it became the core functionality of the program. It's now its own tool,
but it borrows its mechanics (and its name!) from FLE:

- Factor common fields out of records.
- Write data succinctly.


Contributing
------------

While the application's design should be fully ADIF-compliant, its implementation is not--it needs more work :<wbr>)  
Issues regarding current functionality and suggestions for extensions are more than welcome, but I will not accept
contributions at this time; the design is moving too quickly, and I don't want to immediately break them.


Supported ADIF QSO Fields
-------------------------

    ARRL_SECT
    BAND
    CALL
    CHECK
    CLASS
    COMMENT
    FREQ
    GRIDSQUARE
    MODE
    MY_ARRL_SECT
    MY_GRIDSQUARE
    MY_POTA_REF
    NAME
    NOTES
    OPERATOR
    POTA_REF
    PRECEDENCE
    QSLMSG
    QSO_DATE
    RST_SENT
    RST_RCVD
    SIG
    SIG_INFO
    STX
    SRX
    SUBMODE
    TIME_ON
    TX_PWR
