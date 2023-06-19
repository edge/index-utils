import { BlockRef } from './block';
import { TxRef } from './tx';
import { ListResponse, RequestCallback } from '.';
/**
 * Wallet data.
 */
export type Wallet = {
    address: string;
    balance: number;
    staked: number;
    stakeCount: number;
    txCount: number;
    nonce: number;
    firstTransaction?: TxRef;
    latestTransaction?: TxRef;
    lastUpdated?: BlockRef;
    name?: string;
    description?: string;
    trusted?: boolean;
};
/** Parameters for searching wallets. */
export type WalletsParams = {
    address?: string;
    limit?: number;
    page?: number;
    sort?: string[] | string;
};
/**
 * Get a wallet by address.
 */
export declare const wallet: (host: string, address: string, cb?: RequestCallback) => Promise<Wallet>;
/**
 * Get wallets.
 */
export declare const wallets: (host: string, params?: WalletsParams, cb?: RequestCallback) => Promise<ListResponse<Wallet>>;
