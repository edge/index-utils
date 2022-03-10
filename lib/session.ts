// Copyright (C) 2022 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { RequestCallback } from '.'
import superagent from 'superagent'
import { toQueryString } from './helpers'

/**
 * Geolocation data.
 */
export type Geolocation = {
  city?: string
  country?: string
  countryCode?: string
  lat?: number
  lng?: number
}

/**
 * Information about a node.
 */
export type Node = {
  /** Node type will be `host`, `gateway`, or `stargate` */
  type: string
  /** Version of node */
  version: string
  /** Device address */
  address: string
  /** Session UUID */
  session: string
  /** Stake hash */
  stake: string
  /** Gateway address, if node is a `host` */
  gateway?: string
  /** Stargate address, if node is a `gateway` */
  stargate?: string
  /** Geolocation data */
  geo?: Geolocation
}

/**
 * Session data.
 * This represents both open and closed sessions.
 *
 * You may use the convenience functions `isClosed` and `isOpen` to disambiguate.
 */
export type Session = {
  node: Node
  start: number
  lastActive?: number
  end?: number
  /**
   * When the device was last seen online.
   * This matches `lastActive` or `end` depending on whether the session is open or closed.
   * This is provided mainly for sorting purposes.
   */
  lastSeen?: number
}

export type SessionsParams = {
  page?: number
  limit?: number
  sort?: string[]
}

/**
 * Determine whether a session is closed.
 */
export const isClosed = (session: Session): boolean => !isOpen(session)

/**
 * Determine whether a session is open.
 */
export const isOpen = (session: Session): boolean => session.end === undefined

/**
 * Get active sessions.
 *
 * ```
 * const nodeSessions = await sessions('https://index.xe.network')
 * ```
 */
export const sessions = async (
  host: string,
  params?: SessionsParams,
  cb?: RequestCallback
): Promise<Session[]> => {
  let url = `${host}/sessions`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
