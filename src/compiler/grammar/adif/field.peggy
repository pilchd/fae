{{
  const field = {
    name: new Set([
      "ADDRESS",
      "ADDRESS_INTL",
      "AGE",
      "ALTITUDE",
      "ANT_AZ",
      "ANT_EL",
      "ANT_PATH",
      "ARRL_SECT",
      "AWARD_SUBMITTED",
      "AWARD_GRANTED",
      "A_INDEX",
      "BAND",
      "BAND_RX",
      "CALL",
      "CHECK",
      "CLASS",
      "CLUBLOG_QSO_UPLOAD_DATE",
      "CLUBLOG_QSO_UPLOAD_STATUS",
      "CNTY",
      "CNTY_ALT",
      "COMMENT",
      "COMMENT_INTL",
      "CONT",
      "CONTACTED_OP",
      "CONTEST_ID",
      "COUNTRY",
      "COUNTRY_INTL",
      "CQZ",
      "CREDIT_SUBMITTED",
      "CREDIT_GRANTED",
      "DARC_DOK",
      "DCL_QSLRDATE",
      "DCL_QSLSDATE",
      "DCL_QSL_RCVD",
      "DCL_QSL_SENT",
      "DISTANCE",
      "DXCC",
      "EMAIL",
      "EQ_CALL",
      "EQSL_QSLRDATE",
      "EQSL_QSLSDATE",
      "EQSL_QSL_RCVD",
      "EQSL_QSL_SENT",
      "FISTS",
      "FISTS_CC",
      "FORCE_INIT",
      "FREQ",
      "FREQ_RX",
      "GRIDSQUARE",
      "GRIDSQUARE_EXT",
      "GUEST_OP",
      "HAMLOGEU_QSO_UPLOAD_DATE",
      "HAMLOGEU_QSO_UPLOAD_STATUS",
      "HAMQTH_QSO_UPLOAD_DATE",
      "HAMQTH_QSO_UPLOAD_STATUS",
      "HRDLOG_QSO_UPLOAD_DATE",
      "HRDLOG_QSO_UPLOAD_STATUS",
      "IOTA",
      "IOTA_ISLAND_ID",
      "ITUZ",
      "K_INDEX",
      "LAT",
      "LON",
      "LOTW_QSLRDATE",
      "LOTW_QSLSDATE",
      "LOTW_QSL_RCVD",
      "LOTW_QSL_SENT",
      "MAX_BURSTS",
      "MODE",
      "MORSE_KEY_INFO",
      "MORSE_KEY_TYPE",
      "MS_SHOWER",
      "MY_ALTITUDE",
      "MY_ANTENNA",
      "MY_ANTENNA_INTL",
      "MY_ARRL_SECT",
      "MY_CITY",
      "MY_CITY_INTL",
      "MY_CNTY",
      "MY_CNTY_ALT",
      "MY_COUNTRY",
      "MY_COUNTRY_ALT",
      "MY_CQ_ZONE",
      "MY_DARC_DOK",
      "MY_DXCC",
      "MY_FISTS",
      "MY_GRIDSQUARE",
      "MY_GRIDSQUARE_EXT",
      "MY_IOTA",
      "MY_IOTA_ISLAND_ID",
      "MY_ITU_ZONE",
      "MY_LAT",
      "MY_LON",
      "MY_MORSE_KEY_INFO",
      "MY_MORSE_KEY_TYPE",
      "MY_NAME",
      "MY_NAME_INTL",
      "MY_POSTAL_CODE",
      "MY_POSTAL_CODE_INTL",
      "MY_POTA_REF",
      "MY_RIG",
      "MY_RIG_INTL",
      "MY_SIG",
      "MY_SIG_INTL",
      "MY_SIG_INFO",
      "MY_SIG_INFO_INTL",
      "MY_SOTA_REF",
      "MY_STATE",
      "MY_STREET",
      "MY_STREET_INTL",
      "MY_USACA_COUNTIES",
      "MY_VUCC_GRIDS",
      "MY_WWFF_REF",
      "NAME",
      "NAME_INTL",
      "NOTES",
      "NOTES_INTL",
      "NR_BURSTS",
      "NR_PINGS",
      "OPERATOR",
      "OWNER_CALLSIGN",
      "PFX",
      "POTA_REF",
      "PRECEDENCE",
      "PROP_MODE",
      "PUBLIC_KEY",
      "QRZCOM_QSO_DOWNLOAD_DATE",
      "QRZCOM_QSO_DOWNLOAD_STATUS",
      "QRZCOM_QSO_UPLOAD_DATE",
      "QRZCOM_QSO_UPLOAD_STATUS",
      "QSLMSG",
      "QSLMSG_INTL",
      "QSLMSG_RCVD",
      "QSLRDATE",
      "QSLSDATE",
      "QSL_RCVD",
      "QSL_RCVD_VIA",
      "QSL_SENT",
      "QSL_SENT_VIA",
      "QSL_VIA",
      "QSO_COMPLETE",
      "QSO_DATE",
      "QSO_DATE_OFF",
      "QSO_RANDOM",
      "QTH",
      "QTH_INTL",
      "REGION",
      "RIG",
      "RIG_INTL",
      "RST_RCVD",
      "RST_SENT",
      "RX_PWR",
      "SAT_MODE",
      "SAT_NAME",
      "SFI",
      "SIG",
      "SIG_INTL",
      "SIG_INFO",
      "SIG_INFO_INTL",
      "SILENT_KEY",
      "SKCC",
      "SOTA_REF",
      "SRX",
      "SRX_STRING",
      "STATE",
      "STATION_CALLSIGN",
      "STX",
      "STX_STRING",
      "SUBMODE",
      "SWL",
      "TEN_TEN",
      "TIME_OFF",
      "TIME_ON",
      "TX_PWR",
      "UKSMG",
      "USACA_COUNTIES",
      "VE_PROV",
      "VUCC_GRIDS",
      "WEB",
      "WWFF_REF"
    ]),
    type: {
      ARRL_SECT: {name: "Enumeration", enumeration: "ARRL Section"},
      BAND: {name: "Enumeration", enumeration: "Band"},
      CALL: {name: "String"},
      CHECK: {name: "String"},
      CLASS: {name: "String"},
      COMMENT: {name: "String"},
      FREQ: {name: "Number"},
      GRIDSQUARE: {name: "GridSquare"},
      MODE: {name: "Enumeration", enumeration: "Mode"},
      MY_ARRL_SECT: {name: "Enumeration", enumeration: "ARRL Section"},
      MY_GRIDSQUARE: {name: "GridSquare"},
      MY_POTA_REF: {name: "POTARefList"},
      NAME: {name: "String"},
      NOTES: {name: "MultilineString"},
      OPERATOR: {name: "String"},
      POTA_REF: {name: "POTARefList"},
      PRECEDENCE: {name: "String"},
      QSLMSG: {name: "MultilineString"},
      QSO_DATE: {name: "Date"},
      RST_SENT: {name: "String"},
      RST_RCVD: {name: "String"},
      SIG: {name: "String"},
      SIG_INFO: {name: "String"},
      STATION_CALLSIGN: {name: "String"},
      STX: {name: "Integer", range: [0]},
      SRX: {name: "Integer", range: [0]},
      SUBMODE: {name: "Enumeration", enumeration: "Submode"},
      TIME_ON: {name: "Time"},
      TX_PWR: {name: "Number", range: [0]}
    },
    link: {
      MODE__SUBMODE: {
        CHIP: new Set(["CHIP64", "CHIP128"]),
        CW: new Set(["PCW"]),
        DIGITALVOICE: new Set(["C4FM", "DMR", "DSTAR", "FREEDV", "M17"]),
        DOMINO: new Set(["DOM-M", "DOM4", "DOM5", "DOM8", "DOM11", "DOM16", "DOM22", "DOM44", "DOM88", "DOMINOEX", "DOMINOF"]),
        DYNAMIC: new Set(["VARA HF", "VARA SATELLITE", "VARA FM 1200", "VARA FM 9600"]),
        HELL: new Set(["FMHELL", "FSKHELL", "HELL80", "HELLX5", "HELLX9", "HFSK", "PSKHELL", "SLOWHELL"]),
        ISCAT: new Set(["ISCAT-A", "ISCAT-B"]),
        JT4: new Set(["JT4A", "JT4B", "JT4C", "JT4D", "JT4E", "JT4F", "JT4G"]),
        JT9: new Set(["JT9-1", "JT9-2", "JT9-5", "JT9-10", "JT9-30", "JT9A", "JT9B", "JT9C", "JT9D", "JT9E", "JT9E FAST", "JT9F", "JT9F FAST", "JT9G", "JT9G FAST", "JT9H", "JT9H FAST"]),
        JT65: new Set(["JT65A", "JT65B", "JT65B2", "JT65C", "JT65C2"]),
        MFSK: new Set(["FSQCALL", "FST4", "FST4W", "FT4", "JS8", "JTMS", "MFSK4", "MFSK8", "MFSK11", "MFSK16", "MFSK22", "MFSK31", "MFSK32", "MFSK64", "MFSK64L", "MFSK128", "MFSK128L", "Q65"]),
        OLIVIA: new Set(["OLIVIA 4/125", "OLIVIA 4/250", "OLIVIA 8/250", "OLIVIA 8/500", "OLIVIA 16/500", "OLIVIA 16/1000", "OLIVIA 32/1000"]),
        OPERA: new Set(["OPERA-BEACON", "OPERA-QSO"]),
        PAC: new Set(["PAC2", "PAC3", "PAC4"]),
        PAX: new Set(["PAX2"]),
        PSK: new Set(["8PSK125", "8PSK125F", "8PSK125FL", "8PSK250", "8PSK250F", "8PSK250FL", "8PSK500", "8PSK500F", "8PSK1000", "8PSK1000F", "8PSK1200F", "FSK31", "PSK10", "PSK31", "PSK63", "PSK63F", "PSK63RC4", "PSK63RC5", "PSK63RC10", "PSK63RC20", "PSK63RC32", "PSK125", "PSK125C12", "PSK125R", "PSK125RC10", "PSK125RC12", "PSK125RC16", "PSK125RC4", "PSK125RC5", "PSK250", "PSK250C6", "PSK250R", "PSK250RC2", "PSK250RC3", "PSK250RC5", "PSK250RC6", "PSK250RC7", "PSK500", "PSK500C2", "PSK500C4", "PSK500R", "PSK500RC2", "PSK500RC3", "PSK500RC4", "PSK800C2", "PSK800RC2", "PSK1000", "PSK1000C2", "PSK1000R", "PSK1000RC2", "PSKAM10", "PSKAM31", "PSKAM50", "PSKFEC31", "QPSK31", "QPSK63", "QPSK125", "QPSK250", "QPSK500", "SIM31"]),
        QRA64: new Set(["QRA64A", "QRA64B", "QRA64C", "QRA64D", "QRA64E"]),
        ROS: new Set(["ROS-EME", "ROS-HF", "ROS-MF"]),
        RTTY: new Set(["ASCI"]),
        SSB: new Set(["LSB", "USB"]),
        THOR: new Set(["THOR-M", "THOR4", "THOR5", "THOR8", "THOR11", "THOR16", "THOR22", "THOR25X4", "THOR50X1", "THOR50X2", "THOR100"]),
        THRB: new Set(["THRBX", "THRBX1", "THRBX2", "THRBX4", "THROB1", "THROB2", "THROB4"]),
        TOR: new Set(["AMTORFEC", "GTOR", "NAVTEX", "SITORB"])
      }
    }
  };
}}

a_name
    = "WWFF_REF"
    / "WEB"
    / "VUCC_GRIDS"
    / "VE_PROV"
    / "USACA_COUNTIES"
    / "UKSMG"
    / "TX_PWR"
    / "TIME_ON"
    / "TIME_OFF"
    / "TEN_TEN"
    / "SWL"
    / "SUBMODE"
    / "STX_STRING"
    / "STX"
    / "STATION_CALLSIGN"
    / "STATE"
    / "SRX_STRING"
    / "SRX"
    / "SOTA_REF"
    / "SKCC"
    / "SILENT_KEY"
    / "SIG_INTL"
    / "SIG_INFO_INTL"
    / "SIG_INFO"
    / "SIG"
    / "SFI"
    / "SAT_NAME"
    / "SAT_MODE"
    / "RX_PWR"
    / "RST_SENT"
    / "RST_RCVD"
    / "RIG_INTL"
    / "RIG"
    / "REGION"
    / "QTH_INTL"
    / "QTH"
    / "QSO_RANDOM"
    / "QSO_DATE_OFF"
    / "QSO_DATE"
    / "QSO_COMPLETE"
    / "QSL_VIA"
    / "QSL_SENT_VIA"
    / "QSL_SENT"
    / "QSL_RCVD_VIA"
    / "QSL_RCVD"
    / "QSLSDATE"
    / "QSLRDATE"
    / "QSLMSG_RCVD"
    / "QSLMSG_INTL"
    / "QSLMSG"
    / "QRZCOM_QSO_UPLOAD_STATUS"
    / "QRZCOM_QSO_UPLOAD_DATE"
    / "QRZCOM_QSO_DOWNLOAD_STATUS"
    / "QRZCOM_QSO_DOWNLOAD_DATE"
    / "PUBLIC_KEY"
    / "PROP_MODE"
    / "PRECEDENCE"
    / "POTA_REF"
    / "PFX"
    / "OWNER_CALLSIGN"
    / "OPERATOR"
    / "NR_PINGS"
    / "NR_BURSTS"
    / "NOTES_INTL"
    / "NOTES"
    / "NAME_INTL"
    / "NAME"
    / "MY_WWFF_REF"
    / "MY_VUCC_GRIDS"
    / "MY_USACA_COUNTIES"
    / "MY_STREET_INTL"
    / "MY_STREET"
    / "MY_STATE"
    / "MY_SOTA_REF"
    / "MY_SIG_INTL"
    / "MY_SIG_INFO_INTL"
    / "MY_SIG_INFO"
    / "MY_SIG"
    / "MY_RIG_INTL"
    / "MY_RIG"
    / "MY_POTA_REF"
    / "MY_POSTAL_CODE_INTL"
    / "MY_POSTAL_CODE"
    / "MY_NAME_INTL"
    / "MY_NAME"
    / "MY_MORSE_KEY_TYPE"
    / "MY_MORSE_KEY_INFO"
    / "MY_LON"
    / "MY_LAT"
    / "MY_ITU_ZONE"
    / "MY_IOTA_ISLAND_ID"
    / "MY_IOTA"
    / "MY_GRIDSQUARE_EXT"
    / "MY_GRIDSQUARE"
    / "MY_FISTS"
    / "MY_DXCC"
    / "MY_DARC_DOK"
    / "MY_CQ_ZONE"
    / "MY_COUNTRY_ALT"
    / "MY_COUNTRY"
    / "MY_CNTY_ALT"
    / "MY_CNTY"
    / "MY_CITY_INTL"
    / "MY_CITY"
    / "MY_ARRL_SECT"
    / "MY_ANTENNA_INTL"
    / "MY_ANTENNA"
    / "MY_ALTITUDE"
    / "MS_SHOWER"
    / "MORSE_KEY_TYPE"
    / "MORSE_KEY_INFO"
    / "MODE"
    / "MAX_BURSTS"
    / "LOTW_QSL_SENT"
    / "LOTW_QSL_RCVD"
    / "LOTW_QSLSDATE"
    / "LOTW_QSLRDATE"
    / "LON"
    / "LAT"
    / "K_INDEX"
    / "ITUZ"
    / "IOTA_ISLAND_ID"
    / "IOTA"
    / "HRDLOG_QSO_UPLOAD_STATUS"
    / "HRDLOG_QSO_UPLOAD_DATE"
    / "HAMQTH_QSO_UPLOAD_STATUS"
    / "HAMQTH_QSO_UPLOAD_DATE"
    / "HAMLOGEU_QSO_UPLOAD_STATUS"
    / "HAMLOGEU_QSO_UPLOAD_DATE"
    / "GUEST_OP"
    / "GRIDSQUARE_EXT"
    / "GRIDSQUARE"
    / "FREQ_RX"
    / "FREQ"
    / "FORCE_INIT"
    / "FISTS_CC"
    / "FISTS"
    / "EQ_CALL"
    / "EQSL_QSL_SENT"
    / "EQSL_QSL_RCVD"
    / "EQSL_QSLSDATE"
    / "EQSL_QSLRDATE"
    / "EMAIL"
    / "DXCC"
    / "DISTANCE"
    / "DCL_QSL_SENT"
    / "DCL_QSL_RCVD"
    / "DCL_QSLSDATE"
    / "DCL_QSLRDATE"
    / "DARC_DOK"
    / "CREDIT_SUBMITTED"
    / "CREDIT_GRANTED"
    / "CQZ"
    / "COUNTRY_INTL"
    / "COUNTRY"
    / "CONTEST_ID"
    / "CONTACTED_OP"
    / "CONT"
    / "COMMENT_INTL"
    / "COMMENT"
    / "CNTY_ALT"
    / "CNTY"
    / "CLUBLOG_QSO_UPLOAD_STATUS"
    / "CLUBLOG_QSO_UPLOAD_DATE"
    / "CLASS"
    / "CHECK"
    / "CALL"
    / "BAND_RX"
    / "BAND"
    / "A_INDEX"
    / "AWARD_SUBMITTED"
    / "AWARD_GRANTED"
    / "ARRL_SECT"
    / "ANT_PATH"
    / "ANT_EL"
    / "ANT_AZ"
    / "ALTITUDE"
    / "AGE"
    / "ADDRESS_INTL"
    / "ADDRESS"
