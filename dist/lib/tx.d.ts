import { ListResponse, RequestCallback } from '.';
/**
 * Index transaction.
 * A superset of the on-chain XE transaction.
 */
export declare type Tx = {
    timestamp: number;
    sender: string;
    recipient: string;
    amount: number;
    data: TxData;
    nonce: number;
    signature: string;
    hash: string;
    block: {
        height: number;
        hash: string;
    };
    confirmations: number;
};
/**
 * Bridge transaction data.
 * These values are set in exchange transactions created by Bridge.
 */
export declare type TxBridgeData = {
    /** Ethereum address for withdrawal/sale transaction. Used by Bridge. */
    destination?: string;
    /** Fee amount in an exchange transaction. Used by Bridge. */
    fee?: number;
    /** Exchange rate reference for sale transaction. Used by Bridge. */
    ref?: string;
    /** Exchange token. Used by Bridge. */
    token?: string;
};
/**
 * Transaction data.
 */
export declare type TxData = TxBridgeData & TxVarData & {
    /** Blockchain action to be effected in the course of creating the transaction. */
    action?: string;
    /** Device ID. Used with `action: DeviceAction` */
    device?: string;
    /** Express unlock flag. Used with `action: "unlock_stake"` */
    express?: boolean;
    /** Transaction memo. */
    memo?: string;
    /** Stake ID. Used with `action: DeviceAction | "release_stake" | "unlock_stake"` */
    stake?: string;
};
/**
 * Variables transaction data.
 * These values are set by a blockchain custodian when updating on-chain variables.
 */
export declare type TxVarData = {
    /** Variable name. Used with `action: VarAction` */
    key?: string;
    /** Variable value. Used with `action: "set_var"` */
    value?: unknown;
};
export declare type TxsParams = {
    above?: number;
    since?: number;
    page?: number;
    limit?: number;
    type?: string;
};
/**
 * Get a transaction.
 *
 * ```
 * const tx = await transaction('https://index.xe.network', 'some-tx-hash')
 * ```
 */
export declare const transaction: (host: string, hash: string, cb?: RequestCallback | undefined) => Promise<Tx>;
/**
 * Get transactions.
 *
 * Pass a wallet address to get only transactions to/from that address.
 *
 * ```
 * const allTxs = await transactions('https://index.xe.network')
 *
 * const myTxs = await transactions('https://index.xe.network', 'my-wallet-address')
 *
 * const pagedTxs = await index.transactions('https://index.xe.network', undefined, { page: 2, limit: 5 })
 * ```
 */
export declare const transactions: (host: string, address?: string | undefined, params?: TxsParams | undefined, cb?: RequestCallback | undefined) => Promise<ListResponse<Tx, {
    page: number;
}>>;
