import { RequestCallback } from '.';
/**
 * Gas rate data.
 */
export type GasRate = {
    /** Date of rate capture */
    date: string;
    /** Unique reference */
    ref: string;
    fee: number;
    handlingFeePercentage: number;
    minimumHandlingFee: number;
    ethereum: {
        legacy: number;
        baseFee: number;
        priorityFee: number;
    };
};
/**
 * Get current gas rate data.
 */
export declare const current: (host: string, cb?: RequestCallback) => Promise<GasRate>;
