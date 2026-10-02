import React, { useState } from 'react';
import { useEmberSynapse, SynapseNode } from '../lib/emberSynapse';
import { Cpu, Zap, Radio, Plus, Trash2, Sparkles, Filter, Database, Tag } from 'lucide-react';
import { sanctumAudio } from '../lib/audioEngine';

export const EmberSynapseHUD: React.FC = () => {
  const { nodes, addNode, updateResonance, purgeMemory } = useEmberSynapse();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isAddingNode, setIsAddingNode] = useState<boolean>(false);
  const [newLabel, setNewLabel] = useState<string>('');
  const [newCategory, setNewCategory] = useState<SynapseNode['category']>('architecture');
  const [newMetadataKey, setNewMetadataKey] = useState<string>('status');
  const [newMetadataValue, setNewMetadataValue] = useState<string>('active');

  const filteredNodes = filterCategory === 'all' 
    ? nodes 
    : nodes.filter(n => n.category === filterCategory);

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    sanctumAudio.playClick();
    addNode({
      category: newCategory,
      label: newLabel.trim(),
      resonanceScore: 85,
      metadata: { [newMetadataKey || 'info']: newMetadataValue || 'enabled' },
    });

    setNewLabel('');
    setIsAddingNode(false);
  };

  const averageResonance = nodes.length > 0
    ? Math.round(nodes.reduce((acc, n) => acc + n.resonanceScore, 0) / nodes.length)
    : 0;

  return (
    <div className="bg-[#0F0F11]/95 border border-amber-500/30 rounded-2xl p-5 backdrop-blur-xl shadow-2xl text-neutral-200 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-[#262626]">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Cpu className="w-6 h-6 text-amber-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
          </div>
          <div>
            <h3 className="text-sm font-mono font-bold tracking-widest text-amber-300 uppercase flex items-center gap-2">
              <span>EMBER UR SYNAPTIC RANGE ENGINE</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono">
                LOCAL-FIRST
              </span>
            </h3>
            <p className="text-xs text-neutral-400">Autonomous memory nodes & architectural resonance graph</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-mono text-amber-400">
            <Radio className="w-3.5 h-3.5" />
            <span>SYNAPSES: {nodes.length}</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs font-mono text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AVG RESONANCE: {averageResonance}%</span>
          </div>
        </div>
      </div>

      {/* Action Bar & Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          <Filter className="w-3.5 h-3.5 text-neutral-500 mr-1 shrink-0" />
          {['all', 'architecture', 'lore', 'cipher', 'telemetry'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sanctumAudio.playClick();
                setFilterCategory(cat);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer capitalize whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold'
                  : 'bg-[#141416] border border-[#262626] text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sanctumAudio.playClick();
              setIsAddingNode(!isAddingNode);
            }}
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono rounded-xl transition flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>INDEX NEW SYNAPSE</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sanctumAudio.playClick();
              if (window.confirm('Purge local synaptic memory graph and re-anchor Genesis node?')) {
                purgeMemory();
              }
            }}
            className="p-1.5 bg-neutral-900 hover:bg-rose-500/20 text-neutral-500 hover:text-rose-400 border border-[#262626] hover:border-rose-500/40 rounded-xl transition cursor-pointer"
            title="Purge Synaptic Memory"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Add Node Form */}
      {isAddingNode && (
        <form onSubmit={handleAddNode} className="mb-4 p-3.5 bg-[#141416] border border-amber-500/30 rounded-xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-amber-300 font-bold">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              <span>INDEX SYNAPSE MEMORY NODE</span>
            </span>
            <span className="text-[10px] text-neutral-500">LOCAL PERSISTENCE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">LABEL / DESCRIPTION</label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g., Quantum Neural Lattice Layer"
                className="w-full bg-[#0A0A0C] border border-[#2A2A30] rounded-lg px-2.5 py-1.5 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">CATEGORY</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as SynapseNode['category'])}
                className="w-full bg-[#0A0A0C] border border-[#2A2A30] rounded-lg px-2.5 py-1.5 text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="architecture">Architecture</option>
                <option value="lore">Lore</option>
                <option value="cipher">Cipher</option>
                <option value="telemetry">Telemetry</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">METADATA KEY</label>
              <input
                type="text"
                value={newMetadataKey}
                onChange={(e) => setNewMetadataKey(e.target.value)}
                className="w-full bg-[#0A0A0C] border border-[#2A2A30] rounded-lg px-2 py-1 text-neutral-300"
              />
            </div>
            <div>
              <label className="text-[10px] text-neutral-400 block mb-1">METADATA VALUE</label>
              <input
                type="text"
                value={newMetadataValue}
                onChange={(e) => setNewMetadataValue(e.target.value)}
                className="w-full bg-[#0A0A0C] border border-[#2A2A30] rounded-lg px-2 py-1 text-neutral-300"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAddingNode(false)}
              className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg text-xs"
            >
              Commit Node
            </button>
          </div>
        </form>
      )}

      {/* Node Stream List */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-none">
        {filteredNodes.length === 0 ? (
          <div className="p-8 text-center text-neutral-500 font-mono text-xs border border-dashed border-[#262626] rounded-xl">
            No synaptic nodes found for category "{filterCategory}".
          </div>
        ) : (
          filteredNodes.map((node) => (
            <div
              key={node.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#141416]/80 border border-[#262626] rounded-xl hover:border-amber-500/40 transition-all group gap-2"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                    node.category === 'architecture' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                    node.category === 'cipher' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    node.category === 'telemetry' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {node.category}
                  </span>
                  <span className="font-mono text-xs font-semibold text-neutral-200 group-hover:text-amber-300 transition-colors truncate">
                    {node.label}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5 flex-wrap">
                  <Tag className="w-3 h-3 text-neutral-500" />
                  <span>{JSON.stringify(node.metadata)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 border-[#222226] pt-2 sm:pt-0 shrink-0">
                <div className="text-right font-mono">
                  <div className="text-xs text-amber-400 font-bold">{node.resonanceScore}%</div>
                  <div className="text-[9px] text-neutral-500 uppercase tracking-wider">Resonance</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sanctumAudio.playClick();
                    updateResonance(node.id, 5);
                  }}
                  className="p-1.5 bg-[#1F1F24] hover:bg-amber-500/20 hover:border-amber-500/50 border border-[#333339] rounded-lg text-neutral-300 hover:text-amber-300 transition cursor-pointer flex items-center gap-1 text-[10px] font-mono"
                  title="Boost Synaptic Resonance (+5%)"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>BOOST</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
