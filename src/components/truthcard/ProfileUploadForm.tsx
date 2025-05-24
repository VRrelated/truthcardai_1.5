
"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { generateCringeIndex, type GenerateCringeIndexOutput } from "@/ai/flows/generate-cringe-index";
import { Input } from "@/components/ui/input";
import { UploadCloud, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileUploadFormProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (data: GenerateCringeIndexOutput, imagePreview: string | null) => void;
  onAnalysisError: (error: string) => void;
  isLoading: boolean; // Kept for potential future use, e.g., disabling dropzone
}

export default function ProfileUploadForm({
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
  isLoading,
}: ProfileUploadFormProps) {
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
  // profilePicturePreview is still needed to send to the AI
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File | null) => {
    if (!file) {
      setProfilePictureFile(null);
      setProfilePicturePreview(null);
      setError(null);
      return;
    }

    if (file.size > 4 * 1024 * 1024) { // Limit file size to 4MB
      setError("File size exceeds 4MB. Please choose a smaller image.");
      setProfilePictureFile(null);
      setProfilePicturePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Invalid file type. Please upload an image (PNG, JPG, GIF, WEBP).");
      setProfilePictureFile(null);
      setProfilePicturePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
      return;
    }

    setProfilePictureFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUri = reader.result as string;
      setProfilePicturePreview(dataUri);
      // Automatically trigger analysis
      triggerAnalysis(dataUri);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    processFile(file || null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    // Add visual feedback for drag over if desired
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    
    if (fileInputRef.current) { // Ensure input value is updated for consistency
        const dataTransfer = new DataTransfer();
        if (file) dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
    }
    processFile(file || null);
  };

  const triggerAnalysis = async (imageDataUri: string) => {
    if (isLoading) return; // Prevent multiple submissions

    onAnalysisStart();
    setError(null);

    try {
      const result = await generateCringeIndex({
        profilePictureDataUri: imageDataUri,
        userInput: "", // User input field removed as per new design
      });
      onAnalysisComplete(result, imageDataUri);
    } catch (err) {
      console.error("AI Analysis Error:", err);
      onAnalysisError(err instanceof Error ? err.message : "An unknown error occurred during analysis.");
    } finally {
        // Reset file input so the same file can be re-uploaded if needed after an error
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setProfilePictureFile(null);
        // Keep preview for ResultsDisplay, reset by parent component (TruthCardPage) via handleReset
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={cn(
          "w-full max-w-lg h-64 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer",
          "flex flex-col items-center justify-center space-y-3",
          "text-foreground/70 hover:text-foreground hover:border-foreground transition-colors",
          "border-foreground-muted", // Default border, uses a new CSS class for foreground dashed
           isLoading ? "opacity-50 cursor-not-allowed" : "",
           error ? "border-destructive hover:border-destructive/80" : "border-dashed-foreground"
        )}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={!isLoading ? handleDrop : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => !isLoading && e.key === 'Enter' && fileInputRef.current?.click()}
        aria-label="Profile screenshot upload area"
      >
        <Input
          type="file"
          accept="image/png, image/jpeg, image/gif, image/webp"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          id="profilePicture"
          aria-describedby="file-error"
          disabled={isLoading}
        />
        <UploadCloud className={cn("w-16 h-16", error ? "text-destructive" : "text-foreground/90")} />
        <p className="text-lg font-semibold text-foreground">Drag &amp; Drop Profile Screenshot Here</p>
        <p className={cn("text-sm", error ? "text-destructive/90" : "text-foreground/60")}>
          or click to upload
        </p>
      </div>
      {error && (
        <div id="file-error" className="mt-4 flex items-center gap-2 text-destructive p-3 bg-destructive/10 rounded-md border border-destructive/50 w-full max-w-lg">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}
       {/* Max file size hint, less prominent than error */}
      {!error && (
         <p className="text-xs text-muted-foreground mt-3">Max 4MB: PNG, JPG, GIF, WEBP</p>
      )}
    </div>
  );
}
