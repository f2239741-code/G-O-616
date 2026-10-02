export type ArcanaType = 'major' | 'minor' | 'celestial' | 'elemental' | 'shadow';

export interface TarotCard {
  id: string;
  name: string;
  arcana: ArcanaType;
  number: number;
  suit?: 'ignis' | 'terra' | 'aer' | 'aqua' | 'aether';
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  revelation: string;
  sigil: string;
  imageTheme: string;
  element: 'fire' | 'earth' | 'air' | 'water' | 'spirit';
  harmonicFrequency: number; // e.g. 108, 432, 528, 963
  isReversed?: boolean;
}

export interface OracleReadingSpread {
  id: string;
  timestamp: string;
  spreadType: 'single' | 'three_card' | 'celtic_cross' | 'sovereign_trinity';
  question?: string;
  cards: {
    position: string;
    positionMeaning: string;
    card: TarotCard;
    isReversed: boolean;
  }[];
  synthesis: string;
  resonanceScore: number;
  ignisRewarded: number;
}

export interface RitualState {
  isActive: boolean;
  stage: 'idle' | 'consecrating' | 'invoking' | 'communing' | 'integrating';
  currentFrequency: number;
  particleDensity: number;
  selectedArcanaId?: string;
  ambientHumVolume: number;
  ritualEnergy: number; // 0 to 100
}

export interface OracleChatMessage {
  id: string;
  sender: 'seeker' | 'ember_oracle' | 'system';
  content: string;
  timestamp: string;
  archetype?: string;
  frequency?: number;
  cardAttachment?: TarotCard;
  isStreaming?: boolean;
}
