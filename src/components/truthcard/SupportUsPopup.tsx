
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
          <AlertDialogDescription className="text-center text-foreground/90 pt-2 space-y-3">
            <p>
              Hey there! I'm a solo developer passionately building TruthCard.AI.
              Your support, no matter how small, directly helps me cover server costs,
              develop exciting new features (like advanced AI analysis and those slick 3D cards!),
              and dedicate more time to making this app even more insightful and entertaining.
            </p>
            <p>
              If TruthCard.AI brought a smile to your face or gave you some 'uh-oh'
              moments, please consider chipping in. Every contribution fuels the fire for more roasts!
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 sm:justify-center gap-3">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="w-full sm:w-auto">Maybe Later</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <a
              href={gumroadLink}
              target="_blank"
              rel="noopener noreferrer"
              className={Button({className: "w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"})}
            >
              Support Us on Gumroad
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
