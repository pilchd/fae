import * as enumeration from "./enumeration.ts";
import * as type from "./type.ts";

export const name_type: Record<Name<never>, type.Type> = {
    ADIF_VER: type.String(),
    CREATED_TIMESTAMP: type.String(),
    PROGRAMID: type.String(),
    PROGRAMVERSION: type.String(),

    ADDRESS: type.MultilineString(),
    //ADDRESS_INTL: IntlMultilineString
    AGE: type.Number(),
    ALTITUDE: type.Number(),
    ANT_AZ: type.Number(),
    ANT_EL: type.Number(),
    ANT_PATH: type.Enumeration(enumeration.Ant_Path),
    ARRL_SECT: type.Enumeration(enumeration.ARRL_Section),
    AWARD_SUBMITTED: type.String(), //HACK
    AWARD_GRANTED: type.String(), //HACK
    A_INDEX: type.Number(),
    BAND: type.Enumeration(enumeration.Band),
    BAND_RX: type.Enumeration(enumeration.Band),
    CALL: type.String(),
    CHECK: type.String(),
    CLASS: type.String(),
    CLUBLOG_QSO_UPLOAD_DATE: type.Date(),
    CLUBLOG_QSO_UPLOAD_STATUS: type.Enumeration(enumeration.QSO_Upload_Status),
    CNTY: type.String(), //HACK
    CNTY_ALT: type.String(), //HACK
    COMMENT: type.String(),
    //COMMENT_INTL: IntlString
    CONT: type.Enumeration(enumeration.Continent),
    CONTACTED_OP: type.String(),
    CONTEST_ID: type.Enumeration(enumeration.Contest_ID),
    COUNTRY: type.String(),
    //COUNTRY_INTL: IntlString
    CQZ: type.Integer(1, 40),
    CREDIT_SUBMITTED: type.String(), //HACK
    CREDIT_GRANTED: type.String(), //HACK
    DARC_DOK: type.String(), //HACK
    DCL_QSLRDATE: type.Date(),
    DCL_QSLSDATE: type.Date(),
    DCL_QSL_RCVD: type.Enumeration(enumeration.QSL_Rcvd),
    DCL_QSL_SENT: type.Enumeration(enumeration.QSL_Sent),
    DISTANCE: type.Number(),
    DXCC: type.Enumeration(enumeration.DXCC_Entity_Code),
    EMAIL: type.String(),
    EQ_CALL: type.String(),
    EQSL_QSLRDATE: type.Date(),
    EQSL_QSLSDATE: type.Date(),
    EQSL_QSL_RCVD: type.Enumeration(enumeration.QSL_Rcvd),
    EQSL_QSL_SENT: type.Enumeration(enumeration.QSL_Rcvd),
    FISTS: type.Integer(1),
    FISTS_CC: type.Integer(1),
    FORCE_INIT: type.Boolean(),
    FREQ: type.Number(),
    FREQ_RX: type.Number(),
    GRIDSQUARE: type.GridSquare(),
    GRIDSQUARE_EXT: type.GridSquareExt(),
    HAMLOGEU_QSO_UPLOAD_DATE: type.Date(),
    HAMLOGEU_QSO_UPLOAD_STATUS: type.Enumeration(enumeration.QSO_Upload_Status),
    HAMQTH_QSO_UPLOAD_DATE: type.Date(),
    HAMQTH_QSO_UPLOAD_STATUS: type.Enumeration(enumeration.QSO_Upload_Status),
    HRDLOG_QSO_UPLOAD_DATE: type.Date(),
    HRDLOG_QSO_UPLOAD_STATUS: type.Enumeration(enumeration.QSO_Upload_Status),
    IOTA: type.IOTARefNo(),
    IOTA_ISLAND_ID: type.Integer(1, 99999999),
    ITUZ: type.Integer(1, 90),
    K_INDEX: type.Integer(),
    LAT: type.Location(),
    LON: type.Location(),
    LOTW_QSLRDATE: type.Date(), //HACK Only valid if LOTW_QSL_RCVD is Y, I
    LOTW_QSLSDATE: type.Date(), //HACK Only valid if LOTW_QSL_SENT is Y, Q, I
    LOTW_QSL_RCVD: type.Enumeration(enumeration.QSL_Rcvd),
    LOTW_QSL_SENT: type.Enumeration(enumeration.QSL_Sent),
    MAX_BURSTS: type.Number(0),
    MODE: type.Enumeration(enumeration.Mode),
    MORSE_KEY_INFO: type.String(),
    MORSE_KEY_TYPE: type.Enumeration(enumeration.Morse_Key_Type),
    MS_SHOWER: type.String(),
    MY_ALTITUDE: type.Number(),
    MY_ANTENNA: type.String(),
    //MY_ANTENNA_INTL: IntlString
    MY_ARRL_SECT: type.Enumeration(enumeration.ARRL_Section),
    MY_CITY: type.String(),
    //MY_CITY_INTL: IntlString
    MY_CNTY: type.String(), //HACK
    MY_CNTY_ALT: type.String(), //HACK
    MY_COUNTRY: type.String(),
    //MY_COUNTRY_INTL: IntlString
    MY_CQ_ZONE: type.Integer(1, 40),
    MY_DARC_DOK: type.String(), //HACK
    MY_DXCC: type.Enumeration(enumeration.DXCC_Entity_Code),
    MY_FISTS: type.Integer(1),
    MY_GRIDSQUARE: type.GridSquare(),
    MY_GRIDSQUARE_EXT: type.GridSquareExt(),
    MY_IOTA: type.IOTARefNo(),
    MY_IOTA_ISLAND_ID: type.Integer(1, 99999999),
    MY_ITU_ZONE: type.Integer(1, 90),
    MY_LAT: type.Location(),
    MY_LON: type.Location(),
    MY_MORSE_KEY_INFO: type.String(),
    MY_MORSE_KEY_TYPE: type.Enumeration(enumeration.Morse_Key_Type),
    MY_NAME: type.String(),
    //MY_NAME_INTL: IntlString
    MY_POSTAL_CODE: type.String(),
    //MY_POSTAL_CODE_INTL: IntlString
    MY_POTA_REF: type.POTARefList(),
    MY_RIG: type.String(),
    //MY_RIG_INTL: IntlString
    MY_SIG: type.String(),
    //MY_SIG_INTL: IntlString
    MY_SIG_INFO: type.String(),
    //MY_SIG_INFO_INTL: IntlString
    MY_SOTA_REF: type.SOTARef(),
    MY_STATE: type.String(), //HACK
    MY_STREET: type.String(),
    //MY_STREET_INTL: IntlString
    MY_USACA_COUNTIES: type.String(), //HACK
    MY_VUCC_GRIDS: type.GridSquareList(),
    MY_WWFF_REF: type.WWFFRef(),
    NAME: type.String(),
    //NAME_INTL: IntlString
    NOTES: type.MultilineString(),
    //NOTES_INTL: IntlMultilineString
    NR_BURSTS: type.Integer(1),
    NR_PINGS: type.Integer(1),
    OPERATOR: type.String(),
    OWNER_CALLSIGN: type.String(),
    PFX: type.String(),
    POTA_REF: type.POTARefList(),
    PRECEDENCE: type.String(),
    PROP_MODE: type.Enumeration(enumeration.Propagation_Mode),
    PUBLIC_KEY: type.String(),
    QRZCOM_QSO_DOWNLOAD_DATE: type.Date(),
    QRZCOM_QSO_DOWNLOAD_STATUS: type.Enumeration(
        enumeration.QSO_Download_Status
    ),
    QRZCOM_QSO_UPLOAD_DATE: type.Date(),
    QRZCOM_QSO_UPLOAD_STATUS: type.Enumeration(enumeration.QSO_Upload_Status),
    QSLMSG: type.MultilineString(),
    //QSLMSG_INTL: IntlMultilineString
    QSLMSG_RCVD: type.MultilineString(),
    QSLRDATE: type.Date(), //HACK Only valid if QSL_RCVD is Y, I, V
    QSLSDATE: type.Date(), //HACK Only valid if QSL_SENT is Y, Q, I
    QSL_RCVD: type.Enumeration(enumeration.QSL_Rcvd),
    QSL_RCVD_VIA: type.Enumeration(enumeration.QSL_Via),
    QSL_SENT: type.Enumeration(enumeration.QSL_Sent),
    QSL_SENT_VIA: type.Enumeration(enumeration.QSL_Via),
    QSL_VIA: type.String(),
    QSO_COMPLETE: type.Enumeration(enumeration.QSO_Complete),
    QSO_DATE: type.Date(),
    QSO_DATE_OFF: type.Date(),
    QSO_RANDOM: type.Boolean(),
    QTH: type.String(),
    //QTH_INTL: IntlString
    REGION: type.Enumeration(enumeration.Region),
    RIG: type.MultilineString(),
    //RIG_INTL: IntlMultilineString
    RST_RCVD: type.String(),
    RST_SENT: type.String(),
    RX_PWR: type.Number(0),
    SAT_MODE: type.String(),
    SAT_NAME: type.String(),
    SFI: type.Integer(0, 300),
    SIG: type.String(),
    //SIG_INTL: IntlString
    SIG_INFO: type.String(),
    //SIG_INFO_INTL: IntlString
    SILENT_KEY: type.Boolean(),
    SKCC: type.String(),
    SOTA_REF: type.SOTARef(),
    SRX: type.Integer(0),
    SRX_STRING: type.String(),
    STATE: type.String(), //HACK
    STATION_CALLSIGN: type.String(),
    STX: type.Integer(0),
    STX_STRING: type.String(),
    SUBMODE: type.Enumeration("MODE", enumeration.Submode),
    SWL: type.Boolean(),
    TEN_TEN: type.Integer(1),
    TIME_OFF: type.Time(),
    TIME_ON: type.Time(),
    TX_PWR: type.Number(0),
    UKSMG: type.Integer(1),
    USACA_COUNTIES: type.String(), //HACK
    VUCC_GRIDS: type.GridSquareList(),
    WEB: type.String(),
    WWFF_REF: type.WWFFRef()
};

export type Name<T extends Name_U = Name_U> = Name_H | Name_Q<T>;
export type Name_H =
    | "ADIF_VER"
    | "CREATED_TIMESTAMP"
    | "PROGRAMID"
    | "PROGRAMVERSION"
    | `USERDEF${number}`;
export type Name_Q<T extends Name_U = Name_U> =
    | "ADDRESS"
    //| "ADDRESS_INTL"
    | "AGE"
    | "ALTITUDE"
    | "ANT_AZ"
    | "ANT_EL"
    | "ANT_PATH"
    | "ARRL_SECT"
    | "AWARD_SUBMITTED"
    | "AWARD_GRANTED"
    | "A_INDEX"
    | "BAND"
    | "BAND_RX"
    | "CALL"
    | "CHECK"
    | "CLASS"
    | "CLUBLOG_QSO_UPLOAD_DATE"
    | "CLUBLOG_QSO_UPLOAD_STATUS"
    | "CNTY"
    | "CNTY_ALT"
    | "COMMENT"
    //| "COMMENT_INTL"
    | "CONT"
    | "CONTACTED_OP"
    | "CONTEST_ID"
    | "COUNTRY"
    //| "COUNTRY_INTL"
    | "CQZ"
    | "CREDIT_SUBMITTED"
    | "CREDIT_GRANTED"
    | "DARC_DOK"
    | "DCL_QSLRDATE"
    | "DCL_QSLSDATE"
    | "DCL_QSL_RCVD"
    | "DCL_QSL_SENT"
    | "DISTANCE"
    | "DXCC"
    | "EMAIL"
    | "EQ_CALL"
    | "EQSL_QSLRDATE"
    | "EQSL_QSLSDATE"
    | "EQSL_QSL_RCVD"
    | "EQSL_QSL_SENT"
    | "FISTS"
    | "FISTS_CC"
    | "FORCE_INIT"
    | "FREQ"
    | "FREQ_RX"
    | "GRIDSQUARE"
    | "GRIDSQUARE_EXT"
    //| "GUEST_OP"
    | "HAMLOGEU_QSO_UPLOAD_DATE"
    | "HAMLOGEU_QSO_UPLOAD_STATUS"
    | "HAMQTH_QSO_UPLOAD_DATE"
    | "HAMQTH_QSO_UPLOAD_STATUS"
    | "HRDLOG_QSO_UPLOAD_DATE"
    | "HRDLOG_QSO_UPLOAD_STATUS"
    | "IOTA"
    | "IOTA_ISLAND_ID"
    | "ITUZ"
    | "K_INDEX"
    | "LAT"
    | "LON"
    | "LOTW_QSLRDATE"
    | "LOTW_QSLSDATE"
    | "LOTW_QSL_RCVD"
    | "LOTW_QSL_SENT"
    | "MAX_BURSTS"
    | "MODE"
    | "MORSE_KEY_INFO"
    | "MORSE_KEY_TYPE"
    | "MS_SHOWER"
    | "MY_ALTITUDE"
    | "MY_ANTENNA"
    //| "MY_ANTENNA_INTL"
    | "MY_ARRL_SECT"
    | "MY_CITY"
    //| "MY_CITY_INTL"
    | "MY_CNTY"
    | "MY_CNTY_ALT"
    | "MY_COUNTRY"
    //| "MY_COUNTRY_INTL"
    | "MY_CQ_ZONE"
    | "MY_DARC_DOK"
    | "MY_DXCC"
    | "MY_FISTS"
    | "MY_GRIDSQUARE"
    | "MY_GRIDSQUARE_EXT"
    | "MY_IOTA"
    | "MY_IOTA_ISLAND_ID"
    | "MY_ITU_ZONE"
    | "MY_LAT"
    | "MY_LON"
    | "MY_MORSE_KEY_INFO"
    | "MY_MORSE_KEY_TYPE"
    | "MY_NAME"
    //| "MY_NAME_INTL"
    | "MY_POSTAL_CODE"
    //| "MY_POSTAL_CODE_INTL"
    | "MY_POTA_REF"
    | "MY_RIG"
    //| "MY_RIG_INTL"
    | "MY_SIG"
    //| "MY_SIG_INTL"
    | "MY_SIG_INFO"
    //| "MY_SIG_INFO_INTL"
    | "MY_SOTA_REF"
    | "MY_STATE"
    | "MY_STREET"
    //| "MY_STREET_INTL"
    | "MY_USACA_COUNTIES"
    | "MY_VUCC_GRIDS"
    | "MY_WWFF_REF"
    | "NAME"
    //| "NAME_INTL"
    | "NOTES"
    //| "NOTES_INTL"
    | "NR_BURSTS"
    | "NR_PINGS"
    | "OPERATOR"
    | "OWNER_CALLSIGN"
    | "PFX"
    | "POTA_REF"
    | "PRECEDENCE"
    | "PROP_MODE"
    | "PUBLIC_KEY"
    | "QRZCOM_QSO_DOWNLOAD_DATE"
    | "QRZCOM_QSO_DOWNLOAD_STATUS"
    | "QRZCOM_QSO_UPLOAD_DATE"
    | "QRZCOM_QSO_UPLOAD_STATUS"
    | "QSLMSG"
    //| "QSLMSG_INTL"
    | "QSLMSG_RCVD"
    | "QSLRDATE"
    | "QSLSDATE"
    | "QSL_RCVD"
    | "QSL_RCVD_VIA"
    | "QSL_SENT"
    | "QSL_SENT_VIA"
    | "QSL_VIA"
    | "QSO_COMPLETE"
    | "QSO_DATE"
    | "QSO_DATE_OFF"
    | "QSO_RANDOM"
    | "QTH"
    //| "QTH_INTL"
    | "REGION"
    | "RIG"
    //| "RIG_INTL"
    | "RST_RCVD"
    | "RST_SENT"
    | "RX_PWR"
    | "SAT_MODE"
    | "SAT_NAME"
    | "SFI"
    | "SIG"
    //| "SIG_INTL"
    | "SIG_INFO"
    //| "SIG_INFO_INTL"
    | "SILENT_KEY"
    | "SKCC"
    | "SOTA_REF"
    | "SRX"
    | "SRX_STRING"
    | "STATE"
    | "STATION_CALLSIGN"
    | "STX"
    | "STX_STRING"
    | "SUBMODE"
    | "SWL"
    | "TEN_TEN"
    | "TIME_OFF"
    | "TIME_ON"
    | "TX_PWR"
    | "UKSMG"
    | "USACA_COUNTIES"
    //| "VE_PROV"
    | "VUCC_GRIDS"
    | "WEB"
    | "WWFF_REF"
    | T;
export type Name_U = string;
