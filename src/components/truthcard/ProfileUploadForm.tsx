"use client";

import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { generateCringeIndex, type GenerateCringeIndexOutput } from "@/ai/flows/generate-cringe-index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadCloud, AlertCircle, FileText, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileUploadFormProps {
  onAnalysisStart: () => void;
  onAnalysisComplete: (data: GenerateCringeIndexOutput, imagePreview: string | null) => void;
  onAnalysisError: (error: string) => void;
  isLoading: boolean;
}

export default function ProfileUploadForm({
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
  isLoading,
}: ProfileUploadFormProps) {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // Limit file size to 4MB
        setError("File size exceeds 4MB. Please choose a smaller image.");
        setProfilePicture(null);
        setProfilePicturePreview(null);
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Invalid file type. Please upload an image (PNG, JPG, GIF, WEBP).");
        setProfilePicture(null);
        setProfilePicturePreview(null);
        return;
      }
      setProfilePicture(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
       if (file.size > 4 * 1024 * 1024) {
        setError("File size exceeds 4MB. Please choose a smaller image.");
        setProfilePicture(null);
        setProfilePicturePreview(null);
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Invalid file type. Please upload an image.");
        setProfilePicture(null);
        setProfilePicturePreview(null);
        return;
      }
      setProfilePicture(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!profilePicture) {
      setError("Please upload a profile picture.");
      return;
    }
    if (!profilePicturePreview) {
      setError("Image preview not available. Please re-upload."); // Should not happen if profilePicture is set
      return;
    }

    onAnalysisStart();
    setError(null);

    try {
      const result = await generateCringeIndex({
        profilePictureDataUri: profilePicturePreview,
        userInput: userInput || "No additional comments.",
      });
      onAnalysisComplete(result, profilePicturePreview);
    } catch (err) {
      console.error("AI Analysis Error:", err);
      onAnalysisError(err instanceof Error ? err.message : "An unknown error occurred during analysis.");
    }
  };

  return (
    <Card className="w-full shadow-xl border-border/70">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-primary flex items-center justify-center gap-2">
          <UploadCloud className="text-accent" /> Upload Profile for Roasting
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Drag & drop an image or click to select. Add any extra dirt you have.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className="border-2 border-dashed border-accent/50 rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors bg-muted/20"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
            aria-label="Image upload area"
          >
            <Input
              type="file"
              accept="image/png, image/jpeg, image/gif, image/webp"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
              id="profilePicture"
              aria-describedby="file-error"
            />
            {profilePicturePreview ? (
              <img
                src={profilePicturePreview}
                alt="Profile preview"
                className="max-h-48 mx-auto rounded-md shadow-md"
                data-ai-hint="profile image"
              />
            ) : (
              <div className="flex flex-col items-center space-y-2 text-muted-foreground">
                <UploadCloud className="w-12 h-12 text-accent" />
                <p>Drag & drop your image here, or click to select</p>
                <p className="text-xs">(Max 4MB: PNG, JPG, GIF, WEBP)</p>
              </div>
            )}
          </div>
          {profilePicture && (
            <div className="text-sm text-accent flex items-center gap-1 justify-center">
              <FileText size={16} /> Selected: {profilePicture.name} ({(profilePicture.size / 1024).toFixed(1)} KB)
            </div>
          )}
          

          <div className="space-y-2">
            <Label htmlFor="userInput" className="text-primary flex items-center gap-2">
              <MessageSquare size={18}/> Optional Dirt (e.g., bio, strange habits):
            </Label>
            <Textarea
              id="userInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g., 'Claims to be a crypto bro, only talks about NFTs...'"
              className="min-h-[100px] bg-input focus:ring-accent"
              maxLength={1000}
            />
             <p className="text-xs text-muted-foreground text-right">{userInput.length}/1000</p>
          </div>

          {error && (
            <div id="file-error" className="flex items-center gap-2 text-destructive p-3 bg-destructive/10 rounded-md border border-destructive/50">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          <Button type="submit" disabled={isLoading || !profilePicture} className="w-full text-lg py-6">
            {isLoading ? "Analyzing..." : "Roast This Profile!"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
