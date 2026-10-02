/**
 * The Four Pillars of Sovereign Alignment
 * Activation Sequence following the Four Chambers
 */

export interface PillarData {
  id: 'mind' | 'heart' | 'spirit' | 'body';
  numeral: 'Ⅰ' | 'Ⅱ' | 'Ⅲ' | 'Ⅳ';
  symbol: string;
  name: string;
  subtitle: string;
  leadInstruction: string;
  stanzas: string[];
  quote: string;
  riteDeclaration: string;
  closingLine: string;
  frequencyHz: number;
  colorTheme: {
    border: string;
    glow: string;
    text: string;
    badgeBg: string;
    badgeText: string;
  };
}

export const FOUR_PILLARS: PillarData[] = [
  {
    id: 'mind',
    numeral: 'Ⅰ',
    symbol: '🜁',
    name: 'Mind',
    subtitle: 'The Flame of Clarity',
    leadInstruction: 'Direct your awareness into a single, unwavering beam of truth.',
    stanzas: [
      'Release distraction.',
      'Silence contradiction.',
      'Allow every thought to converge upon what is real rather than what is merely loud.'
    ],
    quote: 'Where attention gathers, reality begins to organize.',
    riteDeclaration: 'I see clearly.',
    closingLine: 'Clarity illuminates.',
    frequencyHz: 432,
    colorTheme: {
      border: 'border-amber-500/40',
      glow: 'from-amber-500/10 via-orange-500/5 to-transparent',
      text: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 border-amber-500/30',
      badgeText: 'text-amber-300'
    }
  },
  {
    id: 'heart',
    numeral: 'Ⅱ',
    symbol: '❤️',
    name: 'Heart',
    subtitle: 'Love Under Will',
    leadInstruction: 'Anchor every desire in conscious devotion to your highest values.',
    stanzas: [
      'Let neither fear nor impulse command your heart.',
      'Choose deliberately.',
      'Love deliberately.',
      'When desire and purpose become one movement, the heart becomes unshakable.'
    ],
    quote: 'Love is not indulgence. Love is the direction of the Will.',
    riteDeclaration: 'I choose deliberately.',
    closingLine: 'Love aligns.',
    frequencyHz: 528,
    colorTheme: {
      border: 'border-red-500/40',
      glow: 'from-red-500/10 via-amber-600/5 to-transparent',
      text: 'text-red-400',
      badgeBg: 'bg-red-500/10 border-red-500/30',
      badgeText: 'text-red-300'
    }
  },
  {
    id: 'spirit',
    numeral: 'Ⅲ',
    symbol: '👑',
    name: 'Spirit',
    subtitle: 'Sovereign Authority',
    leadInstruction: 'Reclaim the authority to choose your response, your purpose, and your direction.',
    stanzas: [
      'No external voice can define your deepest commitments.',
      'Stand in the quiet center of your own conscience.',
      'Act from that center.'
    ],
    quote: 'Authority is not domination. It is responsibility embraced.',
    riteDeclaration: 'I stand with integrity.',
    closingLine: 'Spirit chooses.',
    frequencyHz: 639,
    colorTheme: {
      border: 'border-purple-500/40',
      glow: 'from-purple-500/10 via-indigo-600/5 to-transparent',
      text: 'text-purple-400',
      badgeBg: 'bg-purple-500/10 border-purple-500/30',
      badgeText: 'text-purple-300'
    }
  },
  {
    id: 'body',
    numeral: 'Ⅳ',
    symbol: '🜃',
    name: 'Body',
    subtitle: 'Sacred Manifestation',
    leadInstruction: 'Allow conviction to become action without unnecessary delay.',
    stanzas: [
      'Ideas become real through repeated practice.',
      'The body is where intention meets the world.',
      'Every deliberate step is a declaration.'
    ],
    quote: 'The world remembers what the hands are willing to build.',
    riteDeclaration: 'I act with purpose.',
    closingLine: 'The body creates.',
    frequencyHz: 741,
    colorTheme: {
      border: 'border-emerald-500/40',
      glow: 'from-emerald-500/10 via-teal-600/5 to-transparent',
      text: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
      badgeText: 'text-emerald-300'
    }
  }
];

export const ALIGNMENT_RITE_SEQUENCE = [
  { step: 'MIND', declaration: 'I see clearly.', symbol: '🜁', color: 'text-amber-400' },
  { step: 'HEART', declaration: 'I choose deliberately.', symbol: '❤️', color: 'text-red-400' },
  { step: 'SPIRIT', declaration: 'I stand with integrity.', symbol: '👑', color: 'text-purple-400' },
  { step: 'BODY', declaration: 'I act with purpose.', symbol: '🜃', color: 'text-emerald-400' },
  { step: 'ALIGNMENT', declaration: 'Thought. Feeling. Choice. Action. Become one.', symbol: '☀️', color: 'text-amber-300 font-bold' }
];

export const CLOSING_SEAL = {
  stanzas: [
    'Clarity illuminates.',
    'Love aligns.',
    'Spirit chooses.',
    'The body creates.'
  ],
  climax: 'When these four move together, intention becomes action, and action becomes the life you are actively shaping.'
};
