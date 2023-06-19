import { RequestCallback } from '.';
/**
 * Exchange rate data.
 */
export type ExchangeRate = {
    /** Date of rate capture */
    date: string;
    /** Unique reference */
    ref: string;
    /** USD-XE exchange rate */
    rate: number;
    /** Exchange gas fee */
    gas: number;
    /** Exchange limit */
    limit: number;
};
/**
 * Get current exchange rate data.
 */
export declare const current: (host: string, cb?: RequestCallback) => Promise<ExchangeRate>;
