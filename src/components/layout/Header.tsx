
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="py-4 px-6 border-b border-border shadow-md sticky top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-bold text-primary hover:text-primary/90 transition-colors" // Adjusted gap for image
        >
          <Image
            src="/truthcard-logo.png" // Assumes truthcard-logo.png is in /public
            alt="TruthCard.AI Logo"
            width={32} // Adjust size as needed
            height={32} // Adjust size as needed
            className="rounded-full" // Add if your image isn't transparent and needs to be visually circular
          />
          TruthCard.AI
        </Link>
        {/* Future navigation items can go here */}
      </div>
    </header>
  );
}
