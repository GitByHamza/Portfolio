import React from 'react'
import { cn } from '../lib/utils'

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/20", className)}
      {...props}
    />
  )
}

const ProjectImage = ({ src, alt, layoutId, className }) => {
  const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded && (
        <Skeleton className="absolute inset-0 z-10 w-full h-full rounded-none" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  )
}

export { Skeleton, ProjectImage }
