import type { LoaderFunctionArgs } from 'react-router'
import { loader as pageLoader } from './page-loader.server.ts'
import { PLANS_DETAIL } from '../content/offers/tech.ts'
export { default } from '../pages/TechRetailOffer.tsx'
export { meta, headers } from './page-meta.ts'

export function loader(args: LoaderFunctionArgs) {
  const data = pageLoader(args)
  const plan = PLANS_DETAIL[data.page.lang].growth
  return { ...data, plan: {
    modules: plan.modules.map((module) => ({ ...module, title: module.title.replace(/\s*\([^)]*(?:PKR|included|shamil)[^)]*\)/gi, '') })),
    exclusions: plan.exclusions,
  } }
}
