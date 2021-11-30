// Copyright (C) 2021 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

export * as stake from './stake'
export * as tx from './tx'

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
