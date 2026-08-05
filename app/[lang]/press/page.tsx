import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getAllPosts } from '@/lib/mdx';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function PressPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const posts = getAllPosts('press', lang as Locale);

  return (
    <>
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {dict.press.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {dict.press.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">
            {dict.press.latest}
          </h2>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600">{dict.press.noPosts}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${lang}/press/${post.slug}`}
                  className="group block"
                >
                  <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-3 gap-0">
                        {post.frontmatter.image && (
                          <div className="relative h-48 md:h-auto overflow-hidden rounded-l-lg">
                            <Image
                              src={post.frontmatter.image}
                              alt={post.frontmatter.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className={`${post.frontmatter.image ? 'md:col-span-2' : 'md:col-span-3'} p-8`}>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(
                                  post.frontmatter.date
                                ).toLocaleDateString(lang as Locale, {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">
                            {post.frontmatter.title}
                          </h3>

                          <p className="text-slate-600 mb-4 line-clamp-2">
                            {post.frontmatter.excerpt}
                          </p>

                          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.frontmatter.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="bg-blue-100 text-blue-700"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <span className="text-red-600 font-semibold group-hover:underline">
                            {dict.press.readMore} →
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-5 rounded-2xl">
                  <Mail className="h-10 w-10 text-blue-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {dict.press.contact.title}
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                {dict.press.contact.description}
              </p>
              <a
                href={`mailto:${dict.press.contact.email}`}
                className="inline-block text-2xl text-red-600 hover:text-red-700 font-semibold hover:underline"
              >
                {dict.press.contact.email}
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
