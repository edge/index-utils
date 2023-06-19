// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import superagent from 'superagent'
import { toQueryString } from './helpers'
import { BaseTx, Tx } from './tx'
import { ListResponse, RequestCallback } from '.'

/**
 * Block data.
 */
export type Block = {
  timestamp: number
  height: number
  parent: string
  data: {
    transactions: Record<string, Record<string, BaseTx>>
  }
  ledgerHash: string
  nonce: number
  difficulty: number
  dataHash: string
  hash: string
  transactions: Tx[]
  total: number
  txCount: number
}

export type BlocksParams = {
  noEmpty?: 1 | 0
  limit?: number
  page?: number
  sort?: string
  since?: number
}

/**
 * Get a block by hash (string) or height (number).
 */
export const block = async (host: string, hash: string | number, cb?: RequestCallback): Promise<Block> => {
  const url = `${host}/block/${hash}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get blocks.
 */
export const blocks = async (host: string, params?: BlocksParams, cb?: RequestCallback): Promise<ListResponse<Block>> => {
  let url = `${host}/blocks`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
