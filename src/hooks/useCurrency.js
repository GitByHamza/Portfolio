import { useSyncExternalStore } from 'react'
import { defaultCurrency } from '../lib/currency'

const subscribe = () => () => {}
// Shared HTML and the hydration snapshot always agree; region is an enhancement.
export function useCurrency(supported) {
  return useSyncExternalStore(subscribe, () => defaultCurrency(supported), () => 'USD')
}
