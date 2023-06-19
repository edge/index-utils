import { BaseTx, Tx } from './tx';
import { ListResponse, RequestCallback } from '.';
/**
 * Block data.
 */
export type Block = {
    timestamp: number;
    height: number;
    parent: string;
    data: {
        transactions: Record<string, Record<string, BaseTx>>;
    };
    ledgerHash: string;
    nonce: number;
    difficulty: number;
    dataHash: string;
    hash: string;
    transactions: Tx[];
    total: number;
    txCount: number;
};
/** Reference to a block. */
export type BlockRef = {
    height: number;
    hash: string;
};
/** Parameters for searching blocks. */
export type BlocksParams = {
    noEmpty?: 1 | 0;
    limit?: number;
    page?: number;
    since?: number;
    sort?: string[] | string;
};
/**
 * Get a block by hash (string) or height (number).
 */
export declare const block: (host: string, hash: string | number, cb?: RequestCallback) => Promise<Block>;
/**
 * Get blocks.
 */
export declare const blocks: (host: string, params?: BlocksParams, cb?: RequestCallback) => Promise<ListResponse<Block>>;
