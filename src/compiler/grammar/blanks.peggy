space "space"
    = " "
tab "tab"
    = "\t"
newline "newline"
    = "\n" / "\r\n"

_
    = space / tab
n
    = newline
EOL
    = newline / !.

emptyline "empty line"
    = n
blankline "blank line"
    = _+ EOL
commentline "comment"
    = _* "//" @$[^\n]* EOL
ignoreline
    = commentline
    / blankline
    / emptyline

dent "indent"
    = space|2|
