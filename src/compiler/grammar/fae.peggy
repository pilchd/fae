{
  const d = {
    alias: new Map(),
    field: new Map(),
    group: new Map(),
    macro: new Map(),
  };
  const g = {
    type: null,
    group: {
      group: null,
      idx: 0
    },

    level: 0
  };
}

fae
  = ignoreline*
    declaration|.., n ignoreline*| ignoreline*
    statements:statement|.., n ignoreline*| ignoreline*
    {
      return {
        declarations: d.field,
        statements
      }
    }

declaration
  = _* "alias" _+ declarations:(@symbol _+ @name)|1.., _+| _*
    {
      declarations.forEach(declaration => d.alias.set(...declaration));
    }
  / _* "field" _+ declaration:au_HeaderDataSpecifier
    {
      d.field.set(...declaration);
    }
  / _* "group" _* group:symbol _+ names:name|1.., _+| _*
    {
      d.group.set(group, names.map(name => ({
        name,
        type: d.field.get(name) ?? field.type[name]
      })));
    }
  / _* "macro" _+ declaration:(@symbol _+ @fields) _*
    {
      d.macro.set(...declaration);
    }
symbol
  = $[!#$%&*+.8<=>@^_`a-z|~]+

statement
  = record / factor

record
  = indent "-" _* heads:fields? _*
    tails:(n indent dent @fields _*)* _*
    {
      const fields = [...(heads ?? []), ...tails.flat()];

      return {
        type: "record",
        location: location(),
        fields
      }
    }
factor
  = fields:(indent @fields _*)|1.., n ignoreline*| _* n ignoreline*
    m_dn statements:statement|1.., n ignoreline*| m_up
    {
      return {
        type: "factor",
        location: location(),
        fields: fields.flat(),
        statements
      }
    }

fields
    = fields:(
          macro
        / group
        / field:field {return [field];}
      )|1.., _+|
      {
        return fields.flat();
      }
macro
  = macro:symbol
    &{return d.macro.has(macro);}
    {return d.macro.get(macro);}
group
  = (
      group:symbol
      &{return d.group.has(group);}
      {
        g.group.group = d.group.get(group);
        g.group.idx = 0;
      }
    )
    _+
    data:(m_gsi @data m_gii)|{return g.group.group.length;}, _+|
    {
      return g.group.group.map((type, idx) => {
        return [type.name, data[idx]];
      });
    }
field
  = @(
      name:name
      {
        g.type = d.field.get(name) ?? field.type[name];

        if (options.debug)
          console.log(name, "->", g.type);

        return name;
      }
    )
    _*
    @data

  / BAND:ae_Band {return ["BAND", BAND];}
  / MODE:ae_Mode {return ["MODE", MODE];}
  / SUBMODE:ae_Submode {return ["SUBMODE", SUBMODE];}

  / QSO_DATE:at_Date
    {return ["QSO_DATE", QSO_DATE];}
  / TIME_ON:at_Time
    {return ["TIME_ON", TIME_ON];}
  / FREQ:at_Number &{return /\./.test(FREQ);}
    {return ["FREQ", FREQ];}
  / POTA_REF:at_POTARefList
    {return ["POTA_REF", POTA_REF];}
  / CALL:at_String &{return /(?:[A-Z][0-9])|(?:[0-9][A-Z])/.test(CALL.toUpperCase());}
    {return ["CALL", CALL];}
name
  = alias:symbol
    &{return d.alias.has(alias);}
    {return d.alias.get(alias);}
  / a_name
  / name:au_FIELDNAME
    &{return d.field.has(name);}
    {return name;}
data
  = @at_Boolean
    &{return g.type.name === "Boolean";}
  / data:at_Integer
    &{return g.type.name === "Integer"}
    {
      if (g.type.range) {
        const [lo, hi] = g.type.range;
        if (!(lo <= parseInt(data) && parseInt(data) <= (hi ?? Infinity)))
          error("TODO int not range");
      }
      return data;
    }
  / data:at_Number
    &{return g.type.name === "Number"}
    {
      if (g.type.range) {
        const [lo, hi] = g.type.range;
        if (!(lo <= parseFloat(data) && parseFloat(data) <= (hi ?? Infinity)))
          error("TODO number in range");
      }
      return data;
    }
  / @at_Date
    &{return g.type.name === "Date";}
  / @at_Time
    &{return g.type.name === "Time";}
  / @at_String
    &{return g.type.name === "String";}
  / @at_MultilineString
    &{return g.type.name === "MultilineString";}
  / @at_GridSquare
    &{return g.type.name === "GridSquare";}
  / @at_POTARef
    &{return g.type.name === "POTARef";}
  / @at_POTARefList
    &{return g.type.name === "POTARefList";}

  / @ae_ARRL
    &{return g.type.enumeration === "ARRL Section";}
  / @ae_Band
    &{return g.type.enumeration === "Band";}
  / @ae_Mode
    &{return g.type.enumeration === "Mode";}
  / @ae_Submode
    &{return g.type.enumeration === "Submode";}

  / data:at_String
    &{return typeof g.type.enumeration === "object";}
    {
      if (!g.type.enumeration.includes(data))
        error("TODO not in enum");
      return data;
    }

indent
  = dent|{return g.level;}|

m_dn
  = "" {++g.level;}
m_up
  = "" {--g.level;}

m_gsi
  = "" {g.type = g.group.group[g.group.idx].type;}
m_gii
  = "" {++g.group.idx;}
