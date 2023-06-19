<img src="https://cdn.edge.network/assets/img/edge-logo-green.svg" width="200">

# index-utils

Utility library for XE index API

[![npm version](https://img.shields.io/npm/v/@edge/index-utils)](https://www.npmjs.com/package/@edge/index-utils) [![npm downloads](https://img.shields.io/npm/dt/@edge/index-utils)](https://www.npmjs.com/package/@edge/index-utils) [![license](https://img.shields.io/npm/l/@edge/index-utils)](LICENSE.md)

- [index-utils](#index-utils)
  - [Usage](#usage)
    - [Blocks](#blocks)
      - [Get blocks](#get-blocks)
      - [Get block](#get-block-by-hash-or-height)
    - [Burns](#burns)
      - [Get burns](#get-burns)
      - [Get burn by hash](#get-burn-by-hash)
      - [Get burn stats](#get-burn-stats)
    - [Exchange rate](#exchange-rate)
      - [Get current exchange rate](#get-current-exchange-rate)
    - [Sessions](#sessions)
      - [Get sessions](#get-sessions)
      - [Get session by device address](#get-session-by-device-address)
    - [Stakes](#stakes)
      - [Get stakes](#get-stakes)
      - [Get stake by ID](#get-stake-by-id)
      - [Get stake by device address](#get-stake-by-device-address)
      - [Get stake history](#get-stake-history)
    - [Token](#token)
      - [Get current token value](#get-current-token-value)
    - [Transactions](#transactions)
      - [Get transactions](#get-transactions)
      - [Get transaction by hash](#get-transaction-by-hash)
  - [Contributing](#contributing)
  - [License](#license)

## Usage

This library provides a collection of simple functions for querying the XE blockchain indexing API, which provides access to indexed blockchain data including wallet transactions, balances, blocks, and more.

> API functions expect a `host` URL for the index API to be provided as the first argument. This must be provided without a trailing slash. The standard URLs are:
>
> - Mainnet: <https://index.xe.network>
> - Testnet: <https://index.test.network>

Code examples are included below for your guidance. Mind that these examples are not comprehensive and many support additional parameters.

### Blocks

Use the `block` component to query blocks.

#### Get blocks

`block.blocks()` gets a list of blocks.

```js
require('@edge/index-utils').block.blocks('https://index.xe.network')
  .then(blocks => {
    console.log(blocks)
  })
```

#### Get block by hash or height

`block.block()` gets a block by its hash or height.

```js
require('@edge/index-utils').block.block('https://index.xe.network', 0)
  .then(block => {
    console.log(block)
  })
```

### Burns

Use the `burn` component to query burns.

#### Get burns

`burn.burns()` gets a list of burns.

```js
require('@edge/index-utils').burn.burns('https://index.xe.network')
  .then(burns => {
    console.log(burns)
  })
```

#### Get burn by hash

`burn.burn()` retrieves a single burn by its hash.

```js
require('@edge/index-utils').burn.burn('https://index.xe.network', '46e5631c4d711e9c3a56d8672446ba2b569efbcbff0a82ad579fe5f8660e8954')
  .then(burn => {
    console.log(burn)
  })
```

#### Get burn stats

`burn.stats()` retrieves network stats for burns, including burn counts and burn amounts for all time and last 30 days.

```js
require('@edge/index-utils').burn.stats('https://index.xe.network')
  .then(stats => {
    console.log(stats)
  })
```

### Exchange rate

Use the `exchangeRate` component to query exchange rate data.

#### Get current exchange rate

`exchangeRate.current()` gets the current exchange rate data.

```js
require('@edge/index-utils').exchangeRate.current('https://index.xe.network')
  .then(xr => {
    console.log(xr)
  })
```

### Sessions

Use the `session` component to query devices on the network.

#### Get sessions

`session.sessions()` gets the latest session for each device on the network, which can be filtered by wallet address.

```js
require('@edge/index-utils').session.sessions('https://index.xe.network')
  .then(sessions => {
    console.log(sessions)
  })
```

Filter by wallet address:

```js
require('@edge/index-utils').session.sessions('https://index.xe.network', 'xe_3F129e50310Ab4db5e3C7Eb79e177A40a8e9D319')
  .then(sessions => {
    console.log(sessions)
  })
```

#### Get session by device address

`session.session()` gets the current or most recent session for a given device address.

> This is not a working example; a valid XE address is required.

```js
require('@edge/index-utils').session.session('https://index.xe.network', 'xe_a1b2c3...')
  .then(session => {
    console.log(session)
  })
```

### Stakes

Use the `stake` component to query stakes and their history.

#### Get stakes

`stake.stakes()` gets a list of stakes, which can be filtered by wallet address.

```js
require('@edge/index-utils').stake.stakes('https://index.xe.network')
  .then(stakes => {
    console.log(stakes)
  })
```

Filter by wallet address:

```js
require('@edge/index-utils').stake.stakes('https://index.xe.network', 'xe_3F129e50310Ab4db5e3C7Eb79e177A40a8e9D319')
  .then(stakes => {
    console.log(stakes)
  })
```

#### Get stake by ID

`stake.stake()` gets a single stake by ID.

```js
require('@edge/index-utils').stake.stake('https://index.xe.network', 'de189ce46ca195a10346a884fb974b3104dcddfaeefd1e20c577e6b19b54bf09')
  .then(stake => {
    console.log(stake)
  })
```

> Be aware that a stake's ID is different than its hash. A stake's hash changes every time it is modified by an action. However, its ID always stays the same. You will normally use hash when querying the blockchain, and ID when querying the index.

#### Get stake by device address

`stake.deviceStake()` gets information about the stake for a given device address.

> This is not a working example; a valid XE address is required.

```js
require('@edge/index-utils').stake.deviceStake('https://index.xe.network', 'xe_a1b2c3...')
  .then(info => {
    console.log(info)
  })
```

#### Get stake history

`stake.history()` gets the history for a single stake. This provides insight into changes to a stake.

```js
require('@edge/index-utils').stake.history('https://index.xe.network', 'de189ce46ca195a10346a884fb974b3104dcddfaeefd1e20c577e6b19b54bf09')
  .then(history => {
    console.log(history)
  })
```

### Token

Use the `token` component to query token data.

#### Get current token value

`token.current()` gets the current token value.

```js
require('@edge/index-utils').token.current('https://index.xe.network')
  .then(tv => {
    console.log(tv)
  })
```

### Transactions

Use the `tx` component to query transactions.

#### Get transactions

`tx.transactions()` gets a list of transactions, which can be filtered by wallet address.

```js
require('@edge/index-utils').tx.transactions('https://index.xe.network')
  .then(txs => {
    console.log(txs)
  })
```

Filter by wallet address:

```js
require('@edge/index-utils').tx.transactions('https://index.xe.network', 'xe_ed9e05C9c85Ec8c46c333111a1C19035b5ECba99')
  .then(txs => {
    console.log(txs)
  })
```

#### Get transaction by hash

`tx.transaction()` retrieves a single transaction by its hash.

```js
require('@edge/index-utils').tx.transaction('https://index.xe.network', '46e5631c4d711e9c3a56d8672446ba2b569efbcbff0a82ad579fe5f8660e8954')
  .then(tx => {
    console.log(tx)
  })
```

### Request callbacks

All API wrapper functions accept a `RequestCallback` as their final argument. This can be used to control request behaviour from your own code using [SuperAgent's chaining API](https://visionmedia.github.io/superagent/).

For example, if you wanted to specify a 100ms timeout on a request for transactions, you could do:

```js
const { tx } = require('@edge/index-utils')

async function main() {
  let txs = await tx.transactions('https://index.xe.network', undefined, undefined, req => req.timeout(100))
  console.log(JSON.stringify(txs))
}
```

> Note that undefined arguments cannot be omitted, as we do not provide overloaded functions in this library. You can write your own wrapper to simplify this if you prefer.

## Contributing

Interested in contributing to the project? Amazing! Before you do, please have a quick look at our [Contributor Guidelines](CONTRIBUTING.md) where we've got a few tips to help you get started.

## License

Edge is the infrastructure of Web3. A peer-to-peer network and blockchain providing high performance decentralised web services, powered by the spare capacity all around us.

Copyright notice
(C) 2021 Edge Network Technologies Limited <support@edge.network><br />
All rights reserved

This product is part of Edge.
Edge is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version ("the GPL").

**If you wish to use Edge outside the scope of the GPL, please contact us at licensing@edge.network for details of alternative license arrangements.**

**This product may be distributed alongside other components available under different licenses (which may not be GPL). See those components themselves, or the documentation accompanying them, to determine what licenses are applicable.**

Edge is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

The GNU General Public License (GPL) is available at: https://www.gnu.org/licenses/gpl-3.0.en.html<br />
A copy can be found in the file GPL.md distributed with
these files.

This copyright notice MUST APPEAR in all copies of the product!
