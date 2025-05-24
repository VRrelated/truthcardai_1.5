import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 px-6 border-b border-border shadow-md sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-2xl font-bold text-red-600 hover:text-red-500 transition-colors drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
        >
          <ShieldAlert size={28} className="text-accent" />
          TruthCard.AI
        </Link>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
}
