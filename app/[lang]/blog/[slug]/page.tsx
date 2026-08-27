import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getPostBySlug, getAllPostSlugs } from '@/lib/mdx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import MDXContent from '@/components/MDXContent';
import { ShareButtons } from '@/components/ShareButtons';

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const locales: Locale[] = ['es', 'en'];
  const paths: { lang: Locale; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getAllPostSlugs('blog', locale);
    slugs.forEach((slug) => {
      paths.push({ lang: locale, slug });
    });
  }

  return paths;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as Locale);
  const post = getPostBySlug('blog', lang as Locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center text-red-600 hover:text-red-700 mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            {dict.blog.backToList}
          </Link>

          {post.frontmatter.image && (
            <div className="relative h-96 mb-8 rounded-2xl overflow-hidden">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {post.frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {dict.blog.publishedOn}{' '}
                  {new Date(post.frontmatter.date).toLocaleDateString(
                    lang,
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }
                  )}
                </span>
              </div>

              {post.frontmatter.author && (
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>
                    {dict.blog.by} {post.frontmatter.author}
                  </span>
                </div>
              )}
            </div>

            {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-red-100 text-red-700 text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <div className="max-w-none">
            <MDXContent source={post.content} remarkPlugins={[remarkGfm]} />
          </div>

          <div className="mt-12">
            <ShareButtons
              url={`/${lang}/blog/${slug}`}
              title={post.frontmatter.title}
              description={post.frontmatter.excerpt}
            />
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link href={`/${lang}/blog`}>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-red-600 border-red-600 hover:bg-red-50"
              >
                <ArrowLeft className="h-4 w-4" />
                {dict.blog.backToList}
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
