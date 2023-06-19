import { ListResponse, RequestCallback } from '.';
/**
 * Index burn.
 */
export type Burn = {
    timestamp: number;
    sender: string;
    recipient: string;
    amount: number;
    parentTx: string;
    type: string;
    hash: string;
    block?: {
        height: number;
        hash: string;
    };
};
/** Burn stats. */
export type BurnStats = {
    '30d': {
        amount: number;
        count: number;
    };
    total: {
        amount: number;
        count: number;
    };
};
/** Parameters for searching burns. */
export type BurnsParams = {
    page?: number;
    limit?: number;
    type?: string;
};
/**
 * Get a burn.
 */
export declare const burn: (host: string, hash: string, cb?: RequestCallback) => Promise<Burn>;
/**
 * Get burns.
 */
export declare const burns: (host: string, params?: BurnsParams, cb?: RequestCallback) => Promise<ListResponse<Burn, {
    page: number;
}>>;
/**
 * Get burns stats.
 */
export declare const stats: (host: string, cb?: RequestCallback) => Promise<ListResponse<BurnStats>>;
