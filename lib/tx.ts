// Copyright (C) 2021 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import superagent from 'superagent'
import { toQueryString } from './helpers'
import { ListResponse, RequestCallback } from '.'

/**
 * Index transaction.
 * A superset of the on-chain XE transaction.
 */
export type Tx = {
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

/**
 * Bridge transaction data.
 * These values are set in exchange transactions created by Bridge.
 */
export type TxBridgeData = {
  /** Ethereum address for withdrawal/sale transaction. Used by Bridge. */
  destination?: string
  /** Fee amount in an exchange transaction. Used by Bridge. */
  fee?: number
  /** Exchange rate reference for sale transaction. Used by Bridge. */
  ref?: string
}

/**
 * Transaction data.
 */
export type TxData = TxBridgeData & TxVarData & {
  /** Blockchain action to be effected in the course of creating the transaction. */
  action?: string
  /** Device ID. Used with `action: DeviceAction` */
  device?: string
  /** Express unlock flag. Used with `action: "unlock_stake"` */
  express?: boolean
  /** Transaction memo. */
  memo?: string
  /** Stake ID. Used with `action: DeviceAction | "release_stake" | "unlock_stake"` */
  stake?: string
}

/**
 * Variables transaction data.
 * These values are set by a blockchain custodian when updating on-chain variables.
 */
export type TxVarData = {
  /** Variable name. Used with `action: VarAction` */
  key?: string
  /** Variable value. Used with `action: "set_var"` */
  value?: unknown
}

export type TxsParams = {
  above?: number
  since?: number
  page?: number
  limit?: number
}

/**
 * Get a transaction.
 *
 * ```
 * const tx = await transaction('https://index.xe.network', 'some-tx-hash')
 * ```
 */
export const transaction = async (host: string, hash: string, cb?: RequestCallback): Promise<Tx> => {
  const url = `${host}/transaction/${hash}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get transactions.
 *
 * Pass a wallet address to get only transactions to/from that address.
 *
 * ```
 * const allTxs = await transactions('https://index.xe.network')
 *
 * const myTxs = await transactions('https://index.xe.network', 'my-wallet-address')
 *
 * const pagedTxs = await index.transactions('https://index.xe.network', undefined, { page: 2, limit: 5 })
 * ```
 */
export const transactions = async (
  host: string,
  address?: string,
  params?: TxsParams,
  cb?: RequestCallback
): Promise<ListResponse<Tx, { page: number }>> => {
  let url = `${host}/transactions`
  if (address !== undefined) url += `/${address}`
  if (params !== undefined) url += `?${toQueryString(params)}`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
