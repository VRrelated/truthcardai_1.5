
import type { GenerateCringeIndexOutput } from "@/ai/flows/generate-cringe-index";

interface TruthCardProps {
  data: GenerateCringeIndexOutput;
  profileImagePreview: string | null;
}

export default function TruthCard({ data, profileImagePreview }: TruthCardProps) {
  const { redFlags } = data;

  // In a real scenario, these would come from other AI flows or be generated.
  const compatibilityHeatmapText = "(Simulated Heatmap Graphic)";
  const aiGeneratedMemeText = "(Simulated AI Meme)";

  return (
    <div className="bg-card p-4 md:p-6 rounded-lg border-2 border-primary shadow-[0_0_15px_hsl(var(--primary))] text-foreground animate-fadeIn">
      {/* Top section: Image and Roast Highlights */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {profileImagePreview && (
          <img
            src={profileImagePreview}
            alt="Uploaded Profile"
            className="rounded-md w-32 h-40 sm:w-36 sm:h-48 object-cover border border-border self-center md:self-start shadow-md"
            data-ai-hint="profile picture"
          />
        )}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-primary mb-2">Roast Highlights:</h3>
          {redFlags && redFlags.length > 0 ? (
            <ul className="space-y-1.5">
              {redFlags.slice(0, 3).map((flag, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-400 mr-2">&#8226;</span> 
                  <span className="text-foreground/90">{flag}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground italic">The AI is temporarily lost for words (or just being nice).</p>
          )}
        </div>
      </div>

      {/* Bottom section: Compatibility Heatmap and AI Generated Meme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-lg font-semibold text-accent mb-2 text-center md:text-left">Compatibility Heatmap:</h4>
          <div className="bg-background/40 border-2 border-accent rounded-lg p-4 flex items-center justify-center h-32 md:h-36">
            <p className="text-muted-foreground text-sm text-center">{compatibilityHeatmapText}</p>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-primary mb-2 text-center md:text-left">AI Generated Meme:</h4>
          <div className="bg-background/40 border-2 border-primary rounded-lg p-4 flex items-center justify-center h-32 md:h-36">
            <p className="text-muted-foreground text-sm text-center">{aiGeneratedMemeText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
