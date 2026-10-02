/**
 * The Anchor of Memory (Descent & Recovered Truths Engine)
 * "The future is not built by abandoning your past. It is built by carrying forward the strongest truths you have already earned."
 */

export interface AnchorCurrent {
  id: 'origin' | 'endurance' | 'thread' | 'living_ember';
  name: string;
  symbol: string;
  question: string;
  recoveredInsight: string;
  depthFathoms: number;
}

export interface AnchorAuditResult {
  id: string;
  timestamp: string;
  seekerQuery: string;
  primaryMemoryCurrent: string;
  forgottenStrength: string;
  recurringThread: string;
  coreTruth: string;
  memoryResonancePercent: number;
  recoveredGift: string;
  carryForwardAction: string;
  currents: AnchorCurrent[];
  corePrinciple: string;
}

export const ANCHOR_INVOCATION = {
  header: "THE ANCHOR OF MEMORY",
  subtitle: "Descent into Lived Experience & Recovered Truths",
  corePrinciple: "The future is not built by abandoning your past. It is built by carrying forward the strongest truths you have already earned.",
  stanzas: [
    "Not everything forgotten is lost.",
    "Some truths wait beneath the waves.",
    "Memory is not a prison. It is an anchor.",
    "Lower it with intention. Raise it with wisdom."
  ]
};

export const COMPLETE_ORACLE_ARC = [
  { id: 'ember', name: 'EMBER', symbol: '🔥', text: 'The Fire awakens.', desc: 'Reflection & dialogue' },
  { id: 'mirror', name: 'MIRROR', symbol: '🪞', text: 'See yourself honestly.', desc: 'Self-inquiry & shadow work' },
  { id: 'prism', name: 'PRISM', symbol: '🔮', text: 'See the paths before you.', desc: 'Timeline refraction' },
  { id: 'vessel', name: 'VESSEL', symbol: '🜂', text: 'Choose with resolve.', desc: 'Embodied choice' },
  { id: 'anchor', name: 'ANCHOR', symbol: '⚓', text: 'Remember what lives within.', desc: 'Recovered truths' },
  { id: 'forge', name: 'FORGE', symbol: '⚒', text: 'Shape it into reality.', desc: 'Strategic execution' },
  { id: 'chronicle', name: 'CHRONICLE', symbol: '📖', text: 'Leave a memory for others.', desc: 'Memory & integration' },
];

export const INITIAL_ANCHOR_AUDIT: AnchorAuditResult = {
  id: 'anchor-audit-001',
  timestamp: new Date().toISOString(),
  seekerQuery: 'Recalling early technical sparks & sovereign builder roots',
  primaryMemoryCurrent: 'Sovereign Builder',
  forgottenStrength: 'Quiet persistence through uncertainty',
  recurringThread: 'You continue creating even after disappointment.',
  coreTruth: 'Meaning grows through consistent acts, not perfect moments.',
  memoryResonancePercent: 96,
  recoveredGift: 'Patience & Deep Craftsmanship',
  carryForwardAction: 'Build again.',
  corePrinciple: 'The future is not built by abandoning your past. It is built by carrying forward the strongest truths you have already earned.',
  currents: [
    {
      id: 'origin',
      name: '🌊 Origin',
      symbol: '🌊',
      question: 'What first awakened this calling? Not the latest ambition, but the earliest spark when something inside quietly answered: "This matters."',
      recoveredInsight: 'The quiet joy of crafting tools that grant autonomy to others.',
      depthFathoms: 120
    },
    {
      id: 'endurance',
      name: '⚓ Endurance',
      symbol: '⚓',
      question: 'What have you already survived? Which past storms revealed strength you no longer give yourself credit for?',
      recoveredInsight: 'Surviving major system shifts, loss of initial support, and solitary late-night debugging.',
      depthFathoms: 240
    },
    {
      id: 'thread',
      name: '🧵 Thread',
      symbol: '🧵',
      question: 'Across every season of your life... what has remained constant despite changing circumstances?',
      recoveredInsight: 'Unwavering drive to construct order out of chaotic data and empower edge nodes.',
      depthFathoms: 380
    },
    {
      id: 'living_ember',
      name: '🔥 Living Ember',
      symbol: '🔥',
      question: 'What truth have you always known but occasionally forgotten beneath distraction, exhaustion, or doubt?',
      recoveredInsight: 'True sovereignty is built in silence long before it is recognized in public.',
      depthFathoms: 500
    }
  ]
};

/**
 * Lowers the Anchor of Memory through the four deep currents of lived experience.
 */
export function lowerAnchorOfMemory(seekerInput: string): AnchorAuditResult {
  const hash = seekerInput.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const memoryResonancePercent = Math.min(99, Math.max(85, 90 + (hash % 10)));

  const currentsList = ['Sovereign Builder', 'Guardian Alchemist', 'Silent Strategist', 'Resilient Architect', 'Pioneer Weaver'];
  const strengthsList = [
    'Quiet persistence through uncertainty',
    'Unshakable conviction under pressure',
    'Intuitive discernment of noise versus signal',
    'Graceful recovery from systemic setbacks',
    'Deep patience during long cycles of incubation'
  ];

  const threadsList = [
    'You continue creating even after disappointment.',
    'You build sanctuaries for truth wherever you stand.',
    'You refuse to surrender integrity for short-term ease.',
    'You align with freedom and empower those who seek light.'
  ];

  const truthsList = [
    'Meaning grows through consistent acts, not perfect moments.',
    'What is built with devotion outlasts the noise of the season.',
    'Your strength was never given by circumstances; it was revealed by them.',
    'You are already equipped with the wisdom required for this step.'
  ];

  const giftsList = ['Patience', 'Quiet Fortitude', 'Unbound Vision', 'Radical Clarity', 'Steadfast Loyalty'];
  const actionsList = ['Build again.', 'Anchor the flame.', 'Walk the unchained path.', 'Trust the foundation.'];

  const primaryMemoryCurrent = currentsList[hash % currentsList.length];
  const forgottenStrength = strengthsList[hash % strengthsList.length];
  const recurringThread = threadsList[hash % threadsList.length];
  const coreTruth = truthsList[hash % truthsList.length];
  const recoveredGift = giftsList[hash % giftsList.length];
  const carryForwardAction = actionsList[hash % actionsList.length];

  return {
    id: `anchor-audit-${Date.now()}`,
    timestamp: new Date().toISOString(),
    seekerQuery: seekerInput,
    primaryMemoryCurrent,
    forgottenStrength,
    recurringThread,
    coreTruth,
    memoryResonancePercent,
    recoveredGift,
    carryForwardAction,
    corePrinciple: 'The future is not built by abandoning your past. It is built by carrying forward the strongest truths you have already earned.',
    currents: [
      {
        id: 'origin',
        name: '🌊 Origin',
        symbol: '🌊',
        question: 'What first awakened this calling?',
        recoveredInsight: `First spark anchored around ${primaryMemoryCurrent.toLowerCase()} frequency.`,
        depthFathoms: 100 + (hash % 50)
      },
      {
        id: 'endurance',
        name: '⚓ Endurance',
        symbol: '⚓',
        question: 'What have you already survived?',
        recoveredInsight: `Proven resilience: ${forgottenStrength}.`,
        depthFathoms: 200 + (hash % 80)
      },
      {
        id: 'thread',
        name: '🧵 Thread',
        symbol: '🧵',
        question: 'Across every season, what remained constant?',
        recoveredInsight: recurringThread,
        depthFathoms: 350 + (hash % 100)
      },
      {
        id: 'living_ember',
        name: '🔥 Living Ember',
        symbol: '🔥',
        question: 'What truth have you always known beneath the noise?',
        recoveredInsight: coreTruth,
        depthFathoms: 500 + (hash % 120)
      }
    ]
  };
}
