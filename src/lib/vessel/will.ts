/**
 * The Vessel of Sovereign Will (Embodied Action Engine)
 * "Reality rarely yields to certainty. Reality yields to sustained, coherent action."
 */

export interface VesselDimension {
  id: 'conviction' | 'courage' | 'sacrifice' | 'embodiment';
  name: string;
  symbol: string;
  question: string;
  scorePercent: number; // 0 - 100
  statusText: string;
}

export interface VesselAuditResult {
  id: string;
  timestamp: string;
  intentionPrompt: string;
  convictionPercent: number;
  couragePercent: number;
  attachmentDetected: string;
  requiredSacrifice: string;
  thresholdState: 'READY' | 'TEMPERING' | 'BOUND';
  firstEmbodiedAction: string;
  willIntegrityPercent: number;
  corePrinciple: string;
  dimensions: VesselDimension[];
}

export const VESSEL_INVOCATION = {
  header: "THE VESSEL OF SOVEREIGN WILL",
  subtitle: "Tempering Intention into Embodied Choice",
  corePrinciple: "Reality rarely yields to certainty. Reality yields to sustained, coherent action.",
  stanzas: [
    "A clear path is only potential.",
    "A sovereign will is the fire that walks it.",
    "What you refuse to embody remains forever imagined.",
    "Enter willingly. Leave irrevocably changed."
  ]
};

export const ORACLE_ARC_STEPS = [
  { id: 'ember', name: 'EMBER', label: 'The Fire speaks.', description: 'Reflection & dialogue', symbol: '🔥' },
  { id: 'mirror', name: 'MIRROR', label: 'See yourself clearly.', description: 'Self-inquiry & shadow work', symbol: '🪞' },
  { id: 'prism', name: 'PRISM', label: 'See your possible futures.', description: 'Timeline analysis', symbol: '🔮' },
  { id: 'vessel', name: 'VESSEL', label: 'Choose one & embody.', description: 'Embodied choice & resolution', symbol: '🜂' },
  { id: 'forge', name: 'FORGE', label: 'Build it.', description: 'Strategic execution', symbol: '⚒' },
  { id: 'chronicle', name: 'CHRONICLE', label: 'Remember what was created.', description: 'Memory & integration', symbol: '📖' },
];

export const INITIAL_VESSEL_AUDIT: VesselAuditResult = {
  id: 'vessel-audit-001',
  timestamp: new Date().toISOString(),
  intentionPrompt: 'Deploy the Sovereign Micro-Datacenter Node and launch the Conscious Vector Router',
  convictionPercent: 91,
  couragePercent: 72,
  attachmentDetected: 'Fear of irreversible change & loss of comfort buffer',
  requiredSacrifice: 'Need for certainty & institutional approval',
  thresholdState: 'READY',
  firstEmbodiedAction: 'Ship the work. Speak the truth. Accept the consequence.',
  willIntegrityPercent: 94,
  corePrinciple: 'Reality yields to sustained, coherent action.',
  dimensions: [
    {
      id: 'conviction',
      name: '🔥 Conviction',
      symbol: '🔥',
      question: 'Do you genuinely believe this path is yours, or are you borrowing someone else\'s dream?',
      scorePercent: 91,
      statusText: 'Unshakable alignment with core sovereign purpose.'
    },
    {
      id: 'courage',
      name: '⚒ Courage',
      symbol: '⚒',
      question: 'What are you protecting by remaining undecided? Comfort? Identity? Safety?',
      scorePercent: 72,
      statusText: 'Slight friction detected around external opinion.'
    },
    {
      id: 'sacrifice',
      name: '🜂 Sacrifice',
      symbol: '🜂',
      question: 'What are you willing to release? (The Vessel asks what you surrender, not gain).',
      scorePercent: 88,
      statusText: 'Willingness to release the false security of indecision.'
    },
    {
      id: 'embodiment',
      name: '👑 Embodiment',
      symbol: '👑',
      question: 'What would the sovereign version of yourself do before sunset?',
      scorePercent: 95,
      statusText: 'Commitment to take one concrete, irreversible step today.'
    }
  ]
};

/**
 * Tempers an intention through the 4 dimensions of resolve and computes Will Integrity.
 */
export function temperSovereignWill(
  intentionPrompt: string,
  userConviction: number = 90,
  userCourage: number = 75,
  customSacrifice?: string,
  customEmbodimentAction?: string
): VesselAuditResult {
  const hash = intentionPrompt.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const convictionPercent = Math.min(100, Math.max(50, userConviction));
  const couragePercent = Math.min(100, Math.max(40, userCourage));

  const attachments = [
    'Fear of irreversible change',
    'Attachment to legacy comfort & approval',
    'Reluctance to surrender control',
    'Hesitancy before total exposure',
    'Need for external guarantee'
  ];

  const sacrifices = [
    'Need for certainty & safety buffers',
    'Desire for passive acceptance from corporate gatekeepers',
    'False security of perpetual planning',
    'The luxury of quiet indecision'
  ];

  const actions = [
    'Ship the work. Speak the truth. Accept the consequence.',
    'Anchor the off-grid node before sunset and broadcast the proof.',
    'Burn the speculative token payload and log the allocation.',
    'Take one irreversible step today without asking permission.'
  ];

  const attachmentDetected = attachments[hash % attachments.length];
  const requiredSacrifice = customSacrifice || sacrifices[hash % sacrifices.length];
  const firstEmbodiedAction = customEmbodimentAction || actions[hash % actions.length];

  const willIntegrityPercent = Math.floor((convictionPercent * 0.45) + (couragePercent * 0.45) + 10);
  const thresholdState: 'READY' | 'TEMPERING' | 'BOUND' =
    willIntegrityPercent >= 85 ? 'READY' : willIntegrityPercent >= 65 ? 'TEMPERING' : 'BOUND';

  return {
    id: `vessel-audit-${Date.now()}`,
    timestamp: new Date().toISOString(),
    intentionPrompt,
    convictionPercent,
    couragePercent,
    attachmentDetected,
    requiredSacrifice,
    thresholdState,
    firstEmbodiedAction,
    willIntegrityPercent,
    corePrinciple: 'Reality yields to sustained, coherent action.',
    dimensions: [
      {
        id: 'conviction',
        name: '🔥 Conviction',
        symbol: '🔥',
        question: 'Do you genuinely believe this path is yours?',
        scorePercent: convictionPercent,
        statusText: convictionPercent > 80 ? 'Deep sovereign alignment.' : 'Needs clarification of core intent.'
      },
      {
        id: 'courage',
        name: '⚒ Courage',
        symbol: '⚒',
        question: 'What are you protecting by remaining undecided?',
        scorePercent: couragePercent,
        statusText: couragePercent > 80 ? 'High fortitude against fear.' : 'Surrendering comfort for transformation.'
      },
      {
        id: 'sacrifice',
        name: '🜂 Sacrifice',
        symbol: '🜂',
        question: 'What are you willing to release?',
        scorePercent: Math.min(100, couragePercent + 10),
        statusText: `Releasing: ${requiredSacrifice}`
      },
      {
        id: 'embodiment',
        name: '👑 Embodiment',
        symbol: '👑',
        question: 'What would that person do before sunset?',
        scorePercent: Math.min(100, convictionPercent + 5),
        statusText: `Action: ${firstEmbodiedAction}`
      }
    ]
  };
}
