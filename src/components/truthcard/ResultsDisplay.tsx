import type { GenerateCringeIndexOutput } from "@/ai/flows/generate-cringe-index";
import TruthCard from "./TruthCard";

interface ResultsDisplayProps {
  data: GenerateCringeIndexOutput;
  profileImagePreview: string | null;
}

export default function ResultsDisplay({ data, profileImagePreview }: ResultsDisplayProps) {
  return (
    <div className="w-full mt-8 animate-fadeIn">
      <TruthCard data={data} profileImagePreview={profileImagePreview} />
      {/* TODO: Add share buttons / TikTok template links here */}
    </div>
  );
}

// Add fadeIn animation to globals.css or tailwind.config.js if it doesn't exist
// For now, assuming a simple opacity transition or direct display.
// A simple fadeIn can be:
// @keyframes fadeIn { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
// .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
// Add this to globals.css if needed.
