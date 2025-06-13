reserved
  = "-" / "," / ";" / ":" / "."
  / "alias"
declared
  = symbol:symbol &{return field.has(symbol) || scope.has(symbol)}

symbol "symbol"
  = !reserved @$[!"#$%&'()*+,-./:;<=>\?@[\\\]^`{|}~]
  / $([A-Za-z][0-9A-Za-z]+)
c_symbol
  = !reserved !declared @symbol
  / cut:reserved {error(
      `Expected symbol but '${text()}' found (reserved words cannot be declared)`
    )}
  / cut:declared {error(
      `Expected symbol but '${text()}' found ('${text()}' is declared in this scope)`
    )}
  / cut:[^ ]+ {error(
      `Expected symbol but '${text()}' found`
    )}

data_f = data_t / data_q / data_p
data_b = data_d / data_u

data_t = ":" data:$((!EOL .)+) {return data.trim()}
data_q = "\"" @$[^"]* "\""
data_p = @$(!(_ / EOL) .)+

data_d
  = "."+ _* n
    @(
        indent dent @$(!n .)+ n
      / _* n {return null}
    )|1..|
    indent "."+

data_u
  = "."+ _* n
    @(
        indent dent @$(!n .)+
      / _* &((!(indent dent) l_blank / l_empty)* (indent dent)) {return null}
    )|1.., n|

d_alias "alias declaration"
  = "alias" _+ symbol:c_symbol _* fl:(alias / pop / nop / name / data)|1.., _*|
    {
      scope.set(symbol, "alias")

      return node("declaration", range, {
        of: "alias",
        symbol,
        fl
      })
    }

alias "alias"
  = symbol:symbol &{return scope.get(symbol) === "alias"}
    { return node("alias", range, { symbol }) }
pop "pop"
  = "-"+ &_+
    {return node("pop", range)}
nop "nop"
  = "."+ &_+
    {return node("nop", range)}
name "field name"
  = name:au_name &{return field.has(name)}
    {return node("name", range, { name, type: field.get(name) })}
  / name:a_name
    {return node("name", range, { name })}
data "data"
  = data:(data_b / data_f)
    {return node("data", range, { data })}
