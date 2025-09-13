import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  description?: string;
  date: string; // ISO string
  tags?: string[];
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.(mdx|md)$/i, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const filePathMdx = path.join(postsDirectory, `${slug}.mdx`);
  const filePathMd = path.join(postsDirectory, `${slug}.md`);
  const filePath = fs.existsSync(filePathMdx) ? filePathMdx : fs.existsSync(filePathMd) ? filePathMd : null;
  if (!filePath) return null;
  const file = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(file);
  const fm = data as Partial<PostFrontmatter>;
  if (!fm.title || !fm.date) {
    throw new Error(`Post ${slug} missing required frontmatter: title and date`);
  }
  return {
    slug,
    content,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags ?? [],
  };
}

export function getAllPosts(): Post[] {
  return getAllPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

