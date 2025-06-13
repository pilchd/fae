space "space"
  = " "
tab "tab"
  = "\t"
newline "newline"
  = "\n" / "\r\n"

_
  = space / tab // "(" [^\n\)]* ")"
n
  = newline
EOL
  = newline / !.

l_empty "empty line"
  = n
l_blank "blank line"
  = _+ EOL
l_comment "comment"
  = _* "//" @$[^\n]* EOL
l_ignore
  = l_empty
  / l_blank
  / l_comment

dent "indent"
  = space|2|

indent
  = dent|{return level}|
m_ii // "indent in"
  = "" {++level}
m_io // "indent out"
  = "" {--level}
