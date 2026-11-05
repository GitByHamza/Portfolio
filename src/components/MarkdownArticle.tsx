import { Fragment } from 'react'
import type { ReactNode } from 'react'
import Link from './SiteLink.jsx'
import { BUSINESS } from '../data/business.js'

function inline(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g).map((part, index) => {
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
    if (/^https?:\/\//.test(part)) {
      const internal = part.startsWith(`${BUSINESS.url}/`)
      const href = internal ? part.slice(BUSINESS.url.length) : part
      return internal && !/\.(?:txt|md|xml)(?:[?#]|$)/.test(href)
        ? <Link key={index} to={href}>{part}</Link>
        : <a key={index} href={href}>{part}</a>
    }
    return <Fragment key={index}>{part}</Fragment>
  })
}

export default function MarkdownArticle({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\s*\n/)
  return <article className="briefing-copy">{blocks.map((block, index) => {
    const heading = block.match(/^(#{1,4}) (.*)$/s)
    if (heading) {
      const copy = inline(heading[2])
      return heading[1].length === 1 ? <h1 key={index}>{copy}</h1> : heading[1].length === 2 ? <h2 key={index}>{copy}</h2> : <h3 key={index}>{copy}</h3>
    }
    const lines = block.split('\n')
    if (lines.every((line) => /^\s*- |^ {2}/.test(line))) {
      const items: string[] = []
      for (const line of lines) { if (line.startsWith('- ')) items.push(line.slice(2)); else if (items.length) items[items.length - 1] += ` ${line.trim()}` }
      return <ul key={index}>{items.map((line, i) => <li key={i}>{inline(line)}</li>)}</ul>
    }
    return <p key={index}>{lines.map((line, i) => <Fragment key={i}>{i > 0 && <br />}{inline(line)}</Fragment>)}</p>
  })}</article>
}
