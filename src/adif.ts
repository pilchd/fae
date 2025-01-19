import type {Field} from "./compiler/tree.ts";

export type HeaderField =
    | "ADIF_VER"
    | "CREATED_TIMESTAMP"
    | "PROGRAMID"
    | "PROGRAMVERSION"
    | `USERDEF${string}`;

export type QSOField<U = never> =
    | "ADDRESS"
    | "ADDRESS_INTL"
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
    | "COMMENT_INTL"
    | "CONT"
    | "CONTACTED_OP"
    | "CONTEST_ID"
    | "COUNTRY"
    | "COUNTRY_INTL"
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
    | "GUEST_OP"
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
    | "MY_ANTENNA_INTL"
    | "MY_ARRL_SECT"
    | "MY_CITY"
    | "MY_CITY_INTL"
    | "MY_CNTY"
    | "MY_CNTY_ALT"
    | "MY_COUNTRY"
    | "MY_COUNTRY_ALT"
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
    | "MY_NAME_INTL"
    | "MY_POSTAL_CODE"
    | "MY_POSTAL_CODE_INTL"
    | "MY_POTA_REF"
    | "MY_RIG"
    | "MY_RIG_INTL"
    | "MY_SIG"
    | "MY_SIG_INTL"
    | "MY_SIG_INFO"
    | "MY_SIG_INFO_INTL"
    | "MY_SOTA_REF"
    | "MY_STATE"
    | "MY_STREET"
    | "MY_STREET_INTL"
    | "MY_USACA_COUNTIES"
    | "MY_VUCC_GRIDS"
    | "MY_WWFF_REF"
    | "NAME"
    | "NAME_INTL"
    | "NOTES"
    | "NOTES_INTL"
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
    | "QSLMSG_INTL"
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
    | "QTH_INTL"
    | "REGION"
    | "RIG"
    | "RIG_INTL"
    | "RST_RCVD"
    | "RST_SENT"
    | "RX_PWR"
    | "SAT_MODE"
    | "SAT_NAME"
    | "SFI"
    | "SIG"
    | "SIG_INTL"
    | "SIG_INFO"
    | "SIG_INFO_INTL"
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
    | "VE_PROV"
    | "VUCC_GRIDS"
    | "WEB"
    | "WWFF_REF"
    | U;

const bandBounds = [
    {
        band: "2190m",
        bounds: [0.1357, 0.1378]
    },
    {
        band: "630m",
        bounds: [0.472, 0.479]
    },
    {
        band: "560m",
        bounds: [0.501, 0.504]
    },
    {
        band: "160m",
        bounds: [1.8, 2.0]
    },
    {
        band: "80m",
        bounds: [3.5, 4.0]
    },
    {
        band: "60m",
        bounds: [5.06, 5.45]
    },
    {
        band: "40m",
        bounds: [7.0, 7.3]
    },
    {
        band: "30m",
        bounds: [10.1, 10.15]
    },
    {
        band: "20m",
        bounds: [14.0, 14.35]
    },
    {
        band: "17m",
        bounds: [18.068, 18.168]
    },
    {
        band: "15m",
        bounds: [21.0, 21.45]
    },
    {
        band: "12m",
        bounds: [24.89, 24.99]
    },
    {
        band: "10m",
        bounds: [28.0, 29.7]
    },
    {
        band: "8m",
        bounds: [40.0, 45.0]
    },
    {
        band: "6m",
        bounds: [50.0, 54.0]
    },
    {
        band: "5m",
        bounds: [54.001, 69.9]
    },
    {
        band: "4m",
        bounds: [70.0, 71.0]
    },
    {
        band: "2m",
        bounds: [144.0, 148.0]
    },
    {
        band: "1.25",
        bounds: [222.0, 225.0]
    },
    {
        band: "70cm",
        bounds: [420.0, 450.0]
    },
    {
        band: "33cm",
        bounds: [902.0, 928.0]
    },
    {
        band: "23cm",
        bounds: [1240.0, 1300.0]
    },
    {
        band: "13cm",
        bounds: [2300.0, 2450.0]
    },
    {
        band: "9cm",
        bounds: [3300.0, 3500.0]
    },
    {
        band: "6cm",
        bounds: [5650.0, 5925.0]
    },
    {
        band: "3cm",
        bounds: [10000.0, 10500.0]
    },
    {
        band: "1.25cm",
        bounds: [24000.0, 24250.0]
    },
    {
        band: "6mm",
        bounds: [47000.0, 47200.0]
    },
    {
        band: "4mm",
        bounds: [75500.0, 81000.0]
    },
    {
        band: "2.5mm",
        bounds: [119980.0, 123000.0]
    },
    {
        band: "2mm",
        bounds: [134000.0, 149000.0]
    },
    {
        band: "1mm",
        bounds: [241000.0, 250000.0]
    },
    {
        band: "submm",
        bounds: [300000.0, 7500000.0]
    }
];

/**
 * Render a field list to an ADI-compatible string.
 *
 * @example
 * Render some header fields including data specifiers:
 * ```ts
 * const fields = [
 *     ["ADIF_VER", "1.0.0"],
 *     ["USERDEF1", "SweaterSize,{S,M,L}", "E"],
 *     ["USERDEF2", "ShoeSize,{5:20}", "N"]
 * ]
 * render("header", fields) === "<ADIF_VER:5>1.0.0 <USERDEF1:19:E>SweaterSize,{S,M,L} <USERDEF2:15:N>ShoeSize,{5:20} <EOH>"
 * ```
 *
 * @example
 * Render some QSO fields with the default separator:
 * ```ts
 * const fields = [
 *     ["BAND", "20m"],
 *     ["MODE", "SSB"]
 * ]
 * render("qso", fields) === "<BAND:3>20m <MODE:3>SSB <EOR>"
 * ```
 *
 * @typeParam T - This field list contains `"header" `or `"qso"` fields
 *
 * @param type - The type of fields in `fields`
 * @param fields - The fields to render
 * @param separator - The separator to join fields with
 *
 * @return The ADI for `fields`
 */
export function render<T extends "header" | "qso">(
    type: T,
    fields: Field<T extends "header" ? HeaderField : QSOField>[],
    separator = " "
): string {
    return [
        ...new Map(
            fields.map(([name, ...data_indicator]) => [name, data_indicator])
        )
    ]
        .map(
            ([name, [data, indicator]]) =>
                `<${name}:${data.length}${indicator ? `:${indicator}` : ""}>${data}`
        )
        .concat([`<EO${type === "header" ? "H" : "R"}>`])
        .join(separator);
}

/**
 * Infer the ADIF `BAND` containing an ADIF `FREQ`.
 *
 * @param freq - Valid data for the ADIF `FREQ` field
 *
 * @return Correct data for the ADIF `BAND` field containing `freq` (null)
 */
export function inferBand(freq: string) {
    for (const {
        band,
        bounds: [lower, upper]
    } of bandBounds)
        if (lower <= parseFloat(freq) && parseFloat(freq) <= upper) return band;
    return null;
}
