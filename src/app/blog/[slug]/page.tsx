import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostByRouteSlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Tweet } from "react-tweet";
import Link from "next/link";
import { TwitterShare } from "@/components/TwitterShare";
import DecryptedText from "@/components/DecryptedText";
import { DonationLink } from "@/components/DonationLink";
import { DocswellEmbed } from "@/components/DocswellEmbed";



type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = getPostByRouteSlug(slug);
  if (!post) return {};
  const url = `https://knowledgeth.vercel.app/blog/${post.slug}`;
  const images = post.firstImageUrl
    ? [{ url: post.firstImageUrl }]
    : undefined;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      images,
      type: "article",
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      images,
    },
  } as const;
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostByRouteSlug(slug);
  if (!post) return notFound();
  const url = `https://knowledgeth.vercel.app/blog/${post.slug}`;
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/blog" className="opacity-70 hover:underline">← Back to blog</Link>
      <article className="prose prose-neutral dark:prose-invert mt-6">
        <h1>
          <DecryptedText text={post.title} animateOn="view" />
        </h1>
        <p className="!mt-0 text-sm opacity-70">{new Date(post.date).toLocaleDateString()}</p>
        <MDXRemote
          source={post.content}
          components={{ Tweet, DocswellEmbed }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }]],
            },
          }}
        />
      </article>
      <div className="mt-8">
        <p className="mb-3 text-sm opacity-80">
          If you have suggestions or you just want me to make some notes about something, ping me on X :)
        </p>
        <TwitterShare url={url} title={post.title} />
        <div className="mt-3">
          <DonationLink />
        </div>
      </div>
    </main>
  );
}

