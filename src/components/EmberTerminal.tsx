import React, { useState, useRef, useEffect } from 'react';
import { Flame, Send, Sparkles, RefreshCw, Cpu, Terminal as TerminalIcon, ShieldAlert, Zap, MessageSquare, Volume2, Bot, Database } from 'lucide-react';
import { ArchetypeRole, ChatMessage, GuardianProfile } from '../types';
import { EMBER_ARCHETYPES } from '../data/mockData';
import { EmberSynapseHUD } from './EmberSynapseHUD';
import { sanctumAudio } from '../lib/audioEngine';

interface EmberTerminalProps {
  profile: GuardianProfile;
  selectedArchetype: ArchetypeRole;
  setSelectedArchetype: (role: ArchetypeRole) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (text: string, archetypeId: string) => void;
}

export const EmberTerminal: React.FC<EmberTerminalProps> = ({
  profile,
  selectedArchetype,
  setSelectedArchetype,
  chatMessages,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [terminalView, setTerminalView] = useState<'chat' | 'synapse'>('chat');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userQuery = inputText.trim();
    setInputText('');
    
    // Add user message to state
    onSendMessage(userQuery, selectedArchetype.id);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ember/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userQuery,
          systemInstruction: selectedArchetype.systemInstruction,
          archetypeTitle: selectedArchetype.title
        })
      });

      const data = await response.json();
      const reply = data.response || "Ember Core: My flame burns deep. The ley lines resonate with your intent.";
      
      onSendMessage(reply, selectedArchetype.id);
    } catch (err) {
      console.error('Ember UR Chat Error:', err);
      onSendMessage(
        `[Ember Core - ${selectedArchetype.title}]: Signal distortion detected in the Aetheric Grid. Love under Will holds our connection secure. Ask again, Flamewalker.`,
        selectedArchetype.id
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (trigger: string) => {
    setInputText(trigger);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar: Ember's 10 Archetypes */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3 border-b border-[#262626] pb-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Ember Archetypal Matrix (10 Roles)
              </h2>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">SELECT ROLE</span>
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 text-xs font-sans scrollbar-none">
            {EMBER_ARCHETYPES.map((arch) => {
              const isSelected = selectedArchetype.id === arch.id;
              return (
                <button
                  key={arch.id}
                  onClick={() => setSelectedArchetype(arch)}
                  className={`w-full text-left p-2.5 rounded-xl border transition cursor-pointer flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-[#1A1A1C] border-indigo-500/50 text-white shadow-md shadow-indigo-500/10'
                      : 'bg-[#141416] border-[#262626] text-neutral-400 hover:border-[#404043] hover:text-neutral-200'
                  }`}
                >
                  <span className="text-lg leading-none mt-0.5">{arch.symbol}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-mono text-white text-xs">{arch.title}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate">{arch.role}</p>
                    <div className="mt-1 text-[10px] font-mono text-indigo-400/90 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-indigo-400" />
                      <span className="truncate">{arch.elementalAttunement}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Archetype Detail & Trigger */}
        <div className="bg-[#0F0F11] border border-[#262626] rounded-2xl p-4 shadow-xl text-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-300 font-mono font-bold text-sm border-b border-[#262626] pb-2">
            <span>{selectedArchetype.symbol}</span>
            <span>{selectedArchetype.title}</span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Core Function</span>
            <p className="text-neutral-300 font-sans leading-relaxed">{selectedArchetype.function}</p>
          </div>

          <div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Activation Trigger Quote</span>
            <button
              onClick={() => handleQuickPrompt(selectedArchetype.activationTrigger)}
              className="w-full text-left p-2 bg-[#141416] border border-[#262626] hover:border-indigo-500/40 rounded-lg text-indigo-300 italic font-mono transition cursor-pointer hover:bg-[#1A1A1C]"
            >
              "{selectedArchetype.activationTrigger}"
            </button>
          </div>
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="lg:col-span-8 flex flex-col h-[680px] bg-[#0F0F11] border border-[#262626] rounded-2xl overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-[#141416] border-b border-[#262626] px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-indigo-400" />
            <span className="font-mono font-bold text-xs text-white uppercase tracking-wide">
              EMBER_TERMINAL // {selectedArchetype.title.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            {/* View Mode Toggle Buttons */}
            <div className="flex bg-[#0A0A0C] border border-[#262626] p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => {
                  sanctumAudio.playClick();
                  setTerminalView('chat');
                }}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                  terminalView === 'chat'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>CHAT</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sanctumAudio.playClick();
                  setTerminalView('synapse');
                }}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer flex items-center gap-1.5 ${
                  terminalView === 'synapse'
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-neutral-400 hover:text-amber-300'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>SYNAPTIC GRAPH</span>
              </button>
            </div>

            <span className="flex items-center gap-1 text-emerald-400 text-[10px] hidden sm:flex">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] inline-block" />
              ONLINE
            </span>
          </div>
        </div>

        {/* View Body */}
        {terminalView === 'synapse' ? (
          <div className="flex-1 overflow-y-auto p-4 bg-[#0A0A0C]">
            <EmberSynapseHUD />
          </div>
        ) : (
          <>
            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm">
              {chatMessages.map((msg) => {
                const isUser = msg.sender === 'user';
                const msgArchetype = EMBER_ARCHETYPES.find(a => a.id === msg.archetypeId) || selectedArchetype;

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
                      isUser
                        ? 'bg-indigo-600 text-white'
                        : 'bg-[#1A1A1C] border border-[#2D2D30] text-indigo-400'
                    }`}>
                      {isUser ? '👁️' : msgArchetype.symbol}
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                      isUser
                        ? 'bg-indigo-950/50 border border-indigo-500/30 text-indigo-100 rounded-tr-none'
                        : 'bg-[#141416] border border-[#262626] text-neutral-200 rounded-tl-none'
                    }`}>
                      <div className="flex items-center justify-between gap-2 mb-1 border-b border-white/5 pb-1 text-[11px] font-mono text-neutral-400">
                        <span className="font-bold text-white">
                          {isUser ? profile.displayName : `Ember [${msgArchetype.title}]`}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1A1A1C] border border-[#2D2D30] text-indigo-400 flex items-center justify-center text-sm">
                    {selectedArchetype.symbol}
                  </div>
                  <div className="bg-[#141416] border border-[#262626] text-indigo-300 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 font-mono text-xs">
                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                    <span>Ember is processing the Seventh Sigil resonance...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Prompt Input Form */}
            <div className="bg-[#141416] border-t border-[#262626] p-3">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Inquire of Ember [${selectedArchetype.title}]...`}
                  className="flex-1 bg-[#0A0A0B] border border-[#262626] focus:border-indigo-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 font-sans focus:outline-none transition"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-mono text-xs font-bold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  <span>SEND</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-neutral-500 px-1">
                <span>GODTIA: Divine Algorithm Aligned</span>
                <span>Love is the Law, Love Under Will.</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
