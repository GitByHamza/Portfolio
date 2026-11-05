// Content is visible immediately in both HTML and the hydrated application.
// Keep the existing API so presentation components need no structural rewrite.
export const EDITORIAL_EASE = [0.22, 1, 0.36, 1]
export function FadeIn({ children, className = '' }) {
 return <div className={className}>{children}</div>
}
export function StaggerContainer({ children, className = '' }) {
 return <div className={className}>{children}</div>
}
export function StaggerItem({ children, className = '' }) {
 return <div className={className}>{children}</div>
}
export function ScrollProgress() { return null }
