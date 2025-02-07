# Compound V3 Protocol integration

## Overview

Compound V3 Protocol is a Tier-1 decentrilized lending and borrowing protocols. The protocol allows to decrease risk due to isolated markets. The protocols allow to lend assets such as: WETH, ETH, USDC, USDbC, USDC.e, USDT and AERO, allowing users to manage the position, get current markets statistics to choose the best yeild opportunity.

### Main Features

- Lend WETH, ETH, USDC, USDbC, USDC.e, USDT and AERO
- Borrow WETH, ETH, USDC, USDbC, USDC.e, USDT and AERO
- Claim rewards from the protocol
- Supply collateral
- Withdraw collateral from the protocol
- Query current lending and borrowing APRs
- Get lend position on chain on specific market
- Get all lend positions on chain
- Get claimed and owed rewards


## Supported Networks

- ETHEREUM
- ARBITRUM
- BASE

## Common Tasks

1. Lend Operations

    - "Lend 1000 USDT in @compound-v3 on Ethereum network"
    - "Add the whole AERO liqudity in @compound-v3 on Base network"
    - "Deposit 1000 USDC tokens in @compound-v3 on Arbitrum"
    - "Lend 10 native tokens in @compound-v3 on Base"
    - "Deposit 222 USDS in @compound-v3"

2. APR Queries

    - "Get lend APR for USDC on Ethereum in @compound-v3"
    - "What is the borrow APR on Base for WETH in @compound-v3"
    - "View supply APR for wstETH from Compound V3"
    - "Check borrow APR for AERO on base on Compound"

3. Position Queries
    - "Get lend position for USDT on Ethereum in @compound-v3"
    - "Show all lend position on Arbitrum in @compound-v3"

4. Borrow Operations

    - "Borrow 1000 USDT on Ethereum in @compound-v3"
    - "Take 500 USDC on Arbitrum in @compound-v3"
    - "Borrow 1000 USDC on Base in @compound-v3"

5. Claim Rewards

    - "Get my rewards from Compound V3 protocol on Ethereum"
    - "Collect my earned rewards from Compound V3 on Arbitrum"
    - "Withdraw accumulated rewards from Compound V3 on Base chain"

6. Withdraw Collateral

    - "Withdraw 1000 wstETH on Ethereum in @compound-v3"
    - "Withdraw 500 USDC on Arbitrum in @compound-v3"
    - "Withdraw 1000 USDC on Base in @compound-v3"

7. Get Claimed and Owed Rewards

    - "Get claimed rewards amount from @compound-v3 on Ethereum"
    - "Get owed rewards amount from @compound-v3 on Arbitrum"

## Pain Points Solved

1. **Handle all lending flows**

    - Handle ETH to WETH wrapping on all supported chains
    - Allow lend USDT on Ethereum even with approvale more then 0
    - Support of all lend assets accross all supproted networks

2. **APR managment**

    - The support of all lend APR metrics
    - The support of all borrow APR metrics
    - Real-time APRs

3. **Position managment**
    - Receive lend position for specific market
    - Receive lend positions for specific market

4. **Rewards managment**
    - Claim rewards from the protocol
    - Get claimed rewards amount
    - Get owed rewards amount

5. **Collateral managment**
    - Supply collateral
    - Withdraw collateral
    - Borrow collateral
    - Repay borrow positions


## Installation

```bash
yarn add @heyanon/compound-v3
```
