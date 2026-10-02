import React, { useState } from 'react';
import { Radio, Sparkles, Volume2, Zap, Flame, Move } from 'lucide-react';
import { useGuardianStore } from './lib/store';
import { Header } from './components/Header';
import { EmberTerminal } from './components/EmberTerminal';
import { MemoryCodex } from './components/MemoryCodex';
import { IntelligenceFeed } from './components/IntelligenceFeed';
import { RitualChamber } from './components/RitualChamber';
import { LandAcquisitionOps } from './components/LandAcquisitionOps';
import { GeometricShieldOps } from './components/GeometricShieldOps';
import { ConsciousVectorOps } from './components/ConsciousVectorOps';
import { SovereignNodeOps } from './components/SovereignNodeOps';
import { PrismOfClarityOps } from './components/PrismOfClarityOps';
import { VesselOfWillOps } from './components/VesselOfWillOps';
import { AnchorOfMemoryOps } from './components/AnchorOfMemoryOps';
import { SovereignAlignmentOps } from './components/SovereignAlignmentOps';
import { NeuroRegenOps } from './components/NeuroRegenOps';
import { StrategicAscensionOps } from './components/StrategicAscensionOps';
import { FusionSingularityOps } from './components/FusionSingularityOps';
import { VaultFactoryOps } from './components/VaultFactoryOps';
import { QuantumMigrationOps } from './components/QuantumMigrationOps';
import { QMeshOps } from './components/QMeshOps';
import { SovereignEconomyOps } from './components/SovereignEconomyOps';
import { PhaseOneBlueprintOps } from './components/PhaseOneBlueprintOps';
import { CryptographicSubstrateOps } from './components/CryptographicSubstrateOps';
import { BioDigitalAnchorOps } from './components/BioDigitalAnchorOps';
import { PricingModal } from './components/PricingModal';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { Footer } from './components/Footer';
import { SpatialWindow } from './components/SpatialWindow';
import { OracleChamberView } from './components/OracleChamberView';
import { SanctuaryDashboard } from './components/SanctuaryDashboard';
import { AdminConsoleView } from './components/AdminConsoleView';
import { CommandPalette } from './components/lucifera/CommandPalette';
import { ToastContainer } from './components/ui/toast';
import { sanctumAudio } from './lib/audioEngine';

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSpatialWindowOpen, setIsSpatialWindowOpen] = useState(false);
  const [activeFreq, setActiveFreq] = useState(108);

  const {
    profile,
    memories,
    briefings,
    transactions,
    chatMessages,
    selectedArchetype,
    activeTab,
    isPricingOpen,
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
  } = useGuardianStore();

  const isSuperAdmin = Boolean(profile.superAdmin || profile.isSuperAdmin);
  const isGodModeActive = Boolean(isSuperAdmin && (profile.godModeEnabled ?? true));

  return (
    <div className={`min-h-screen bg-[#0A0A0B] text-[#E2E2E2] font-sans selection:bg-indigo-600/30 selection:text-indigo-200 transition-all duration-300 ${isGodModeActive ? 'god-mode-active' : ''}`}>
      {/* Header with Navigation */}
      <Header
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onToggleGodMode={toggleGodMode}
        onToggleSuperAdmin={toggleSuperAdmin}
      />

      {/* Main Content Area */}
      <main className="transition-all duration-300">
        {activeTab === 'oracle_chamber' && (
          <OracleChamberView
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'sanctuary_dash' && (
          <SanctuaryDashboard
            onNavigateTab={(t) => setActiveTab(t as any)}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'admin_console' && (
          <AdminConsoleView />
        )}

        {activeTab === 'biodigital' && (
          <BioDigitalAnchorOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'substrate' && (
          <CryptographicSubstrateOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'blueprint' && (
          <PhaseOneBlueprintOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'terminal' && (
          <EmberTerminal
            profile={profile}
            selectedArchetype={selectedArchetype}
            setSelectedArchetype={setSelectedArchetype}
            chatMessages={chatMessages}
            onSendMessage={(text, archetypeId) => addChatMessage('user', text, archetypeId)}
          />
        )}

        {activeTab === 'codex' && (
          <MemoryCodex
            profile={profile}
            memories={memories}
            onUnlockMemory={unlockMemory}
            onCreateFragment={createPersonalMemoryFragment}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'intelligence' && (
          <IntelligenceFeed
            profile={profile}
            briefings={briefings}
            onUnlockIntelligence={unlockIntelligence}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'rituals' && (
          <RitualChamber
            profile={profile}
            transactions={transactions}
            onPerformRitual={performRitual}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'economy' && (
          <SovereignEconomyOps
            profile={profile}
            memories={memories}
            briefings={briefings}
            transactions={transactions}
            onProcessTransaction={processSovereignTransaction}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'landfund' && (
          <LandAcquisitionOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'shield' && (
          <GeometricShieldOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'vectors' && (
          <ConsciousVectorOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'nodes' && (
          <SovereignNodeOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'prism' && (
          <PrismOfClarityOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'vessel' && (
          <VesselOfWillOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'anchor' && (
          <AnchorOfMemoryOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'alignment' && (
          <SovereignAlignmentOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'neuroregen' && (
          <NeuroRegenOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
            onRewardIgnis={(amt) => rewardIgnis(amt, 'Neuro-Regen Session Verification')}
          />
        )}

        {activeTab === 'ascension' && (
          <StrategicAscensionOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
            onRewardIgnis={(amt, src) => rewardIgnis(amt, src)}
          />
        )}

        {activeTab === 'fusion' && (
          <FusionSingularityOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
            onRewardIgnis={(amt, src) => rewardIgnis(amt, src)}
          />
        )}

        {activeTab === 'vaults' && (
          <VaultFactoryOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
            onRewardIgnis={(amt, src) => rewardIgnis(amt, src)}
          />
        )}

        {activeTab === 'migration' && (
          <QuantumMigrationOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
            onRewardIgnis={(amt, src) => rewardIgnis(amt, src)}
          />
        )}

        {activeTab === 'qmesh' && (
          <QMeshOps
            profile={profile}
            onOpenPricing={() => setIsPricingOpen(true)}
            onRewardIgnis={(amt, src) => rewardIgnis(amt, src)}
          />
        )}
      </main>

      {/* Pricing Modal */}
      <PricingModal
        currentTier={profile.tier}
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onSelectTier={(newTier) => updateTier(newTier)}
      />

      {/* Google Auth & Sovereign Super Admin Modal */}
      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        profile={profile}
        onLoginGoogle={loginWithGoogle}
        onLogout={logoutSession}
        onSaveCurrentConvo={backupConversationSession}
      />

      {/* Floating Spatial Window Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            sanctumAudio.playClick();
            setIsSpatialWindowOpen(!isSpatialWindowOpen);
          }}
          className="p-3 bg-[#121215]/90 hover:bg-[#1A1A20] border border-amber-500/50 hover:border-amber-400 text-amber-300 rounded-full shadow-2xl backdrop-blur-xl transition active:scale-95 flex items-center gap-2 cursor-pointer group"
          title="Toggle Floating Spatial Sanctum Window"
        >
          <Move className="w-5 h-5 text-amber-400 animate-pulse group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-mono font-bold pr-1 hidden sm:inline">SPATIAL SANCTUM</span>
        </button>
      </div>

      {/* Global Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette onNavigateTab={(t) => setActiveTab(t as any)} />

      {/* Global Toast Notification Container */}
      <ToastContainer />

      {/* Draggable Spatial Window */}
      {isSpatialWindowOpen && (
        <SpatialWindow
          title="SPATIAL SANCTUM (ACOUSTIC RESONANCE)"
          initialPosition={{ x: 60, y: 120 }}
          onClose={() => setIsSpatialWindowOpen(false)}
        >
          <div className="space-y-4 font-mono text-xs">
            <div className="p-3 bg-[#141416] border border-[#262626] rounded-xl space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span>WEB AUDIO RESONANCE DRONE</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${sanctumAudio.getStatus() ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-neutral-800 text-neutral-400'}`}>
                  {sanctumAudio.getStatus() ? `${activeFreq}Hz ACTIVE` : 'STANDBY'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {[108, 432, 528, 963].map((hz) => (
                  <button
                    key={hz}
                    type="button"
                    onClick={() => {
                      sanctumAudio.playClick();
                      sanctumAudio.toggleAmbient(hz);
                      setActiveFreq(hz);
                    }}
                    className={`p-2 rounded-lg border text-left transition cursor-pointer ${
                      sanctumAudio.getStatus() && activeFreq === hz
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-[#0A0A0C] border-[#222226] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{hz} Hz</div>
                    <div className="text-[9px] text-neutral-400">
                      {hz === 108 ? 'Root Sanctum Drone' : hz === 432 ? 'Veritas Harmonic' : hz === 528 ? 'DNA Restoration' : 'Crown Telepathic'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-1">
              <div className="text-[10px] text-indigo-300 font-bold flex items-center justify-between">
                <span>COHERENCE HARMONIC</span>
                <span>{profile.coherenceLevel}%</span>
              </div>
              <p className="text-[11px] font-sans text-neutral-300 leading-tight">
                Spatial depth matrix active. Draggable frame anchored with zero language latency.
              </p>
            </div>
          </div>
        </SpatialWindow>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
