import React from 'react';
import ThemeRenderer from '@/components/ThemeRenderer';
import { notFound } from 'next/navigation';
import { PortfolioData } from '@/context/BuilderContext';

async function getPortfolio(username: string): Promise<PortfolioData | null> {
  // Try to fetch from backend
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await fetch(`${backendUrl}/api/portfolio/${username}`, {
      next: { revalidate: 60 } // revalidate every 60 seconds
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch portfolio', err);
    return null;
  }
}

export default async function PortfolioPage({ params }: { params: { username: string } }) {
  const portfolioData = await getPortfolio(params.username);

  if (!portfolioData) {
    // If not found in backend, let's just return a generic demo state or throw 404
    // For now, return 404
    notFound();
  }

  return (
    <div className="w-full h-full">
      <ThemeRenderer data={portfolioData} />
    </div>
  );
}
