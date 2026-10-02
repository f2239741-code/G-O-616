import { Web3NetworkConfig, IgnisTokenMetadata } from '../../types/web3';

export const POLYGON_MAINNET: Web3NetworkConfig = {
  chainId: 137,
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'POL (ex-MATIC)',
    symbol: 'POL',
    decimals: 18
  },
  rpcUrls: [
    'https://polygon-rpc.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://polygon.llamarpc.com'
  ],
  blockExplorerUrls: ['https://polygonscan.com']
};

export const POLYGON_AMOY_TESTNET: Web3NetworkConfig = {
  chainId: 80002,
  chainName: 'Polygon Amoy Testnet',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: [
    'https://rpc-amoy.polygon.technology'
  ],
  blockExplorerUrls: ['https://amoy.polygonscan.com']
};

export const IGNIS_CONTRACT_METADATA: IgnisTokenMetadata = {
  symbol: 'IGNIS',
  name: 'Ignis Sovereign Energy Token',
  decimals: 18,
  contractAddress: '0x71cA4918eEb645bc25E29699A3144df8555Ef4b3', // Sovereign Ignis contract
  totalSupply: '100,000,000',
  circulatingSupply: '14,285,700',
  currentIgnisPriceUsd: 0.033,
  stakedTotal: 3450000,
  totalBurned: 1245800
};
