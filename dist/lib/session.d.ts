import { StakeType } from './stake';
import { ListResponse, RequestCallback } from '.';
/**
 * Geolocation data.
 */
export type Geolocation = {
    city?: string;
    country?: string;
    countryCode?: string;
    lat?: number;
    lng?: number;
};
/** Condensed session geolocation data for mapping. */
export type MapSession = {
    lat: number;
    lng: number;
    type: StakeType;
};
/** Parameters for searching geolocations. */
export type MapSessionsParams = {
    limit?: number;
    page?: number;
};
/**
 * Host usage metrics.
 */
export type Metrics = {
    messages: number;
    cdn: {
        requests: number;
        data: {
            in: number;
            out: number;
        };
        timing: {
            download: number;
            processing: number;
            total: number;
        };
    };
};
/**
 * Information about a node.
 */
export type Node = {
    /** Node type will be `host`, `gateway`, or `stargate` */
    type: string;
    /** Version of node */
    version: string;
    /** Device address */
    address: string;
    /** Session UUID */
    session: string;
    /** Stake hash */
    stake: string;
    /** Gateway address, if node is a `host` */
    gateway?: string;
    /** Stargate address, if node is a `gateway` */
    stargate?: string;
    /** Geolocation data */
    geo?: Geolocation;
};
/**
 * Session data.
 * This represents both open and closed sessions.
 *
 * You may use the convenience functions `isClosed` and `isOpen` to disambiguate.
 */
export type Session = {
    node: Node;
    start: number;
    lastActive?: number;
    end?: number;
    /**
     * Percentage availability (as a decimal).
     * This reflects device uptime over the last 24 hours [that it was online].
     */
    availability?: number;
    metrics: Metrics;
    online?: boolean;
};
/** Parameters for searching sessions. */
export type SessionsParams = {
    page?: number;
    limit?: number;
    sort?: string[] | string;
};
/**
 * Determine whether a session is closed.
 */
export declare const isClosed: (session: Session) => boolean;
/**
 * Determine whether a session is open.
 */
export declare const isOpen: (session: Session) => boolean;
/**
 * Get sessions as an anonymised geolocation list, suitable for mapping.
 */
export declare const map: (host: string, params?: MapSessionsParams, cb?: RequestCallback) => Promise<MapSession>;
/**
 * Get a device's current or most recent session.
 */
export declare const session: (host: string, address: string, cb?: RequestCallback) => Promise<Session>;
/**
 * Get sessions.
 *
 * This retrieves the current or most recent session for each device.
 */
export declare const sessions: (host: string, wallet?: string, params?: SessionsParams, cb?: RequestCallback) => Promise<ListResponse<Session, {
    wallet?: string | undefined;
}>>;
