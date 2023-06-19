import { RequestCallback } from '.';
/**
 * Token value data.
 */
export type Value = {
    /** Date of value capture */
    date: string;
    /** Value of XE in ETH */
    ethPerXE: number;
    /** Value of XE in USD */
    usdPerXE: number;
};
/**
 * Get current token value data.
 */
export declare const current: (host: string, cb?: RequestCallback) => Promise<Value>;
/**
 * Get token value data for the last week, at the end of each day.
 */
export declare const daily: (host: string, cb?: RequestCallback) => Promise<Value[]>;
/**
 * Get token value data for the last week, at (approximately) the current time of day.
 */
export declare const lastWeek: (host: string, cb?: RequestCallback) => Promise<Value[]>;
