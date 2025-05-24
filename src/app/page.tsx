
'use client';

import { useState, useEffect, type CSSProperties } from 'react';
import type { GenerateCringeIndexOutput } from '@/ai/flows/generate-cringe-index';
import ProfileUploadForm from '@/components/truthcard/ProfileUploadForm';
import ResultsDisplay from '@/components/truthcard/ResultsDisplay';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Zap, Loader2, Share2, UserPlus, Download, Star, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

const introTerminalLines = [
  "Booting TruthCard.AI v1.5...",
  "Initializing Cybernetic Roast Engine...",
  "Calibrating Cringe Detectors...",
  "WARNING: Brutal Honesty Enabled.",
  "Drag and drop your dating profile screenshot to begin.",
  "We are currently in development stage.",
  "Please consider clicking the SELECT PRO TIER.",
];

export default function TruthCardPage() {
  const [roastData, setRoastData] = useState<GenerateCringeIndexOutput | null>(null);
  const [currentProfileImagePreview, setCurrentProfileImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true); 

  // For onboarding terminal
  const [displayedTerminalLines, setDisplayedTerminalLines] = useState<string[]>([]);
  const [allTerminalLinesDisplayed, setAllTerminalLinesDisplayed] = useState(false);
  const [isTerminalFadingOut, setIsTerminalFadingOut] = useState(false);


  useEffect(() => {
    if (showIntro && !isTerminalFadingOut) {
      setDisplayedTerminalLines([]);
      setAllTerminalLinesDisplayed(false);
      let currentDelay = 200;
      const lineDisplayDuration = 600; // Time each line is displayed before next one starts
      const postCompletionDelay = 1000; // Delay after all lines are shown before starting fade

      introTerminalLines.forEach((line, index) => {
        setTimeout(() => {
          // Check if still in intro and not fading out, to prevent updates after transition starts
          if (showIntro && !isTerminalFadingOut) { 
            setDisplayedTerminalLines((prev) => [...prev, line]);
            if (index === introTerminalLines.length - 1) {
              setAllTerminalLinesDisplayed(true);
              setTimeout(() => {
                if (showIntro) { // Ensure still in intro phase
                   setIsTerminalFadingOut(true); // Start fade out
                }
              }, postCompletionDelay);
            }
          }
        }, currentDelay);
        currentDelay += lineDisplayDuration;
      });
      document.body.classList.add('overflow-hidden');
    } else if (!showIntro) {
      document.body.classList.remove('overflow-hidden');
    }
    // Cleanup for document.body.classList is handled when showIntro toggles or component unmounts
    return () => {
      if (!showIntro) { // Ensure class is removed if component unmounts while intro is not shown
        document.body.classList.remove('overflow-hidden');
      }
    };
  }, [showIntro, isTerminalFadingOut]);


  useEffect(() => {
    if (isTerminalFadingOut) {
      const fadeOutDuration = 500; // Must match Tailwind animation duration
      const timer = setTimeout(() => {
        handleStartRoasting();
      }, fadeOutDuration);
      return () => clearTimeout(timer);
    }
  }, [isTerminalFadingOut]);


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
    // setIsTerminalFadingOut(false); // Optionally reset if intro can be re-shown
  };

  const handleReset = () => {
    setRoastData(null);
    setIsLoading(false);
    setError(null);
    setCurrentProfileImagePreview(null);
    // If you want to go back to the intro terminal on reset:
    // setShowIntro(true);
    // setIsTerminalFadingOut(false);
    // setAllTerminalLinesDisplayed(false);
    // setDisplayedTerminalLines([]);
  };

  if (showIntro) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 font-mono relative overflow-hidden",
        isTerminalFadingOut && "animate-fadeOut"
        )}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(0,255,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          animation: "matrixScroll 10s linear infinite",
        } as CSSProperties}></div>
        <style jsx global>{`
          @keyframes matrixScroll {
            0% { background-position: 0 0; }
            100% { background-position: 0 -200px; }
          }
        `}</style>
        
        <div className="z-10 w-full max-w-3xl p-6 bg-black/80 backdrop-blur-sm rounded-lg shadow-2xl border border-primary">
          <div className="flex items-center text-accent mb-4">
            <Terminal className="mr-2 h-5 w-5" /> TruthCard.AI Console
          </div>
          <div className="space-y-1 h-48 overflow-y-auto pr-2">
            {displayedTerminalLines.map((line, index) => (
              <p key={index} className="text-sm">
                <span className="text-primary">&gt;&nbsp;</span>
                <span className="text-accent">{line}</span>
                {index === displayedTerminalLines.length - 1 && !allTerminalLinesDisplayed && !isTerminalFadingOut && (
                  <span className="inline-block w-2 h-4 bg-accent animate-ping ml-1"></span>
                )}
                 {index === displayedTerminalLines.length - 1 && allTerminalLinesDisplayed && !isTerminalFadingOut && (
                  <span className="inline-block w-2 h-4 bg-accent ml-1"></span>
                )}
              </p>
            ))}
          </div>
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

