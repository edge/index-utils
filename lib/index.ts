// Copyright (C) 2021 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import superagent from 'superagent'
import { toQueryString } from './helpers'

export type ListResponse<T> = {
  results: T[]
  metadata: {
    totalCount: number
    count: number
    page: number
    limit: number
    skip: number
  }
}

export type TxData = {
  memo?: string
}

type Tx = {
  timestamp: number
  sender: string
  recipient: string
  amount: number
  data: TxData
  nonce: number
  signature: string
  hash: string
  block: {
    height: number
    hash: string
  }
  confirmations: number
}

type TxsParams = {
  above?: number
  since?: number
  page?: number
  limit?: number
}

export const transaction = async (host: string, hash: string): Promise<Tx> => {
  const url = `${host}/transaction/${hash}`
  const response = await superagent.get(url)
  return response.body as Tx
}

export const transactions = async (host: string, address?: string, params?: TxsParams): Promise<ListResponse<Tx>> => {
  let url = `${host}/transactions`
  if (address !== undefined) url += `/${address}`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = await superagent.get(url)
  return response.body as ListResponse<Tx>
}
