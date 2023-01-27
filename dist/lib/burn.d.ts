import { ListResponse, RequestCallback } from '.';
/**
 * Index burn.
 */
export declare type Burn = {
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
/**
 * Burn stats
 */
export declare type BurnStats = {
    '30d': {
        amount: number;
        count: number;
    };
    total: {
        amount: number;
        count: number;
    };
};
export declare type BurnsParams = {
    page?: number;
    limit?: number;
    type?: string;
};
/**
 * Get a burn.
 *
 * ```
 * const burn = await burn('https://index.xe.network', 'some-burn-hash')
 * ```
 */
export declare const burn: (host: string, hash: string, cb?: RequestCallback | undefined) => Promise<Burn>;
/**
 * Get burns.
 *
 * ```
 * const allTxs = await burns('https://index.xe.network')
 *
 * const pagedTxs = await index.burns('https://index.xe.network', undefined, { page: 2, limit: 5 })
 * ```
 */
export declare const burns: (host: string, params?: BurnsParams | undefined, cb?: RequestCallback | undefined) => Promise<ListResponse<Burn, {
    page: number;
}>>;
/**
 * Get burns stats.
 *
 * ```
 * const burnStats = await stats('https://index.xe.network')
 * ```
 */
export declare const stats: (host: string, cb?: RequestCallback | undefined) => Promise<ListResponse<BurnStats>>;
