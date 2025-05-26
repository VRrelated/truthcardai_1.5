
import type {Metadata} from 'next';
import {Geist_Mono as GeistMonoFont} from 'next/font/google'; // Renamed for clarity
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Note: The 'Geist' sans-serif font was imported but not explicitly assigned to a variable or used in className.
// If it's intended for body text or other elements, it should be included in the body className or via CSS.
// For now, assuming GeistMono is the primary intended font as per font-mono in body.

const geistMono = GeistMonoFont({ // Use the renamed import
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TruthCard.AI: Dating Profile Roaster',
  description: 'Uncover the cringe. Roast your dating profiles with AI.',
  icons: {
    icon: '/truthcard-logo.png', // Assumes truthcard-logo.png is in /public
    apple: '/truthcard-logo.png', // For Apple touch icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed extra space before <body> that could cause hydration issues
    <html lang="en" className="dark">
      <body className={`${geistMono.variable} font-mono antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
