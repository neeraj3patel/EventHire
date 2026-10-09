import Link from 'next/link';
import { CATEGORY_META, CATEGORY_VALUES } from '@/lib/constants';
import { buttonStyles } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="space-y-14 py-6">
      <section className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Find the right people for your event
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Post a requirement in four quick steps and reach event planners, performers or crew.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/post-requirement" className={buttonStyles('primary', 'px-6 py-3 text-base')}>
            Post a requirement
          </Link>
          <Link href="/requirements" className={buttonStyles('secondary', 'px-6 py-3 text-base')}>
            Browse requirements
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {CATEGORY_VALUES.map((c) => {
          const meta = CATEGORY_META[c];
          const Icon = meta.icon;
          return (
            <Link
              key={c}
              href={`/requirements?category=${c}`}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow"
            >
              <Icon className="mb-3 h-6 w-6 text-indigo-600" aria-hidden />
              <h2 className="font-semibold text-slate-900">{meta.label}</h2>
              <p className="mt-1 text-sm text-slate-500">{meta.description}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
