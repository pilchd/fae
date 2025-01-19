{{
  /**
   * Calculate the number of days in a year's month.
   *
   * @param y - The year
   * @param m - The month
   *
   * @return The number of days in `y`'s `m`
   */
  function days(y, m) {
    switch (m) {
      case 2:
        return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 ? 29 : 28;
      case 4: case 6: case 9: case 11:
        return 30;
      default:
        return 31;
    }
  }
}}

at_Boolean "ADIF type Boolean"
  = ("Y"i / "yes"i / "true" / "1") {return "Y";}
  / ("N"i / "no"i / "false" / "0") {return "N";}

at_Digit "ADIF type Digit"
  = [0123456789]

at_Integer "ADIF type Integer"
  = $("-"? at_Digit+)

at_Number "ADIF type Number"
  = $("-"? at_Digit+ ('.' $at_Digit+)?)

at_Date "ADIF type Date"
  = y:$("19"[3-9][0-9] / [2-9][0-9]|3|)
    ("-" / "/" / "\\" / "_")?
    m:$("0"[1-9] / "1"[0-2])
    ("-" / "/" / "\\" / "_")?
    d:$("0"[1-9] / [1-2][0-9] / "3"[0-1])
    {
      if (parseInt(d) > days(parseInt(y), parseInt(m)))
        error(`Date \"${y}-${m}-${d}\" is illegal`);

      return `${y}${m}${d}`;
    }

at_Time "ADIF type Time"
  = h:$([0-1][0-9] / "2"[0-3])
    ms:(":"? @$([0-5][0-9]))|1..2|
    {
      return `${h}${ms.join("")}`;
    }

at_String "ADIF type String"
  = n ignoreline*
    text:(indent dent|2| _* @$[ !"#$%&'()*+,-./0123456789:;<=>?@A-Z[\\\]^_`a-z{|}~]+)|1.., n (emptyline / blankline)*|
    {
      // ASCII 32 through 126
      return text.join(" ");
    }
  / "\"" text:(
        "\\" @"\\"
      / "\\" @"\""
      / [ !#$%&'()*+,-./0123456789:;<=>?@A-Z[\]^_`a-z{|}~]
    )+ "\""
    {
      // ASCII 32 through 126 excl. '"' (34), '\' (92)
      return text.join("");
    }
  / text:$[!"#$%&'()*+,-./0123456789:;<=>?@A-Z[\\\]^_`a-z{|}~]+
    {
      // ASCII 32 through 126 excl. ' ' (32)
      return text;
    }

at_MultilineString "ADIF type MultilineString"
  = n
    text:(indent dent|2| @$[ !"#$%&'()*+,-./0123456789:;<=>?@A-Z[\\\]^_`a-z{|}~]+)|1.., n (emptyline / blankline)*|
    {
      // ASCII 32 through 126
      return text.join("\r\n");
    }
  / "\"" text:(
        "\\" @"\\"
      / "\\" @"\""
      / "\\" "n" {return "\r\n";}
      / [ !#$%&'()*+,-./0123456789:;<=>?@A-Z[\]^_`a-z{|}~]
    )+ "\""
    {
      // ASCII 32 through 126 excl. '"' (34), '\' (92)
      return text.join("");
    }
  / text:$[!"#$%&'()*+,-./0123456789:;<=>?@A-Z[\\\]^_`a-z{|}~]+
    {
      // ASCII 32 through 126 excl. ' ' (32)
      return text;
    }

at_GridSquare "ADIF type GridSquare"
  = $([A-R]i|2| ([0-9]|2| ([A-X]i|2..2| ([0-9]|2|)?)?)?)

// TODO Support @yyyyyy (ISO 3166-2)
at_POTARef "ADIF type POTARef"
  = pota:$([A-Z]i|1..4| "-" [0-9]|4..5|)
    {
      return pota.toUpperCase();
    }

at_POTARefList "ADIF type POTARefList"
  = list:at_POTARef|1.., _* ',' _*|
    {
      return list.join(",");
    }
