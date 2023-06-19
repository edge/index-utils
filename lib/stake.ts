// Copyright (C) 2021 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { Tx } from './tx'
import superagent from 'superagent'
import { toQueryString } from './helpers'
import { ListResponse, RequestCallback } from '.'

export type AddressedStake = Stake & {
  tx: Omit<Tx, 'confirmations'>
}

/** Information about the stake to which a device is assigned. */
export type DeviceStakeInfo = {
  address: string
  stake: string
  type: StakeType
}

export type SingleStake = Stake & {
  /** Wallet address for stake holder */
  wallet: string
}

/**
 * XE stake.
 */
export type Stake = {
  amount: number
  created: number
  hash: string
  id: string
  device?: string
  deviceAssigned?: number
  deviceUnassigned?: number
  released?: number
  releaseTransaction?: string
  transaction: string
  type: StakeType
  unlockPeriod: number
  unlockRequested?: number
  unlockTransaction?: string
  block: {
    hash: string
    height: number
  }
}

/** Parameters for searching stakes. */
export type StakesParams = {
  limit?: number
  page?: number
  hideReleased?: boolean
  sort?: string[] | string
}

export type StakeType = 'gateway' | 'governance' | 'host' | 'stargate'

/**
 * Get information about a stake for a device (node) address.
 */
export const deviceStake = async (host: string, address: string, cb: RequestCallback): Promise<DeviceStakeInfo> => {
  const url = `${host}/device/${address}/stake`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get a list of transactions reflecting the history of actions for a stake.
 */
export const history = async (
  host: string,
  id: string,
  params?: StakesParams,
  cb?: RequestCallback
): Promise<ListResponse<Tx, { id: string }>> => {
  let url = `${host}/stake/${id}/history`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get a stake by ID or hash.
 *
 * Some extra metadata is attached to stakes retrieved directly through this method.
 * See the `SingleStake` type for more information.
 */
export const stake = async (host: string, ref: string, cb?: RequestCallback): Promise<SingleStake> => {
  const url = `${host}/stake/${ref}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get stakes.
 *
 * Provide an XE address to filter stakes by a single wallet.
 */
export const stakes = async (
  host: string,
  address?: string,
  params?: StakesParams,
  cb?: RequestCallback
): Promise<ListResponse<AddressedStake, { address?: string }>> => {
  let url = `${host}/stakes`
  if (address !== undefined) url += `/${address}`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
