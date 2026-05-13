import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">AI Summary Hub</h1>
      <p className="mb-8 max-w-2xl text-fd-muted-foreground">
        Open AI knowledge wiki — fundamentals, agents, MLOps, prompt engineering, and more.
      </p>
      <Link
        href="/docs"
        className="rounded-md bg-fd-primary px-6 py-3 font-medium text-fd-primary-foreground hover:opacity-90"
      >
        Open docs
      </Link>
    </main>
  );
}
