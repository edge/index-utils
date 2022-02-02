import { Tx } from './tx';
import { ListResponse, RequestCallback } from '.';
export declare type AddressedStake = Stake & {
    tx: Omit<Tx, 'confirmations'>;
};
export declare type Stake = {
    amount: number;
    created: number;
    hash: string;
    id: string;
    device?: string;
    deviceAssigned?: number;
    deviceUnassigned?: number;
    released?: number;
    releaseTransaction?: string;
    transaction: string;
    type: StakeType;
    unlockPeriod: number;
    unlockRequested?: number;
    unlockTransaction?: string;
    block: {
        hash: string;
        height: number;
    };
};
export declare type StakesParams = {
    limit?: number;
    page?: number;
};
export declare type StakeType = 'gateway' | 'host' | 'stargate';
/**
 * Get a list of transactions reflecting the history of actions for a stake.
 *
 * ```
 * const h = await history('https://index.xe.network', 'some-stake-id')
 * ```
 */
export declare const history: (host: string, id: string, params?: StakesParams | undefined, cb?: RequestCallback | undefined) => Promise<ListResponse<Tx, {
    id: string;
}>>;
/**
 * Get a stake by ID.
 *
 * ```
 * const s = await stake('https://index.xe.network', 'some-stake-id')
 * ```
 */
export declare const stake: (host: string, id: string, cb?: RequestCallback | undefined) => Promise<Stake>;
/**
 * Get stakes.
 *
 * Provide an XE address to filter stakes by a single wallet.
 *
 * ```
 * const allStakes = await stakes('https://index.xe.network')
 *
 * const myStakes = await stakes('https://index.xe.network', 'my-wallet-address')
 *
 * const pagedStakes = await index.transactions('https://index.xe.network', undefined, { skip: 10, limit: 5 })
 * ```
 */
export declare const stakes: (host: string, address?: string | undefined, params?: StakesParams | undefined, cb?: RequestCallback | undefined) => Promise<ListResponse<AddressedStake, {
    address?: string | undefined;
}>>;
