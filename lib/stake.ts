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

export type StakesParams = {
  limit?: number
  skip?: number
}

export type StakeType = 'gateway' | 'host' | 'stargate'

/**
 * Get a list of transactions reflecting the history of actions for a stake.
 *
 * ```
 * const h = await history('https://index.xe.network', 'some-stake-id')
 * ```
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
 * Get a stake by ID.
 *
 * ```
 * const s = await stake('https://index.xe.network', 'some-stake-id')
 * ```
 */
export const stake = async (host: string, id: string, cb?: RequestCallback): Promise<Stake> => {
  const url = `${host}/stake/${id}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

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
