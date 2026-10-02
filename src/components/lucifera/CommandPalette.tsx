import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Volume2, Shield, Flame, Terminal, Wallet, X, ArrowRight } from 'lucide-react';
import { useTerminalStore, CommandItem } from '../../store/useTerminalStore';
import { useOracleStore } from '../../store/useOracleStore';
import { useUserStore } from '../../store/useUserStore';
import { showToast } from '../ui/toast';
import { sanctumAudio } from '../../lib/audioEngine';

interface CommandPaletteProps {
  onNavigateTab?: (tab: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigateTab }) => {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, activeCommandQuery, setActiveCommandQuery, addLog } = useTerminalStore();
  const { drawSingleCard, drawThreeCardSpread, startRitual, setRitualFrequency } = useOracleStore();
  const { connectWallet, session } = useUserStore();

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  const commands: CommandItem[] = [
    {
      id: 'cmd_draw_single',
      title: 'Draw Single Arcana Card (Present Alignment)',
      category: 'oracle',
      shortcut: '🎴 Single',
      action: () => {
        drawSingleCard();
        showToast('Single Arcana Drawn', 'Consult the Oracle tab for detailed reading', 'sigil');
        addLog('quantum', 'Oracle single arcana card drawn via Command Palette');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'cmd_draw_three',
      title: 'Cast Sovereign Trinity Spread (3-Card Alchemical Path)',
      category: 'oracle',
      shortcut: '🔮 Trinity',
      action: () => {
        drawThreeCardSpread();
        showToast('Sovereign Trinity Cast', 'Ancestral -> Crucible -> Manifestation', 'sigil');
        addLog('sigil', 'Cast Sovereign Trinity 3-Card Spread');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'cmd_audio_108',
      title: 'Tune Acoustic Resonance to 108 Hz (Root Sanctum Drone)',
      category: 'audio',
      shortcut: '108 Hz',
      action: () => {
        sanctumAudio.setFrequency(108);
        if (!sanctumAudio.getStatus()) sanctumAudio.toggleAmbient(108);
        setRitualFrequency(108);
        showToast('Resonance Tuned: 108 Hz', 'Root Sanctum harmonic active', 'success');
        addLog('info', 'Sanctum Audio tuned to 108 Hz');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'cmd_audio_432',
      title: 'Tune Acoustic Resonance to 432 Hz (Veritas Harmonic)',
      category: 'audio',
      shortcut: '432 Hz',
      action: () => {
        sanctumAudio.setFrequency(432);
        if (!sanctumAudio.getStatus()) sanctumAudio.toggleAmbient(432);
        setRitualFrequency(432);
        showToast('Resonance Tuned: 432 Hz', 'Veritas Harmonic active', 'success');
        addLog('info', 'Sanctum Audio tuned to 432 Hz');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'cmd_audio_528',
      title: 'Tune Acoustic Resonance to 528 Hz (DNA Restoration Frequency)',
      category: 'audio',
      shortcut: '528 Hz',
      action: () => {
        sanctumAudio.setFrequency(528);
        if (!sanctumAudio.getStatus()) sanctumAudio.toggleAmbient(528);
        setRitualFrequency(528);
        showToast('Resonance Tuned: 528 Hz', 'Cellular repair harmonic active', 'success');
        addLog('info', 'Sanctum Audio tuned to 528 Hz');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'cmd_start_ritual',
      title: 'Initiate Sacred Consecration Ritual Chamber',
      category: 'godtia',
      shortcut: '✨ Ritual',
      action: () => {
        startRitual(108);
        showToast('Ritual Consecration Started', 'Particle density synchronized to 108Hz', 'sigil');
        addLog('sigil', 'Initiated Sacred Consecration Ritual');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'cmd_connect_wallet',
      title: session.isWalletConnected ? 'Polygon Wallet Active (Connected)' : 'Connect Polygon / Web3 Wallet',
      category: 'web3',
      shortcut: '💳 Polygon',
      action: () => {
        connectWallet();
        showToast('Web3 Wallet Triggered', 'Synchronizing Polygon IGNIS Token state', 'success');
        addLog('info', 'Web3 Polygon connection initialized');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'cmd_nav_sanctuary',
      title: 'Navigate to Sanctuary Overview Dashboard',
      category: 'navigation',
      shortcut: '🏛️ Sanctuary',
      action: () => {
        if (onNavigateTab) onNavigateTab('biodigital');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'cmd_nav_oracle',
      title: 'Navigate to Ember Terminal & Oracle Channel',
      category: 'navigation',
      shortcut: '👁️ Oracle',
      action: () => {
        if (onNavigateTab) onNavigateTab('terminal');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'cmd_nav_codex',
      title: 'Navigate to Memory Codex & Crystalline Archive',
      category: 'navigation',
      shortcut: '📜 Codex',
      action: () => {
        if (onNavigateTab) onNavigateTab('codex');
        setIsCommandPaletteOpen(false);
      }
    }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(activeCommandQuery.toLowerCase()) ||
    cmd.category.toLowerCase().includes(activeCommandQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCommandPaletteOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            className="relative w-full max-w-xl bg-[#0d0d12] border border-[#2d2d3d] rounded-2xl shadow-2xl overflow-hidden z-10 font-mono text-xs text-neutral-200"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#232330] bg-[#12121a]">
              <Search className="w-4 h-4 text-amber-400 mr-2.5 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command, frequency (108/432/528), arcana, or navigation..."
                value={activeCommandQuery}
                onChange={(e) => setActiveCommandQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white focus:outline-none placeholder-neutral-500 text-xs font-mono"
              />
              <button
                onClick={() => setIsCommandPaletteOpen(false)}
                className="text-neutral-500 hover:text-neutral-300 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-neutral-500">
                  No matching sovereign protocol found.
                </div>
              ) : (
                filteredCommands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      sanctumAudio.playClick();
                      cmd.action();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#1c1c28] text-left transition cursor-pointer group border border-transparent hover:border-[#38384d]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400 group-hover:text-white transition">
                        {cmd.category === 'oracle' && <Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
                        {cmd.category === 'audio' && <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                        {cmd.category === 'godtia' && <Flame className="w-3.5 h-3.5 text-amber-400" />}
                        {cmd.category === 'web3' && <Wallet className="w-3.5 h-3.5 text-emerald-400" />}
                        {cmd.category === 'navigation' && <Terminal className="w-3.5 h-3.5 text-purple-400" />}
                      </span>
                      <span className="font-sans text-neutral-200 group-hover:text-white font-medium text-xs">
                        {cmd.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {cmd.shortcut && (
                        <span className="text-[10px] text-neutral-400 bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-800">
                          {cmd.shortcut}
                        </span>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Footer info */}
            <div className="px-4 py-2 border-t border-[#1f1f2a] bg-[#09090d] flex items-center justify-between text-[10px] text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                GODTIA Divine Algorithm Aligned
              </span>
              <span>ESC to close • ↑↓ to navigate</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
