// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { BlockRef } from './block'
import { TxRef } from './tx'
import superagent from 'superagent'
import { toQueryString } from './helpers'
import { ListResponse, RequestCallback } from '.'

/**
 * Wallet data.
 */
export type Wallet = {
  address: string
  balance: number
  staked: number
  stakeCount: number
  txCount: number
  nonce: number
  firstTransaction?: TxRef
  latestTransaction?: TxRef
  lastUpdated?: BlockRef
  name?: string
  description?: string
  trusted?: boolean
}

export type WalletsParams = {
  address?: string
  limit?: number
  page?: number
  sort?: string
}

/**
 * Get a wallet by address.
 */
export const wallet = async (host: string, address: string, cb?: RequestCallback): Promise<Wallet> => {
  const url = `${host}/wallet/${address}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get wallets.
 */
export const wallets = async (host: string, params?: WalletsParams, cb?: RequestCallback): Promise<ListResponse<Wallet>> => {
  let url = `${host}/wallets`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
