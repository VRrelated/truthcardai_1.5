"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CringeMeterProps {
  score: number; // 0-100
}

export default function CringeMeter({ score }: CringeMeterProps) {
  const getMeterColor = () => {
    if (score > 75) return "bg-destructive"; // High cringe
    if (score > 50) return "bg-yellow-500"; // Medium cringe
    if (score > 25) return "bg-sky-500"; // Low cringe
    return "bg-accent"; // Very low/no cringe
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
