export default function BrandLogo({ variant = 'default' }) {
  return <span className={`brand-lockup brand-lockup--${variant}`} role="img" aria-label="TeXCodes">
    <img className="brand-mark" src="/brand/texcodes-mark.png" alt="" width="256" height="256" />
    <img className="brand-wordmark" src="/brand/texcodes-wordmark.webp" alt="" width="480" height="104" />
  </span>
}
