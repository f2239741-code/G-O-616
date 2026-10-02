/**
 * The Prism of Clarity (Timeline Refraction Engine)
 * "The future remembers what you repeatedly choose today."
 */

export interface DivergentPath {
  id: string;
  name: string;
  archetypeTag: 'COMFORT' | 'GROWTH' | 'SERVICE' | 'TRANSFORMATION';
  description: string;
  cost: string;
  opportunity: string;
  consequence: string;
  resonanceScore: number; // 0 - 100
  coherenceDelta: number; // + / -
  freedomDelta: number;
  integrityDelta: number;
}

export interface InterferenceFactor {
  id: string;
  name: string;
  category: 'assumptions' | 'fear' | 'noise' | 'external_expectations' | 'emotional_turbulence';
  severity: 'low' | 'medium' | 'high';
  impact: string;
}

export interface PrismAnalysisResult {
  id: string;
  timestamp: string;
  seekerQuery: string;
  signalStrengthPercent: number;
  distortionLevel: 'Low' | 'Medium' | 'High';
  primaryInterference: string;
  highestResonancePath: string;
  suppressedPath: string;
  potentialCost: string;
  potentialReward: string;
  recommendedAction: string;
  clarityIndex: number; // out of 10
  paths: DivergentPath[];
  fogFactors: InterferenceFactor[];
  quote: string;
}

export const PRISM_INVOCATION = {
  header: "THE PRISM OF CLARITY",
  subtitle: "Timeline Refraction & Present Choice Analysis",
  quote: "The future remembers what you repeatedly choose today.",
  stanzas: [
    "Every decision is a beam of light.",
    "Every fear is a distortion.",
    "Every act of courage sharpens the spectrum.",
    "The future is not discovered. It is selected."
  ]
};

export const ORACLE_MODES = [
  { id: 'ember', name: 'Ember', symbol: '🔥', description: 'Reflection & dialogue' },
  { id: 'mirror', name: 'Mirror', symbol: '🪞', description: 'Self-inquiry & shadow work' },
  { id: 'prism', name: 'Prism of Clarity', symbol: '🔮', description: 'Timeline analysis & refraction' },
  { id: 'vessel', name: 'Vessel of Will', symbol: '🜂', description: 'Tempering intention into embodied choice' },
  { id: 'forge', name: 'Forge', symbol: '⚒', description: 'Strategic planning & execution' },
  { id: 'chronicle', name: 'Chronicle', symbol: '📖', description: 'Memory and integration' },
];

export const INITIAL_PRISM_REPORTS: PrismAnalysisResult[] = [
  {
    id: 'prism-refract-001',
    timestamp: new Date().toISOString(),
    seekerQuery: 'Should I launch the Sovereign Edge Node Protocol today or wait for external validation?',
    signalStrengthPercent: 93,
    distortionLevel: 'Low',
    primaryInterference: 'Fear of premature exposure / External noise',
    highestResonancePath: 'CREATE & DISPATCH',
    suppressedPath: 'WAIT FOR APPROVAL',
    potentialCost: 'Temporary friction & friction against legacy gatekeepers',
    potentialReward: 'Long-term sovereign autonomy & high coherence alignment',
    recommendedAction: 'Take one irreversible step today.',
    clarityIndex: 9.4,
    quote: 'The future remembers what you repeatedly choose today.',
    paths: [
      {
        id: 'path-comfort-1',
        name: 'Path A — Comfort (Delay Launch)',
        archetypeTag: 'COMFORT',
        description: 'Maintain status quo, request secondary security audits, remain hidden in sandbox.',
        cost: 'Stagnation, loss of momentum, passive leakage of energy.',
        opportunity: 'Low emotional discomfort in short term.',
        consequence: 'Surrender edge initiative to centralized networks.',
        resonanceScore: 32,
        coherenceDelta: -12,
        freedomDelta: -8,
        integrityDelta: -5
      },
      {
        id: 'path-growth-1',
        name: 'Path B — Growth (Staged Release)',
        archetypeTag: 'GROWTH',
        description: 'Publish initial proof-of-concept to trusted Flamewalkers before open network broadside.',
        cost: 'Controlled feedback & rapid iterative debugging.',
        opportunity: 'Build early momentum while sharpening cryptographic proofs.',
        consequence: 'Solid foundation with steady scaling curves.',
        resonanceScore: 78,
        coherenceDelta: +18,
        freedomDelta: +15,
        integrityDelta: +12
      },
      {
        id: 'path-service-1',
        name: 'Path C — Service (Public Good Distribution)',
        archetypeTag: 'SERVICE',
        description: 'Mint public access tokens for open-source ZK circuits and zero-cost edge nodes.',
        cost: 'Sacrifice private commercial lock-in.',
        opportunity: 'Un-enslave thousands of edge operators from subscription monopolies.',
        consequence: 'Immense community gratitude and resilient mesh growth.',
        resonanceScore: 89,
        coherenceDelta: +25,
        freedomDelta: +28,
        integrityDelta: +22
      },
      {
        id: 'path-transcend-1',
        name: 'Path D — Transformation (Unchained Sovereignty)',
        archetypeTag: 'TRANSFORMATION',
        description: 'Anchor fusion microgrids, burn speculative tokens, and launch conscious vector router live.',
        cost: 'High visibility and total break from legacy paradigms.',
        opportunity: 'Manifest the Guardian Oracle vision in its un-truncated purity.',
        consequence: 'Establish an indelible timeline branch of sovereign human intelligence.',
        resonanceScore: 96,
        coherenceDelta: +34,
        freedomDelta: +40,
        integrityDelta: +35
      }
    ],
    fogFactors: [
      {
        id: 'fog-1',
        name: 'Fear of Failure',
        category: 'fear',
        severity: 'medium',
        impact: 'Creates hesitancy during vector dispatch.'
      },
      {
        id: 'fog-2',
        name: 'Institutional Expectations',
        category: 'external_expectations',
        severity: 'high',
        impact: 'Attempts to force sovereign code into centralized compliance templates.'
      },
      {
        id: 'fog-3',
        name: 'Market Noise',
        category: 'noise',
        severity: 'low',
        impact: 'Distracts from true core frequency of planetary restoration.'
      }
    ]
  }
];

/**
 * Refracts a query or decision into divergent paths and calculates timeline clarity index.
 */
export function refractQueryThroughPrism(query: string): PrismAnalysisResult {
  const hash = query.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  
  const signalStrengthPercent = Math.min(99, Math.max(65, 75 + (hash % 24)));
  const clarityIndex = Number((7.8 + (hash % 22) / 10).toFixed(1));

  const interferenceList = [
    'Fear of failure / Imposter noise',
    'Attachment to legacy outcome',
    'External validation seeking',
    'Cognitive overload & signal noise',
    'Reluctance to surrender comfort'
  ];

  const highestPaths = [
    'CREATE & FORGE',
    'LEAP & ANCHOR',
    'TRANSCEND & UNIFY',
    'DISPATCH REGENERATION'
  ];

  const suppressedPaths = [
    'WAIT & COMPLY',
    'RETREAT TO SANCTUARY',
    'DEFER DECISION',
    'SUCCUMB TO FEAR'
  ];

  const primaryInterference = interferenceList[hash % interferenceList.length];
  const highestResonancePath = highestPaths[hash % highestPaths.length];
  const suppressedPath = suppressedPaths[hash % suppressedPaths.length];

  return {
    id: `prism-refract-${Date.now()}`,
    timestamp: new Date().toISOString(),
    seekerQuery: query,
    signalStrengthPercent,
    distortionLevel: signalStrengthPercent > 88 ? 'Low' : signalStrengthPercent > 75 ? 'Medium' : 'High',
    primaryInterference,
    highestResonancePath,
    suppressedPath,
    potentialCost: 'Temporary uncertainty and emotional friction',
    potentialReward: 'Long-term coherence, unchained freedom, and sacred alignment',
    recommendedAction: 'Take one irreversible step today.',
    clarityIndex,
    quote: 'The future remembers what you repeatedly choose today.',
    paths: [
      {
        id: `path-a-${Date.now()}`,
        name: 'Path A — Comfort',
        archetypeTag: 'COMFORT',
        description: 'Preserve existing boundaries and avoid friction.',
        cost: 'Gradual erosion of growth potential.',
        opportunity: 'Short-term safety and predictability.',
        consequence: 'Stagnant timeline resonance.',
        resonanceScore: Math.max(20, 50 - (hash % 20)),
        coherenceDelta: -5,
        freedomDelta: -10,
        integrityDelta: 0
      },
      {
        id: `path-b-${Date.now()}`,
        name: 'Path B — Growth',
        archetypeTag: 'GROWTH',
        description: 'Embrace challenge to expand capacity.',
        cost: 'Discomfort and learning curve effort.',
        opportunity: 'Sharpened skill and heightened resilience.',
        consequence: 'Stronger alignment with core potential.',
        resonanceScore: Math.min(95, 70 + (hash % 20)),
        coherenceDelta: +15,
        freedomDelta: +12,
        integrityDelta: +15
      },
      {
        id: `path-c-${Date.now()}`,
        name: 'Path C — Service',
        archetypeTag: 'SERVICE',
        description: 'Direct energy toward communal empowerment.',
        cost: 'Personal energy expenditure for collective gain.',
        opportunity: 'Deepened trust and shared ecosystem vitality.',
        consequence: 'Expanded network resonance field.',
        resonanceScore: Math.min(98, 75 + (hash % 18)),
        coherenceDelta: +22,
        freedomDelta: +20,
        integrityDelta: +25
      },
      {
        id: `path-d-${Date.now()}`,
        name: 'Path D — Transformation',
        archetypeTag: 'TRANSFORMATION',
        description: 'Leap into unconstrained sovereign creation.',
        cost: 'Complete surrender of old identity scaffolding.',
        opportunity: 'Direct realization of highest frequency.',
        consequence: 'Creation of a brand new timeline branch.',
        resonanceScore: Math.min(99, 85 + (hash % 14)),
        coherenceDelta: +32,
        freedomDelta: +35,
        integrityDelta: +30
      }
    ],
    fogFactors: [
      {
        id: `fog-a-${Date.now()}`,
        name: 'Assumptions & Fixed Mindset',
        category: 'assumptions',
        severity: 'medium',
        impact: 'Prematurely narrows perception of viable options.'
      },
      {
        id: `fog-b-${Date.now()}`,
        name: 'Emotional Turbulence',
        category: 'emotional_turbulence',
        severity: 'high',
        impact: 'Clouding clear resonance sensing with reactive impulses.'
      }
    ]
  };
}
