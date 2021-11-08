<img src="https://cdn.edge.network/assets/img/edge-logo-green.svg" width="200">

# index-utils

Utility library for Index API

[![npm version](https://img.shields.io/npm/v/@edge/index-utils)](https://www.npmjs.com/package/@edge/index-utils) [![npm downloads](https://img.shields.io/npm/dt/@edge/index-utils)](https://www.npmjs.com/package/@edge/index-utils) [![license](https://img.shields.io/npm/l/@edge/index-utils)](LICENSE.md)

- [index-utils](#index-utils)
  - [Usage](#usage)
    - [Transactions](#transactions)
    - [Get transactions](#get-transactions)
    - [Get transaction by hash](#get-transaction-by-hash)
  - [License](#license)

## Usage

This library provides a collection of simple functions for querying the XE index API, which is an extended frontend for the XE blockchain proper.

> API functions expect a `host` URL for the index API to be provided as the first argument. This must be provided without a trailing slash. The standard URLs are:
>
> - Mainnet: <https://index.xe.network/>
> - Testnet: <https://index.test.network/>
>
> All code examples use the mainnet URL for simplicity.

### Transactions

The current version of the library is very small and only has the ability to query transactions. This will be expanded in future to provide much more index API coverage.

#### Get transactions

`transactions()` gets a list of transactions, which can be filtered by wallet address, or a specific block, and certain other parameters.

```js
const index = require('@edge/index-utils')

async function main() {
  let txs = await index.transactions('https://index.xe.network')
  console.log(JSON.stringify(txs))

  txs = await index.transactions('https://index.xe.network', 'xe_ed9e05C9c85Ec8c46c333111a1C19035b5ECba99')
  console.log(JSON.stringify(txs))

  txs = await index.transactions('https://index.xe.network', undefined, { page: 2, limit: 5 })
  console.log(JSON.stringify(txs))
}

main()
```

#### Get transaction by hash

`transaction()` retrieves a single transaction by its hash.

```js
const index = require('@edge/index-utils')

async function main() {
  let txs = await index.transaction('https://index.xe.network', '46e5631c4d711e9c3a56d8672446ba2b569efbcbff0a82ad579fe5f8660e8954')
  console.log(JSON.stringify(txs))
}

main()
```

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
