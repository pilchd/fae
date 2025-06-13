{{
  function node(node, range, object = {}) {
    return {
      node,
      locator: range(),
      ...object
    }
  }
}}

{
  const field = new Map
  const scope = new ST
  let level = 0
}

fae
  = l_ignore*
    fields:au_field|.., n l_ignore*| l_ignore*
    statements:statement|.., n l_ignore*| l_ignore*
    {return { fields, statements }}

statement = record / factor

record "record"
  = indent "-" _* m_ii heads:fl _*
    tails:(n l_ignore* indent @fl _*)|..| m_io _*
    {
      return node("record", range, {
        fl: [...heads, ...tails.flat()]
      })
    }
factor "factor"
  = m_si
    indent heads:(dl / fl) _*
    tails:(n l_ignore* indent @(dl / fl) _*)|..| _* n
    l_ignore*
    m_ii statements:statement|1.., n l_ignore*| m_io
    m_so
    {
      return node("factor", range, {
        factors: [...heads, ...tails.flat()],
        statements
      })
    }

fl = (alias / pop / nop / name / data)|1.., _*|
dl = d_alias|1..1|
