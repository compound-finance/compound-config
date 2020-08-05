
# Compound Config

This repository contains all configuration for the Compound Protocol on Ethereum. Projects wishing to interact with Compound contracts will be able to find contract addresses, ABIs and interfaces for the core Compound contracts in this repo.

## Getting Started

The `networks/` folder contains a pair of files per test net. These are `<network.json>` and `<network>-abi.json`. The former contains a list of all deployed and related contracts along with some basic JSON configuration for each. The ABI-file contains the ABI of all interesting contracts.

## Additional Configuration

This repo doesn't currently have additional configuration, but we encourage more information if it's directly useful to developers on the protocol. Feel free to create an issue or pull request.

## Contributions

For all changes that affect the core Protocol or are directly related to the core Protocol (e.g. underlying tokens, interest rate models, etc), please add the relevant configuration into the networks files.

