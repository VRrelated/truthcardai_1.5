
'use client';

import { useState, useEffect, type CSSProperties, useRef } from 'react';
import type { GenerateCringeIndexOutput } from '@/ai/flows/generate-cringe-index';
import ProfileUploadForm from '@/components/truthcard/ProfileUploadForm';
import ResultsDisplay from '@/components/truthcard/ResultsDisplay';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Share2, UserPlus, Download, Terminal } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { cn } from '@/lib/utils';
import SupportUsPopup from '@/components/truthcard/SupportUsPopup';

const introTerminalLines = [
  "Booting TruthCard.AI v1.5...",
  "Initializing Cybernetic Roast Engine...",
  "Calibrating Cringe Detectors...",
  "WARNING: Brutal Honesty Enabled.",
  "Drag and drop your dating profile screenshot to begin.",
  "We are currently in development stage.",
  "Please consider clicking the SELECT PRO TIER.",
];

const DashedSeparator = () => (
  <hr className="w-full border-t-2 border-dashed-foreground my-8" />
);

export default function TruthCardPage() {
  const [roastData, setRoastData] = useState<GenerateCringeIndexOutput | null>(null);
  const [currentProfileImagePreview, setCurrentProfileImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showSupportUsPopup, setShowSupportUsPopup] = useState(false);

  const [displayedLinesContent, setDisplayedLinesContent] = useState<string[]>([]);
  const [currentLineBeingTypedIndex, setCurrentLineBeingTypedIndex] = useState(0);
  const [currentCharInLineIndex, setCurrentCharInLineIndex] = useState(0);
  
  const [allTerminalLinesDisplayed, setAllTerminalLinesDisplayed] = useState(false);
  const [isTerminalFadingOut, setIsTerminalFadingOut] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const supportPopupTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showIntro && !isTerminalFadingOut) {
      setDisplayedLinesContent([]);
      setCurrentLineBeingTypedIndex(0);
      setCurrentCharInLineIndex(0);
      setAllTerminalLinesDisplayed(false);
      document.body.classList.add('overflow-hidden');
    } else if (!showIntro) {
      document.body.classList.remove('overflow-hidden');
    }
    
    return () => {
      if (supportPopupTimeoutRef.current) {
        clearTimeout(supportPopupTimeoutRef.current);
      }
      if (!showIntro || isTerminalFadingOut) { 
        document.body.classList.remove('overflow-hidden');
      }
    };
  }, [showIntro, isTerminalFadingOut]);

  useEffect(() => {
    if (!showIntro || isTerminalFadingOut) return;

    const charTypingSpeed = 50; 
    const delayBetweenLines = 200;
    const postCompletionTotalDelay = 1000;

    if (currentLineBeingTypedIndex < introTerminalLines.length) {
      const lineToType = introTerminalLines[currentLineBeingTypedIndex];
      if (currentCharInLineIndex < lineToType.length) {
        const charTimer = setTimeout(() => {
          setDisplayedLinesContent(prevLines => {
            const newLines = [...prevLines];
            if (newLines.length === currentLineBeingTypedIndex) {
              newLines.push(''); 
            }
            newLines[currentLineBeingTypedIndex] += lineToType[currentCharInLineIndex];
            return newLines;
          });
          setCurrentCharInLineIndex(prev => prev + 1);
        }, charTypingSpeed);
        return () => clearTimeout(charTimer);
      } else {
        const lineEndTimer = setTimeout(() => {
          setCurrentLineBeingTypedIndex(prev => prev + 1);
          setCurrentCharInLineIndex(0);
        }, delayBetweenLines);
        return () => clearTimeout(lineEndTimer);
      }
    } else {
      if (!allTerminalLinesDisplayed) {
        setAllTerminalLinesDisplayed(true);
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.warn("Terminal complete sound play failed:", error);
          });
        }
        setTimeout(() => {
          if (showIntro && !isTerminalFadingOut) { 
             setIsTerminalFadingOut(true); 
          }
        }, postCompletionTotalDelay);
      }
    }
  }, [
    showIntro, 
    isTerminalFadingOut, 
    currentLineBeingTypedIndex, 
    currentCharInLineIndex, 
    allTerminalLinesDisplayed
  ]);

  useEffect(() => {
    if (isTerminalFadingOut) {
      const fadeOutDuration = 500; 
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

    if (supportPopupTimeoutRef.current) {
      clearTimeout(supportPopupTimeoutRef.current);
    }
    supportPopupTimeoutRef.current = setTimeout(() => {
      setShowSupportUsPopup(true);
    }, 5000);
  };

  const handleAnalysisStart = () => {
    setIsLoading(true);
    setRoastData(null);
    setError(null);
    if (supportPopupTimeoutRef.current) {
      clearTimeout(supportPopupTimeoutRef.current);
    }
    setShowSupportUsPopup(false);
  };

  const handleAnalysisError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
    setRoastData(null);
    if (supportPopupTimeoutRef.current) {
      clearTimeout(supportPopupTimeoutRef.current);
    }
    setShowSupportUsPopup(false);
  };
  
  const handleStartRoasting = () => {
    setShowIntro(false);
  };

  const handleReset = () => {
    setRoastData(null);
    setIsLoading(false);
    setError(null);
    setCurrentProfileImagePreview(null);
    if (supportPopupTimeoutRef.current) {
      clearTimeout(supportPopupTimeoutRef.current);
      supportPopupTimeoutRef.current = null;
    }
    setShowSupportUsPopup(false); 
  };

  if (showIntro) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 font-mono relative overflow-hidden",
        isTerminalFadingOut && "animate-fadeOut"
        )}
      >
        <audio ref={audioRef} src="/sounds/terminal-complete-placeholder.mp3" preload="auto"></audio>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: "linear-gradient(hsla(var(--accent)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsla(var(--accent)/0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          animation: "matrixScroll 10s linear infinite",
        } as CSSProperties}></div>
        <style jsx global>{`
          @keyframes matrixScroll {
            0% { background-position: 0 0; }
            100% { background-position: 0 -200px; }
          }
        `}</style>
        
        <div className="z-10 w-full max-w-3xl p-6 bg-black/80 backdrop-blur-sm rounded-lg shadow-[0_0_20px_rgba(140,82,255,0.4)] border border-border">
          <div className="flex items-center text-accent mb-4">
            <Terminal className="mr-2 h-5 w-5" /> TruthCard.AI Console
          </div>
          <div className="space-y-1 h-48 overflow-y-auto pr-2">
            {displayedLinesContent.map((line, idx) => (
              <p key={idx} className="text-sm">
                <span className="text-primary">&gt;&nbsp;</span>
                <span className="text-accent">{line}</span>
                {idx === currentLineBeingTypedIndex && currentLineBeingTypedIndex < introTerminalLines.length && !allTerminalLinesDisplayed && !isTerminalFadingOut && (
                  <span className="inline-block w-2 h-4 bg-accent animate-ping ml-1"></span>
                )}
                {idx === introTerminalLines.length -1 && allTerminalLinesDisplayed && !isTerminalFadingOut && (
                  <span className="inline-block w-2 h-4 bg-accent ml-1"></span>
                )}
              </p>
            ))}
            {displayedLinesContent.length === 0 && currentLineBeingTypedIndex === 0 && !allTerminalLinesDisplayed && !isTerminalFadingOut && (
                 <p className="text-sm">
                    <span className="text-primary">&gt;&nbsp;</span>
                    <span className="inline-block w-2 h-4 bg-accent animate-ping ml-1"></span>
                 </p>
            )}
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
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-8">
          {!roastData && !isLoading && !error && (
            <>
              <div className="text-center">
                <h1 className="text-5xl font-bold text-primary mb-2">TruthCard.AI</h1>
                <p className="text-foreground/80 text-lg">Unfiltered Dating Profile Roasts. Prepare for Judgment.</p>
              </div>
              <DashedSeparator />
              <ProfileUploadForm
                onAnalysisStart={handleAnalysisStart}
                onAnalysisComplete={(data, imgPreview) => handleAnalysisComplete(data, imgPreview)}
                onAnalysisError={handleAnalysisError}
                isLoading={isLoading}
              />
              <DashedSeparator />
            </>
          )}

          {isLoading && (
            <div className={cn(
              "flex flex-col items-center justify-center space-y-6 p-8 rounded-lg mt-16 w-full max-w-md mx-auto animate-fadeIn",
              "bg-[radial-gradient(circle_at_center,_#7B2BFF_0%,_#3A0CA3_100%)]",
              "shadow-[0_0_25px_#E826FF] animate-floatPlus [transform-style:preserve-3d]"
            )}>
              <DotLottieReact
                src="https://lottie.host/202347a9-0b47-4bc3-b1a2-38a0321e7670/Pja9uHpvCZ.lottie"
                loop
                autoplay
                style={{ width: '150px', height: '150px' }}
              />
              <p className="text-accent text-xl text-center pt-2 animate-glitch" data-text="ANALYZING PROFILE... 37% CRINGE DETECTED">ANALYZING PROFILE... 37% CRINGE DETECTED</p>
              <p className="text-muted-foreground text-xs text-center uppercase tracking-wider">TRUTHCARD AI V3.7 • SCANNING FOR RED FLAGS...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="bg-destructive/20 border border-destructive text-destructive-foreground p-6 rounded-lg shadow-lg space-y-3 mt-16 animate-fadeIn">
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
              <div className="mt-8 w-full space-y-3 text-center">
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
        {showSupportUsPopup && roastData && (
          <SupportUsPopup
            open={showSupportUsPopup}
            onOpenChange={setShowSupportUsPopup}
            gumroadLink="https://vrrelated.gumroad.com/l/attracttherightone"
          />
        )}
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm border-t border-border/30">
        © {new Date().getFullYear()} TruthCard.AI - Dare to know the truth.
      </footer>
    </div>
  );
}
    
