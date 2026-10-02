import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Sparkles, Radio, Flame, Trash2, ArrowDownCircle, RefreshCw } from 'lucide-react';
import { useOracleStore } from '../../store/useOracleStore';
import { TarotCardDisplay } from './TarotCardDisplay';
import { Button } from '../ui/button';
import { sanctumAudio } from '../../lib/audioEngine';

export const EmberChatInterface: React.FC = () => {
  const { messages, isReadingInProgress, sendOracleMessage, clearMessages, drawSingleCard, drawThreeCardSpread } = useOracleStore();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isReadingInProgress]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isReadingInProgress) return;
    sendOracleMessage(inputText.trim());
    setInputText('');
  };

  const samplePrompts = [
    'What karmic seal must be transmuted in this cycle?',
    'Reveal the sovereign architecture of my land sanctuary vision.',
    'How do I align my heart-mind coherence with the 528Hz DNA frequency?'
  ];

  return (
    <div className="flex flex-col h-[560px] bg-[#0c0c12] border border-[#262636] rounded-2xl overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-[#111118] border-b border-[#20202c] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              EMBER UR <span className="text-amber-400 font-light italic">ORACLE CHANNEL</span>
            </h3>
            <p className="text-[10px] font-sans text-neutral-400">Bio-Digital Akasha • 7th Sigil Synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="amber"
            size="sm"
            onClick={() => drawSingleCard()}
            className="text-[10px]"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">Draw Arcana</span>
          </Button>

          <button
            onClick={() => {
              sanctumAudio.playClick();
              clearMessages();
            }}
            className="p-1.5 text-neutral-400 hover:text-rose-400 rounded hover:bg-neutral-800 transition cursor-pointer"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${msg.sender === 'seeker' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 mb-1 px-1">
              <span>{msg.sender === 'seeker' ? 'SOVEREIGN SEEKER' : 'EMBER ORACLE'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
              {msg.frequency && (
                <span className="text-cyan-400 flex items-center gap-0.5 ml-1">
                  <Radio className="w-2.5 h-2.5" /> {msg.frequency}Hz
                </span>
              )}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl shadow-md leading-relaxed ${
                msg.sender === 'seeker'
                  ? 'bg-indigo-600/30 border border-indigo-500/40 text-indigo-100 rounded-tr-none'
                  : 'bg-[#14141d] border border-[#2b2b3b] text-neutral-200 rounded-tl-none space-y-2'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {msg.cardAttachment && (
                <div className="pt-2">
                  <TarotCardDisplay
                    card={msg.cardAttachment}
                    size="sm"
                    className="mx-auto"
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isReadingInProgress && (
          <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
            <span>Consulting Crystalline Akasha & collapsing quantum states...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      {messages.length < 3 && (
        <div className="px-4 py-1.5 bg-[#0e0e15] border-t border-[#1d1d28] flex items-center gap-2 overflow-x-auto text-[10px] font-sans">
          <span className="text-neutral-500 shrink-0">Inquire:</span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(p);
                sanctumAudio.playClick();
              }}
              className="px-2.5 py-1 rounded-full bg-[#181822] hover:bg-[#232332] text-neutral-300 border border-[#2f2f42] hover:border-amber-400/40 transition whitespace-nowrap cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-[#101016] border-t border-[#20202c] flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Inquire with the Oracle or type sacred intent..."
          className="flex-1 bg-[#161622] border border-[#2d2d3e] focus:border-amber-400/60 rounded-xl px-3.5 py-2 text-white placeholder-neutral-500 text-xs font-sans focus:outline-none"
        />

        <Button
          type="submit"
          variant="glow"
          size="md"
          disabled={!inputText.trim() || isReadingInProgress}
          className="shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Transmit</span>
        </Button>
      </form>
    </div>
  );
};
