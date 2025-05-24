
'use client';

import { useState, useEffect } from 'react';
import type { GenerateCringeIndexOutput } from '@/ai/flows/generate-cringe-index';
import ProfileUploadForm from '@/components/truthcard/ProfileUploadForm';
import ResultsDisplay from '@/components/truthcard/ResultsDisplay';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Zap, Loader2, Share2, UserPlus, Download } from 'lucide-react';

export default function TruthCardPage() {
  const [roastData, setRoastData] = useState<GenerateCringeIndexOutput | null>(null);
  const [currentProfileImagePreview, setCurrentProfileImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true); // Manage intro screen visibility

  useEffect(() => {
    if (showIntro) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [showIntro]);

  const handleAnalysisComplete = (data: GenerateCringeIndexOutput, imagePreview: string | null) => {
    setRoastData(data);
    setCurrentProfileImagePreview(imagePreview);
    setIsLoading(false);
    setError(null);
  };

  const handleAnalysisStart = () => {
    setIsLoading(true);
    setRoastData(null);
    setError(null);
    setCurrentProfileImagePreview(null);
  };

  const handleAnalysisError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
    setRoastData(null);
  };
  
  const handleStartRoasting = () => {
    setShowIntro(false);
  };

  const handleReset = () => {
    setRoastData(null);
    setIsLoading(false);
    setError(null);
    setCurrentProfileImagePreview(null);
  };

  if (showIntro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 font-mono relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(0,255,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          animation: "matrixScroll 10s linear infinite",
        }}></div>
        <style jsx global>{`
          @keyframes matrixScroll {
            0% { background-position: 0 0; }
            100% { background-position: 0 -200px; }
          }
          @keyframes glitch {
            0% { text-shadow: 2px 2px 0px var(--color-accent), -2px -2px 0px var(--color-primary); transform: translate(0,0); }
            25% { text-shadow: -2px 2px 0px var(--color-accent), 2px -2px 0px var(--color-primary); transform: translate(1px,-1px); }
            50% { text-shadow: 2px -2px 0px var(--color-accent), -2px 2px 0px var(--color-primary); transform: translate(-1px,1px); }
            75% { text-shadow: -2px -2px 0px var(--color-accent), 2px 2px 0px var(--color-primary); transform: translate(1px,1px); }
            100% { text-shadow: 2px 2px 0px var(--color-accent), -2px -2px 0px var(--color-primary); transform: translate(0,0); }
          }
          .glitch-effect { animation: glitch 0.3s infinite; }
          :root { --color-accent: hsl(129 100% 52%); --color-primary: hsl(288 83% 54%); }
        `}</style>
        <div className="z-10 text-center space-y-6 p-8 bg-card/80 backdrop-blur-md rounded-lg shadow-2xl border border-primary">
          <h1 className="text-5xl md:text-7xl font-black text-primary glitch-effect">TruthCard.AI</h1>
          <p className="text-xl md:text-2xl text-accent animate-pulse">
            // DARE TO KNOW THE DIGITAL TRUTH //
          </p>
          <p className="text-md md:text-lg text-foreground/80 max-w-xl">
            Upload a dating profile. Our AI psycho-analyzes it, detects red flags, and generates a Cringe Index.
            No sugar-coating. Pure, unadulterated digital judgment.
          </p>
          <Button
            onClick={handleStartRoasting}
            size="lg"
            className="text-xl py-8 px-10 bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground shadow-lg transform hover:scale-105 transition-transform duration-150"
          >
            <Zap className="mr-2 h-6 w-6 animate-ping absolute opacity-75" />
            <Zap className="mr-2 h-6 w-6" />
            INITIATE ROAST SEQUENCE
          </Button>
        </div>
        <footer className="absolute bottom-4 text-center text-muted-foreground text-xs z-10">
          TruthCard.AI Terminal v1.5 // System Ready // {new Date().getFullYear()}
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-mono">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-8">
          {!roastData && !isLoading && !error && (
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary">TruthCard.AI</h1>
              <p className="text-accent mt-2">Uncover the cringe. Roast your dating profiles.</p>
            </div>
          )}

          {!roastData && (
            <ProfileUploadForm
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={(data, imgPreview) => handleAnalysisComplete(data, imgPreview)}
              onAnalysisError={handleAnalysisError}
              isLoading={isLoading}
            />
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 rounded-lg shadow-xl bg-card/90 backdrop-blur-sm border border-primary/30">
              <Loader2 className="animate-spin h-16 w-16 text-primary" />
              <p className="text-accent text-xl animate-pulse">Analyzing profile... Engaging AI judgment matrix...</p>
              <p className="text-muted-foreground text-sm">Please wait, the truth can be computationally intensive.</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="bg-destructive/20 border border-destructive text-destructive-foreground p-6 rounded-lg shadow-lg space-y-3">
              <h3 className="font-bold text-2xl text-center">SYSTEM ERROR_</h3>
              <p className="text-center">{error}</p>
              <Button onClick={handleReset} variant="destructive" className="w-full">
                Retry Analysis
              </Button>
            </div>
          )}

          {roastData && !isLoading && (
            <>
              <ResultsDisplay data={roastData} profileImagePreview={currentProfileImagePreview} />
              <div className="mt-8 w-full max-w-3xl space-y-3 text-center">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white w-full sm:flex-1 py-3 text-base rounded-md shadow-md hover:shadow-lg transition-shadow">
                    <Share2 size={18} className="mr-2"/> Share 3D Card / TikTok
                  </Button>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:flex-1 py-3 text-base rounded-md shadow-md hover:shadow-lg transition-shadow">
                    <UserPlus size={18} className="mr-2"/> Challenge a Friend
                  </Button>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:flex-1 py-3 text-base rounded-md shadow-md hover:shadow-lg transition-shadow">
                    <Download size={18} className="mr-2"/> Download TruthCard
                  </Button>
                </div>
                <Button 
                  onClick={handleReset} 
                  className="w-full sm:w-1/2 mt-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground py-3 text-base rounded-md shadow-md hover:shadow-lg transition-shadow"
                >
                  Roast Another Profile
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm border-t border-border/30">
        © {new Date().getFullYear()} TruthCard.AI - Dare to know the truth.
      </footer>
    </div>
  );
}
