// Copyright (C) 2022 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { StakeType } from './stake'
import superagent from 'superagent'
import { toQueryString } from './helpers'
import { ListResponse, RequestCallback } from '.'

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

/** Condensed session geolocation data for mapping. */
export type MapSession = {
  lat: number
  lng: number
  type: StakeType
}

/** Parameters for searching geolocations. */
export type MapSessionsParams = {
  limit?: number
  page?: number
}

/**
 * Host usage metrics.
 */
export type Metrics = {
  messages: number
  cdn: {
    requests: number
    data: {
      in: number
      out: number
    }
    timing: {
      download: number
      processing: number
      total: number
    }
  }
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
   * Percentage availability (as a decimal).
   * This reflects device uptime over the last 24 hours [that it was online].
   */
  availability?: number
  metrics: Metrics
  online?: boolean
}

/** Parameters for searching sessions. */
export type SessionsParams = {
  page?: number
  limit?: number
  sort?: string[] | string
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
 * Get sessions as an anonymised geolocation list, suitable for mapping.
 */
export const map = async (host: string, params?: MapSessionsParams, cb?: RequestCallback): Promise<MapSession> => {
  let url = `${host}/mapsessions`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get a device's current or most recent session.
 */
export const session = async (host: string, address: string, cb?: RequestCallback): Promise<Session> => {
  const url = `${host}/session/${address}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get sessions.
 *
 * This retrieves the current or most recent session for each device.
 */
export const sessions = async (
  host: string,
  wallet?: string,
  params?: SessionsParams,
  cb?: RequestCallback
): Promise<ListResponse<Session, { wallet?: string }>> => {
  let url = `${host}/sessions`
  if (wallet !== undefined) url += `/${wallet}`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
