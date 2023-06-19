// Copyright (C) 2022 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { RequestCallback } from '.'
import superagent from 'superagent'

/**
 * Token value data.
 */
export type Value = {
  /** Date of value capture */
  date: string
  /** Value of XE in ETH */
  ethPerXE: number
  /** Value of XE in USD */
  usdPerXE: number
}

/**
 * Get current token value data.
 */
export const current = async (host: string, cb?: RequestCallback): Promise<Value> => {
  const url = `${host}/token/current`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
