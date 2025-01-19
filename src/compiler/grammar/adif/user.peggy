au_HeaderDataSpecifier
  = name:au_FIELDNAME
    _+
    type:(
        ("Date" / "D")
        {return {name: "Date", indicator: "D"};}
      / ("Time" / "T")
        {return {name: "Time", indicator: "T"};}
      / ("String" / "S")
        {return {name: "String", indicator: "S"};}
      / ("MultilineString" / "M")
        {return {name: "MultilineString", indicator: "M"};}

      / ("Enumeration" / "E") _* enumeration:(_* "{" _* @at_String|1.., "," _*| _* "}")?
        {
          return {
            name: "Enumeration",
            indicator: "E",
            enumeration: enumeration ?? undefined
          }
        }
      / ("Number" / "N") _* range:("{" _* @at_Number _* ":" _* @at_Number _* "}")?
        {
          return {
            name: "Number",
            indicator: "N",
            range: range ?? undefined
          }
        }
    )
    {
      return [name, type];
    }

au_FIELDNAME
  = name:$[A-Z_]+
    &{return !field.name.has(name) && !/^ /.test(name) && !/ $/.test(name);}
    {return name;}
