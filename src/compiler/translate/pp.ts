import {type Field, field, type} from "../../adif/index.ts";

/**
 * A container holding a function that may generate an additional field for a
 * field list dependent on another field's occurrence in it.
 */
export type PP = [
    /** The ADIF field name this post-processor depends on */
    name: field.Name_Q<never>,
    /** The callback for generating the additional field from `name`'s data */
    pp: (
        data: type.Data
    ) => Field<field.Name_Q<never>> | null | undefined | void
];

/** Infer `BAND` from `FREQ`. */
export const band: PP = [
    "FREQ",
    freq => {
        const band = inferBand(freq);

        if (band) return ["BAND", band];
    }
];

/**
 * Generate a `PP` capable of applying the correct `Field` for a dependent
 * field's independent field.
 *
 * @param name_d - The name of the independent field
 * @param name_i - The name of the dependent field
 * @param enumeration - The `ADIF` `Enumeration` for the dependent field
 */
export function infer(
    name_d: field.Name_Q<never>,
    name_i: field.Name_Q<never>,
    enumeration: Record<type.Data, Set<type.Data>>
): PP {
    return [
        name_d,
        (dependent: type.Data) => {
            const [[data_i], ...rest] = Object.entries(enumeration).filter(
                ([, data_d]) => data_d.has(dependent)
            );

            if (data_i && rest.length === 0) return [name_i, data_i];
        }
    ];
}

/**
 * Infer the ADIF `BAND` containing an ADIF `FREQ`.
 *
 * @param freq - Valid data for the ADIF `FREQ` field
 */
function inferBand(freq: type.Data) {
    for (const {
        band,
        bounds: [lower, upper]
    } of band_bounds)
        if (lower <= parseFloat(freq) && parseFloat(freq) <= upper) return band;
}
const band_bounds = [
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
        bounds: [40, 45]
    },
    {
        band: "6m",
        bounds: [50, 54]
    },
    {
        band: "5m",
        bounds: [54.000001, 69.9]
    },
    {
        band: "4m",
        bounds: [70, 71]
    },
    {
        band: "2m",
        bounds: [144, 148]
    },
    {
        band: "1.25",
        bounds: [222, 225]
    },
    {
        band: "70cm",
        bounds: [420, 450]
    },
    {
        band: "33cm",
        bounds: [902, 928]
    },
    {
        band: "23cm",
        bounds: [1240, 1300]
    },
    {
        band: "13cm",
        bounds: [2300, 2450]
    },
    {
        band: "9cm",
        bounds: [3300, 3500]
    },
    {
        band: "6cm",
        bounds: [5650, 5925]
    },
    {
        band: "3cm",
        bounds: [10000, 10500]
    },
    {
        band: "1.25cm",
        bounds: [24000, 24250]
    },
    {
        band: "6mm",
        bounds: [47000, 47200]
    },
    {
        band: "4mm",
        bounds: [75500, 81000]
    },
    {
        band: "2.5mm",
        bounds: [119980, 123000]
    },
    {
        band: "2mm",
        bounds: [134000, 149000]
    },
    {
        band: "1mm",
        bounds: [241000, 250000]
    },
    {
        band: "submm",
        bounds: [300000, 7500000]
    }
];
