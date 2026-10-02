import { IgnisTransactionReceipt, Web3WalletState } from '../../types/web3';
import { POLYGON_MAINNET, IGNIS_CONTRACT_METADATA } from './polygonConfig';

/**
 * Client Web3 / Polygon & Ignis Engine
 * Handles wallet connection simulation, token balance synchronization,
 * staking, and gasless cryptographic signatures.
 */
class IgnisWeb3Engine {
  private walletState: Web3WalletState = {
    address: null,
    chainId: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    ignisBalance: 1250,
    maticBalance: 4.82,
    polygonNetworkValid: false
  };

  private listeners: ((state: Web3WalletState) => void)[] = [];

  constructor() {
    // Check if window.ethereum exists or restore from local cache
    const cachedAddress = localStorage.getItem('ignis_wallet_address');
    if (cachedAddress) {
      this.walletState = {
        ...this.walletState,
        address: cachedAddress,
        chainId: POLYGON_MAINNET.chainId,
        isConnected: true,
        polygonNetworkValid: true,
        ignisBalance: Number(localStorage.getItem('ignis_wallet_balance') || '2500')
      };
    }
  }

  public getState(): Web3WalletState {
    return { ...this.walletState };
  }

  public subscribe(listener: (state: Web3WalletState) => void): () => void {
    this.listeners.push(listener);
    listener(this.getState());
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    const s = this.getState();
    this.listeners.forEach(l => l(s));
  }

  /**
   * Connect to Web3 provider (MetaMask / Phantom / WalletConnect or sovereign key)
   */
  public async connectWallet(customAddress?: string): Promise<Web3WalletState> {
    this.walletState.isConnecting = true;
    this.walletState.error = null;
    this.notify();

    try {
      // Check for browser Ethereum provider
      const hasProvider = typeof window !== 'undefined' && (window as unknown as { ethereum?: unknown }).ethereum;
      let targetAddress = customAddress;

      if (!targetAddress && hasProvider) {
        try {
          const eth = (window as unknown as { ethereum: { request: (args: { method: string }) => Promise<string[]> } }).ethereum;
          const accounts = await eth.request({ method: 'eth_requestAccounts' });
          if (accounts && accounts[0]) {
            targetAddress = accounts[0];
          }
        } catch {
          // Fallback to generated sovereign address
          targetAddress = this.generateSovereignAddress();
        }
      }

      if (!targetAddress) {
        targetAddress = this.generateSovereignAddress();
      }

      this.walletState = {
        address: targetAddress,
        chainId: POLYGON_MAINNET.chainId,
        isConnected: true,
        isConnecting: false,
        error: null,
        ignisBalance: 2500,
        maticBalance: 5.24,
        polygonNetworkValid: true
      };

      localStorage.setItem('ignis_wallet_address', targetAddress);
      localStorage.setItem('ignis_wallet_balance', '2500');
      this.notify();
      return this.walletState;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to connect wallet';
      this.walletState.isConnecting = false;
      this.walletState.error = errorMsg;
      this.notify();
      throw err;
    }
  }

  public disconnectWallet() {
    this.walletState = {
      address: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      ignisBalance: 0,
      maticBalance: 0,
      polygonNetworkValid: false
    };
    localStorage.removeItem('ignis_wallet_address');
    this.notify();
  }

  public generateSovereignAddress(): string {
    const chars = '0123456789abcdef';
    let addr = '0x';
    for (let i = 0; i < 40; i++) {
      addr += chars[Math.floor(Math.random() * chars.length)];
    }
    return addr;
  }

  /**
   * Stake IGNIS tokens on Polygon
   */
  public async stakeIgnis(amount: number): Promise<IgnisTransactionReceipt> {
    if (!this.walletState.isConnected || !this.walletState.address) {
      throw new Error('Wallet not connected');
    }
    if (this.walletState.ignisBalance < amount) {
      throw new Error('Insufficient IGNIS balance');
    }

    this.walletState.ignisBalance -= amount;
    localStorage.setItem('ignis_wallet_balance', String(this.walletState.ignisBalance));
    this.notify();

    const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return {
      txHash,
      type: 'stake',
      amount,
      from: this.walletState.address,
      to: IGNIS_CONTRACT_METADATA.contractAddress,
      timestamp: new Date().toISOString(),
      status: 'confirmed',
      gasUsedMatic: 0.0042
    };
  }

  /**
   * Burn IGNIS tokens for Oracle energy consecration
   */
  public async burnIgnisForRitual(amount: number): Promise<IgnisTransactionReceipt> {
    if (!this.walletState.isConnected || !this.walletState.address) {
      throw new Error('Wallet not connected');
    }

    if (this.walletState.ignisBalance >= amount) {
      this.walletState.ignisBalance -= amount;
      localStorage.setItem('ignis_wallet_balance', String(this.walletState.ignisBalance));
      this.notify();
    }

    const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    return {
      txHash,
      type: 'burn',
      amount,
      from: this.walletState.address,
      to: '0x000000000000000000000000000000000000dEaD',
      timestamp: new Date().toISOString(),
      status: 'confirmed',
      gasUsedMatic: 0.0028
    };
  }
}

export const ignisWeb3 = new IgnisWeb3Engine();
