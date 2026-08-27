import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Pluggable } from 'unified';
import Link from 'next/link';

const components = {
  img: ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ''}
      className="rounded-lg my-8 w-full h-auto"
      {...props}
    />
  ),
  a: (props: any) => (
    <Link
      {...props}
      className="text-red-600 hover:text-red-700 underline"
    />
  ),
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-slate-900 mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-bold text-slate-900 mt-6 mb-3" {...props} />
  ),
  p: (props: any) => (
    <p className="text-lg text-slate-700 leading-relaxed mb-4" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-red-600 pl-4 italic text-slate-600 my-4"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="bg-slate-100 text-red-600 px-1 py-0.5 rounded text-sm"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-slate-900 text-white p-4 rounded-lg overflow-x-auto my-4"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-slate-200 shadow-sm">
      <table className="w-full text-sm text-left border-collapse" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-slate-800 text-white" {...props} />
  ),
  tbody: (props: any) => (
    <tbody className="divide-y divide-slate-200" {...props} />
  ),
  tr: (props: any) => (
    <tr className="even:bg-slate-50 hover:bg-red-50 transition-colors" {...props} />
  ),
  th: (props: any) => (
    <th className="px-4 py-3 font-semibold text-sm whitespace-nowrap tracking-wide" {...props} />
  ),
  td: (props: any) => (
    <td className="px-4 py-3 text-slate-700 align-top" {...props} />
  ),
};

interface MDXContentProps {
  source: string;
  remarkPlugins?: Pluggable[];
}

export default function MDXContent({ source, remarkPlugins = [] }: MDXContentProps) {
  return (
    <div className="max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: { remarkPlugins },
        }}
      />
    </div>
  );
}
