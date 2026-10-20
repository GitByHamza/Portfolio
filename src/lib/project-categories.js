export function matchesProjectCategory(project, category) {
  if (category === 'ALL') return true
  if (project.categories) return project.categories.includes(category)

  const title = project.title || ''
  const tags = project.tags || []
  if (category === 'ENTERPRISE') {
    return tags.some((tag) => ['Laravel 12', 'PostgreSQL', 'Spatie', 'Next.js'].includes(tag)) ||
      /Enterprise|Myls|Hospital/.test(title)
  }
  if (category === 'COMMERCE') {
    return tags.includes('Prisma') || /Store|Shop|Ecommerce|Retail/.test(title)
  }
  if (category === 'SAAS') {
    return /SaaS|\bAI\b/.test(title) || tags.some((tag) => /\bAI\b|SaaS/i.test(tag))
  }
  return false
}
