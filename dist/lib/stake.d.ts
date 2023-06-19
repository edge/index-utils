import { Tx } from './tx';
import { ListResponse, RequestCallback } from '.';
export type AddressedStake = Stake & {
    tx: Omit<Tx, 'confirmations'>;
};
/** Information about the stake to which a device is assigned. */
export type DeviceStakeInfo = {
    address: string;
    stake: string;
    type: StakeType;
};
export type SingleStake = Stake & {
    /** Wallet address for stake holder */
    wallet: string;
};
/**
 * XE stake.
 */
export type Stake = {
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
/** Parameters for searching stakes. */
export type StakesParams = {
    limit?: number;
    page?: number;
    hideReleased?: boolean;
    sort?: string[] | string;
};
export type StakeType = 'gateway' | 'governance' | 'host' | 'stargate';
/**
 * Get information about a stake for a device (node) address.
 */
export declare const deviceStake: (host: string, address: string, cb: RequestCallback) => Promise<DeviceStakeInfo>;
/**
 * Get a list of transactions reflecting the history of actions for a stake.
 */
export declare const history: (host: string, id: string, params?: StakesParams, cb?: RequestCallback) => Promise<ListResponse<Tx, {
    id: string;
}>>;
/**
 * Get a stake by ID or hash.
 *
 * Some extra metadata is attached to stakes retrieved directly through this method.
 * See the `SingleStake` type for more information.
 */
export declare const stake: (host: string, ref: string, cb?: RequestCallback) => Promise<SingleStake>;
/**
 * Get stakes.
 *
 * Provide an XE address to filter stakes by a single wallet.
 */
export declare const stakes: (host: string, address?: string, params?: StakesParams, cb?: RequestCallback) => Promise<ListResponse<AddressedStake, {
    address?: string | undefined;
}>>;
