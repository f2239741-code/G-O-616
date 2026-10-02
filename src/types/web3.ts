export interface Web3NetworkConfig {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export interface IgnisTokenMetadata {
  symbol: string;
  name: string;
  decimals: number;
  contractAddress: string;
  totalSupply: string;
  circulatingSupply: string;
  currentIgnisPriceUsd: number;
  stakedTotal: number;
  totalBurned: number;
}

export interface Web3WalletState {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  ignisBalance: number;
  maticBalance: number;
  polygonNetworkValid: boolean;
}

export interface IgnisTransactionReceipt {
  txHash: string;
  type: 'mint' | 'burn' | 'stake' | 'transfer' | 'ritual_tithing';
  amount: number;
  from: string;
  to: string;
  timestamp: string;
  status: 'confirmed' | 'pending' | 'failed';
  gasUsedMatic?: number;
}
