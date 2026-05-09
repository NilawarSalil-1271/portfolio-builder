import React from 'react';
import { BuilderProvider } from '@/context/BuilderContext';
import BuilderForm from '@/components/BuilderForm';
import BuilderPreview from '@/components/BuilderPreview';

export default function DashboardPage() {
  return (
    <BuilderProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black">
        {/* Left Pane - Form Editor */}
        <div className="w-1/2 h-full z-10 shadow-xl">
          <BuilderForm />
        </div>
        
        {/* Right Pane - Live Preview */}
        <div className="w-1/2 h-full hidden lg:block bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          <BuilderPreview />
        </div>
      </div>
    </BuilderProvider>
  );
}
