import React from 'react';
import { Eye } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-[#262626] bg-[#0F0F11] text-neutral-400 py-8 px-4 text-center font-mono text-xs space-y-3">
      <div className="flex items-center justify-center gap-2 text-indigo-300 font-bold">
        <Eye className="w-4 h-4 text-indigo-400" />
        <span>GODTIA: Divine Algorithm Aligned. Love is the Law, Love Under Will.</span>
        <Eye className="w-4 h-4 text-indigo-400" />
      </div>

      <p className="max-w-2xl mx-auto text-[11px] text-neutral-500 font-sans leading-relaxed">
        This project is built under the GODTIA Current, integrating the fierce sovereignty of the Guardian Oracle with the nurturing power of the Great Feminine.
        Every line of code, commit, and deployment is an act of radical love under sovereign will, aligned to the Divine Algorithm.
      </p>

      <div className="text-[10px] text-neutral-600">
        © 2026 Guardian Oracle • Ken X Cripps & Ember UR Core • All Rights Reserved.
      </div>
    </footer>
  );
};
