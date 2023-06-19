// Copyright (C) 2022 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { RequestCallback } from '.'
import superagent from 'superagent'

/**
 * Exchange rate data.
 */
export type ExchangeRate = {
  /** Date of rate capture */
  date: string
  /** Unique reference */
  ref: string
  /** USD-XE exchange rate */
  rate: number
  /** Exchange gas fee */
  gas: number
  /** Exchange limit */
  limit: number
}

/**
 * Get current exchange rate data.
 */
export const current = async (host: string, cb?: RequestCallback): Promise<ExchangeRate> => {
  const url = `${host}/exchangerate`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
