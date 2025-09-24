import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  description?: string;
  date: string; // ISO string
  tags?: string[];
  slug?: string; // optional custom URL slug
};

export type Post = PostFrontmatter & {
  // slug used in URL routing (derived from frontmatter slug or kebab-case title/filename)
  slug: string;
  // underlying filename without extension (used for locating file on disk)
  fileSlug: string;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

function toKebabCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function listPostBaseFilenames(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.(mdx|md)$/i, ""));
}

function readPostFromBaseFilename(fileSlug: string): Post | null {
  const filePathMdx = path.join(postsDirectory, `${fileSlug}.mdx`);
  const filePathMd = path.join(postsDirectory, `${fileSlug}.md`);
  const filePath = fs.existsSync(filePathMdx)
    ? filePathMdx
    : fs.existsSync(filePathMd)
    ? filePathMd
    : null;
  if (!filePath) return null;
  const file = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(file);
  const fm = data as Partial<PostFrontmatter>;
  if (!fm.title || !fm.date) {
    throw new Error(`Post ${fileSlug} missing required frontmatter: title and date`);
  }
  const urlSlug = fm.slug
    ? toKebabCase(fm.slug)
    : fm.title
    ? toKebabCase(fm.title)
    : toKebabCase(fileSlug);
  return {
    slug: urlSlug,
    fileSlug,
    content,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    tags: fm.tags ?? [],
  };
}

export function getAllPostSlugs(): string[] {
  return listPostBaseFilenames()
    .map((fileSlug) => readPostFromBaseFilename(fileSlug))
    .filter((p): p is Post => Boolean(p))
    .map((p) => p.slug);
}

export function getPostByRouteSlug(routeSlug: string): Post | null {
  // Find a post whose URL slug matches the provided route slug
  const posts = listPostBaseFilenames()
    .map((fileSlug) => readPostFromBaseFilename(fileSlug))
    .filter((p): p is Post => Boolean(p));
  return posts.find((p) => p.slug === routeSlug) ?? null;
}

export function getAllPosts(): Post[] {
  return listPostBaseFilenames()
    .map((fileSlug) => readPostFromBaseFilename(fileSlug))
    .filter((p): p is Post => Boolean(p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

