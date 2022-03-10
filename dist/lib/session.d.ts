import { RequestCallback } from '.';
/**
 * Geolocation data.
 */
export declare type Geolocation = {
    city?: string;
    country?: string;
    countryCode?: string;
    lat?: number;
    lng?: number;
};
/**
 * Information about a node.
 */
export declare type Node = {
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
export declare type Session = {
    node: Node;
    start: number;
    lastActive?: number;
    end?: number;
    /**
     * When the device was last seen online.
     * This matches `lastActive` or `end` depending on whether the session is open or closed.
     * This is provided mainly for sorting purposes.
     */
    lastSeen?: number;
};
export declare type SessionsParams = {
    page?: number;
    limit?: number;
    sort?: string[];
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
 * Get active sessions.
 *
 * ```
 * const nodeSessions = await sessions('https://index.xe.network')
 * ```
 */
export declare const sessions: (host: string, params?: SessionsParams | undefined, cb?: RequestCallback | undefined) => Promise<Session[]>;
