au_field "ADIF user-defined field"
  = "field" _+ fieldname:au_name _+ type:au_type
    {
      field.set(fieldname, type);

      return [fieldname, type];
    }

// TODO Allowed names?
au_name
  = !a_name @$[A-Z_a-z]+

au_type
  = ("Date" / "D")
    {return {name: "Date", indicator: "D"};}
  / ("Time" / "T")
    {return {name: "Time", indicator: "T"};}
  / ("String" / "S")
    {return {name: "String", indicator: "S"};}
  / ("MultilineString" / "M")
    {return {name: "MultilineString", indicator: "M"};}

  / ("Enumeration" / "E") _+ enumeration:at_String|1.., _+|
    {
      return {
        name: "Enumeration",
        indicator: "E",
        enumeration: new Set(enumeration.map(value => value.toUpperCase()))
      }
    }

  / ("Number" / "N") range:(_+ @at_Number|2, _+|)?
    {
      return {
        name: "Number",
        indicator: "N",
        range: range && range.map(number => parseFloat(number))
      }
    }
