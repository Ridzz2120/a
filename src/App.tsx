import React, { useState } from 'react';
import { HeritageWall } from './components/HeritageWall';
import { Header } from './components/Header';
import { HomeLanding } from './components/HomeLanding';
import { SearchHeaderBar } from './components/SearchHeaderBar';
import { AiReelPage } from './components/AiReelPage';
import { RadarPage } from './components/RadarPage';
import { SafetyPage } from './components/SafetyPage';
import { BottomNavigation, MainTab } from './components/BottomNavigation';
import { SosSheet } from './components/SosSheet';
import { MyPassModal } from './components/MyPassModal';
import { MONUMENTS_DATA } from './data/monumentsData';
import { HeritageMonument } from './types';
import { getStoredUserTokens } from './services/safetyReportService';

export default function App() {
  // Navigation & View States
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<MainTab>('reel');
  const [selectedMonument, setSelectedMonument] = useState<HeritageMonument>(MONUMENTS_DATA[0]);

  // Tokens & Modal States
  const [tokensBalance, setTokensBalance] = useState<number>(() => getStoredUserTokens());
  const [isSosOpen, setIsSosOpen] = useState<boolean>(false);
  const [isMyPassOpen, setIsMyPassOpen] = useState<boolean>(false);

  // Search Explore Route Action
  const handleExploreRoute = (query: string) => {
    // Match query or fallback to selected monument
    const matched = MONUMENTS_DATA.find((m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.city.toLowerCase().includes(query.toLowerCase())
    );
    if (matched) {
      setSelectedMonument(matched);
    }
    setViewMode('app');
    setActiveTab('reel');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewSearch = () => {
    setViewMode('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMonument = (monument: HeritageMonument) => {
    setSelectedMonument(monument);
  };

  const handleTokensUpdated = (newTokens: number) => {
    setTokensBalance(newTokens);
  };

  const handleShareGpsWhatsapp = () => {
    const msg = encodeURIComponent(
      `🚨 SafarAdda Tourist Guardian Alert:\nI am travelling near ${selectedMonument.name} (${selectedMonument.city}).\nGPS Coordinates: ${selectedMonument.radarTargets[0]?.coordsText || '27.1751 N, 78.0421 E'}.\nPlease track my route.`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  return (
    <div id="safaradda-app-root" className="relative min-h-screen flex flex-col font-sans text-slate-900 selection:bg-[#0066FF] selection:text-white">
      {/* Dynamic 14-18 Panel Indian Heritage Photography Wall with light overlay */}
      <HeritageWall />

      {/* Main Sticky Glass Header */}
      <Header
        onOpenSos={() => setIsSosOpen(true)}
        onOpenMyPass={() => setIsMyPassOpen(true)}
        tokensBalance={tokensBalance}
        onGoHome={handleNewSearch}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col pt-2 pb-16">
        {viewMode === 'landing' ? (
          /* Landing Search-First View */
          <HomeLanding
            monuments={MONUMENTS_DATA}
            selectedMonument={selectedMonument}
            onSelectMonument={handleSelectMonument}
            onExploreRoute={handleExploreRoute}
          />
        ) : (
          /* Application Experience View */
          <div className="w-full flex flex-col items-center">
            {/* Top Search Result Banner with New Search Return */}
            <SearchHeaderBar
              currentMonument={selectedMonument}
              allMonuments={MONUMENTS_DATA}
              onSelectMonument={handleSelectMonument}
              onNewSearch={handleNewSearch}
            />

            {/* Active Tab Views */}
            {activeTab === 'reel' && (
              <AiReelPage
                monument={selectedMonument}
                onNavigateToRadar={() => setActiveTab('radar')}
                onNavigateToSafety={() => setActiveTab('safety')}
              />
            )}

            {activeTab === 'radar' && (
              <RadarPage
                monument={selectedMonument}
                onNavigateToSafety={() => setActiveTab('safety')}
              />
            )}

            {activeTab === 'safety' && (
              <SafetyPage
                onOpenSos={() => setIsSosOpen(true)}
                onShareGpsWhatsapp={handleShareGpsWhatsapp}
                onTokensUpdated={handleTokensUpdated}
              />
            )}

            {activeTab === 'profile' && (
              /* Inline Profile & Earn View or trigger modal */
              <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6 pb-24">
                <div className="p-6 rounded-3xl glass-panel shadow-md border border-white/90 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-3xl">
                    🪙
                  </div>
                  <h2 className="text-2xl font-black text-[#0C2340]">
                    Mitra Tokens & Guardian Profile
                  </h2>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Earn tokens by verifying vehicle plates with OCR and submitting authentic ride fares.
                  </p>
                  <div className="font-mono text-4xl font-black text-[#0C2340]">
                    {tokensBalance} <span className="text-base text-amber-600 font-bold">Mitra</span>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsMyPassOpen(true)}
                      className="px-6 py-3 rounded-2xl bg-[#0066FF] text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:bg-blue-700 transition-all"
                    >
                      Open Full My Pass Wallet & Missions →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Bottom Navigation Bar (Visible in app view, or accessible throughout) */}
      {viewMode === 'app' && (
        <BottomNavigation
          activeTab={activeTab}
          onChangeTab={(tab) => {
            if (tab === 'profile') {
              setIsMyPassOpen(true);
            } else {
              setActiveTab(tab);
            }
          }}
          tokensBalance={tokensBalance}
        />
      )}

      {/* SOS Emergency Guardian Sheet (112, 1091, WhatsApp GPS) */}
      <SosSheet
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        currentMonument={selectedMonument}
      />

      {/* My Pass & Mitra Tokens Wallet Modal */}
      <MyPassModal
        isOpen={isMyPassOpen}
        onClose={() => setIsMyPassOpen(false)}
        tokensBalance={tokensBalance}
        onTokensUpdated={handleTokensUpdated}
      />
    </div>
  );
}
