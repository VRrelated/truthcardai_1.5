import type { GenerateCringeIndexOutput } from "@/ai/flows/generate-cringe-index";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CringeMeter from "./CringeMeter";
import { BotMessageSquare, AlertTriangle, CheckCircle2, Smile, Meh, Frown } from "lucide-react";

interface TruthCardProps {
  data: GenerateCringeIndexOutput;
  profileImagePreview: string | null;
}

export default function TruthCard({ data, profileImagePreview }: TruthCardProps) {
  const { cringeIndex, redFlags, explanation } = data;

  const getCringeFace = () => {
    if (cringeIndex > 75) return <Frown className="w-12 h-12 text-destructive" />;
    if (cringeIndex > 50) return <Meh className="w-12 h-12 text-yellow-500" />;
    if (cringeIndex > 25) return <Smile className="w-12 h-12 text-sky-500" />;
    return <CheckCircle2 className="w-12 h-12 text-accent" />;
  }

  return (
    <Card className="w-full shadow-2xl border-primary/50 transform transition-all duration-500 hover:scale-[1.01] bg-card/90 backdrop-blur-sm">
      <CardHeader className="text-center relative pb-4">
        <div className="absolute top-4 left-4 text-accent">
          <BotMessageSquare size={32} />
        </div>
        <CardTitle className="text-3xl font-bold text-primary tracking-wider">
          TruthCard Revealed
        </CardTitle>
        <CardDescription className="text-accent text-sm">
          The AI has spoken. Brace yourself.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {profileImagePreview && (
          <div className="flex justify-center my-4">
            <img
              src={profileImagePreview}
              alt="Uploaded Profile"
              className="rounded-lg max-h-64 w-auto object-contain border-2 border-border shadow-lg"
              data-ai-hint="profile picture"
            />
          </div>
        )}

        <div className="flex flex-col items-center space-y-2">
          {getCringeFace()}
          <CringeMeter score={cringeIndex} />
        </div>
        
        <Separator className="bg-border/50 my-6" />

        <div>
          <h4 className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
            <AlertTriangle className="text-destructive" /> Red Flags Detected:
          </h4>
          {redFlags.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-foreground/90 pl-4">
              {redFlags.map((flag, index) => (
                <li key={index} className="italic">{flag}</li>
              ))}
            </ul>
          ) : (
            <p className="text-accent italic">No significant red flags detected. Impressive!</p>
          )}
        </div>

        <Separator className="bg-border/50 my-6" />

        <div>
          <h4 className="text-xl font-semibold text-primary mb-2">AI's Verdict:</h4>
          <p className="text-foreground/90 whitespace-pre-wrap text-sm leading-relaxed p-3 bg-muted/50 rounded-md border border-border">
            {explanation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
