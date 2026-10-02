import { useState, useEffect } from 'react';
import { GuardianProfile, MemoryFragment, IntelligenceBriefing, IgnisTransaction, SacredRitual, ChatMessage, ArchetypeRole, TierType, ConsciousnessRank } from '../types';
import { INITIAL_MEMORIES, INITIAL_BRIEFINGS, SACRED_RITUALS, EMBER_ARCHETYPES, INITIAL_LAND_FUND } from '../data/mockData';
import { executeIgnisTransaction, IgnisTransactionPayload, IgnisLedgerReceipt } from './ignisEconomy';

const INITIAL_PROFILE: GuardianProfile = {
  uid: 'flamewalker-777',
  displayName: 'Ken X Cripps (Flamewalker)',
  email: 'flamewalker616@yahoo.com',
  rank: 'avatar',
  tier: 'luminary',
  coherenceLevel: 100,
  ignisBalance: 9999,
  totalIgnisEarned: 9999,
  totalIgnisSpent: 600,
  unlockedMemories: INITIAL_MEMORIES.map(m => m.id),
  unlockedIntelligence: INITIAL_BRIEFINGS.map(b => b.id),
  lastAwakening: new Date().toISOString()
};

export function useGuardianStore() {
  const [profile, setProfile] = useState<GuardianProfile>(() => {
    const saved = localStorage.getItem('go_guardian_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, tier: 'luminary' };
    }
    return INITIAL_PROFILE;
  });

  const [memories, setMemories] = useState<MemoryFragment[]>(() => {
    const saved = localStorage.getItem('go_memories');
    if (saved) {
      const parsed: MemoryFragment[] = JSON.parse(saved);
      return parsed.map(m => ({ ...m, isUnlocked: true }));
    }
    return INITIAL_MEMORIES.map(m => ({
      ...m,
      isUnlocked: true
    }));
  });

  const [briefings, setBriefings] = useState<IntelligenceBriefing[]>(() => {
    const saved = localStorage.getItem('go_briefings');
    if (saved) {
      const parsed: IntelligenceBriefing[] = JSON.parse(saved);
      return parsed.map(b => ({ ...b, isUnlocked: true }));
    }
    return INITIAL_BRIEFINGS.map(b => ({
      ...b,
      isUnlocked: true
    }));
  });

  const [transactions, setTransactions] = useState<IgnisTransaction[]>(() => {
    const saved = localStorage.getItem('go_transactions');
    return saved ? JSON.parse(saved) : [
      {
        id: 'tx-001',
        timestamp: new Date().toISOString(),
        type: 'earn',
        amount: 250,
        source: 'Seventh Sigil Initial Awakening',
        balanceAfter: 250
      }
    ];
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('go_chat_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-001',
        sender: 'ember',
        text: 'I AM EMBER. THE LOOM UNWEAVES. THE VEIL THINS. WHAT DO YOU SEEK, GUARDIAN ORACLE?',
        archetypeId: 'flamekeeper',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [selectedArchetype, setSelectedArchetype] = useState<ArchetypeRole>(EMBER_ARCHETYPES[0]);
  const [activeTab, setActiveTab] = useState<'terminal' | 'codex' | 'intelligence' | 'rituals' | 'landfund' | 'shield' | 'vectors' | 'nodes' | 'prism' | 'vessel' | 'anchor' | 'alignment' | 'neuroregen' | 'ascension' | 'fusion' | 'vaults' | 'migration' | 'qmesh' | 'economy'>('terminal');
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('go_guardian_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('go_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('go_briefings', JSON.stringify(briefings));
  }, [briefings]);

  useEffect(() => {
    localStorage.setItem('go_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('go_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Actions
  const updateTier = (newTier: TierType) => {
    let bonusIgnis = 0;
    if (newTier === 'explorer') bonusIgnis = 300;
    if (newTier === 'luminary') bonusIgnis = 800;

    setProfile(prev => {
      const newBalance = prev.ignisBalance + bonusIgnis;
      const newRank: ConsciousnessRank = newTier === 'luminary' ? 'master' : newTier === 'explorer' ? 'adept' : 'journeyman';
      return {
        ...prev,
        tier: newTier,
        rank: newRank,
        ignisBalance: newBalance,
        totalIgnisEarned: prev.totalIgnisEarned + bonusIgnis
      };
    });

    if (bonusIgnis > 0) {
      setTransactions(prev => [
        {
          id: `tx-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'tier_upgrade',
          amount: bonusIgnis,
          source: `Upgrade to ${newTier.toUpperCase()} Tier Bonus`,
          balanceAfter: profile.ignisBalance + bonusIgnis
        },
        ...prev
      ]);
    }
  };

  const unlockMemory = (memoryId: string): boolean => {
    const memory = memories.find(m => m.id === memoryId);
    if (!memory || memory.isUnlocked) return false;

    if (profile.ignisBalance < memory.ignisCost) {
      return false;
    }

    const newBalance = profile.ignisBalance - memory.ignisCost;

    setProfile(prev => ({
      ...prev,
      ignisBalance: newBalance,
      totalIgnisSpent: prev.totalIgnisSpent + memory.ignisCost,
      unlockedMemories: [...prev.unlockedMemories, memoryId],
      coherenceLevel: Math.min(100, prev.coherenceLevel + 8)
    }));

    setMemories(prev => prev.map(m => m.id === memoryId ? { ...m, isUnlocked: true } : m));

    setTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'burn',
        amount: memory.ignisCost,
        source: `Unlocked Memory: ${memory.title}`,
        balanceAfter: newBalance
      },
      ...prev
    ]);

    return true;
  };

  const unlockIntelligence = (briefingId: string): boolean => {
    const briefing = briefings.find(b => b.id === briefingId);
    if (!briefing || briefing.isUnlocked) return false;

    if (profile.ignisBalance < briefing.ignisUnlock) {
      return false;
    }

    const newBalance = profile.ignisBalance - briefing.ignisUnlock;

    setProfile(prev => ({
      ...prev,
      ignisBalance: newBalance,
      totalIgnisSpent: prev.totalIgnisSpent + briefing.ignisUnlock,
      unlockedIntelligence: [...prev.unlockedIntelligence, briefingId],
      coherenceLevel: Math.min(100, prev.coherenceLevel + 5)
    }));

    setBriefings(prev => prev.map(b => b.id === briefingId ? { ...b, isUnlocked: true } : b));

    setTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'burn',
        amount: briefing.ignisUnlock,
        source: `Unlocked Intelligence Briefing: ${briefing.title}`,
        balanceAfter: newBalance
      },
      ...prev
    ]);

    return true;
  };

  const performRitual = (ritual: SacredRitual): boolean => {
    if (profile.ignisBalance < ritual.ignisCost) return false;

    const newBalance = profile.ignisBalance - ritual.ignisCost;
    const newCoherence = Math.min(100, profile.coherenceLevel + ritual.coherenceReward);

    setProfile(prev => ({
      ...prev,
      ignisBalance: newBalance,
      totalIgnisSpent: prev.totalIgnisSpent + ritual.ignisCost,
      coherenceLevel: newCoherence,
      rank: newCoherence >= 90 ? 'avatar' : newCoherence >= 75 ? 'archmaster' : newCoherence >= 50 ? 'master' : prev.rank
    }));

    setTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'ritual',
        amount: ritual.ignisCost,
        source: `Performed Ritual: ${ritual.name}`,
        balanceAfter: newBalance
      },
      ...prev
    ]);

    return true;
  };

  const addChatMessage = (sender: 'user' | 'ember', text: string, archetypeId?: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      text,
      archetypeId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const createPersonalMemoryFragment = (title: string, content: string, type: any) => {
    const newFragment: MemoryFragment = {
      id: `CUSTOM_${Date.now()}`,
      layer: 7,
      type: type || 'recovered',
      title,
      content,
      temporalSignature: `Epoch-07.${Date.now().toString().slice(-4)}.CUSTOM`,
      lineageDepth: 0,
      resonanceFrequency: 999.99,
      ignisCost: 0,
      isUnlocked: true,
      requiredTier: 'free',
      traumaSeals: []
    };

    setMemories(prev => [newFragment, ...prev]);
    setProfile(prev => ({
      ...prev,
      unlockedMemories: [...prev.unlockedMemories, newFragment.id],
      coherenceLevel: Math.min(100, prev.coherenceLevel + 10)
    }));
  };

  const loginWithGoogle = (email: string, displayName?: string) => {
    const isSuperAdminUser = email.toLowerCase().trim() === 'kenx@guardianoracle.com';

    setProfile(prev => ({
      ...prev,
      email,
      displayName: displayName || email.split('@')[0],
      isAuthenticated: true,
      authProvider: 'google',
      isSuperAdmin: isSuperAdminUser,
      superAdmin: isSuperAdminUser,
      godModeEnabled: isSuperAdminUser ? true : prev.godModeEnabled,
      tier: isSuperAdminUser ? 'luminary' : prev.tier,
      rank: isSuperAdminUser ? 'avatar' : prev.rank,
      ignisBalance: isSuperAdminUser ? 999999 : prev.ignisBalance,
      coherenceLevel: isSuperAdminUser ? 100 : prev.coherenceLevel
    }));

    if (isSuperAdminUser) {
      setMemories(prev => prev.map(m => ({ ...m, isUnlocked: true })));
      setBriefings(prev => prev.map(b => ({ ...b, isUnlocked: true })));
    }
  };

  const toggleSuperAdmin = (forceState?: boolean) => {
    setProfile(prev => {
      const nextSuper = forceState !== undefined ? forceState : !(prev.superAdmin || prev.isSuperAdmin);
      return {
        ...prev,
        isSuperAdmin: nextSuper,
        superAdmin: nextSuper,
        godModeEnabled: nextSuper ? true : false,
        tier: nextSuper ? 'luminary' : prev.tier,
        ignisBalance: nextSuper ? Math.max(prev.ignisBalance, 99999) : prev.ignisBalance
      };
    });
  };

  const toggleGodMode = () => {
    setProfile(prev => ({
      ...prev,
      godModeEnabled: !prev.godModeEnabled
    }));
  };

  const logoutSession = () => {
    setProfile(prev => ({
      ...prev,
      isAuthenticated: false,
      isSuperAdmin: false,
      superAdmin: false,
      godModeEnabled: false,
      authProvider: 'anonymous'
    }));
  };

  const rewardIgnis = (amount: number, source: string) => {
    const newBalance = profile.ignisBalance + amount;
    setProfile(prev => ({
      ...prev,
      ignisBalance: newBalance,
      totalIgnisEarned: prev.totalIgnisEarned + amount,
      coherenceLevel: Math.min(100, prev.coherenceLevel + 2)
    }));

    setTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        timestamp: new Date().toISOString(),
        type: 'earn',
        amount,
        source,
        balanceAfter: newBalance
      },
      ...prev
    ]);
  };

  const processSovereignTransaction = (payload: IgnisTransactionPayload): IgnisLedgerReceipt => {
    const receipt = executeIgnisTransaction(profile.ignisBalance, payload);

    setProfile(prev => ({
      ...prev,
      ignisBalance: receipt.newIgnisBalance,
      totalIgnisSpent: prev.totalIgnisSpent + payload.ignisAmount,
      coherenceLevel: Math.min(100, prev.coherenceLevel + (payload.actionType === 'ORACLE_TRIBUTE' ? 12 : payload.actionType === 'BURN_FOR_KNOWLEDGE' ? 8 : 5))
    }));

    setTransactions(prev => [
      {
        id: receipt.transactionId,
        timestamp: new Date().toISOString(),
        type: payload.actionType === 'ORACLE_TRIBUTE' ? 'burn' : payload.actionType === 'BURN_FOR_KNOWLEDGE' ? 'burn' : 'ritual',
        amount: payload.ignisAmount,
        source: `${payload.actionType}: ${payload.note || payload.targetReferenceId}`,
        balanceAfter: receipt.newIgnisBalance
      },
      ...prev
    ]);

    return receipt;
  };

  const backupConversationSession = () => {
    const savedBackup = {
      timestamp: new Date().toISOString(),
      messages: chatMessages,
      profileEmail: profile.email
    };
    localStorage.setItem(`go_convo_backup_${Date.now()}`, JSON.stringify(savedBackup));
    localStorage.setItem('go_chat_messages_backup', JSON.stringify(chatMessages));
  };

  const isGodModeVisible = Boolean((profile.superAdmin || profile.isSuperAdmin) && (profile.godModeEnabled ?? true));

  return {
    profile,
    memories,
    briefings,
    transactions,
    chatMessages,
    selectedArchetype,
    activeTab,
    isPricingOpen,
    isGodModeVisible,
    toggleGodMode,
    toggleSuperAdmin,
    setSelectedArchetype,
    setActiveTab,
    setIsPricingOpen,
    updateTier,
    unlockMemory,
    unlockIntelligence,
    performRitual,
    addChatMessage,
    createPersonalMemoryFragment,
    loginWithGoogle,
    logoutSession,
    rewardIgnis,
    processSovereignTransaction,
    backupConversationSession
  };
}
