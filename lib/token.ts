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

/**
 * Get token value data for the last week, at the end of each day.
 */
export const daily = async (host: string, cb?: RequestCallback): Promise<Value[]> => {
  const url = `${host}/token/daily`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}

/**
 * Get token value data for the last week, at (approximately) the current time of day.
 */
export const lastWeek = async (host: string, cb?: RequestCallback): Promise<Value[]> => {
  const url = `${host}/token/lastweek`
  const response = cb === undefined ? await superagent.get(url) : await cb(superagent.get(url))
  return response.body
}
