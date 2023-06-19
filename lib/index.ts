// Copyright (C) 2021 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

export * as burn from './burn'
export * as exchangeRate from './exchangeRate'
export * as session from './session'
export * as stake from './stake'
export * as token from './token'
export * as tx from './tx'

import { SuperAgentRequest } from 'superagent'

/**
 * Callback function allowing a SuperAgent HTTP request to be modified before it is sent.
 * This approach enables user code to alter request behaviour using SuperAgent's API:
 * https://visionmedia.github.io/superagent/
 */
export type RequestCallback = (r: SuperAgentRequest) => SuperAgentRequest

/**
 * API response template for an index query.
 */
export type ListResponse<T, M = Record<never, never>> = {
  results: T[]
  metadata: M & {
    count: number
    limit: number
    skip: number
    totalCount: number
  }
}
