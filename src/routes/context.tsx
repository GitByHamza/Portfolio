import { useLoaderData } from 'react-router'
import type { LoaderFunctionArgs } from 'react-router'
import { loader as loadPage } from './page-loader.server.ts'
import { briefingMarkdown } from '../lib/public-content.ts'
import MarkdownArticle from '../components/MarkdownArticle.tsx'
export { meta, headers } from './page-meta.ts'

export function loader(args: LoaderFunctionArgs) {
  return { ...loadPage(args), markdown: briefingMarkdown() }
}

export default function ContextPage() {
  const { markdown } = useLoaderData<typeof loader>()
  return <main className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
    <div className="flex flex-wrap gap-3 mb-10 text-sm"><a href="/context.md" download="TeXCodes-briefing.md" className="btn-outline">Download briefing</a><a href="/llms-full.txt" className="btn-outline">Complete public content</a></div>
    <MarkdownArticle text={markdown} />
  </main>
}
