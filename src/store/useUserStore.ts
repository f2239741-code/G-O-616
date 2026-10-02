import { create } from 'zustand';
import { UserSession, UserTier } from '../types/user';
import { ignisWeb3 } from '../lib/web3/ignisEngine';

interface UserStoreState {
  session: UserSession;
  isAuthModalOpen: boolean;
  isStakingModalOpen: boolean;
  
  // Actions
  loginWithGoogle: (email?: string, name?: string) => void;
  logoutSession: () => void;
  updateTier: (tier: UserTier) => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  stakeIgnis: (amount: number) => Promise<void>;
  setCoherenceScore: (score: number) => void;
  rewardIgnis: (amount: number, source?: string) => void;
  updatePreferences: (prefs: Partial<UserSession['preferences']>) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsStakingModalOpen: (open: boolean) => void;
}

export const useUserStore = create<UserStoreState>((set, get) => ({
  session: {
    uid: 'sovereign_guardian_' + Math.random().toString(36).substring(2, 8),
    email: 'guardian@sovereign.mesh',
    displayName: 'Sovereign Seeker',
    role: 'initiator',
    tier: 'explorer',
    coherenceScore: 94.8,
    ignisBalance: 2500,
    stakedIgnis: 750,
    isWalletConnected: false,
    lastLoginAt: new Date().toISOString(),
    createdAt: '2026-01-01T00:00:00Z',
    preferences: {
      theme: 'lucifera_midnight',
      audioAutoplay: false,
      frequencyDroneEnabled: true,
      hapticFeedback: true,
      ambientVolume: 0.4
    }
  },
  isAuthModalOpen: false,
  isStakingModalOpen: false,

  loginWithGoogle: (email = 'seeker.luminary@sanctuary.io', name = 'Luminary Architect') => {
    set((state) => ({
      session: {
        ...state.session,
        email,
        displayName: name,
        role: 'guardian',
        lastLoginAt: new Date().toISOString()
      },
      isAuthModalOpen: false
    }));
  },

  logoutSession: () => {
    set((state) => ({
      session: {
        ...state.session,
        email: 'anonymous@sovereign.mesh',
        displayName: 'Guest Seeker',
        role: 'seeker'
      }
    }));
  },

  updateTier: (tier) => {
    set((state) => ({
      session: {
        ...state.session,
        tier
      }
    }));
  },

  connectWallet: async () => {
    try {
      const state = await ignisWeb3.connectWallet();
      set((s) => ({
        session: {
          ...s.session,
          walletAddress: state.address || undefined,
          isWalletConnected: true,
          ignisBalance: state.ignisBalance,
          activeChainId: state.chainId || 137
        }
      }));
    } catch (e) {
      console.error('Wallet connection error:', e);
    }
  },

  disconnectWallet: () => {
    ignisWeb3.disconnectWallet();
    set((s) => ({
      session: {
        ...s.session,
        walletAddress: undefined,
        isWalletConnected: false
      }
    }));
  },

  stakeIgnis: async (amount: number) => {
    await ignisWeb3.stakeIgnis(amount);
    set((s) => ({
      session: {
        ...s.session,
        ignisBalance: Math.max(0, s.session.ignisBalance - amount),
        stakedIgnis: s.session.stakedIgnis + amount
      }
    }));
  },

  setCoherenceScore: (score) => {
    set((state) => ({
      session: {
        ...state.session,
        coherenceScore: Math.min(100, Math.max(0, score))
      }
    }));
  },

  rewardIgnis: (amount, source) => {
    console.log(`[IGNIS Engine] Rewarding ${amount} IGNIS (${source || 'Ritual reward'})`);
    set((state) => ({
      session: {
        ...state.session,
        ignisBalance: state.session.ignisBalance + amount
      }
    }));
  },

  updatePreferences: (prefs) => {
    set((state) => ({
      session: {
        ...state.session,
        preferences: {
          ...state.session.preferences,
          ...prefs
        }
      }
    }));
  },

  setIsAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
  setIsStakingModalOpen: (open) => set({ isStakingModalOpen: open })
}));
