import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SoonDrawer } from "@/components/SoonDrawer";

export const dynamic = "force-static";

export default function BlogIndexPage() {
  const items = getAllPosts();
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">KnowledgETH</h1>
      <p className="mt-4 text-lg opacity-80">
      This blog will be my running schizo notebook as I learn about Ethereum, zero-knowledge proofs, and the broader Web3 ecosystem.
      </p>
      <div className="mt-3 text-sm opacity-80">
        <a
          href="https://gdonnoh.github.io/portfolio/"
          target="_blank"
          rel="noreferrer"
          className="underline hover:opacity-100"
        >
          About me
        </a>
      </div>
      <h2 className="mt-12 text-2xl font-semibold">Blog</h2>
      <ul className="mt-8 space-y-6">
        {items.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold hover:underline">
              {post.title}
            </Link>
            <div className="text-sm opacity-70">
              {new Date(post.date).toLocaleDateString()}
            </div>
            {post.description && (
              <p className="mt-2 opacity-80">{post.description}</p>
            )}
          </li>
        ))}
        {items.length === 0 && (
          <li className="opacity-70">No posts yet. Create one in src/content/posts.</li>
        )}
      </ul>
      <SoonDrawer />
    </main>
  );
}

