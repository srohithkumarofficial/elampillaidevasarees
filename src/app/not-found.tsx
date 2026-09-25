import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <span className="material-symbols-outlined text-primary text-6xl mb-4">
        diamond
      </span>
      <h1 className="font-headline-lg text-primary text-3xl font-serif mb-2">
        Weave Not Found
      </h1>
      <p className="font-body-md text-on-surface-variant max-w-md mb-8 text-sm">
        The heirloom drape or page you are searching for might have been moved or is currently being crafted on our looms.
      </p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary-container text-on-primary font-label-md uppercase tracking-wider px-6 py-3 transition-colors text-xs font-semibold"
      >
        Return to Atelier
      </Link>
    </div>
  );
}
