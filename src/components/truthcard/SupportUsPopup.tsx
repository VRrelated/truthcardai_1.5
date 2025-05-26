
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

interface SupportUsPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gumroadLink: string;
}

export default function SupportUsPopup({ open, onOpenChange, gumroadLink }: SupportUsPopupProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="font-mono">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <AlertDialogTitle className="text-2xl text-center text-primary">
            Support TruthCard.AI's Future!
          </AlertDialogTitle>
          <div className="text-sm text-center text-foreground/90 pt-2 space-y-3">
            <p>Enjoying TruthCard.AI? Help us grow!</p>
            <p>As a solo developer, your support directly helps to:</p>
            <ul className="list-disc list-inside text-left space-y-1 pl-4">
              <li>Cover server costs.</li>
              <li>Develop exciting new features (like 3D cards & advanced AI!).</li>
              <li>Dedicate more time to making TruthCard.AI even better.</li>
            </ul>
            <p>Every contribution fuels the fire for more roasts!</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 sm:justify-center gap-3">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="w-full sm:w-auto">Maybe Later</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <a
              href={gumroadLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Support Us on Gumroad
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
