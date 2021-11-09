export declare type ListResponse<T> = {
    results: T[];
    metadata: {
        totalCount: number;
        count: number;
        page: number;
        limit: number;
        skip: number;
    };
};
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
export declare type TxBridgeData = {
    destination?: string;
    fee?: number;
    ref?: string;
};
export declare type TxData = TxBridgeData & TxVarData & {
    action?: string;
    device?: string;
    express?: boolean;
    memo?: string;
    stake?: string;
};
export declare type TxVarData = {
    key?: string;
    value?: unknown;
};
export declare type TxsParams = {
    above?: number;
    since?: number;
    page?: number;
    limit?: number;
};
export declare const transaction: (host: string, hash: string) => Promise<Tx>;
export declare const transactions: (host: string, address?: string | undefined, params?: TxsParams | undefined) => Promise<ListResponse<Tx>>;
