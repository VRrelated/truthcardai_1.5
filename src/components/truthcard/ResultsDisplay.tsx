
import type { GenerateCringeIndexOutput } from "@/ai/flows/generate-cringe-index";
import TruthCard from "./TruthCard";

interface ResultsDisplayProps {
  data: GenerateCringeIndexOutput;
  profileImagePreview: string | null;
}

export default function ResultsDisplay({ data, profileImagePreview }: ResultsDisplayProps) {
  return (
    <div className="w-full mt-8 animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-6">
        Roast Complete: Cringe Index<sup>TM</sup> {data.cringeIndex.toFixed(2)}%
      </h2>
      <TruthCard data={data} profileImagePreview={profileImagePreview} />
    </div>
  );
}
