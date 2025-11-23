import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { SoonDrawer } from "@/components/SoonDrawer";
import DecryptedText from "@/components/DecryptedText";

export const dynamic = "force-static";

export default function BlogIndexPage() {
  const items = getAllPosts();
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">
        <DecryptedText text="KnowledgETH" animateOn="view" />
      </h1>
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
      <ul className="mt-8 divide-y divide-white/10">
        {items.map((post) => (
          <li key={post.slug} className="py-6">
            <Link
              href={`/blog/${post.slug}`}
              className="group block -mx-4 rounded-lg px-4 py-3 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-semibold text-white group-hover:underline">
                  <DecryptedText text={post.title} animateOn="hover" />
                </h3>
                <span className="text-sm opacity-70 whitespace-nowrap">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </div>
              {post.description && (
                <p className="mt-2 opacity-80">{post.description}</p>
              )}
            </Link>
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

