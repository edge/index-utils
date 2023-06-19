// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import superagent from 'superagent'
import { toQueryString } from './helpers'
import { ListResponse, RequestCallback } from '.'

/**
 * Index burn.
 */
export type Burn = {
  timestamp: number
  sender: string
  recipient: string
  amount: number
  parentTx: string
  type: string
  hash: string
  block?: {
    height: number
    hash: string
  }
}

/**
 * Burn stats
 */
export type BurnStats = {
  '30d': {
    amount: number
    count: number
  }
  total: {
    amount: number
    count: number
  }
}

export type BurnsParams = {
  page?: number
  limit?: number
  type?: string
}

/**
 * Get a burn.
 */
export const burn = async (host: string, hash: string, cb?: RequestCallback): Promise<Burn> => {
  const url = `${host}/v2/burns/${hash}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get burns.
 */
export const burns = async (
  host: string,
  params?: BurnsParams,
  cb?: RequestCallback
): Promise<ListResponse<Burn, { page: number }>> => {
  let url = `${host}/v2/burns`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get burns stats.
 */
export const stats = async (
  host: string,
  cb?: RequestCallback
): Promise<ListResponse<BurnStats>> => {
  const url = `${host}/v2/stats/burns`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
