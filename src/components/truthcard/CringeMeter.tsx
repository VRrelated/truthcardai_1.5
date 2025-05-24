
"use client";

// This component is no longer used directly in TruthCard.tsx as per the new design.
// Keeping the file in case it's needed for other purposes or future enhancements.
// The Cringe Index score is now displayed in the title on ResultsDisplay.tsx.

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CringeMeterProps {
  score: number; // 0-100
}

export default function CringeMeter({ score }: CringeMeterProps) {
  const getMeterColor = () => {
    if (score > 75) return "bg-destructive"; 
    if (score > 50) return "bg-yellow-500"; 
    if (score > 25) return "bg-sky-500"; 
    return "bg-accent"; 
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-baseline">
        <h3 className="text-lg font-semibold text-primary">Cringe Index</h3>
        <span className={cn(
            "text-2xl font-bold",
            score > 75 ? "text-destructive" :
            score > 50 ? "text-yellow-500" :
            score > 25 ? "text-sky-500" :
            "text-accent"
          )}
        >
          {score}%
        </span>
      </div>
      <Progress value={score} className="h-6 w-full border border-border" indicatorClassName={getMeterColor()} />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Mildly Amusing</span>
        <span>Peak Cringe</span>
      </div>
    </div>
  );
}
