// Turns the built index.html into a static page: real title, description and
// rendered markup, so crawlers that don't run JavaScript see the full text.
// Used by scripts/prerender-legal.js.

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const replaceOnce = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`prerender: template has no ${label}`)
  return html.replace(pattern, () => replacement)
}

export function injectPage(template, { title, description, html }) {
  let page = replaceOnce(template, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(`${title} — TeXCodes`)}</title>`, '<title>')
  page = replaceOnce(
    page,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    'meta description',
  )
  return replaceOnce(page, /<div id="root"><\/div>/, `<div id="root">${html}</div>`, 'empty root div')
}
