export * as burn from './burn';
export * as exchangeRate from './exchangeRate';
export * as session from './session';
export * as stake from './stake';
export * as token from './token';
export * as tx from './tx';
import { SuperAgentRequest } from 'superagent';
/**
 * Callback function allowing a SuperAgent HTTP request to be modified before it is sent.
 * For example, you may want to specify a 100ms request timeout while fetching transactions:
 *
 * ```
 * const txs = await tx.transactions('https://index.xe.network', undefined, undefined, r => r.timeout(100))
 * ```
 *
 * This approach enables user code to alter request behaviour using SuperAgent's API:
 * https://visionmedia.github.io/superagent/
 */
export declare type RequestCallback = (r: SuperAgentRequest) => SuperAgentRequest;
/**
 * API response template for an index query.
 */
export declare type ListResponse<T, M = Record<never, never>> = {
    results: T[];
    metadata: M & {
        count: number;
        limit: number;
        skip: number;
        totalCount: number;
    };
};
