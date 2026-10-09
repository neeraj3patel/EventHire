import Link from 'next/link';
import { buttonStyles } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          Go<span className="text-indigo-600">Pratle</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link href="/requirements" className={buttonStyles('ghost')}>
            Requirements
          </Link>
          <Link href="/post-requirement" className={buttonStyles('primary')}>
            Post requirement
          </Link>
        </nav>
      </div>
    </header>
  );
}
