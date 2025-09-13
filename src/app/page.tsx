import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
      <p className="mt-4 opacity-80">
        Head to the blog to read my ETH/ZK/Web3 notes.
      </p>
      <div className="mt-8">
        <Link className="inline-block rounded bg-foreground text-background px-4 py-2" href="/blog">
          Read the blog
        </Link>
      </div>
    </main>
  );
}
