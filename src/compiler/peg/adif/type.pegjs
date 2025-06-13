// src/adif/parse/Number.ts
at_Number "ADIF type Number (flow format)"
  = @data:data_f &{return /^-?(?=.*\d.*)\d*\.?\d*$/.test(data)}

// src/adif/parse/String.ts
at_String "ADIF type String (flow format)"
  = @data:data_f &{return /^[\x20-\x7E]+$/.test(data)}
