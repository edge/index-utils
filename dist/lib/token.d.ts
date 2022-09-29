import { RequestCallback } from '.';
/**
 * Token value data.
 */
export declare type Value = {
    /** Date of value capture */
    date: string;
    /** Value of XE in ETH */
    ethPerXE: number;
    /** Value of XE in USD */
    usdPerXE: number;
};
/**
 * Get current token value data.
 *
 * ```
 * const rate = await current('https://index.xe.network')
 * ```
 */
export declare const current: (host: string, cb?: RequestCallback) => Promise<Value>;
