// FIX: Add missing React import to use React types like FC and SVGProps.
import React from 'react';

export type GameState = 'welcome' | 'creating' | 'generating' | 'result';

export interface AvatarSelections {
  body: string;
  hair: string;
  eyes: string;
  accessory: string;
}

export interface AvatarImageVariations {
  any: string;
  '2d': string;
  '3d': string;
}

export interface Option {
  name: string;
  component: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface OptionCategory {
  title: string;
  key: keyof AvatarSelections;
  options: Option[];
}