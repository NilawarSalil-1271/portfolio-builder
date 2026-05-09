'use client';

import React from 'react';
import { useBuilder } from '@/context/BuilderContext';
import ThemeRenderer from './ThemeRenderer';

export default function BuilderPreview() {
  const { portfolioData } = useBuilder();

  return (
    <div className="h-full bg-gray-100 dark:bg-black/50 p-4 overflow-hidden flex flex-col">
      <div className="bg-white dark:bg-zinc-800 rounded-t-lg p-2 border-b border-gray-200 dark:border-zinc-700 flex items-center gap-2">
        <div className="flex gap-1.5 ml-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="mx-auto bg-gray-100 dark:bg-zinc-900 rounded-md px-4 py-1 text-xs text-gray-500 font-mono">
          {portfolioData.theme}.localhost:3000
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-white rounded-b-lg shadow-xl border border-gray-200 dark:border-zinc-800 custom-scrollbar relative">
        <div className="absolute inset-0 origin-top" style={{ zoom: '0.85' }}>
          <ThemeRenderer data={portfolioData} />
        </div>
      </div>
    </div>
  );
}
