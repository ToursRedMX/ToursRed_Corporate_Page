import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  draft?: boolean;
  image?: string;
  author?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

const isProduction = process.env.NODE_ENV === 'production';

function getPostsDirectory(type: 'blog' | 'press', locale: string) {
  return path.join(process.cwd(), 'content', type, locale);
}

export function getAllPosts(type: 'blog' | 'press', locale: string): Post[] {
  const postsDirectory = getPostsDirectory(type, locale);

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      };
    })
    .filter((post) => {
      if (isProduction && post.frontmatter.draft) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });

  return posts;
}

export function getPostBySlug(
  type: 'blog' | 'press',
  locale: string,
  slug: string
): Post | null {
  const postsDirectory = getPostsDirectory(type, locale);
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const post = {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };

  if (isProduction && post.frontmatter.draft) {
    return null;
  }

  return post;
}

export function getAllPostSlugs(type: 'blog' | 'press', locale: string): string[] {
  const posts = getAllPosts(type, locale);
  return posts.map((post) => post.slug);
}
