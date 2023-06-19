// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { RequestCallback } from '.'
import superagent from 'superagent'

/**
 * Gas rate data.
 */
export type GasRate = {
  /** Date of rate capture */
  date: string
  /** Unique reference */
  ref: string
  fee: number
  handlingFeePercentage: number
  minimumHandlingFee: number
  ethereum: {
    legacy: number
    baseFee: number
    priorityFee: number
  }
}

/**
 * Get current gas rate data.
 */
export const current = async (host: string, cb?: RequestCallback): Promise<GasRate> => {
  const url = `${host}/gasrates`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
