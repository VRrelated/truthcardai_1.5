
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react'; // Restored ShieldAlert icon

export default function Header() {
  return (
    <header className="py-4 px-6 border-b border-border shadow-md sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors"
        >
          <ShieldAlert size={28} className="text-primary" /> {/* Reverted to ShieldAlert */}
          TruthCard.AI
        </Link>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
}
