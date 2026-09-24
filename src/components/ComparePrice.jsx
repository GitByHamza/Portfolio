import React from 'react'

// Regular price shown struck through above a discounted plan price.
// Dark red in light mode, light red in dark mode.
export default function ComparePrice({ value, isUrdu = false, className = '' }) {
  if (!value) return null
  return (
    <del className={`block line-through decoration-[1.5px] text-[#B91C1C] dark:text-[#FCA5A5] font-medium offer-ui ${className}`}>
      <span className="sr-only">{isUrdu ? 'Pehle ' : 'Was '}</span>
      {value}
    </del>
  )
}
